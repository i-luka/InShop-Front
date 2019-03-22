
let app = new Vue({

    el: "#cart_page_app",
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
                    this.products.push(el);
                    this.filtered.push(el);
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
            <a href="../index.html" class="logo header-flex"><img class="logo-img" src="../img/logo.png" alt="" >
                <p class="header-text">bran<span class="pink">D</span></p></a>
            <form action="#" class="form header-flex">
                <div>
                </div>
                <label for="browse-chb" class="browse-lbl">
                    <!--<p class="selection-br">-->
                    Browse <i class="br-tr fas fa-caret-down"></i>
                    <!--</p>-->
                </label>
                <input type="checkbox" id="browse-chb">
                <div class="drop-box-browse drop-box-romb-browse">
                    <div class="drop-flex-browse ">
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
                    <div class="drop-flex-browse">
                        <h3 class="drop-heading">
                            men
                        </h3>
                        <ul class="drop-ul">
                            <li><a class="drop-link" href="#">Tees/Tank tops</a></li>
                            <li><a class="drop-link" href="#">Shirts/Polos</a></li>
                            <li><a class="drop-link" href="#">Sweaters</a></li>
                            <li><a class="drop-link" href="#">Sweatshirts/Hoodies</a></li>
                            <li><a class="drop-link" href="#">Blazers</a></li>
                            <li><a class="drop-link" href="#">Jackets/vests</a></li>
                        </ul>
                    </div>
                </div>
                <input type="search" required placeholder="Search for item...">
                <button type="submit"><i class="br-sm fas fa-search"></i></button>
            </form>
        </div>

        <div class="header-right header-flex">
            <input type="checkbox" id="cart-chb-c">
            <div  class="cart-chb-c-lbl">
                <a href="/cart.html">
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
                <div class="drop-box-cart drop-box-account  drop-box-romb-cart">
                    <div class="drop-flex-cart">
                        <a href="tml">
                            <img class="cart-img-acc" src="../img/cart/img1.jpg" alt="">
                        </a>
                        <div class="drop-block">

                            <h3 class="drop-heading-cart">
                                <a href="tml">
                                    Rebox Zane
                                </a>
                            </h3>
                            <p class="cart-p">
                                <i class="cart-star fas fa-star"></i>
                                <i class="cart-star fas fa-star"></i>
                                <i class="cart-star fas fa-star"></i>
                                <i class="cart-star fas fa-star"></i>
                                <i class="cart-star fas fa-star-half-alt"></i>
                            </p>
                            <p class="cart-price pink">
                                1 x $250
                            </p>

                        </div>
                        <div class="cart-undo-cont">
                            <button id="undo-btn1">
                                <i class="cart-undo fas fa-times-circle"></i>
                            </button>
                            <label for="undo-btn1"></label>
                        </div>
                    </div>
                    <div class="drop-flex-cart">
                        <a href="tml">
                            <img src="../img/cart/img2.jpg" alt="">
                        </a>
                        <div class="drop-block">

                            <h3 class="drop-heading-cart">
                                <a href="tml">
                                    Rebox Zane
                                </a>
                            </h3>
                            <p class="cart-p">
                                <i class="cart-star fas fa-star"></i>
                                <i class="cart-star fas fa-star"></i>
                                <i class="cart-star fas fa-star"></i>
                                <i class="cart-star fas fa-star"></i>
                                <i class="cart-star fas fa-star-half-alt"></i>
                            </p>
                            <p class="cart-price pink">
                                1 x $250
                            </p>

                        </div>
                        <div class="cart-undo-cont">
                            <button id="undo-btn2">
                                <i class="cart-undo fas fa-times-circle"></i>
                            </button>
                            <label for="undo-btn2"></label>
                        </div>

                    </div>
                    <div class="cart-price-total-cont">
                        <p class="cart-price-total">
                            TOTAL            <span>$500.00</span>
                        </p>
                    </div>
                    <a href=".html" class="cart-checkout pink">
                        Checkout
                    </a>
                    <a href="/cart.html" class="cart-gotocart pink">
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
                <a href="../index.html" class="menu-link current-page">
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
                            <li><a class="drop-link" href="#"><img src="../img/sale.jpg" alt="" class="drop-flex-img"></a></li>
                        </ul>
                    </div>
                </div>
            </li>
            <li class="menu-list">
                <a href="html" class="menu-link">
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
                            <li><a class="drop-link" href="#"><img src="../img/sale.jpg" alt="" class="drop-flex-img"></a></li>
                        </ul>
                    </div>
                </div>
            </li>
            <li class="menu-list">
                <a href="html" class="menu-link">
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
                            <li><a class="drop-link" href="#"><img src="../img/sale.jpg" alt="" class="drop-flex-img"></a></li>
                        </ul>
                    </div>
                </div>
            </li>
            <li class="menu-list">
                <a href="html" class="menu-link">
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
                            <li><a class="drop-link" href="#"><img src="../img/sale.jpg" alt="" class="drop-flex-img"></a></li>
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
                            <li><a class="drop-link" href="#"><img src="../img/sale.jpg" alt="" class="drop-flex-img"></a></li>
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
                            <li><a class="drop-link" href="#"><img src="../img/sale.jpg" alt="" class="drop-flex-img"></a></li>
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
                            <li><a class="drop-link" href="#"><img src="../img/sale.jpg" alt="" class="drop-flex-img"></a></li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</nav>
<div class="top-line-container">
    <div class="container header-flex top-line">
        <p class="top-line-name">New Arrivals</p>
        <p class="top-line-bread"><a href="../index.html">Home</a> / <a href="html">Men</a> / <a href="#" id="current-page">New Arrivals</a> </p>
    </div>
</div>
    <div class="main-container">
        <div class="cart-content container">
            <div class="cart-block" id="row1">
                <div class="cart-item">
                    <p>Product Details</p>
                </div>
                <div class="cart-item">
                    <p>unite Price</p>
                </div>
                <div class="cart-item">
                    <p>Quantity</p>
                </div>
                <div class="cart-item">
                    <p>shipping</p>
                </div>
                <div class="cart-item">
                    <p>Subtotal</p>
                </div>
                <div class="cart-item">
                    <p>ACTION</p>
                </div>
            </div>
            <div class="cart-block cart-font">
                <div class="cart-item">
                    <a href="tml">
                        <img src="../img/cart-page/img1.jpg" alt="">
                    </a>
                    <div class="product-box">

                        <h3 class="cart-p">
                            <a href="tml">
                                Mango  People  T-shirt
                            </a>
                        </h3>
                        <p class="cart-t-c">
                            Color:      <span>Red</span>
                        </p>
                        <p class="cart-t-s">

                            Size:    <span>XLL</span>
                        </p>

                    </div>
                </div>
                <div class="cart-item">
                     <p>
                         $150
                     </p>
                </div>
                <div class="cart-item">
                    <input type="number" name="product-quantity" id="cart-product-quantity1" value="2" class="cart-font">
                </div>
                <div class="cart-item">
                     <p>
                         FREE
                     </p>
                </div>
                <div class="cart-item">
                     <p>
                         $300
                     </p>
                </div>
                <div class="cart-item cart-undo-cont cart-undo-cont_action">
                     <button>
                         <!--<p>-->
                            <i class="cart-undo fas fa-times-circle"></i>
                        <!--</p>-->
                    </button>
                </div>
            </div>
            <div class="cart-block cart-font">
                <div class="cart-item">
                    <a href="tml">
                        <img src="../img/cart-page/img2.jpg" alt="">
                    </a>
                    <div class="product-box">

                        <h3 class="cart-p">
                            <a href="tml">
                                Mango  People  T-shirt
                            </a>
                        </h3>
                        <p class="cart-t-c">
                            Color:      <span>Red</span>
                        </p>
                        <p class="cart-t-s">

                            Size:    <span>XLL</span>
                        </p>

                    </div>
                </div>
                <div class="cart-item">
                    <p>
                        $150
                    </p>
                </div>
                <div class="cart-item">
                    <input type="text" name="product-quantity" id="cart-product-quantity2" value="2" class="cart-font">
                </div>
                <div class="cart-item">
                    <p>
                        FREE
                    </p>
                </div>
                <div class="cart-item">
                    <p>
                        $300
                    </p>
                </div>
                <div class="cart-item cart-undo-cont cart-undo-cont_action">
                    <button>
                        <i class="cart-undo fas fa-times-circle"></i>
                    </button>
                </div>
            </div>
            <div class="cart-block cart-font">
                <div class="cart-item">
                    <a href="tml">
                        <img src="../img/cart-page/img3.jpg" alt="">
                    </a>
                    <div class="product-box">

                        <h3 class="cart-p">
                            <a href="tml">
                                Mango  People  T-shirt
                            </a>
                        </h3>
                        <p class="cart-t-c">
                            Color:      <span>Red</span>
                        </p>
                        <p class="cart-t-s">

                            Size:    <span>XLL</span>
                        </p>

                    </div>
                </div>
                <div class="cart-item">
                    <p>
                        $150
                    </p>
                </div>
                <div class="cart-item">
                    <input type="text" name="product-quantity" id="cart-product-quantity3" value="2" class="cart-font">
                </div>
                <div class="cart-item">
                    <p>
                        FREE
                    </p>
                </div>
                <div class="cart-item">
                    <p>
                        $300
                    </p>
                </div>
                <div class="cart-item cart-undo-cont cart-undo-cont_action">
                    <button>
                        <i class="cart-undo fas fa-times-circle"></i>
                    </button>
                </div>
            </div>
    </div>
        <div class="cart-bottom container">
            <div class="cart-operation">
                <!--<a href="#" class="clear-cart">-->

                <button class="clear-cart bover-w">
                    cLEAR SHOPPING CART
                </button>
                <!--</a>-->
                <!--<a href="" class="continue-shopping">-->
                <button class="continue-shopping bover-w">
                    cONTINUE sHOPPING
                </button>

                <!--</a>-->
            </div>
            <div class="customer-action container">
                <div class="shipping-deal">
                    <h3>
                        Shipping Adress
                    </h3>
                    <label for="cities-list-chb" class="cities-list">
                                Bangladesh
                            <i class="fas fa-caret-down"></i>
                    </label>
                    <input type="checkbox" id="cities-list-chb">
                    <input type="text"
                           name="state"
                           id="shipping-state"
                           placeholder="State">
                    <input type="text"
                           name="postcode"
                           id="shipping-postcode"
                           placeholder="Postcode / Zip"
                    >
                    <!--<a href="#" class="get-quote">-->
                    <button type="button" class="get-quote">
                        get a quote
                    </button>

                    <!--</a>-->
                </div>
                <div class="coupon-discount">
                    <h3>
                        coupon  discount
                    </h3>
                    <p>
                        Enter your coupon code if you have one
                    </p>
                    <input type="text"
                           name="state"
                           id="coupon-num"
                           placeholder="Coupon number">
                    <!--<a href="#" class="apply-coupon">-->
                    <button type="button">
                        Apply coupon
                    </button>

                    <!--</a>-->
                </div>
                <div class="checkout">
                    <div>
                        <p>
                            Sub total         <span>$900</span>
                        </p>
                        <h3>
                            GRAND TOTAL <span> $900 </span>
                        </h3>
                    </div>
                    <a href="checkout.html" class="checkout">
                        proceed to checkout
                    </a>
                </div>
            </div>
        </div>
    </div>
    </div>
    `
});