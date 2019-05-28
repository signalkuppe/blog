(function () {
  document.addEventListener('DOMContentLoaded', (event) => {
    var form = document.getElementById('autocomplete')
    var input = document.getElementById('autocomplete-input')
    var reset = document.getElementById('autocomplete-reset')
    var autocomplete = document.getElementById('autocomplete-results')
    var idx = lunr(function () {
      this.ref('autocompleteRow')
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
        _debounce(_showResults, 250)(results)
      } else {
        _hideResults()
      }
    }
    var _buildResults = function (results) {
        var output = '<ul>'
        if (!results.length) {
          output += '<li>Nessun risultato 😓</li>'
        } else {
          for (var i = 0; i < results.length; i++) {
            output += '<li>'+ results[i].ref +'</li>'
          }
        }
        output += '</ul>'
        return output;
    }
    var _showResults = function (results) {
      autocomplete.innerHTML = _buildResults(results)
      autocomplete.removeAttribute('aria-hidden')
      autocomplete.classList.remove('js-is-hidden')
      reset.style.display = 'block'
      form.addEventListener('blur', _blur, true)
    }
    var _blur = function (e) {
      if(!e.relatedTarget) {
        _hideResults()
      }
    }
    var _hideResults = function () {
      autocomplete.setAttribute('aria-hidden', true)
      autocomplete.classList.add('js-is-hidden')
      autocomplete.innerHTML = ''
      form.removeEventListener('blur', _blur)
    }
    var _init = function () {
      reset.style.display = 'none'
      autocomplete.removeAttribute('hidden')
      form.setAttribute('tabindex','0')
    }
    input.addEventListener('keyup', function (event) {
      if (event.keyCode !== 27) {
        var searchKey = this.value
        _debounce(_search, 250)(searchKey)
      } else {
        form.reset()
        _hideResults()
      }
    })

    reset.addEventListener('click', function () {
      reset.style.display = 'none'
      input.focus()
      _debounce(_search, 250)('')
    })
    _init()
    _hideResults()

  })
})()