const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// class GoodsItem {
//   constructor(title = 'noname', price = 'не указана') {
//     this.product_name = title;
//     this.price = price;
//   }
//   render() {
//     return `<div class="good-item"><h3> ${this.product_name} </h3><p> ${this.price} </p></div>`;
//   }
// }

// class GoodsList {
//   constructor(source = '') {
//     this.goods = [];
//     this.source = source;
//     this.listHtml = '';
//   }

//   applyData(jsonData) {
//   }

//   fetchGoods() {
//     return makeGETRequest(`${API_URL}/${this.source}`)
//       .then((response) => {
//         this.applyData(JSON.parse(response));
//       })
//       .catch((response) => {
//       })
//   }

//   render() {
//   }
// }

// class Catalog extends GoodsList {
//   constructor() {
//     super('catalogData.json');
//     this.filteredGoods = [];
//   }

//   calculatePrice() {
//     return this.goods.reduce((a, b) => a + b.price, 0);
//   }

//   applyData(jsonData) {
//     this.goods = jsonData;
//     this.filteredGoods = jsonData;
//   }

//   render() {
//     this.listHtml = '';
//     this.filteredGoods.forEach(good => {
//       const goodItem = new GoodsItem(good.product_name, good.price);
//       this.listHtml += goodItem.render();
//     });
//     document.querySelector('.goods-list').innerHTML = this.listHtml;
//   }

//   filterGoods(value) {
//     const regexp = new RegExp(value, 'i');
//     this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
//     this.render();
//   }
// }

// class Basket extends GoodsList {
//   constructor() {
//     super('getBasket.json');
//     this.totalPrice = 0;
//     this.countGoods = 0;
//   }

//   applyData(jsonData) {
//     this.goods = jsonData.contents;
//     this.totalPrice = jsonData.amount;
//     this.countGoods = jsonData.countGoods;
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

//   render() {
//     this.listHtml = '';
//     this.goods.forEach(good => {
//       const goodItem = new CartItem(good.product_name, good.price);
//       this.listHtml += goodItem.render();
//     });
//     this.listHtml += `<div class='cart-price'>Сумма корзины: ${this.totalPrice}</div>`;
//     this.listHtml += `<div class='cart-count'>Кол-во товаров: ${this.countGoods}</div>`;
//     document.querySelector('.cart-list').innerHTML = this.listHtml;
//   }
// }

// class CartItem extends GoodsItem {
//   constructor(title, price) {
//     super(title, price);
//     this.count = 1;
//   }
// }

// function makeGETRequest(url) {
//   return new Promise((resole, reject) => {
//     var xhr;
//     if (window.XMLHttpRequest) {
//       xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//       xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         if (xhr.status !== 200) {
//           reject(xhr.responseText);
//         }
//         resole(xhr.responseText);
//       }
//     }
//     xhr.open('GET', url, true);
//     xhr.send(arguments[1]);
//   })
// }

// // const catalog = new Catalog();
// // catalog.fetchGoods().then(() => catalog.render());

// const basket = new Basket();
// basket.fetchGoods().then(() => {
//   basket.render();
//   // basket.addGood(123);
//   // basket.addGood(456);
//   // basket.removeGood(123);
// });

// // searchButton.addEventListener('click', (e) => {
// //   const value = searchInput.value;
// //   catalog.filterGoods(value);
// // });

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    isVisibleCart: false
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
    filterGoods(value) {
      const regexp = new RegExp(value, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },
    clickSearch() {
      this.filterGoods(this.searchLine);
    }
  },
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);
    });
  }
});

