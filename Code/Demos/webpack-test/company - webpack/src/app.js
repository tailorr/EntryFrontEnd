const $ = require('jquery'),
    Carousel = require('./components/Carousel'),
    BackTop = require('./components/Backtop'),
    WaterFall = require('./components/Waterfall')

Carousel.init($('.carousel'))
BackTop.init($('#back-top'))
WaterFall.init($('.portfolio-list'))