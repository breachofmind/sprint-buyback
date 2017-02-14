"use strict";
var axios = require('axios');

var $http = axios.create({
    baseURL: "/api/v1",
    headers: {
        //"X-CSRF-TOKEN" : document.getElementById('CSRFTOKEN').getAttribute('content'),
        "X-REQUESTED-WITH" : "XMLHttpRequest"
    }
});

module.exports = $http;