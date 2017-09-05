let Drag = (() => {
    class _Drag {
        constructor($obj) {
            this.$obj = $obj;
            this.disX = 0;
            this.disY = 0;
            this._bindevent()
        }

        _down(e) {
            this.disX = e.pageX - this.$obj.offset().left
            this.disY = e.pageY - this.$obj.offset().top
        }
        _move(e) {
            this.$obj.offset({
                left: e.pageX - this.disX,
                top: e.pageY - this.disY
            })
        }
        _up() {
            $(document).off('mousemove')
            $(document).off('onmouseup')
        }
        _bindevent() {
            this.$obj.on('mousedown', e => {
                this._down(e);
                $(document).on('mousemove', e => {
                    this._move(e);
                })
                $(document).on('mouseup', () => {
                    this._up();
                })
                return false;
            })
        }
    }
    let init = ($obj) => {
        var drag
        $obj.each(() => {
            let $this = $(this)
            if ($this.hasClass('init')) return
            drag = new _Drag($obj)
            $this.addClass('init')
        })
        console.log(drag)
        return drag
    }
    return {
        init: init
    }
})()
window.Drag = Drag
module.exports = Drag