define(['jquery'], function($) {
    var CarouselCenter = (function() {


        function Carousel($carousel) {
            this.$carousel = $carousel
            this.$imgWrap = this.$carousel.find('.img-wrap')
            this.$img = this.$imgWrap.children()
            this.$imgWidth = this.$img.width()
            this.$preBtn = this.$carousel.find('.pre')
            this.$nextBtn = this.$carousel.find('.next')
            this.$bullets = this.$carousel.find('.bullet li')
            this.timerId = null
            this.isAnimate = false
            this.currentIndex = 0
            this._setIndex()
            this._autoPlay()
            this._bindEvent()

        }

        Carousel.prototype = {
            _bindEvent: function() {
                var _this = this
                this.$preBtn.on('click', function() {
                    if (_this.isAnimate) return
                    _this.isAnimate = true
                    _this._play(_this._getIndex() + 1)
                })
                this.$nextBtn.on('click', function() {
                    if (_this.isAnimate) return
                    _this.isAnimate = true
                    _this._play(_this._getIndex() - 1)
                })
                this.$carousel.on('mouseenter', function() {
                    _this._pausePlay()
                })
                this.$carousel.on('mouseleave', function() {
                        _this._autoPlay()
                    })
                    // this.$bullets.on('click', function() {
                    //     targetIndex = $(this).index()
                    //     _this._playIndex($(this).index())
                    // })
            },
            _play: function(targetIndex) {
                var _this = this
                this.currentIndex = this._getIndex()

                if (targetIndex === this.currentIndex) return
                var step = this.currentIndex - targetIndex
                switch (true) { //   switch语句 如果判断条件是表达式而非变量   这里用true替代

                    case step < 0:
                        this.$imgWrap.prepend(this.$imgWrap.children().last()).css('left', -this.$imgWidth)
                        this.$imgWrap.animate({
                            "left": 0
                        }, 1000, function() {
                            _this._setBullet()
                            _this.isAnimate = false
                        })
                        break

                    case step > 0:
                        this.$imgWrap.animate({
                            "left": -step * this.$imgWidth
                        }, 1000, function() {
                            _this.$imgWrap.append(_this.$imgWrap.children().first()).css('left', 0)
                            _this.isAnimate = false
                            _this._setBullet()
                        })
                        break
                }
            },
            _playPre: function() {
                var _this = this
                this.$imgWrap.prepend(this.$imgWrap.children().last()).css('left', -this.$imgWidth)

                this.$imgWrap.animate({
                    "left": 0
                }, function() {
                    _this._setBullet()
                    _this.isAnimate = false
                })
            },
            _playNext: function() {
                var _this = this

                this.$imgWrap.animate({
                    "left": 0 - this.$imgWidth
                }, function() {
                    _this.$imgWrap.append(_this.$imgWrap.children().first()).css('left', 0)
                    _this.isAnimate = false
                    _this._setBullet()
                })
            },
            _playIndex: function(targetIndex) {
                var _this = this
                if (targetIndex === this.currentIndex) return
                var step = this.currentIndex - targetIndex
                console.log('currentIndex:' + this.currentIndex, 'targetIndex:' + targetIndex, 'step:' + step)

                this.$imgWrap.animate({
                    "left": '+=' + step * this.$imgWidth
                }, function() {
                    _this._setBullet()
                    _this.isAnimate = false
                    _this.currentIndex = targetIndex
                    console.log('hui')
                })
            },
            _autoPlay: function() {
                var _this = this
                this.timerId = setInterval(function() {
                    _this._play(_this._getIndex() - 1)
                }, 2500)
            },
            _pausePlay: function() {
                clearInterval(this.timerId)
            },
            _setIndex: function() {
                this.$img.each(function(index, element) {
                    $(element).attr('index', index)
                    if ($(element).attr('data-src')) {
                        $(element).css({
                            'background': 'url(' + $(this).attr('data-src') + ')'
                        })
                    }
                })
            },
            _getIndex: function() {
                this.$img = this.$imgWrap.children()
                return parseInt(this.$img.first().attr('index'))
            },
            _setBullet: function() {
                this.$bullets.removeClass('active')
                this.$bullets.eq(this._getIndex()).addClass('active')
            }

        }

        function init($carousel) {
            $carousel.each(function() {
                var $this = $(this)
                if ($this.hasClass('init')) return
                new Carousel($this)
                $this.addClass('init')
            })
        }

        return {
            init: init
        }
    })()

    return CarouselCenter
})