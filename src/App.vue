<template>
    <div>
        <nav class="navbar is-light">
            <div class="container">
                <div class="navbar-brand">
                    <router-link to="/">Stock Trader</router-link>
                </div>
    
                <div class="navbar-menu">
                    <router-link class="navbar-item" to="/stocks">Stocks</router-link>
                    <router-link class="navbar-item" to="/portfolio">Portfolio</router-link>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">End Day</div>
    
                    <div class="navbar-item">
                        <div class="dropdown">
                            <div class="dropdown-trigger">
                                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                    <span>Save & Load</span>
                                    <span class="icon is-small">
                                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                <div class="dropdown-content">
                                        <a class="dropdown-item" href="#" @click="save">Save</a>
                                        <a class="dropdown-item" href="#" @click="load">Load</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="navbar-item">Funds: {{ funds | currency }}</div>
                </div>
            </div>
        </nav>
        
        <div class="section">
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import filters from './mixins/filters';

export default {
  data() {
    return {
        dropdowns: undefined
    };
  },
  computed: {
    funds() {
      return this.$store.getters['current/funds'];
    }
  },
  methods: {
    isActive(index) {
      return this.activeIndex == index;
    },
    save() {
        this.$store.dispatch('current/save');
    },
    load() {
        this.$store.dispatch('current/load');
    }
  },
  mixins: [
      filters
  ],
  mounted() {    
      this.dropdowns = Array.prototype.slice.call(document.querySelectorAll('.dropdown'));
      
      if (this.dropdowns.length > 0) {
          this.dropdowns.forEach(el => {
              el.addEventListener('click', event => {
                  event.stopPropagation();
                  el.classList.toggle('is-active');
              });
          });
          
          document.addEventListener('click', event => {
              this.dropdowns.forEach(el => {
                  el.classList.remove('is-active');
              });
          });
      }
  }
};
</script>

<style>
.navbar-brand > a {
  display: flex;
  align-items: center;
  padding-right: 1rem;
}
.card-header-title {
  font-weight: normal;
}
</style>
