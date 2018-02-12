(function($){

  $(function() {
    var $slideRecommend = $('.slide-recommend');

    $slideRecommend.slick({
      infinite: true,
      dots: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 4,
      centerMode: true,
      centerPadding: '90px',
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          centerPadding: '90px',
        }
      }, {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: '90px',
        }
      }, {
        breakpoint: 767,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '55px',
        }
      }]
    });

  });

})(jQuery);