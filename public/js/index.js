
let app = new Vue({

    el: "#index_app",
    data: {

        // catalogUrl: "/api/products",
        // products: [],
        // filtered: [],
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
                    this.$refs.error.setError(error);
                })
        },

        filter(searchLine){

            let regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },

    // mounted(){
    //     this.getJson(this.catalogUrl)
    //         .then(data => {
    //             for(let el of data){
    //                 if(el.featured){
    //
    //                     this.products.push(el);
    //                     this.filtered.push(el);
    //                 }
    //             }
    //         });
    // },
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
                        
                        <united_cart ref="cartcont">

                        </united_cart>

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
            <featured_items class="features" ref="featured">
            
            </featured_items>
    </div> 
    `
});