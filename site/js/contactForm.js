(function () {
  var form = document.getElementById('form')
  var pristine = new Pristine(form)
  form.addEventListener('submit', function (e) {
     var valid = pristine.validate()
     if (!valid) {
      e.preventDefault()
      Toastify({
        text: 'Non tutti i campi sono corretti, controlla 🤔',
        duration: 4000,
        close: false,
        gravity: 'top',
        position: 'right',
        className: 'c-toast--error'
      }).showToast()
     }
  });
})()