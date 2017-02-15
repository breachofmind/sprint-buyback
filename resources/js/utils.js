"use strict";

var scroll = require('smooth-scroll');

var scrollOpts = {
    speed:700,
    easing: "easeInOutQuint",
    offset: 80+30
};

/**
 * Scroll to an element.
 * @param id string
 * @param maxWindowWidth Number - the max inner width allowed for animation to go
 */
exports.scrollTo = function(id,maxWindowWidth=0)
{
    // Wait just a small bit for the UI to render.
    window.setTimeout(function() {
        var el = document.getElementById(id);
        var go = maxWindowWidth ? window.innerWidth < maxWindowWidth : true;
        if (el && go) {
            scroll.animateScroll(el, null, scrollOpts);
        }
    },25);
};