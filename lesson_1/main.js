class GoodsItem {
  constructor(title = 'noname', price = 'не указана') {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div
class="goods-item"><h3> ${ this.title} </h3><p> ${this.price} </p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

class Cartlist {
  constructor() {
    this.goods = [];
  }
  addItem(){
  }
  removeItem(){
  }
  getItems(){
  }
  calculateSum(){
  }
  render(){
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
