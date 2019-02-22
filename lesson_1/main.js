const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
  constructor(title = 'noname', price = 'не указана') {
    this.product_name = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3> ${this.product_name} </h3><p> ${this.price} </p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }


  fetchGoods() {
    return new Promise((resolte, reject) => {
      makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
        this.goods = JSON.parse(goods)
        console.log(this);
      });
    })
  }

  render() {
    console.log(this.goods);
    let listHtml = '';
    this.goods.forEach(good => {
      console.log(good.product_name);
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  calculatePrice() {
    return this.goods.reduce((a, b) => a + b.price, 0);
  }
}

class Cartlist extends GoodsList {
  addItem(id_product) {
  }
  removeItem(id_product) {
  }
  getItems() {
  }
  calculateSum() {
  }
  render() {
  }
}

class CartItem extends GoodsItem {
  constructor(title, price) {
    super(title, price);
    this.count = 1;
  }
}

function makeGETRequest(url) {
  return new Promise((resole, reject) => {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        resole(xhr.responseText);
      }
    }
    xhr.open('GET', url, true);
    xhr.send();
  })
}

const list = new GoodsList();
list.fetchGoods().then((a) => {
  console.log(a)
});
console.log(list);

let cartlist = new Cartlist();
cartlist.addItem(123);


