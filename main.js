/* Before Concord can Depart you have to initialize it by adding <main class="concord" id="concord-cards">
Keep checking back for updates. I'm going to make the concords self generating so when JSON updates the cards will generate
*/
(function($) {
    var $concord = $('#concord-cards'),
      $card = $concord.find('.card'),
      $cardEx = $card.find('.concord.exit'),
       $scrollStatus,
      $cardOrigin;
      //calls card Taxiing to setup cards
    $(document).ready(function() {
      concordTaxiing($concord);
    })
      //card click function
    $card.click(function(e) {
      if ($(this).hasClass('card')) {
        if (!$(this).hasClass('in-flight')) {
          $(this).concordDeparture();
        } else if ($(e.target).hasClass('concord exit')) {
          $(e.target).parent().concordArrival();
        }
      }
    });
      
      //turns on off video if in viewport
    $(window).on('resize scroll load', function() {
      $scrollStatus = !0
    }), setInterval(function() {
      $scrollStatus && (concordGetVisuals(), $scrollStatus = !1);
    }, 350);
      function concordTaxiing($concord){
          
      }
      //when card zooms in
      $.fn.concordDeparture = function(){
          $this = $(this);
          if ($this.hasClass('in-flight')) return;
          var $vpHeight = $(window).height(),
               $vpWidth = $(window).width();
              $cardOrigin = $this.position();
      $this.css({
        'position': 'fixed',
        'z-index': '98',
        'top': $cardOrigin.top,
        'left': $cardOrigin.left,
      });
      $this.before('<div class="card gate_reserved"></div>');
      $('.gate_reserved').css({
        'width': $this.width,
        'height': $this.height
      });
      $('body').addClass('scroll-off');
      $this.addClass('in-flight');
      }
    $.fn.concordArrival = function() {
        $this = $(this);
           $this.css({
              'top': 'auto',
              'left': 'auto',
              'position': 'static'
           })
              $('.gate_reserved').remove();
             $('body').removeClass('scroll-off');
           $this.removeClass('in-flight');
        }
        function concordGetVisuals() {
           $($card.find('video')).each(function() {
              if ($(this).isOnScreen()) {
                $(this).get(0).play();
              } else {
                $(this).get(0).pause();
              }
           });
    }
    $.fn.isOnScreen = function() {
      var win = $(window);
      var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
      };
      viewport.right = viewport.left + win.width();
      viewport.bottom = viewport.top + win.height();
  
      var bounds = this.offset();
      bounds.right = bounds.left + this.outerWidth();
      bounds.bottom = bounds.top + this.outerHeight();
  
      return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
  
    };
  
  })(jQuery);
  