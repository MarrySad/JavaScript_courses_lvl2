import app from '../main';

export default {
    props: ['good',],
  template: '<div class="cart-item">\
    <span class="name">{{ good.product_name }}</span>\
    <span class="price">{{ good.price }}</span>\
    <span class="count">{{ good.quantity }}</span>\
    <button type="button" value="{{ good }}" @click="deleteFromCart">Удалить</button>\
  </div>',
  methods: {
    deleteFromCart() {
      app.makePOSTRequest(`${app.API_URL}/deleteFromBasket`, JSON.stringify(this.good)).then((response) => {
        console.log(response);
      })
        .then(() => {
          app.getBasket();
        })
        .catch((response) => {
          console.log(`Ошибонька`);
        })
    }
  }
}