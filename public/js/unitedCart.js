const data = {

    cartUrl: '/api/cart',
    cartItems: [],
    amount: 0,
    goodsCount: 0,
    showCart: false,
};
Vue.component("united_cart",{
    props: ["showit"],
    data(){
        return data;
    },
    methods:{

        addProduct(product) {

            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                            this.goodsCount++
                        }
                    })
            }
        },
        remove(item){

            if(item.quantity === 1){

                this.$parent.delJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if(data.result === 1){

                            if(item.quantity === 1) {

                                let index = this.cartItems.findIndex(el => el.id_product === item.id_product);
                                this.cartItems.splice(index, 1);
                                this.goodsCount--
                            }else{

                                item.quantity--;

                            }
                        }
                    })
            }else{

                this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result === 1){
                            item.quantity--;
                        }
                    })
            }
        }
    },
    mounted(){

        this.$parent.getJson(this.cartUrl)
            .then(data => {
                // this.cartItems = Object.assign({}, data);
                this.cartItems = data.contents;
                this.amount = data.amount;
                this.goodsCount = data.countGoods;
            });
    },
    template: `
    
        <div>
            <cartcont_page ref="cartcont_page" v-if="showit"
                            class="main-container"
                            :cartItems="cartItems"
                            @remove="remove">
            
            </cartcont_page>
            <cartcont ref="cartcont" v-else
                      :cartItems="cartItems"
                      @remove="remove">
    
            </cartcont>
        </div> 
    `

});