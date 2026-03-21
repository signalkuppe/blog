import { trapFocus } from "./utils";

export async function initSearchAutocomplete(root = document) {
  const form = root.querySelector("#search-form");
  if (!form || form.dataset.searchInitialized === "true") return;
  form.dataset.searchInitialized = "true";

  const trigger = form.querySelector("#search-input");
  const results = form.querySelector("#results");
  const arrowElement = form.querySelector("#arrow");
  const posts = JSON.parse(form.getAttribute("data-posts"));
  const resultList = document.createElement("ul");
  const hint = document.createElement("p");
  hint.classList.add("hint");
  hint.textContent = "Digita almento 3 caratteri";
  const noResults = document.createElement("p");
  noResults.classList.add("no-results");
  noResults.textContent = "Nessun Risultato";
  let searchResults = [];
  let totalResults = 0;
  let selectedIndex = -1;
  const resultsFooter = document.createElement("p");
  resultsFooter.classList.add("results-footer");
  let floatingUi;

  async function getFloatingUi() {
    if (floatingUi) return floatingUi;
    floatingUi = await import("@floating-ui/dom");
    return floatingUi;
  }

  function getMaxResults() {
    return window.matchMedia("(max-width: 40rem)").matches ? 2 : 5;
  }

  document.body.appendChild(results);

  trigger.addEventListener("keydown", function (e) {
    const resultLinks = results.querySelectorAll("a");

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (resultLinks.length > 0) {
        selectedIndex = Math.min(selectedIndex + 1, resultLinks.length - 1);
        updateHighlight(resultLinks);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (resultLinks.length > 0) {
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateHighlight(resultLinks);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && resultLinks[selectedIndex]) {
        resultLinks[selectedIndex].click();
      }
    } else if (e.key === "Escape") {
      trigger.value = "";
      hideResults();
      selectedIndex = -1;
    }
  });

  trigger.addEventListener("keyup", function (e) {
    if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) {
      return;
    }

    const query = e.target.value;
    selectedIndex = -1;
    showResults();

    if (query.length > 2) {
      const allMatches = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          (post.tags || [])
            .map((t) => t.toLowerCase())
            .includes(query.toLowerCase()),
      );
      totalResults = allMatches.length;
      searchResults = allMatches.slice(0, getMaxResults());
    } else {
      searchResults = [];
      totalResults = 0;
    }

    search(query);
  });

  trigger.addEventListener("blur", function () {
    if (!searchResults.length) {
      hideResults();
      trigger.value = "";
    }
  });

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Tab" &&
      searchResults.length > 0 &&
      document.activeElement === trigger
    ) {
      event.preventDefault();
      const firstFocusableElement = results.querySelectorAll("a")[0];
      if (firstFocusableElement) {
        firstFocusableElement.focus();
        trapFocus(results);
      }
    }
  });

  function updateHighlight(resultLinks) {
    resultLinks.forEach((link) => {
      link.classList.remove("highlighted");
      link.removeAttribute("id");
    });

    if (selectedIndex >= 0 && resultLinks[selectedIndex]) {
      resultLinks[selectedIndex].classList.add("highlighted");
      resultLinks[selectedIndex].id = "selected-result";
      resultLinks[selectedIndex].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
      trigger.setAttribute("aria-activedescendant", "selected-result");
    } else {
      trigger.removeAttribute("aria-activedescendant");
    }
  }

  async function update() {
    const { computePosition, offset, arrow, shift, flip } =
      await getFloatingUi();
    computePosition(trigger, results, {
      placement: "bottom-start",
      strategy: "fixed",
      middleware: [
        offset(20),
        flip(),
        shift({ padding: 10 }),
        arrow({ element: arrowElement }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(results.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
      const { x: arrowX, y: arrowY } = middlewareData.arrow;
      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[placement.split("-")[0]];

      Object.assign(arrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-4px",
      });
    });
  }

  function search(query) {
    if (query.length > 2) {
      if (searchResults.length > 0) {
        hideHint();
        hideNoResults();
        results.appendChild(resultList);
        resultList.innerHTML = "";
        searchResults.forEach((post, index) => {
          resultList.insertAdjacentHTML(
            "beforeend",
            `<li role="option">
              <a href="/${post.slug}" data-index="${index}">
                <img src="${post.image}" width="60" height="60" loading="lazy" decoding="async" alt="" />
                <div>
                  <p>${post.title}</p>
                  <p>${post.description}</p>
                </div>
              </a>
            </li>`,
          );
        });

        hideFooter();
        const maxResults = getMaxResults();
        if (totalResults > maxResults) {
          const remaining = totalResults - maxResults;
          resultsFooter.textContent = `Sii più specifico, ci sono ${remaining} risultat${remaining === 1 ? "o" : "i"} in più`;
          results.appendChild(resultsFooter);
        }

        const resultLinks = results.querySelectorAll("a");
        resultLinks.forEach((link) => {
          link.addEventListener("mouseenter", function () {
            selectedIndex = parseInt(this.getAttribute("data-index"));
            updateHighlight(resultLinks);
          });
        });

        results.addEventListener("keyup", function (e) {
          if (e.key === "Escape") {
            hideResults();
            trigger.value = "";
            trigger.focus();
          }
        });
      } else {
        hideResultList();
        hideHint();
        results.appendChild(noResults);
      }
    } else {
      results.appendChild(hint);
      hideResultList();
      hideNoResults();
    }
  }

  function hideHint() {
    if (results.contains(hint)) results.removeChild(hint);
  }

  function hideNoResults() {
    if (results.contains(noResults)) results.removeChild(noResults);
  }

  function hideResultList() {
    if (results.contains(resultList)) results.removeChild(resultList);
  }

  function hideFooter() {
    if (results.contains(resultsFooter)) results.removeChild(resultsFooter);
  }

  function showResults() {
    results.style.display = "block";
    results.removeAttribute("inert");
    trigger.setAttribute("aria-expanded", "true");
    update();
  }

  function hideResults() {
    results.style.display = "";
    results.setAttribute("tabindex", "");
    results.setAttribute("inert", "");
    results.blur();
    trigger.setAttribute("aria-expanded", "false");
    trigger.removeAttribute("aria-activedescendant");
    selectedIndex = -1;
  }

  function setAriaAttributes() {
    results.setAttribute("tabindex", "-1");
    results.setAttribute("inert", "");
    results.setAttribute("role", "dialog");
    trigger.setAttribute("aria-controls", "results");
    trigger.setAttribute("aria-expanded", "false");
  }

  setAriaAttributes();

  document.body.addEventListener("click", function (e) {
    if (!results.contains(e.target) && !trigger.contains(e.target)) {
      hideResults();
    }
  });
}
