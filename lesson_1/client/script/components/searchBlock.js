export default {
    props: ['value', 'clickSearch'],
    template: '<div class="search-block">\
            <input type="text" class="goods-search" id="searchInput" :value="value" v-on:input="$emit(\'input\', $event.target.value)"/>\
            <button class="search-button" type="button" id="searchButton" v-on:click="$emit(\'ololo\')">Искать</button>\
        </div>'
}