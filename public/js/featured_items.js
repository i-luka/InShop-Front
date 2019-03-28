Vue.component("featured_items", {

    data(){

        return {

            catalogUrl: "/api/products",
            featured: [],
        }
    },
    methods:{

    },
    mounted(){
        this.$parent.getJson(this.catalogUrl)
            .then(data => {
                // for(let el of data){
                //     if(el.featured){

                        this.featured = data.filter(el => el.featured === "true");
                //     }
                // }
            });
    },
    template: `
    
        <div class="features">
                <article class="container features-item">
                    <div class="feature-header">
                        <h2 class="feature-header-text-up">Featured Items</h2>
                        <p class="features-header-text-down">Shop for items based on what we featured in this week</p> </div>
                    <div class="box-product">
                        <product_item
                                class="product-flex"
                                v-for="item of featured" 
                                :key="item.id_product"
                                :product="item">
                        
                        </product_item>
                    </div>
                    
                    <div class="features-button">
                        <a href="pages/product.html" class="features-button-link bover-w">
                            Browse All Product <i class=" fas fa-arrow-right"></i>
                        </a>
                    </div>
                </article>
            </div>
    `
})