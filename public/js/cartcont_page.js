Vue.component("cartcont_page",{
   props: ["item"],
   template: `
   
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
                    <!--<div class="cart-block cart-font"-->
                    <!--v-for="item of this.$children[1]._data.cartItems" :key="item.id_product">-->
                <div class="cart-item">
                    <a href="single.html">
                        <img :src="item.img" alt="" class="cart_page_product_img">
                    </a>
                    <div class="product-box">

                        <h3 class="cart-p">
                            <a href="tml">
                                {{ item.product_name }}
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
                         \${{item.quantity}}
                     </p>
                </div>
                <div class="cart-item">
                    <input type="number" name="product-quantity" id="cart-product-quantity1" v-model.number="item.quantity" class="cart-font">
                </div>
                <div class="cart-item">
                     <p>
                         FREE
                     </p>
                </div>
                <div class="cart-item">
                     <p>
                         \${{item.price}}
                     </p>
                </div>
                <div class="cart-item cart-undo-cont cart-undo-cont_action">
                     <button @click="remove(item)">
                         <p>
                            <i class="cart-undo fas fa-times-circle"></i>
                        </p>
                    </button>
                </div>
            </div>
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
   `
});