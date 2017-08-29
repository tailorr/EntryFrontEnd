$(window).on('scroll', function() {
    let $allImages = $('img[data-src]')
    let viewportHeight = $(window).height()
    let scrollTop = window.scrollY
    $allImages.each(function(index, image) {
        let imageTop = $(image).offset().top
        if (imageTop - viewportHeight - 100 <= scrollTop) {
            image.src = image.getAttribute('data-src')
        }
    })
})