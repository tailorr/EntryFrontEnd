const $ = require('jquery')
var Exposure = (function() {
    function _Exposure($target, handler, one) {
        this.$target = $target
        this.handler = handler
        this.isExposured = false
        this.one = one
        this._checkVisible()
        this._bineEvent()
    }
    _Exposure.prototype = {
        _bineEvent: function() {
            var _this = this
            $(window).on('scroll', function() {
                _this._checkVisible()
                console.log(_this._isVisible(_this.$target))
            })
        },
        _checkVisible: function() {
            if (this.one) {
                if (this._isVisible(this.$target) && !this.isExposured) {
                    this.handler && this.handler(this.$target)
                    this.isExposured = true
                }
            } else {
                if (this._isVisible(this.$target)) {
                    console.log("到底了")
                    this.handler && this.handler(this.$target)
                }
            }
        },
        _isVisible: function($node) {
            var windowHeight = $(window).height(),
                scrollTop = $(window).scrollTop(),
                offsetTop = $node.offset().top,
                nodeHeight = $node.height();
            if ((windowHeight + scrollTop > offsetTop) && (scrollTop < offsetTop + nodeHeight)) {
                return true
            } else {
                return false
            }
        }
    }
    return {
        init: function($targets, handler) {
            $targets.each(function() {
                new _Exposure($(this), handler)
            })
        },
        one: function($targets, handler) {
            $targets.each(function() {
                if ($(this).hasClass('exposured')) return
                new _Exposure($(this), handler, true)
                $(this).addClass('exposured')
            })
        }
    }
})()
module.exports = Exposure