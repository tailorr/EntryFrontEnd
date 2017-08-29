define(['jquery'], function($) {
    var waterFall = (function() {
        function _waterFall($waterFall) {
            this.$waterFall = $waterFall
            this.$loadButton = this.$waterFall.siblings('.more')
            this.$columnWidth = this.$waterFall.children().outerWidth(true)
            this.$columnNumber = Math.floor(this.$waterFall.width() / this.$columnWidth)
            this.LENGTH = 6
            this.page = 0
            this.columnHeight = []
            this.minIndex = 0
            this._init()
            this._bindEvent()
        }

        _waterFall.prototype = {
            _bindEvent: function() {
                let _this = this
                this.$loadButton.on('click', function() {
                    _this._init()
                })
            },
            _init: function() {
                let _this = this
                this._getData(function(data) {
                    $(data).each(function(index, item) {
                        var $item = _this._render(item)
                        $item.find('img').on('load', function() { //JS是异步的，所以要在DOM加载完毕后再开始计算插入节点的位置  这里是图片加载完毕再计算每一列的高度的意思
                            $('.portfolio-list').append($item)
                            _this._layout($item)
                        })
                    })
                })
            },
            _getData: function(callback) {
                let _this = this
                $.ajax({
                    url: '/getProducts',
                    dataType: 'json',
                    method: 'GET',
                    data: {
                        page: this.page,
                        length: this.LENGTH
                    }
                }).then(function(response) {
                    if (response.status === 0) {
                        data = response.data
                        callback(data)
                    } else {
                        alert('后台完蛋了！')
                    }
                    _this.page++;
                }, function() {
                    alert('Data is missing!')
                })
            },

            _render: function(item) {
                var html = '<li class="portfolio-item">' +
                    '<a href="javascript:void(0);">' +
                    '<div class="mask"></div>' +
                    '<img src="' + item.image_url + '" alt="milk ">' +
                    '</a>' +
                    '<h4 class="item-name">' + item.abs + '</h4>' +
                    '<p class="portfolio-description">' + item.abs + '</p>' +
                    '</li>'
                return $(html)
            },
            _layout: function($item) {
                let minHeight = this.columnHeight[this.minIndex],
                    _this = this

                if (this.columnHeight.length === 0) {
                    for (let i = 0; i < this.$columnNumber; i++) {
                        this.columnHeight.push(0)
                    }
                }
                $(this.columnHeight).each(function(index, columnItem) {

                    if (_this.columnHeight[index] < minHeight) {

                        _this.minIndex = index
                        minHeight = _this.columnHeight[index]
                    }
                })
                $item.css({
                    left: this.$columnWidth * this.minIndex,
                    top: minHeight,
                });
                this.columnHeight[this.minIndex] = $item.outerHeight(true) + this.columnHeight[this.minIndex]
                this.$waterFall.height(Math.max.apply(null, this.columnHeight))
            }
        }

        function init($waterFall) {
            $waterFall.each(function() {
                var $this = $(this)
                if ($this.hasClass('init')) return
                new _waterFall($waterFall)
                $this.addClass('init')
            })
        }

        return {
            init: init
        }

    })()

    return waterFall
})