"use strict";
var Vue = require('vue');
var Vuex = require('vuex');
var $http = require('./api');

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        loading: true,
        devices: [],
        selections: {},
    },
    mutations: {
        select(state, payload) {
            state.selections[payload.property] = payload.value;
        },
        fetch(state)
        {
            state.loading = true;
            $http.get('device').then(response => {
                var json = response.data;
                state.devices = json.data;
                state.loading = false;
            });
        }
    }
});

module.exports = store;