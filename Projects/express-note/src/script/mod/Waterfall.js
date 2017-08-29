let Waterfall = (() => {
    class _Waterfall {
        constructor($ct) {
            this.$ct = $ct
            this.$item = this.$ct.children()
            this._render()
            this._bindEvent()
        }
        _render() {
            let columnWidth = this.$item.outerWidth(true),
                columnLength = parseInt(this.$ct.width() / columnWidth),
                columnHeight = [];
            for (let i = 0; i < columnLength; i++) {
                columnHeight.push(0);
            }

            this.$item.each((index, element) => {
                let minIndex = 0,
                    minHeight = columnHeight[0];

                for (let i = 0; i < columnHeight.length; i++) {
                    if (columnHeight[i] < minHeight) {
                        minIndex = i;
                        minHeight = columnHeight[i];
                    }
                }
                $(element).css({
                    left: columnWidth * minIndex,
                    top: minHeight,
                    transform: "translate(0,0)",
                    "z-index": 0
                });
                columnHeight[minIndex] = $(element).outerHeight(true) + columnHeight[minIndex];
            });
        }
        _bindEvent() {
            $(window).on('resize', () => {
                this._render()
            })
        }
    }
    return {
        init: $ct => {
            new _Waterfall($ct)
        }
    }
})()
window.Waterfall = Waterfall
module.exports = Waterfall