const textFields = Array.from(document.querySelectorAll('.js-textinput'));

function onTextFieldTouched(e) {
    e.target.classList.add('js-is-touched');
    if (e.target.validity.valid) {
        e.target.classList.remove('js-is-invalid');
        e.target.classList.add('js-is-valid');
    } else {
        e.target.classList.remove('js-is-valid');
        e.target.classList.add('js-is-invalid');
    }
}

const debouncedOnTextFieldTouched = debounce(onTextFieldTouched, 200);

textFields.forEach((textField) => {
    ['keydown'].forEach((evt) =>
        textField.addEventListener(evt, debouncedOnTextFieldTouched, false),
    );
});
