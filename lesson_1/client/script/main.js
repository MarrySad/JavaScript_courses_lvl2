
import Vue from './vue.min.js';

import goods_list from './components/goodsList.js';
import cartList from './components/cartList.js';
import searchBlock from './components/searchBlock.js';
import errorMassage from './components/errorMassage.js';

const app = new Vue({
  el: '#app',
  data: {
    API_URL_LOCAL: 'http://127.0.0.1:3000',
    goods: [],
    filteredGoods: [],
    basket: [],
    searchLine: '',
    isVisibleCart: false,
    connected: true
  },
  components: {
    goods_list,
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
      this.makeGETRequest(`${this.API_URL_LOCAL}/getBasket`).then((goods) => {
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
    this.makeGETRequest(`${this.API_URL_LOCAL}/catalogData`).then((goods) => {
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

export default {
  API_URL: app.API_URL_LOCAL,
  makePOSTRequest: app.makePOSTRequest,
  getBasket: app.getBasket
}