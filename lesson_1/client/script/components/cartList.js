import cart_item from "./cartItem.js";

export default {
    props: ['goods'],
    template: '<div class="cart-list" >\
            <h2 class="title">Корзина</h2>\
            <cart_item v-for="good in goods" :good="good"></cart_item>\
        </div>',
    components: {
        cart_item
    }
}