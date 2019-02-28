class Hambuger {
    constructor(values) {
        this.size = hamburgerElem.find(item => item.name === values[0]);
        this.stuffing = hamburgerElem.find(item => item.name === values[1]);
        this.topping = [];
        for (let i = 2; i < values.length; i++) {
            this.topping.push(hamburgerElem.find(item => item.name === values[i]))
        }
    }
    calculatePrice() {
        return this.size.price + this.stuffing.price + this.topping.reduce((a, b) => a + b.price, 0);
    }
    calculateCalories() {
        return this.size.calories + this.stuffing.calories + this.topping.reduce((a, b) => a + b.calories, 0);
    }
}

let hamburgerElem = [
    { name: 'small', price: 50, calories: 20 },
    { name: 'big', price: 100, calories: 40 },
    { name: 'cheese', price: 10, calories: 20 },
    { name: 'salad', price: 20, calories: 5 },
    { name: 'potatoes', price: 15, calories: 10 },
    { name: 'spice', price: 15, calories: 0 },
    { name: 'mayo', price: 20, calories: 5 },
]

var form = document.querySelector("form");
var log = document.querySelector(".output");

form.addEventListener("submit", function (event) {
    var data = new FormData(form);
    var values = [];
    for (const entry of data) {
        values.push(entry[1]);
    };
    let hambuger = new Hambuger(values);
    log.innerText = `Стоимость: ${hambuger.calculatePrice()} рублей. Энергетическая ценность: ${hambuger.calculateCalories()} каллорий`;
    event.preventDefault();
}, false);



