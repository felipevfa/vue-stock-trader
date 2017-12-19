<template>
  <div>
    <div class="columns">
      <div class="column" v-if="portfolio.length === 0">You have no stocks in your portfolio, go buy some!</div>

      <div class="column" :key="stock.name" v-for="stock in portfolio">
        <div class="card">
          <div class="card-header">
            <div class="card-header-title">
              <p><strong>{{ stock.name }}</strong> (Price: {{ stock.price }}) | (Quantity: {{ stock.quantity }})</p>
            </div>
          </div>
          <div class="card-content">
            <div class="field has-addons">
              <div class="control">
                <input type="number" class="input" placeholder="quantity" v-model.number="quantity[stock.name]">
              </div>
              <div class="control">
                <button class="button is-danger" 
                        @click="sell(stock.name, quantity[stock.name])"
                        :disabled="quantity[stock.name] > stock.quantity || quantity[stock.name] < 0 || !quantity[stock.name] || quantity[stock.name] === ''">
                          Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: {}
    }
  },
  computed: {
    portfolio() {
      return this.$store.getters['current/portfolio'];
    },
    stocks() {
      return this.$store.getters['current/stocks'];
    },
  },
  methods: {
    sell(name, quantity) {
      this.$store.dispatch('current/sellStock', {
        name: name,
        quantity: quantity,
        price: this.stocks[name].price
      });

      this.quantity[name] = undefined;
    },
  }
}
</script>

<style scoped>
  
</style>
