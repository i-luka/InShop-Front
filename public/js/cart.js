Vue.component("cart",{

    props: ['cart_item'],
    data(){
        return {
        }
    },
    template: `
    <div >
                            <a href="#">
                                <img :src="cart_item.img" alt="">
                            </a>
                            <div class="drop-block">
                                <h3 class="drop-heading-cart">
                                    <a href="#">
                                        {{cart_item.product_name}}
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
                                    {{cart_item.quantity}} x \${{cart_item.price}}
                                </p>

                            </div>
                            <div class="cart-undo-cont">
                                <button id="undo-btn2" @click="$emit('remove', cart_item)">
                                    <i class="cart-undo fas fa-times-circle"></i>
                                </button>
                            </div>
    </div>
    `
});