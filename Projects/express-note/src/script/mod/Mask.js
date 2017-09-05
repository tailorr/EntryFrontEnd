let Mask = (() => {
    class _Mask {
        constructor() {
            this._createMask()
        }
        _createMask() {
            let tpl = `<div class="mask"></div>`
            this.$mask = $(tpl)
            $('body').append(this.$mask)
            this._setStyle()
            this.$mask.fadeIn(500)
        }
        _setStyle() {
            this.$mask.css({
                "position": "absolute",
                "top": 0,
                "left": 0,
                "bottom": 0,
                "right": 0,
                "width": "100 %",
                "height": "100 %",
                "display": "none",
                "background": "rgba(0,0,0,0.8)",
                "z-index": 999
            })
        }
        remove() {
            this.$mask.fadeOut(400, () => {
                this.$mask.remove()
            })
        }
    }
    return {
        init: () => {
            return new _Mask()
        }
    }
})()

module.exports = Mask