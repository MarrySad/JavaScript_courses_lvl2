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
  addItem() {
  }
  removeItem() {
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

const list = new GoodsList();
list.fetchGoods();
list.render();
