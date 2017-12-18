import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        funds: 10000,
        stocks: [
            {
                name: 'BMW',
                price: 110
            },
            {
                name: 'Google',
                price: 200
            },
            {
                name: 'Apple',
                price: 250
            },
            {
                name: 'Twitter',
                price: 50
            }
        ]
    },
    getters: {
        funds: state => state.funds,
        stocks: state => state.stocks
    },
    mutations: {
        addToFunds(state, value) {
            state.funds += value;
        },
        removeFromFunds(state, value) {
            state.funds -= value;
        },
        newDay(state) {
            
        }
    },
    actions: {
        addToFunds({ commit }, value) {
            commit('addToFunds', value);
        },
        removeFromFunds({ commit }, value) {
            commit('removeFromFunds', value);
        }
    }
});