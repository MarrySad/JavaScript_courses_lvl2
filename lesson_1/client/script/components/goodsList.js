import goods_item from "./goodsItem.js";

export default {
    props: ['goods',],
    template: '<div class="goods-list">\
            <goods_item v-for="good in goods" :good="good"></goods_item>\
            <div class="zaglushka" v-if="goods.length == 0">Нет данных</div>\
          </div>',
    components: {
        goods_item
    }
}