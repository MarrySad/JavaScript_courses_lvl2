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

  // fetchGoods(cb) {
  //   makeGETRequest(`${API_URL}/catalogData.json`).then( (goods) => {
  //     this.goods = JSON.parse(goods);
  //     cb();
  //   })
  //   .catch( () =>  console.log('Error'))
  // }

  fetchGoods() {
    return new Promise( (resolte, reject) => {
      makeGETRequest(`${API_URL}/catalogData.json`).then( (goods) => {
        this.goods = JSON.parse(goods);
      })
      .catch( () =>  console.log('Error'))
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
        if (xhr.status !== 200) {
          reject(xhr.responseText);
        }
        resole(xhr.responseText);
      }
    }
    xhr.open('GET', url, true);
    xhr.send();
  })
}

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
  })

let cartlist = new Cartlist();
cartlist.addItem(123);


