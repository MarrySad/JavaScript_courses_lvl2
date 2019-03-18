import app from '../main';

export default {
    props: ['good'],
    template: '<div class="good-item">\
        <h3>{{ good.product_name }}</h3>\
        <p>{{ good.price }}</p>\
        <button type="button" value="{{ good }}" @click="addToCart">Добавить</button>\
        </div>',
    methods: {
        addToCart() {
            app.makePOSTRequest(`${app.API_URL}/addToCart`, JSON.stringify(this.good)).then((response) => {
                console.log(response);
            })
                .then(() => {
                    app.getBasket();
                })
                .catch((response) => {
                    console.log(`Ошибонька`);
                })
        }
    }
}