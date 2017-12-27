import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const getIntBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const store = new Vuex.Store({
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
        },
        load(state, loadedState) {
            console.log(JSON.stringify(loadedState));
            state.funds = loadedState.funds;
            state.portfolio = loadedState.portfolio || [];
            state.stocks = loadedState.stocks;
        },
        endDay(state) {
            for (let stock in state.stocks) {
                state.stocks[stock].price = getIntBetween(50, 350);
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
        load({ commit }, state) {
            commit('load', state);
        },
        endDay({ commit }) {
            commit('endDay');
        }
    },
});