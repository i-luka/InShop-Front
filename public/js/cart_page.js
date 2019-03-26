
let app = new Vue({

    el: "#cart_page_app",
    data: {

        catalogUrl: "/api/products",
        products: [],
        filtered: [],
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
        filter(searchLine){

            let regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
        // clearCart() {
        //
        //     this.refs.cartcont.cartItems.forEach((el) => {
        //
        //         this.delJson(`/api/cart/${el.id_product}`)
        //             .then(data => {
        //                 if (data.result === 1) {
        //
        //                     let index = this.refs.cartcont.cartItems.indexOf(el);
        //                     this.refs.cartcont.cartItems.splice(index, 1);
        //                 }
        //             });
        //     })
        // }
    },

    mounted(){
        this.getJson(this.catalogUrl)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
    <div>
        <header class="header">
    <div class="container header-flex">
        <div class="header-left header-flex">
            <a href="../index.html" class="logo header-flex"><img class="logo-img" src="../img/logo.png" alt="" >
                <p class="header-text">bran<span class="pink">D</span></p></a>
            <searchform>
            
            </searchform>
        </div>

        <div class="header-right header-flex">
            <input type="checkbox" id="cart-chb-c">
            
            <cartcont ref="cartcont">

            </cartcont>

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
            <!--<div class="cart-block cart-font"-->
                    <!--v-for="item of $root.$refs.cartcont._data.cartItems" :key="item.id_product">-->
                <!--<div class="cart-item">-->
                    <!--<a href="single.html">-->
                        <!--<img :src="item.img" alt="" class="cart_page_product_img">-->
                    <!--</a>-->
                    <!--<div class="product-box">-->

                        <!--<h3 class="cart-p">-->
                            <!--<a href="tml">-->
                                <!--{{ item.product_name }}-->
                            <!--</a>-->
                        <!--</h3>-->
                        <!--<p class="cart-t-c">-->
                            <!--Color:      <span>Red</span>-->
                        <!--</p>-->
                        <!--<p class="cart-t-s">-->

                            <!--Size:    <span>XLL</span>-->
                        <!--</p>-->

                    <!--</div>-->
                <!--</div>-->
                <!--<div class="cart-item">-->
                     <!--<p>-->
                         <!--\${{ item.price }}-->
                     <!--</p>-->
                <!--</div>-->
                <!--<div class="cart-item">-->
                    <!--<input type="number" name="product-quantity" id="cart-product-quantity1" v-model.number="item.quantity" class="cart-font">-->
                <!--</div>-->
                <!--<div class="cart-item">-->
                     <!--<p>-->
                         <!--FREE-->
                     <!--</p>-->
                <!--</div>-->
                <!--<div class="cart-item">-->
                     <!--<p>-->
                         <!--\${{ item.price }}-->
                     <!--</p>-->
                <!--</div>-->
                <!--<div class="cart-item cart-undo-cont cart-undo-cont_action">-->
                     <!--<button @click="remove(item)">-->
                         <!--&lt;!&ndash;<p>&ndash;&gt;-->
                            <!--<i class="cart-undo fas fa-times-circle"></i>-->
                        <!--&lt;!&ndash;</p>&ndash;&gt;-->
                    <!--</button>-->
                <!--</div>-->
            <!--</div>-->
    </div>
        <div class="cart-bottom container">
            <div class="cart-operation">
                <!--<a href="#" class="clear-cart">-->

                <button class="clear-cart bover-w" @click.prevent="clearCart">
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
                            Sub total         <span>\${{total}}</span>
                        </p>
                        <h3>
                            GRAND TOTAL <span> \${{total}} </span>
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