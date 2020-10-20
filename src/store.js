import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)


export default new Vuex.Store({

    state:{
        data:[],
        totalMinicartPrice : 0,
        userToken: null,
        user : {
            name: 'Ziyaretçi',
            isAdmin: false,
            minicart:[]
        },
        categories:[
            'Su Tesisatı',
            'El Aletleri',
            'Tamirat',
            'Güvenlik',
            'Nalburiye',
            'Diğer'
        ]
    },
    mutations:{
        NEW_PRODUCT(state, item){
            state.data.push({
                name: item.name,
                image: item.image,
                brand: item.brand,
                price: item.price
            })
        },
        DELETE_PRODUCT(state, item){
            axios.post('https://alpteknik-backend.herokuapp.com/product/delete', item)
            .then(res => console.log(res))
        },

        MINICART_ADD(state, item){
            let product = state.data.filter((prod)=>{  return item === prod })
            let prod = state.user.minicart.filter( (item) => {
                return item.name === product[0].name
            }) 
            if(prod.length === 0){

                const miniObject = ({
                    ...product[0],
                    quantity: 1
                     })

                state.user.minicart.push(miniObject)

            }else{
                prod[0].quantity = prod[0].quantity + 1 
            }
            
        },

        SET_PRODUCTS(state, res){
            state.data = res.data
        },

        DELETE_FROM_MINICART(state, item){
            if(item.quantity > 1){
                item.quantity = item.quantity - 1; 
            }else if(item.quantity === 1){
                state.user.minicart = state.user.minicart.filter( prod => item !== prod)
            }
            state.totalMinicartPrice = state.totalMinicartPrice - item.price

        },

        ADD_NEW_PRODUCT_DB(state,item){
            axios.post('https://alpteknik-backend.herokuapp.com/product_send_to_database', item)
            .then( res => console.log(res.data))
        }
        ,

        EDIT_PRODUCT(state,item){
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.userToken
            } 

            axios.patch('https://alpteknik-backend.herokuapp.com/product/edit', item, {headers: headers})
            .then( res => console.log(res.data))
        },
        REMOVE_FROM_MINICART(state, item){

            state.user.minicart = state.user.minicart.filter((product) => {return product._id !== item._id})

        },

        LOGIN_USER(state,  {user, userToken}){
            state.user = user
            state.userToken = userToken
        },
        UPDATE_ITEM_QUANTITY(state, {item,qty}){
            const index = state.user.minicart.indexOf(item)
            state.user.minicart[index].quantity = qty
            console.log(state.user.minicart[index])
        },
        GET_PRODUCTS_ACCORDİNG_TO_CATEGORY(state, category){
            return state.data.filter( (product) => product.category === category)
        },

        LOGOUT_USER(state){

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.userToken
            } 
            axios.get('https://alpteknik-backend.herokuapp.com/user/logout',{
                headers: headers
            })
            .then( 
                res => 
                {
                    if(res.data === state.userToken){
                        state.userToken = null,
                        state.user = {
                            name: 'Ziyaretçi',
                            isAdmin: false,
                            minicart:[]
                        }
                        console.log('Kullanıcı çıkış yaptı')
                    }
                }
            )
        }

        
    },



    getters:{
        dataAtTheMoment: state =>{
            return state.data
        },

        getUser : state => {
            return state.user
        },

        getPrice: (state) => {
                let totalPrice = 0
                var item;
                for (item in state.user.minicart){
                    totalPrice = totalPrice + state.user.minicart[item].price * state.user.minicart[item].quantity
                }
                return totalPrice
        },

        getCategories: (state) => {
            return state.categories
        },

        getDataAccordingToCategory: (state) => (category) => {
            return state.data.filter( product => product.category === category)
          }


    },




    actions:{
        addNewProduct({commit}, item){
            commit('NEW_PRODUCT', item);
        },

        deleteProduct({commit}, item){
            commit('DELETE_PRODUCT', item)
        },

        addToMiniCart({commit}, item){
            commit('MINICART_ADD', item)
        },

        getProducts({commit}){
            axios.get('https://alpteknik-backend.herokuapp.com/')
            .then(res => {
                commit('SET_PRODUCTS', res)
            })
        },

        deleteFromMinicart({commit}, item){
            commit('DELETE_FROM_MINICART', item)
        },

        addNewProductDB({commit}, item){
            commit('ADD_NEW_PRODUCT_DB', item)
        },

        editProduct({commit}, item){
            commit('EDIT_PRODUCT', item)
        },

        loginUser({commit}, form){
            return new Promise( (resolve, reject) => {

            axios.post('https://alpteknik-backend.herokuapp.com/user/login', form)
            .then(( res ) => {

                const userToken = res.data.token
                const user = res.data.user

                commit('LOGIN_USER', {user, userToken})

                resolve(res)
            })
            .catch( (e)=> {  reject(e) } )
            

            })
           
        },

        changeProfile({state}, form){
            return new Promise( (resolve, reject) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + state.userToken
                } 
    
                axios.post('https://alpteknik-backend.herokuapp.com/user/changeProfile', form,{
                    headers: headers
                }).then( 

                    (ans) => resolve(ans)                  
                
                )
                .catch( (e) => reject(e))

            })
        },

        changePassword({state}, form){

            return new Promise( (resolve, reject) => {

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + state.userToken
                } 

                axios.post('https://alpteknik-backend.herokuapp.com/user/changePassword', form, {headers: headers})
                .then( (ans) => resolve(ans) )
                    .catch( (e) => reject(e))

        })

        },
        logoutUser({commit}){
            commit('LOGOUT_USER')
        },

        pushMinicartToDatabase({state}){

            return new Promise((resolve,reject) => {

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + state.userToken
                } 


                axios.post("https://alpteknik-backend.herokuapp.com/user/update_minicart", state.user.minicart, {headers: headers})
                .then( (res) => resolve(res) )
                .catch( (e) => reject(e))

            })

        },

        updateItemQuantity({commit}, {item,qty}){
            commit('UPDATE_ITEM_QUANTITY',  {item,qty})
        },
        removeFromMinicart({commit}, item){
            commit('REMOVE_FROM_MINICART', item)
        }

    }
})