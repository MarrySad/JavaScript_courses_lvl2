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
        this.goods = JSON.parse(goods);
        resolte();
      })
        .catch(() => console.log('Error'))
    })
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
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
  constructor() {
    super();
    this.totalPrise = 0;
    this.countGoods = 0;
  }
  addItem(id_product) {
    var str_json;
    list.goods.forEach((good) => {
      if (good.id_product = id_product) {
        str_json = JSON.stringify(good);
      }
    })
    makeGETRequest(`${API_URL}/addToBasket.json`, str_json);
  }
  removeItem(id_product) {
  }

  fetchCartGoods() {
    return new Promise((resolte, reject) => {
      makeGETRequest(`${API_URL}/getBasket.json`).then((goods) => {
        console.log(goods);
        const data = JSON.parse(goods);
        this.goods = data.contents;
        this.totalPrise = data.amount;
        this.countGoods = data.countGoods;
        resolte();
      })
        .catch(() => console.log('Error'))
    })
  }

  calculateSum() {
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.cart-list').innerHTML = listHtml;
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
    console.log(xhr.readyState)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject(xhr.responseText);
        }
        resole(xhr.responseText);
      }
    }
    xhr.open('GET', url, true);
    xhr.send(arguments[1]);
  })
}

const list = new GoodsList();
list.fetchGoods().then(() => list.render());

let cartlist = new Cartlist();
cartlist.fetchCartGoods().then(() => cartlist.render());
cartlist.addItem(123);



