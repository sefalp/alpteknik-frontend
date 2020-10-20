<template>
  
     <main class="main">
                <div class="product-list categoryData">
                    <ProductCart v-for=" item in getDataAccordingToCategory(input)" :key="item._id" :item='item' />
                </div>
        </main>

</template>

<script>

import ProductCart from '../components/ProductCart'
import {mapGetters} from 'vuex'


export default {
name: 'categoryData',

props:{
        input: {
            type: String
        }
    },

data(){
    
    return{}
},

components: {
    ProductCart
},

computed:{
    ...mapGetters([
        'getCategories',
        'getDataAccordingToCategory'
    ]),
},

mounted() {
    this.$store.dispatch('getProducts');
}
}
</script>

<style>

.product-list.categoryData{
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    padding: 2rem;
    padding-left: 4rem;
}

</style>