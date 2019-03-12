(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    var input = document.getElementById('search-input')
    var resultMsg = document.getElementById('search-results')
    var resultLength = document.getElementById('search-length')
    var resultEmojoy = document.getElementById('search-emojoy')
    var reset = document.getElementById('search-reset')
    var cards = document.querySelectorAll('.l-postGrid-item')
    var idx = lunr(function () {
      this.ref('title')
      this.field('description')
      this.field('title')
      this.field('tags')
      this.field('categories')
      markers.forEach(function (doc) {
        this.add(doc)
      }, this)
    })
    var _debounce = function (func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
    var _filterCards = function (titles) {
      Array.from(cards).forEach(function (card) {
        var cardKey = card.getAttribute('data-post')
        if (titles.indexOf(cardKey) === -1) {
          card.setAttribute('hidden', true)
        } else {
          card.removeAttribute('hidden')
        }
      })
    }
    var _search = function (searchKey) {
      // https://lunrjs.com/guides/searching.html (AND)
      var key = searchKey.length ? searchKey 
                .replace(/ +(?= )/g,'')
                .split(' ')
                .map(function (i) {
                  return '+' + i
                })
                .join(' ') : ''
      var results = idx.search(key)
      if (searchKey.length) {
        resultMsg.removeAttribute('hidden')
      } else {
        resultMsg.setAttribute('hidden', true)
      }
      resultLength.innerText = results.length
      _filterCards(results.map(value => value['ref']))
      if (!results.length) {
        setTimeout(function () {
          resultEmojoy.removeAttribute('hidden')
        }, 250)
      } else {
        setTimeout(function () {
          resultEmojoy.setAttribute('hidden', true)
        }, 250)
      }
    }

    input.addEventListener('keyup', function () {
      var searchKey = this.value
      _debounce(_search, 250)(searchKey)
    })

    reset.addEventListener('click', function () {
      _debounce(_search, 250)('')
    })

  })
})()