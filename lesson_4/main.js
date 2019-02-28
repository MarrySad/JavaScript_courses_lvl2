//Задание 3
var form = document.querySelector("form");
console.log(form);

let regExpForForm = [
    /^([A-Za-z\s?]+|[А-я\s?]+)$/,
    /^\+\d\(\d{3}\)\d{3}\-\d{4}$/,
    /^[\w\.\-]+@[A-Za-z]+\.[A-Za-z]+$/,
    /.+/
]

form.addEventListener("submit", (event) => {
    const inputs = form.getElementsByClassName('dataField');
    for (let i = 0; i < regExpForForm.length; i++) {
        if (!regExpForForm[i].test(inputs[i].value)) {
            inputs[i].style.outlineColor = 'red';
            inputs[i].focus();
            alert('Ошибка ввода');
            event.preventDefault();
            break;
        }
        inputs[i].style.outlineColor = 'inherit'
    }
})
