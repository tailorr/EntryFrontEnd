define(['jquery'], function($) {
    var BackTop = (function() {
        function GoTop($ct) {
            this.$ct = $ct
            this._init()
            this._bindEvent()
        }

        GoTop.prototype = {
            _init: function() {
                if ($(window).scrollTop() >= 500) {
                    this.$ct.fadeIn(1000)
                } else {
                    this.$ct.fadeOut(1000)
                }
            },
            _bindEvent: function() {
                var _this = this
                $(window).on('scroll', function() {
                    _this._init()
                })
                this.$ct.on('click', function() {
                    $(window).scrollTop(0);
                })
            }
        }

        function init($ct) {
            $ct.each(function() {
                var $this = $(this)
                if ($this.hasClass('init')) return
                new GoTop($this)
                $this.addClass('init')
            })
        }

        return {
            init: init
        }

    })()

    return BackTop
});