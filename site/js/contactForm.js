(function () {
  var form = document.getElementById('form')
  var pristine = new Pristine(form)
  var encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&")
  }

  form.addEventListener('submit', function (e) {
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
      const body = new HttpParams()
                    .set('form-name', 'contact')
                    .append('email', form.value.email)
                    .append('message', form.value.message)
       console.log('invio', body)
       fetch('/', {
         method: 'POST',
         body: body,
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
       })
        .then(function (r) {
          console.log('ok', r)
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
      e.preventDefault()
     }
  });
})()