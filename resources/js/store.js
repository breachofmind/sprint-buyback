"use strict";
var Vue = require('vue');
var Vuex = require('vuex');
var $api = require('./api');
var $http =require('axios');
var _ = require('lodash');
var utils = require('./utils');

Vue.use(Vuex);

var GET_QUOTE_DELAY = 2000;

var store = new Vuex.Store({
    state: {
        loading: true,
        devices: [],
        selectedDevice: null,
        serialNumber: null,
        quote: null,
        useWorkflow: false,
        selections: {
            carrier: null,
            brand: null,
            name: null,
            capacity: null,
        },
    },
    getters: {
        levels: function(state)
        {
            return Object.keys(state.selections);
        }
    },
    mutations: {

        select(state, payload)
        {
            var levels = Object.keys(state.selections);

            // Clear all future levels.
            var nextLevel = payload.level + 1;
            for (var level = nextLevel; level < levels.length; level ++) {
                state.selections[levels[level]] = null;
            }
            // Check for completion of all selections.
            var completed = true;
            _.each(state.selections, (value,key) => {
                if (! value) completed = false;
            });
            state.selectedDevice = completed ? state.selections[levels[levels.length-1]] : null;
        },

        fetch(state)
        {
            state.loading = true;
            $api.get('device').then(response => {
                window.setTimeout(timer => {
                    var json = response.data;
                    state.devices = json.data;
                    state.loading = false;

                    // For testing purposes
                    //state.selectedDevice = json.data[0];
                },500);
            });
        },

        quote(state,payload)
        {
            state.quote = payload;
        },

        device(state,payload)
        {
            state.serialNumber = payload.serialNumber;
            state.selectedDevice = payload.device;
        },

        loaded(state)
        {
            state.loading = false;
        }
    }
});

module.exports = store;