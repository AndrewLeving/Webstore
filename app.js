const API_URL = "https://fakestoreapi.com/";

Vue.component('productitem', {
    template: `<div class="item">
    <h1 class="title"> {{ item.title }} </h1>
    <img class="image" :src="item.image">
    <p class="description"> {{ item.description }} </p>
    <p class="price"> $ {{ item.price }} </p>
    <button v-if="!added" class="add-to-cart" :style="{'backgroundColor' : 'lightGreen'}" @click="addToCart()">Add To Cart</button>
    <button v-if="added" class="remove-from-cart" :style="{'backgroundColor' : 'red'}" @click="removeFromCart()">Remove From Cart</button>
    </div>`,
    props: ["item", "incart"],
    data: function () {
        return {
            added: this.incart
        }
    },

    methods: {
        addToCart: function () {
            this.$emit('add-item');
            this.added = true;
        },
        removeFromCart: function () {
            this.$emit('remove-item');
            this.added = false;
        }
    }
});

Vue.component('cartitem', {
    template: `<div class="cart-item">
    <img class="image" :src="item.image">
    <h1 class="cart-title"> {{ item.title }} </h1>
    <p class="price"> $ {{ item.price }} </p>
    <button class="remove-from-cart" :style="{'backgroundColor' : 'red'}" @click="removeFromCart()">Remove From Cart</button>
    </div>`,
    props: ["item"],

    methods: {
        removeFromCart: function () {
            this.$emit('remove-item');
            this.added = false;
        }
    }
});

Vue.component('purchase', {
    template: `<div id="purchase">
    <p> Total = $ {{ total }} </p>
    <button @click="purchase()"> Purchase </button>
    </div>`,
    props: ['total'],

    methods: {
        purchase: function () {
            this.$emit('purchase');
        }
    }

});

Vue.component('navbar', {
    template: `<header>
    <div class="header-details">
        <img src="https://picsum.photos/100" alt="random photo"  @click="home()">
        <nav class="navbar">
            <button @click="store()">Store</button>
        </nav>
        <div class="actions">
            <button @click="checkout()">Checkout</button>
        </div>
    </div>
</header>`,
    methods: {
        checkout: function () {
            this.$emit('checkout');
        },
        home: function () {
            this.$emit('home');
        },
        store: function () {
            this.$emit('store');
        }
    }
});



var app = new Vue({
    el: '#app',
    data: {
        productList: [],
        pageNum: 1,
        inCart: [],
        checkingOut: false

    },
    methods: {
        addToCart(product) {
            product.inCart = true;
            this.inCart.push(product);
        },

        removeFromCart(product, id) {
            for (i = 0; i < this.inCart.length; i++) {
                if (this.inCart[i].id == id) {
                    this.inCart.splice(i, 1);
                }
            }
            product.inCart = false;
        }
    },

    computed: {
        getTotal: function () {
            totalPrice = 0;
            this.inCart.forEach(product => {
                totalPrice += product.price;
            })
            return totalPrice
        },
        getInCart: function (product) {
            return product.inCart;
        }
    },

    created: async function () {
        let response = await fetch(API_URL + "products");
        let data = await response.json();
        this.productList = data;
        this.productList.forEach(product => {
            product.inCart = false;
            product.price = (Math.floor(product.price * 100) / 100);
        })
    }

});