Vue.component('searchform',{

    data(){
        return {
            searchLine: ""
        }
    },
    template: `
        <form action="#" class="form" @submit.prevent="$parent.filter(searchLine)">

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
                <input type="search" required placeholder="Search for item..."  v-model="searchLine">
                <button type="submit"><i class="br-sm fas fa-search"></i></button>
               
                <!--<input type="text" class="search-field" v-model="searchLine">-->

                <!--<button class="btn-search" type="submit" @click.prevent="$parent.$parent.$refs.products.filter(searchLine)">-->

                    <!--<i class="fas fa-search"></i>-->

                <!--</button>-->

        </form>`
})