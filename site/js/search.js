(function() {
  var form = document.getElementById("autocomplete");
  var inputContainer = document.getElementById("autocomplete-input-container");
  var input = document.getElementById("autocomplete-input");
  var reset = document.getElementById("autocomplete-reset");
  var search = document.getElementById("autocomplete-search");
  var autocomplete = document.getElementById("autocomplete-results");
  var i = -1;
  var top = 0;
  var idx = lunr(function() {
    this.ref("autocompleteRow");
    this.field("description");
    this.field("title");
    this.field("tags");
    this.field("categories");
    // disable stemming, only exact words
    this.pipeline.remove(lunr.stemmer);
    this.searchPipeline.remove(lunr.stemmer);
    markers.forEach(function(doc) {
      this.add(doc);
    }, this);
  });
  var _debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  var _search = function(searchKey) {
    // https://lunrjs.com/guides/searching.html (AND)
    var key = searchKey.length
      ? searchKey
          .replace(/ +(?= )/g, "")
          .split(" ")
          .map(function(i) {
            return "+" + i;
          })
          .join(" ")
      : "";
    var results = idx.search(key);
    if (searchKey.length) {
      _showLoading();
      _debounce(_showResults, 500)(results);
    } else {
      _hideLoading();
      _hideResults();
    }
  };
  var _buildResults = function(results) {
    var output = "<ul>";
    if (!results.length) {
      output += "<li><a>Nessun risultato 😓</a></li>";
    } else {
      for (var i = 0; i < results.length; i++) {
        var url = markers.find(function(m) {
          return m.autocompleteRow === results[i].ref;
        }).link;
        output +=
          '<li tabindex="-1" data-dest="' +
          url +
          '">' +
          results[i].ref +
          "</li>";
      }
    }
    output += "</ul>";
    return output;
  };
  var _blur = function(e) {
    if (!e.relatedTarget) {
      _hideResults();
    }
  };
  var _showLoading = function() {
    inputContainer.classList.add("js-is-loading");
  };
  var _hideLoading = function() {
    inputContainer.classList.remove("js-is-loading");
  };
  var _showResults = function(results) {
    autocomplete.innerHTML = _buildResults(results);
    autocomplete.removeAttribute("aria-hidden");
    autocomplete.classList.remove("js-is-hidden");
    reset.style.display = "block";
    search.style.display = "none";
    form.addEventListener("blur", _blur, true);
    _hideLoading();
  };
  var _hideResults = function() {
    autocomplete.setAttribute("aria-hidden", true);
    autocomplete.classList.add("js-is-hidden");
    autocomplete.innerHTML = "";
    reset.style.display = "none";
    search.style.display = "block";
    form.removeEventListener("blur", _blur);
    i = -1;
  };
  var _init = function() {
    reset.style.display = "none";
    autocomplete.removeAttribute("hidden");
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      return false;
    });
  };

  input.addEventListener("keyup", function(event) {
    var resultRows = Array.from(autocomplete.querySelectorAll("li[data-dest]"));
    var destination;
    var rowHeight;

    if (
      (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13) &&
      resultRows.length
    ) {
      rowHeight = resultRows[0].getBoundingClientRect().height;
      if (event.keyCode === 40 && i < resultRows.length - 1) {
        // down
        i++;
        if (i > 0) {
          top = top + rowHeight;
        }
      }
      if (event.keyCode === 38 && i > 0) {
        // up
        i--;
        top = top - rowHeight;
      }
      if (resultRows[i]) {
        resultRows.forEach(function(r) {
          r.classList.remove("js-is-active");
        });

        console.log(top);

        autocomplete.scrollTop = top;
        resultRows[i].classList.add("js-is-active");
        destination = resultRows[i].getAttribute("data-dest");
      }
      if (event.keyCode === 13) {
        location.href = destination;
      }
    } else if (event.keyCode === 13) {
      // enter
      event.preventDefault();
    } else if (event.keyCode === 27) {
      // esc
      form.reset();
      _hideResults();
    } else {
      var searchKey = this.value;
      if (searchKey.length) {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
          _search(searchKey);
        }
      }
    }
  });
  reset.addEventListener("click", function() {
    reset.style.display = "none";
    search.style.display = "block";
    input.focus();
    _debounce(_search, 250)("");
  });

  _init();
  _hideResults();
})();
