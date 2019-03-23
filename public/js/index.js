
let app = new Vue({

    el: "#index_app",
    data: {

        catalogUrl: "/api/products",
        cartUrl: '/api/cart',
        products: [],
        filtered: [],
        cartItems: [],
        amount: 0,
        goodsCount: 0,
        showCart: false,
    },
    computed:{

        total(){
            let res;
            if(this.cartItems){
                res = this.cartItems.reduce((total, el) => total + el.quantity * el.price, 0);
                this.amount = res;
            }
            return res;
        }
    },
    methods: {
        getJson(url){
            return fetch(new Request(url, ))
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error);
                    //this.$refs.error.setError(error);
                })
        },
        putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error);
                    //this.$refs.error.setError(error);
                })
        },
        delJson(url, data){
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    // console.log(error);
                    this.$refs.error.setError(error);
                })
        },
        addProduct(product){

            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod);
                            this.goodsCount++
                        }
                    })
            }
        },
        remove(item){

            if(item.quantity === 1){

                this.delJson(`/api/cart/${item.id_product}`)
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

                this.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result === 1){
                            item.quantity--;
                        }
                    })
            }
        },
        filter(searchLine){

            let regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },

    mounted(){
        this.getJson(this.catalogUrl)
            .then(data => {
                for(let el of data){
                    if(el.featured){

                        this.products.push(el);
                        this.filtered.push(el);
                    }
                }
            });
        this.getJson(this.cartUrl)
            .then(data => {
                // this.cartItems = Object.assign({}, data);
                this.cartItems = data.contents;
                this.amount = data.amount;
                this.goodsCount = data.countGoods;
            });

    },
    template: `
    <div>
        <header class="header">
                <div class="container header-flex">
                    <div class="header-left header-flex">
                        <a href="index.html" class="logo header-flex"><img class="logo-img" src="img/logo.png" alt="" >
                            <p class="header-text">bran<span class="pink">D</span></p></a>
                        <searchform>
            
                        </searchform>
                    </div>

                    <div class="header-right header-flex">
                        <input type="checkbox" id="cart-chb-c">
                        <div  class="cart-chb-c-lbl">
                            <a href="#" @click.prevent="showCart = !showCart">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                     width="32" height="29" viewBox="0 0 32 29">
                                    <defs>
                                        <path id="cart-chb-svg1" class="cart-chb-svg" d="M1181 41.182c0-.65.533-1.182 1.184-1.182h4.28c.533 0
                                                1.007.354 1.145.867l4.833 17.455h13.178l4.379-10.048H1195.4a1.186 1.186 0
                                                0 1-1.184-1.182c0-.65.533-1.182 1.184-1.182h16.413c.394 0 .77.197.986.532.217.335.257.749.099
                                                1.123l-5.405 12.412c-.198.433-.612.709-1.085.709h-14.855a1.184 1.184 0 0
                                                1-1.144-.867l-4.833-17.455h-3.393a1.186 1.186 0 0 1-1.184-1.182zm6.747 25.138a2.684
                                                2.684 0 0 1 5.365 0 2.684 2.684 0 0 1-5.365 0zm16.788.178c-.1-1.458 1.006-2.758 2.485-2.857
                                                1.48-.098 2.762 1.025 2.86 2.483.04.728-.177 1.418-.65 1.95a2.678 2.678 0 0
                                                1-1.835.926h-.197c-1.401 0-2.565-1.103-2.663-2.502z"/>
                                    </defs>
                                    <g>
                                        <g transform="translate(-1181 -40)">
                                            <use fill="#222" xlink:href="#cart-chb-svg1"/>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                            <div class="circle-point" v-show="goodsCount>0">
                                {{ goodsCount }}
                            </div>
                            <div class="drop-box-cart drop-box-account  drop-box-romb-cart"
                                    v-show="showCart">
                                <!--<div class="drop-flex-cart" -->
                                    <!--v-for="item of cartItems.contents" -->
                                    <!--:key="item.id_product"-->
                                    <!--:cart_item="item"-->
                                   <!--&gt;-->
                                    <cart class="drop-flex-cart"
                                    v-for="item of cartItems" 
                                    :key="item.id_product"
                                    :cart_item="item"
                                    @remove="remove">
                                    
                                    </cart>
                                <!--</div>-->
                                <div class="cart-price-total-cont">
                                    <p class="cart-price-total">
                                        TOTAL            <span>\${{ total }}</span>
                                    </p>
                                </div>
                                <a href="../pages/checkout.html" class="cart-checkout pink">
                                    Checkout
                                </a>
                                <a href="../pages/cart.html" class="cart-gotocart pink">
                                    Go to cart
                                </a>
                            </div>
                        </div>

                        <a href="#" class="button bover-w">
                            My Account <i class="acc-tr fas fa-caret-down"></i>
                        </a>
                    </div>
                </div>
            </header>
            <nav class="navigation">
                <div class="container">
                    <ul class="menu">
                        <li class="menu-list">
                            <a href="index.html" class="menu-link current-page">
                                Home
                            </a>
                            <div class="drop-box drop-box-romb1">
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>

                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                        <li><a class="drop-link" href="#"><img src="img/sale.jpg" alt="" class="drop-flex-img"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="menu-list">
                            <a href="pages/product.html" class="menu-link">
                                Man
                            </a>
                            <div class="drop-box drop-box-romb">
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>

                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                        <li><a class="drop-link" href="#"><img src="img/sale.jpg" alt="" class="drop-flex-img"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="menu-list">
                            <a href="pages/product.html" class="menu-link">
                                Women
                            </a>
                            <div class="drop-box drop-box-romb2">
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>

                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                        <li><a class="drop-link" href="#"><img src="img/sale.jpg" alt="" class="drop-flex-img"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="menu-list">
                            <a href="pages/product.html" class="menu-link">
                                Kids
                            </a>
                            <div class="drop-box-kids drop-box-romb3">
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>

                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                        <li><a class="drop-link" href="#"><img src="img/sale.jpg" alt="" class="drop-flex-img"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="menu-list">
                            <a href="" class="menu-link">
                                Accoseriese
                            </a>
                            <div class="drop-box-accoseriese drop-box-romb4">
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>

                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                        <li><a class="drop-link" href="#"><img src="img/sale.jpg" alt="" class="drop-flex-img"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="menu-list">
                            <a href="" class="menu-link">
                                Featured
                            </a>
                            <div class="drop-box-featured drop-box-romb5">
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>

                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                        <li><a class="drop-link" href="#"><img src="img/sale.jpg" alt="" class="drop-flex-img"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="menu-list">
                            <a href="" class="menu-link">
                                Hot Deals
                            </a>
                            <div class="drop-box drop-box-last">
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>

                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>

                                    </ul>
                                </div>
                                <div class="drop-flex">
                                    <h3 class="drop-heading">
                                        Women
                                    </h3>
                                    <ul class="drop-ul">
                                        <li><a class="drop-link" href="#">Dresses</a></li>
                                        <li><a class="drop-link" href="#">Tops</a></li>
                                        <li><a class="drop-link" href="#">Sweaters/Knits</a></li>
                                        <li><a class="drop-link" href="#">Jackets/Coats</a></li>
                                        <li><a class="drop-link" href="#">Blazers</a></li>
                                        <li><a class="drop-link" href="#">Denim</a></li>
                                        <li><a class="drop-link" href="#">Leggings/Pants</a></li>
                                        <li><a class="drop-link" href="#">Skirts/Shorts</a></li>
                                        <li><a class="drop-link" href="#">Accessories </a></li>
                                        <li><a class="drop-link" href="#"><img src="img/sale.jpg" alt="" class="drop-flex-img"></a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="banner">
                <div class="container mybanner-img">
                    <div class="banner-text">
                        <p class="banner-big-text">THE BRAND</p>
                        <p >OF LUXERIOUS <span class="pink banner-small-text">FASHION</span></p>
                    </div>
                </div>
            </div>
            <main class="categories">
                <div class="container categories-foto header-flex">
                    <div class="categories-left">
                        <div class="top-left">
                            <a href="pages/product.html" class="categories-link">
                                <div class="top-left-text promo-sticker">
                                    <p class="top-left-text-up">hOT dEAL</p>
                                    <p class="promo-sticker-text-down pink">FOR MEN</p>
                                </div>
                                <img src="img/categories-men.jpg" alt="" class="top-left-img">
                            </a>
                        </div>
                        <div class="bottom-left">
                            <a href="#" class="categories-link">
                                <div class="bottom-left-text promo-sticker">
                                    <p class="bottom-left-text-up">LUXIROUS & trendy</p>
                                    <p class="promo-sticker-text-down pink">ACCESORIES</p>
                                </div>
                                <img src="img/categories-accesories.jpg" alt="" class="bottom-left-img">
                            </a>
                        </div>
                    </div>
                    <div class="categories-right">
                        <div class="top-right">
                            <a href="pages/product.html" class="categories-link">
                                <div class="top-right-text promo-sticker">
                                    <p class="top-right-text-up">30% offer</p>
                                    <p class="promo-sticker-text-down pink">WOMEN</p>
                                </div>
                                <img src="img/categories-women.jpg" alt="" class="top-right-img">
                            </a>
                        </div>
                        <div class="bottom-right">
                            <a href="#" class="categories-link">
                                <div class="bottom-right-text promo-sticker">
                                    <p class="bottom-right-text-up">new arrivals</p>
                                    <p class="promo-sticker-text-down pink">FOR kids</p>
                                </div>
                                <img src="img/categories-kids.jpg" alt="" class="bottom-right-img">
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <div class="features">
                <article class="container features-item">
                    <div class="feature-header">
                        <h2 class="feature-header-text-up">Featured Items</h2>
                        <p class="features-header-text-down">Shop for items based on what we featured in this week</p>
                    </div>
                    <div class="box-product">
                        <div class="product-flex"
                             v-for="product of filtered" :key="product.id_product">
                            <a href="pages/single.html" class="poduct">
                                <img class="product-img" :src="product.img" alt="">
                                <div class="product-text">
                                    <p class="product-name">
                                        {{ product.product_name }}
                                    </p>
                                    <p class="product-price pink">
                                       \${{ product.price }}
                                    </p>
                                </div>
                            </a>
                            <div class="add-position">
                                <a href="#" class="add" @click.prevent="addProduct(product)">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                         width="23" height="22" viewBox="0 0 32 29">
                                        <defs>
                                            <path id="cart-add-svg8" class="cart-add-svg" d="M1181 41.182c0-.65.533-1.182 1.184-1.182h4.28c.533 0
                                    1.007.354 1.145.867l4.833 17.455h13.178l4.379-10.048H1195.4a1.186 1.186 0
                                    0 1-1.184-1.182c0-.65.533-1.182 1.184-1.182h16.413c.394 0 .77.197.986.532.217.335.257.749.099
                                    1.123l-5.405 12.412c-.198.433-.612.709-1.085.709h-14.855a1.184 1.184 0 0
                                    1-1.144-.867l-4.833-17.455h-3.393a1.186 1.186 0 0 1-1.184-1.182zm6.747 25.138a2.684
                                    2.684 0 0 1 5.365 0 2.684 2.684 0 0 1-5.365 0zm16.788.178c-.1-1.458 1.006-2.758 2.485-2.857
                                    1.48-.098 2.762 1.025 2.86 2.483.04.728-.177 1.418-.65 1.95a2.678 2.678 0 0
                                    1-1.835.926h-.197c-1.401 0-2.565-1.103-2.663-2.502z"/>
                                        </defs>
                                        <g>
                                            <g transform="translate(-1181 -40)">
                                                <use fill="#222" xlink:href="#cart-add-svg8"/>
                                            </g>
                                        </g>
                                    </svg>
                                    Add to Cart
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="features-button">
                        <a href="pages/product.html" class="features-button-link bover-w">
                            Browse All Product <i class=" fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
            </div>
    </div> 
    `
});