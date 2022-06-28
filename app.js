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
    data: function () {
        return {
            added: false
        }
    },
    props: ["item"],

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
    data: function () {
        return {}
    },
    props: ["item"],

    methods: {
        removeFromCart: function () {
            this.$emit('remove-item');
            this.added = false;
        }
    }
});

Vue.component('navbar', {
    template: `<header>
    <div class="header-details">
        <img src="https://picsum.photos/100" alt="random photo">
        <nav class="navbar">
            <a href="">Home</a>
            <a href="">Icons</a>
            <a href="">Blog</a>
            <a href="">How to Use</a>
            <a href="">Examples</a>
        </nav>
        <div class="actions" v-if="!checkingout">
            <button @click="checkout()">Checkout</button>
        </div>
    </div>
</header>`,
    data: function () {
        return {}
    },
    props: ["checkingout"],

    methods: {
        checkout: function () {
            this.$emit('checkout');
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
            this.inCart.push(product);
        },

        removeFromCart(id) {
            for (i = 0; i < this.inCart.length; i++) {
                if (this.inCart[i].id == id) {
                    this.inCart.splice(i, 1);
                }
            }
        }
    },

    created: async function () {
        let response = await fetch(API_URL + "products");
        let data = await response.json();
        this.productList = data;
    }

});