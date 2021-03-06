<template>
    <div>
        <nav class="navbar is-light" role="navigation" aria-label="main navigation">
            <div class="container">
                <div class="navbar-brand">
                    <router-link class="navbar-item" 
                        :class="{ 'is-active': activeRoute == 'home' }" 
                        @click="activeRoute = 'home'"
                        to="/">Stock Trader</router-link>
                    
                    <button class="button is-light navbar-burger" 
                            :class="{ 'is-active': menuActive }"
                            @click="menuActive = !menuActive">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
    
                <div class="navbar-menu" :class="{ 'is-active': menuActive }" id="menu">
                    <div class="navbar-start">
                        <router-link class="navbar-item" 
                                :class="{ 'is-active': activeRoute == 'stocks' }" 
                                @click="activeRoute = 'stocks'"
                                to="/stocks">Stocks</router-link>
                        <router-link class="navbar-item" 
                                :class="{ 'is-active': activeRoute == 'portfolio' }" 
                                @click="activeRoute = 'portfolio'"
                                to="/portfolio">Portfolio</router-link>
                    </div>
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <button class="button is-info" 
                                    :class="{ 'is-loading': endDayLoading }"
                                    @click="endDay">End Day</button>
                        </div>
        
                        <div class="navbar-item">
                            <div class="dropdown">
                                <div class="dropdown-trigger">
                                    <button class="button"
                                            :class="{ 'is-loading': saveAndLoadLoading }"
                                            aria-haspopup="true" 
                                            aria-controls="dropdown-menu">
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

                        <div class="navbar-item is-hidden-mobile">Funds: {{ funds | currency }}</div>
                    </div>
                </div>
            </div>
        </nav>
        
        <div class="section">
            <div class="container">
                <transition name="alert">
                    <div v-if="serverResponse.status != responseStatus.UNDEFINED"
                         class="notification"
                         :class="{ 
                            'is-success': serverResponse.status == responseStatus.SUCCESS,
                            'is-danger': serverResponse.status == responseStatus.ERROR 
                         }">
                            <button class="delete" @click="resetServerResponse"></button>
                            {{ serverResponse.message }}
                    </div>
                </transition>
                
                <transition name="route" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import filters from './mixins/filters';

export default {
  data() {
    return {
        dropdowns: undefined,
        serverResponse: {
            message: '',
            status: 0
        },
        responseStatus: {
            ERROR: 2,
            SUCCESS: 1,
            UNDEFINED: 0
        },
        menuActive: false,
        activeRoute: 'home',
        saveAndLoadLoading: false
    };
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    }
  },
  methods: {
    isActive(index) {
      return this.activeIndex == index;
    },
    save() {
        const state = this.$store.state;
        this.saveAndLoadLoading = true;

        if (localStorage.getItem('stockTraderKey') != undefined) {
            const key = localStorage.getItem('stockTraderKey');
            this.$http.patch(`users/${key}.json`, state)
                .then(res => {
                    this.serverResponse.message = 'Your data has been saved.';
                    this.serverResponse.status = this.responseStatus.SUCCESS;
                    this.saveAndLoadLoading = false;
                })
                .catch(error => {
                    this.serverResponse.message = 'There was an error during the request: ' + error.statusText,
                    this.serverResponse.status = this.responseStatus.ERROR;
                    this.saveAndLoadLoading = false;
                });
        } else {
            this.$http.post(`users.json`, state)
                .then(res => {
                    this.serverResponse.message = 'Your data has been saved.';
                    this.serverResponse.status = this.responseStatus.SUCCESS;
                    localStorage.setItem('stockTraderKey', res.body.name);
                    this.saveAndLoadLoading = false;
                })
                .catch(error => {
                    this.serverResponse.message = 'There was an error during the request: ' + error.statusText,
                    this.serverResponse.status = this.responseStatus.ERROR;
                    this.saveAndLoadLoading = false;
                });
        }
    },
    load() {
        if (localStorage.getItem('stockTraderKey') != undefined) {
            const key = localStorage.getItem('stockTraderKey');
            this.saveAndLoadLoading = true;

            this.$http.get(`users/${key}.json`)
                .then(res => {
                    this.$store.dispatch('load', res.body);
                    this.serverResponse.message = 'Your data has been loaded.';
                    this.serverResponse.status = this.responseStatus.SUCCESS;
                    this.saveAndLoadLoading = false;
                    
                })
                .catch(error => {
                    this.serverResponse.message = 'There was a problem retreving your data. Please try again later.';
                    this.serverResponse.status = this.responseStatus.ERROR;
                    this.saveAndLoadLoading = false;
                });
        } else {
            this.serverResponse.message = 'There is no data on the server.';
            this.serverResponse.status = this.responseStatus.ERROR;
            this.saveAndLoadLoading = false;
        }
    },
    resetServerResponse() {
        this.serverResponse.message = '';
        this.serverResponse.status = this.responseStatus.UNDEFINED;
    },
    endDay() {
        this.$store.dispatch('endDay');

        if (this.menuActive) {
            this.menuActive = false;
        }

        this.serverResponse.message = 'A new day has begun!';
        this.serverResponse.status = this.responseStatus.SUCCESS;
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
.route-enter-active, .route-leave-active {
    transition: opacity .2s ease;
}
.alert-enter-active, .alert-leave-active {
    transition: opacity .4s ease;
}
.route-enter, .route-leave-to, .alert-enter, .alert-leave-to {
    opacity: 0;
}
</style>
