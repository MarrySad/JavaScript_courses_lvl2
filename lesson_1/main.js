const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_URL_LOCAL = 'http://127.0.0.1:3000'
//   calculatePrice() {
//     return this.goods.reduce((a, b) => a + b.price, 0);
//   }

//   addGood(id_product) {
//     let str_json;
//     let item;
//     catalog.goods.forEach((good) => {
//       if (good.id_product == id_product) {
//         str_json = JSON.stringify(good);
//         item = good;
//       }
//     })
//     makeGETRequest(`${API_URL}/addToBasket.json`, str_json).then((response) => {
//       if (JSON.parse(response).result === 1) {
//         this.goods.push(item);
//         this.render()
//       }
//     });
//   }

//   removeGood(id_product) {
//     let str_json;
//     basket.goods.forEach((good) => {
//       if (good.id_product == id_product) {
//         str_json = JSON.stringify(good);
//       }
//     })
//     makeGETRequest(`${API_URL}/deleteFromBasket.json`, str_json).then((response) => {
//       if (JSON.parse(response).result === 1) {
//         const indexToDelete = this.goods.findIndex((item) => item.id_product === id_product);
//         this.render()
//       }
//     });
//   }

Vue.component('goods-list', {
  props: ['goods'],
  template: '<div class="goods-list">\
    <goods-item v-for="good in goods" :good="good"></goods-item>\
    <div class="zaglushka" v-if="goods.length == 0">Нет данных</div>\
  </div>',
});

Vue.component('goods-item', {
  props: ['good'],
  template: '<div class="good-item">\
    <h3>{{ good.product_name }}</h3>\
    <p>{{ good.price }}</p>\
    <button type="button" value="{{ good.id_product }}">Добавить</button>\
  </div>',
  methods: {

  }
});

Vue.component('cart-list', {
  props: ['goods'],
  template: '<div class="cart-list" >\
  <h2 class="title">Корзина</h2>\
  <cart-item v-for="good in goods" :good="good"></cart-item>\
  </div>'
})

Vue.component('cart-item', {
  props: ['good'],
  template: '<div class="cart-item">\
    <span class="name"></span><span class="price">\
    </span><span class="count">\
    </span></div><div class="total-info">\
    <p class="total-price"></p>\
    <p class="count-goods"></p>\
    <button type="button" value="{{ good.id_product }}">Удалить</button>\
  </div>'
})

Vue.component('search-block', {
  props: ['value', 'clickSearch'],
  template: '<div class="search-block">\
  <input type="text" class="goods-search" id="searchInput" :value="value" v-on:input="$emit(\'input\', $event.target.value)"/>\
  <button class="search-button" type="button" id="searchButton" v-on:click="$emit(\'ololo\')">Искать</button>\
  </div>'
})

Vue.component('error-massage', {
  template: '<div class="error-massage">Connection error</div>'
})

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
  methods: {
    makeGETRequest(url) {
      return new Promise((resole, reject) => {
        var xhr;
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
    }
  },
  mounted() {
    this.makeGETRequest(`${API_URL_LOCAL}/catalogData.json`).then((goods) => {
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

