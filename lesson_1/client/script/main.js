const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_URL_LOCAL = 'http://127.0.0.1:3000';

import Vue from './vue.min.js';

import goods_list from './components/goodsList.vue';
import goods_item from "./components/goodsItem.vue";
import cartList from './components/cartList.vue';
import searchBlock from './components/searchBlock.vue';
import errorMassage from './components/errorMassage.vue';

// Vue.component('goods-list', {
//   props: ['goods'],
//   template: '<div class="goods-list">\
//     <goods-item v-for="good in goods" :good="good"></goods-item>\
//     <div class="zaglushka" v-if="goods.length == 0">Нет данных</div>\
//   </div>',
// });

// Vue.component('goods-item', {
//   props: ['good'],
//   template: '<div class="good-item">\
//     <h3>{{ good.product_name }}</h3>\
//     <p>{{ good.price }}</p>\
//     <button type="button" value="{{ good }}" @click="addToCart">Добавить</button>\
//   </div>',
//   methods: {
//     addToCart() {
//       app.makePOSTRequest(`${API_URL_LOCAL}/addToCart`, JSON.stringify(this.good)).then((response) => {
//         console.log(response);
//       })
//         .then(() => {
//           app.getBasket();
//         })
//         .catch((response) => {
//           console.log(`Ошибонька`);
//         })
//     }
//   }
// });

// Vue.component('cart-list', {
//   props: ['goods'],
//   template: '<div class="cart-list" >\
//   <h2 class="title">Корзина</h2>\
//   <cart-item v-for="good in goods" :good="good"></cart-item>\
//   </div>'
// })

// Vue.component('cart-item', {
//   props: ['good'],
//   template: '<div class="cart-item">\
//     <span class="name">{{ good.product_name }}</span>\
//     <span class="price">{{ good.price }}</span>\
//     <span class="count">{{ good.quantity }}</span>\
//     <button type="button" value="{{ good }}" @click="deleteFromCart">Удалить</button>\
//   </div>',
//   methods: {
//     deleteFromCart() {
//       app.makePOSTRequest(`${API_URL_LOCAL}/deleteFromBasket`, JSON.stringify(this.good)).then((response) => {
//         console.log(response);
//       })
//         .then(() => {
//           app.getBasket();
//         })
//         .catch((response) => {
//           console.log(`Ошибонька`);
//         })
//     }
//   }
// })

// Vue.component('search-block', {
//   props: ['value', 'clickSearch'],
//   template: '<div class="search-block">\
//   <input type="text" class="goods-search" id="searchInput" :value="value" v-on:input="$emit(\'input\', $event.target.value)"/>\
//   <button class="search-button" type="button" id="searchButton" v-on:click="$emit(\'ololo\')">Искать</button>\
//   </div>'
// })

// Vue.component('error-massage', {
//   template: '<div class="error-massage">Connection error</div>'
// })

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    basket: [],
    searchLine: '',
    isVisibleCart: false,
    connected: true
  },
  components: {
    goods_list,
    goods_item,
    cartList,
    searchBlock,
    errorMassage
  },
  methods: {
    makeGETRequest(url) {
      return new Promise((resole, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
              reject(xhr.responseText);
            }
            resole(xhr.responseText);
          }
        }
        xhr.open('GET', url, true);
        xhr.send();
      })
    },

    makePOSTRequest(url, data) {
      return new Promise((resole, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
              reject(xhr.responseText);
            }
            resole(xhr.responseText);
          }
        }
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(data);
      })
    },

    getBasket() {
      this.makeGETRequest(`${API_URL_LOCAL}/getBasket`).then((goods) => {
        this.basket = JSON.parse(goods);
      })
    },

    filterGoods(value) {
      const regexp = new RegExp(value, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },

    clickSearch: function () {
      this.filterGoods(this.searchLine);
    },

    isVisibleCartSwap() {
      this.isVisibleCart = !this.isVisibleCart;
      if (this.isVisibleCart) {
        this.getBasket();
      }
    }
  },
  mounted() {
    this.makeGETRequest(`${API_URL_LOCAL}/catalogData`).then((goods) => {
      this.connected = true;
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
    })
      .catch((goods) => {
        this.connected = false;
        console.log("Error connect");
      });
  }
});
