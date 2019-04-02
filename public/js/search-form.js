Vue.component('searchform',{

    data(){
        return {
            searchLine: "",
        }
    },
    methods:{
        search_btn_mouseover(){

            document.forms["searchform"].searchform_input.style.border = "1px solid  #f16d7f";
            document.forms["searchform"].searchform_btn.style.border = "1px solid  #f16d7f";
            document.forms["searchform"].searchform_btn.style.borderLeft = "1px none  #f16d7f";
            document.forms["searchform"].searchform_input.style.borderLeft = "1px none  #f16d7f";

        },

        search_btn_mouseleave(){

            document.forms["searchform"].searchform_input.style.border = "1px solid  #e6e6e6";
            document.forms["searchform"].searchform_btn.style.border = "1px solid  #e6e6e6";
            document.forms["searchform"].searchform_btn.style.borderLeft = "1px none  #f16d7f";
            document.forms["searchform"].searchform_input.style.borderLeft = "1px none  #f16d7f";
        }

    },
    template: `
        <form action="#" class="form" @submit.prevent="$root.$refs.catalog.filter(searchLine)"
                name="searchform">

               <div>
                </div>
                <label for="browse-chb" class="browse-lbl"
                        name="searchform_label">
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
                <input type="search" placeholder="Search for item..."  v-model="searchLine"
                        name="searchform_input">
                <button type="submit"
                        @mouseover="search_btn_mouseover"
                        @mouseleave="search_btn_mouseleave"
                        name="searchform_btn">
                    <i class="br-sm fas fa-search" name="searchform_icon"></i>
                </button>

        </form>`
})