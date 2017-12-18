<template>
  <div>
      <div class="box">
        <h1 class="title">Trade or View your Portfolio!</h1>

        <p>You may Save & Load your data.</p>
        <p>Click on 'End Day' to begin a new day!</p>
        
        <div class="divider"></div>

        <h1 class="title is-size-4">Your Funds: {{ funds | currency }}</h1>
      </div>
  </div>
</template>

<script>
import filters from '../mixins/filters';

export default {
  mixins: [
    filters
  ],
  computed: {
    funds() {
      return this.$store.getters.funds;
    } 
  }
}
</script>

<style scoped>
.divider {
  margin: 1em auto;
  height: 1px;
  background-color: #CCC;
}
</style>
