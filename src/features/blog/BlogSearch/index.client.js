const activeCategory = document
    .getElementById('js-search')
    .getAttribute('data-category');

fetch('/_data/map-points.json')
    .then((response) => response.json())
    .then((data) => {
        const filteredItems = data.filter((m) =>
            activeCategory ? m.category === activeCategory : true,
        );
        new autoComplete({
            // https://github.com/TarekRaafat/autoComplete.js
            placeHolder: `Cerca${
                !activeCategory ? '' : ` in ${activeCategory}`
            }...`,
            selector: '#js-autocomplete',
            trigger: (query) => {
                return query.length > 2;
            },
            data: {
                src: filteredItems,
                keys: ['title', 'tags'],
                filter: (list) => {
                    return list
                        .map((item) => ({ ...item, id: item.value.id }))
                        .filter(uniqBy('id'));
                },
            },
            resultItem: {
                highlight: {
                    render: true,
                },
                element: (item, data) => {
                    // Modify Results Item Style
                    item.innerHTML = `
                        <div class="autocomplete-top-row">
                            ${
                                data.key === 'title'
                                    ? data.match
                                    : data.value.title
                            }
                        </div>
                        <div class="autocomplete-tags">
                            
                            ${
                                data.key === 'title'
                                    ? data.value.tags
                                          .map(
                                              (t) =>
                                                  `<span class="autocomplete-tag">#${t}</span>`,
                                          )
                                          .join('')
                                    : data.match
                                          .split(',')
                                          .map(
                                              (t) =>
                                                  `<span class="autocomplete-tag">#${t}</span>`,
                                          )
                                          .join('')
                            }
                        </div>`;
                },
            },
            resultsList: {
                maxResults: 100,
                noResults: true,
                element: (list, data) => {
                    const info = document.createElement('p');
                    info.classList.add('autocomplete-results-header');
                    if (data.results.length > 0) {
                        info.innerHTML = `<strong>${data.results.length}</strong> resultati per <strong>“${data.query}”</strong>`;
                    } else {
                        info.innerHTML = `Nessun risultato per <strong>“${data.query}”</strong> 😕`;
                    }
                    list.prepend(info);
                },
            },
        });

        document
            .querySelector('#js-autocomplete')
            .addEventListener('selection', function (event) {
                location.href = event.detail.selection.value.permalink;
            });

        document
            .querySelector('#js-autocomplete')
            .addEventListener('open', function () {
                document
                    .getElementById('js-map')
                    .classList.add('js-is-searching');
            });
        document
            .querySelector('#js-autocomplete')
            .addEventListener('close', function () {
                document
                    .getElementById('js-map')
                    .classList.remove('js-is-searching');
            });

        const wrapper = document.querySelector('.autoComplete_wrapper');
        const IconWrapper = document.createElement('div');
        IconWrapper.classList.add('autocomplete-search-icon');
        IconWrapper.style.opacity = 0;
        const searchicon = `<svg viewBox="0 0 88 88" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32.997 0C14.845 0 0 14.844 0 32.997s14.845 32.998 32.997 32.998c6.919 0 13.336-2.17 18.655-5.844l26.092 26.092a6.018 6.018 0 0 0 8.499 0 5.98 5.98 0 0 0 0-8.468L60.15 51.683c3.676-5.32 5.844-11.766 5.844-18.686C65.995 14.844 51.15 0 32.997 0Zm0 11.999a20.908 20.908 0 0 1 20.999 20.998 20.908 20.908 0 0 1-20.999 20.999A20.908 20.908 0 0 1 12 32.997 20.908 20.908 0 0 1 32.997 12Z" fill="currentColor"/></svg>`;
        IconWrapper.innerHTML = searchicon;
        wrapper.append(IconWrapper);

        setTimeout(() => {
            document.getElementById('js-search').classList.add('js-is-loaded');
            IconWrapper.style.opacity = 1;
        }, 10);
    });

/** tooltip */

const tooltip = tippy('#js-map-tooltip', {
    content: 'Mostra sulla mappa',
    placement: 'top',
    trigger: 'manual',
})[0];

setTimeout(() => {
    if (!sessionStorage.getItem('signalkuppe-blog-tooltip-read')) {
        tooltip.show();
    }
}, 1000);

document
    .getElementById('js-map-tooltip')
    .addEventListener('click', function () {
        sessionStorage.setItem('signalkuppe-blog-tooltip-read', true);
        tooltip.hide();
    });
