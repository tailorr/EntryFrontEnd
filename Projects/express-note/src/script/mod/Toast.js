require('scss/toast.scss')

let Toast = (() => {
    class _Toast {
        constructor(message = 'Add success', time = 800) {
            this.message = message
            this.vanishTime = time
            this.createToast()
            this.showToast()
        }
        createToast() {
            let tpl = `<div class="toast">${this.message}</div>`
            this.$toast = $(tpl)
            $('body').append(this.$toast)
        }
        showToast() {
            this.$toast.fadeIn(400, () => {
                setTimeout(() => {
                    this.$toast.fadeOut(200, () => {
                        this.$toast.remove()
                    })
                }, this.vanishTime)
            })
        }
    }

    let init = (message, time) => {
        new _Toast(message, time)
    }
    return {
        init: init
    }
})()
window.Toast = Toast
module.exports = Toast