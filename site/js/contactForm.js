(function () {
  var form = document.getElementById('form')
  var pristine = new Pristine(form)
  var serialize = function (form) {
    var serialized = [];
    for (var i = 0; i < form.elements.length; i++) {
      var field = form.elements[i]
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue
      if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue
          serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value))
        }
      }
      else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value))
      }
    }
    return serialized.join('&')
  }

  form.addEventListener('submit', function (e) {
     e.preventDefault()
     var valid = pristine.validate()
     if (!valid) {
      Toastify({
        text: 'Non tutti i campi sono corretti, controlla 🤔',
        duration: 4000,
        close: false,
        gravity: 'top',
        position: 'right',
        className: 'c-toast--error'
      }).showToast()
     } else {
       fetch(form.getAttribute('action'), {
         method: 'POST',
         data: serialize(form)
       })
        .then(function () {
          Toastify({
            text: 'Messaggio ricevuto, grazie! 🙂',
            duration: 4000,
            close: false,
            gravity: 'top',
            position: 'right',
            className: 'c-toast--success'
          }).showToast()
        })
        .catch(function (err) {
          console.log('form error', err)
          Toastify({
            text: 'Ops, qualcosa è andatto storto 😰',
            duration: 4000,
            close: false,
            gravity: 'top',
            position: 'right',
            className: 'c-toast--error'
          }).showToast()
        })
     }
  });
})()