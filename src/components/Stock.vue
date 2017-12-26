<template>
  <div>
    <div class="columns">
      <div class="column" :key="stock.name" v-for="stock of stocks">
        <div class="card">
          <div class="card-header">
            <div class="card-header-title">
              <p><strong>{{ stock.name }}</strong> (Price: {{ stock.price }})</p>
            </div>
          </div>
          <div class="card-content">
            <div class="field has-addons">
              <div class="control">
                <input type="number" class="input" placeholder="quantity" v-model.number="quantity[stock.name]">
              </div>
              <div class="control">
                <button class="button is-primary" 
                        @click="buy(stock.name, quantity[stock.name])"
                        :disabled="(quantity[stock.name] * stock.price) > funds || quantity[stock.name] === 0 || quantity[stock.name] === undefined || quantity[stock.name] === ''">
                          Buy
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
  data: function() {
    return {
      quantity: {}
    };
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    },
    funds() {
      return this.$store.getters.funds;
    }
  },
  methods: {
    buy(stockName, quantity) {
      this.$store.dispatch('buyStock', {
        name: stockName,
        quantity: quantity,
        price: this.stocks[stockName].price
      });

      this.quantity[stockName] = undefined;
    }
  }
}
</script>

<style scoped>

</style>
