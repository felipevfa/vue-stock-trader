import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const current = {
    namespaced: true,
    state: {
        funds: 10000,
        stocks: {
            'BMW': {
                name: 'BMW',
                price: 110
            },
            'Google': {
                name: 'Google',
                price: 200
            },
            'Apple': {
                name: 'Apple',
                price: 250
            },
            'Twitter': {
                name: 'Twitter',
                price: 50
            }
        },
        portfolio: [

        ]
    },
    getters: {
        funds: state => state.funds,
        stocks: state => state.stocks,
        portfolio: state => state.portfolio,
    },
    mutations: {
        addToFunds(state, value) {
            state.funds += value;
        },
        removeFromFunds(state, value) {
            state.funds -= value;
        },
        addToPortfolio(state, stock) {
            let index = state.portfolio.findIndex(element => element.name == stock.name);

            if (index == -1) {
                state.portfolio.push(stock);
            } else {
                state.portfolio[index].quantity += stock.quantity;
            }
        },
        removeFromPortfolio(state, stock) {
            let index = state.portfolio.findIndex(element => element.name == stock.name);

            if (state.portfolio[index].quantity == stock.quantity) {
                state.portfolio.splice(index, 1);
            } else {
                state.portfolio[index].quantity -= stock.quantity;
            }
        }
    },
    actions: {
        addToFunds({ commit }, value) {
            commit('addToFunds', value);
        },
        removeFromFunds({ commit }, value) {
            commit('removeFromFunds', value);
        },
        buyStock({ commit }, stock) {
            commit('addToPortfolio', stock);

            commit('removeFromFunds', stock.quantity * stock.price);
        },
        sellStock({ commit }, stock) {
            commit('removeFromPortfolio', stock);

            commit('addToFunds', stock.price * stock.quantity);
        },
        save({ commit }) {
            commit('save', null, { root: true });
        },
        load({ commit }) {
            commit('load', null, { root: true });
        }
    }
};

const saved = {
    namespaced: true,
    state: {
        funds: 10000,
        stocks: {
            'BMW': {
                name: 'BMW',
                price: 110
            },
            'Google': {
                name: 'Google',
                price: 200
            },
            'Apple': {
                name: 'Apple',
                price: 250
            },
            'Twitter': {
                name: 'Twitter',
                price: 50
            }
        },
        portfolio: [

        ]
    },
    mutations: {

    },
    actions: {

    }
};

export const store = new Vuex.Store({
    modules: {
        current,
        saved
    },
    mutations: {
        save(state) {
            Object.assign(state.saved, state.current);
        },
        load(state) {
            Object.assign(state.current, state.saved);
        }
    }
});