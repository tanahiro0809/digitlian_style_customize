(function($){
  'use strict';

  /*var
  ----------------------------------------------------------------------*/
  var DATAPREF = '-cmnjs';
  var globalKey = 'cmnjs';

  if(globalKey && window[globalKey]==null){
    window[globalKey]={};
  }else{
    globalKey = false;
  }

 /**
  * タブ切替
  * ボタンのクリックでボタンと対象エリアにアクティブクラスを付与
  * ボタンとエリアの紐付けはDOM順番に依存
  */
  $(function(){
    //constructor
    var TabChange = function(opt){
      var thisO = this;
      var def = opt.def-0||0;
      this.curSeq = -1;
      this.$btns = opt.$btns;
      this.$areas = opt.$areas;
      this.activeBtnClass = opt.activeBtnClass || '';
      this.activeAreaClass = opt.activeAreaClass || '';
      this.targetTabNumber = opt.targetTabNumber || '';
      this.onChanged = (typeof opt.onChanged === 'function')?opt.onChanged:function(){};
      this.$btns.each(function(seq){
        var $this = $(this);
        $this.on('click',function(){
            this.blur();
            thisO.changeTab($this.attr(thisO.targetTabNumber) || seq);
        });
      });
      this.changeTab(def,true);
    };
    TabChange.prototype.changeTab = function(seq,firstFlg){
      if(this.curSeq === seq){
          return;
      }
      var $activeArea = this.$areas.eq(seq);
      if(!firstFlg && $activeArea.is(':visible')){
          return;
      }
      this.$btns.removeClass(this.activeBtnClass);
      if (this.$btns.filter('[' + this.targetTabNumber + ']').length > 0) {
        this.$btns.filter('[' + this.targetTabNumber + '=' + seq + ']').addClass(this.activeBtnClass);
      }
      else {
        this.$btns.eq(seq).addClass(this.activeBtnClass);
      }
      this.$areas.removeClass(this.activeAreaClass);
      $activeArea.addClass(this.activeAreaClass);
      this.curSeq = seq;
      this.onChanged(seq);
    };
    if(globalKey){window[globalKey].TabChange = TabChange;}


    (function(){
      /**
      * ラッパー汎用型 TabChange の生成
      *  ラッパー：[data-cmnjs-tabchange-role="wrap"]
      *  ボタン　：[data-cmnjs-tabchange-role="wrap"] [data-cmnjs-tabchange-role="btn"]
      *  エリア　：[data-cmnjs-tabchange-role="wrap"] [data-cmnjs-tabchange-role="area"]
      *  アクティブボタン・エリアに付与されるクラス：tabActive
      *  ラッパーの data-cmnjs-tabchange-def 属性で初期タブのシーケンスを指定可
      */
      var wrapData = 'data'+DATAPREF+'-tabchange-role=wrap';
      var btnData = 'data'+DATAPREF+'-tabchange-role=btn';
      var areaData = 'data'+DATAPREF+'-tabchange-role=area';
      var defaultSeqData = 'data'+DATAPREF+'-tabchange-def';
      var targetTabNumber = 'data'+DATAPREF+'-target-tab-number'
      var activeClass = 'tabActive';

      $('['+wrapData+']').each(function(){
        var $wrap = $(this);
        var $nested = $wrap.find('['+wrapData+']'+' *');//ネストを考慮
        var $btns = $wrap.find('['+btnData+']').not($nested);
        var $areas = $wrap.find('['+areaData+']').not($nested);
        if($btns.length && $areas.length){
            new TabChange({
                $btns: $btns,
                $areas: $areas,
                activeBtnClass: activeClass,
                activeAreaClass: activeClass,
                targetTabNumber: targetTabNumber,
                def: $wrap.attr(defaultSeqData),
            });
          }
      });
    })();
  });

  /**
  * スムーズスクロール
  * 対象　[href^="#"][data-cmnjs-smoothscroll]
  * data-cmnjs-smoothscroll="false" で抑止
  */
  $(function() {
    var dataName = 'data'+DATAPREF+'-smoothscroll';
    var speed = 300;
    var easing = 'swing';
    var $win = $(window);

    var getScrollableElm = (function(){
      var $scrollable = null;
      return function(){
        if(!$scrollable){
          $('html,body').each(function(){
            var $this = $(this);
            if($this.scrollTop() > 0){
              $scrollable = $this;
              return false;
            }else{
              $this.scrollTop(1);
              if( $this.scrollTop() > 0 ){
                $scrollable = $this;
                return false;
              }
              $this.scrollTop(0);
            }
          });
        }
        return $scrollable;
      };
    })();
    $(document).on('click', 'a[href^="#"], area[href^="#"]', function(){
      var $this = $(this);
      if($this.attr(dataName) === 'false'){return true;}
      var $scroller = getScrollableElm();
      var pos,curpos;
      var href = $this.attr('href');
      var $target = $(href === '#'? 'html' : href);
      if($target.length){
        if($scroller){
          pos = $target.offset().top;
          curpos = Number($win.scrollTop());
          location.href = location.href.split('#')[0]+href;
          $scroller.scrollTop(curpos).animate({scrollTop:pos}, speed, easing);
        }else{
          location.href = location.href.split('#')[0]+href;
        }
        return false;
      }else{
        return true;
      }
    });
  });
  /**
   * スクロールしている場合に表示する
   */
  $(function(){
    var $taraget = $('[data'+DATAPREF+'-scrollshow]');
    var $win = $(window);
    var speed = 300;
    var flg = false;
    function checkScroll(){
      if($win.scrollTop() > 0){
          if(!flg){
            flg = true;
            $taraget.stop().fadeIn(speed);
          }
        }else{
          if(flg){
            flg = false;
            $taraget.stop().fadeOut(speed);
        }
      }
    }
    $win.on('scroll resize',checkScroll);
    checkScroll();
  });

  /**
  * パンくずリストのスクロール処理
  */
  $(function(){
    var setPotisionbreadCrumb = function () {
    var $breadCrumb = $('.bread-crumb-wrap');
    if ($breadCrumb.length > 0) {
      $breadCrumb.scrollLeft($breadCrumb.find('ul')[0].scrollWidth);
    }
  };
    setPotisionbreadCrumb();
  });

  /**
  * スマホナビーゲションボタン
  */
  $(function(){
    var $spNavBtn = $('.nav-open');
    var $html = $('html');
    var $navClose = $('.nav-close');
    var $overLay = $('.modalOverlay');

    $spNavBtn.click(function(){
      $html.toggleClass('modalShow');
    });
    $navClose.click(function(){
      $html.removeClass('modalShow');
    });
    $overLay.click(function(){
      $html.removeClass('modalShow');
    });
  });

  /**
  * facebookプラグインをリキッド
  */
  $(function () {
    var windowWidth = $(window).width();
    var htmlStr = $('.fbWrap').html();
    var timer = null;
    $(window).on('resize',function() {
        var resizedWidth = $(window).width();
        if(windowWidth != resizedWidth && resizedWidth < 500) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                $('.fbWrap').html(htmlStr);
                window.FB.XFBML.parse();
　　　　　　　　　　　//window.FB.XFBML.parse()で再レンダリングします。
                var windowWidth = $(window).width();
            }, 500);
        }
    });
  });

  /**
  * 検索ボタンswitch
  */
  $(function(){
    var $inputBtn = $('#searchsubmit');
    var $searchArea = $('.search-txt');
    var $form = $('#searchform');
    if($searchArea.val()!==''){
      $searchArea.addClass('inputActive');
    }
    $inputBtn.on('click', function() {
      if($searchArea.val() === ''){
        $searchArea.toggleClass('inputActive');
        return false;
      } else {
        $form.submit();
      }
    });
  });

})(jQuery);