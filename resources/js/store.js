"use strict";
var Vue = require('vue');
var Vuex = require('vuex');
var $http = require('./api');
var _ = require('lodash');
var utils = require('./utils');

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        loading: true,
        devices: [],
        selections: {
            carrier: null,
            brand: null,
            name: null,
            capacity: null
        },
    },
    getters: {
        levels: function(state)
        {
            return Object.keys(state.selections);
        },
        selectedDevice: function(state)
        {
            var completed = true;
            _.each(state.selections, (value,key) => {
                if (! value) completed = false;
            });
            return completed ? state.selections["capacity"] : null;
        }
    },
    mutations: {

        select(state, payload) {
            //state.selections[payload.property] = payload.value;
            var levels = Object.keys(state.selections);

            // Clear all future levels.
            var nextLevel = payload.level + 1;
            for (var level = nextLevel; level < levels.length; level ++) {
                state.selections[levels[level]] = null;
            }
        },

        fetch(state)
        {
            state.loading = true;
            $http.get('device').then(response => {
                window.setTimeout(timer => {
                    var json = response.data;
                    state.devices = json.data;
                    state.loading = false;
                },500);
            });
        },

        loaded(state)
        {
            state.loading = false;
        }
    }
});

module.exports = store;