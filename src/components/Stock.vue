<template>
  <div>
    <div class="columns">
      <div class="column" :key="stock.name" v-for="stock in stocks">
        <div class="card">
          <div class="card-header">
            <div class="card-header-title">{{ stock.name }} (Price: {{ stock.price }})</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    }
  }
}
</script>

<style scoped>

</style>
