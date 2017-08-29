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
                "background": "rgba(0,0,0,0.5)"
            })
        }
        remove() {
            this.$mask.fadeOut(1000, () => {
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