/*
	Big Picture by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
  var $window = $(window),
    $body = $('body'),
    $header = $('#header'),
    $all = $body.add($header);

  // Breakpoints.
  breakpoints({
    xxlarge: ['1681px', '1920px'],
    xlarge: ['1281px', '1680px'],
    large: ['1001px', '1280px'],
    medium: ['737px', '1000px'],
    small: ['481px', '736px'],
    xsmall: [null, '480px']
  });

  // Play initial animations on page load.
  $window.on('load', function() {
    setTimeout(function() {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Touch mode.
  if (browser.mobile) $body.addClass('is-touch');
  else {
    breakpoints.on('<=small', function() {
      $body.addClass('is-touch');
    });

    breakpoints.on('>small', function() {
      $body.removeClass('is-touch');
    });
  }

  // Fix: IE flexbox fix.
  if (browser.name == 'ie') {
    var $main = $('.main.fullscreen'),
      IEResizeTimeout;

    $window
      .on('resize.ie-flexbox-fix', function() {
        clearTimeout(IEResizeTimeout);

        IEResizeTimeout = setTimeout(function() {
          var wh = $window.height();

          $main.each(function() {
            var $this = $(this);

            $this.css('height', '');

            if ($this.height() <= wh) $this.css('height', wh - 50 + 'px');
          });
        });
      })
      .triggerHandler('resize.ie-flexbox-fix');
  }

  // Gallery.
  $window.on('load', function() {
    var $gallery = $('.gallery');

    $gallery.poptrox({
      baseZIndex: 10001,
      useBodyOverflow: false,
      usePopupEasyClose: false,
      overlayColor: '#1f2328',
      overlayOpacity: 0.65,
      usePopupDefaultStyling: false,
      usePopupCaption: true,
      popupLoaderText: '',
      windowMargin: 50,
      usePopupNav: true
    });

    // Hack: Adjust margins when 'small' activates.
    breakpoints.on('>small', function() {
      $gallery.each(function() {
        $(this)[0]._poptrox.windowMargin = 50;
      });
    });

    breakpoints.on('<=small', function() {
      $gallery.each(function() {
        $(this)[0]._poptrox.windowMargin = 5;
      });
    });
  });

  // Section transitions.
  if (browser.canUse('transition')) {
    var on = function() {
      // Galleries.
      $('.gallery').scrollex({
        top: '30vh',
        bottom: '30vh',
        delay: 50,
        initialize: function() {
          $(this).addClass('inactive');
        },
        terminate: function() {
          $(this).removeClass('inactive');
        },
        enter: function() {
          $(this).removeClass('inactive');
        },
        leave: function() {
          $(this).addClass('inactive');
        }
      });

      // Generic sections.
      $('.main.style1').scrollex({
        mode: 'middle',
        delay: 100,
        initialize: function() {
          $(this).addClass('inactive');
        },
        terminate: function() {
          $(this).removeClass('inactive');
        },
        enter: function() {
          $(this).removeClass('inactive');
        },
        leave: function() {
          $(this).addClass('inactive');
        }
      });

      $('.main.style2').scrollex({
        mode: 'middle',
        delay: 100,
        initialize: function() {
          $(this).addClass('inactive');
        },
        terminate: function() {
          $(this).removeClass('inactive');
        },
        enter: function() {
          $(this).removeClass('inactive');
        },
        leave: function() {
          $(this).addClass('inactive');
        }
      });

      // Contact.
      $('#contact').scrollex({
        top: '50%',
        delay: 50,
        initialize: function() {
          $(this).addClass('inactive');
        },
        terminate: function() {
          $(this).removeClass('inactive');
        },
        enter: function() {
          $(this).removeClass('inactive');
        },
        leave: function() {
          $(this).addClass('inactive');
        }
      });
    };

    var off = function() {
      // Galleries.
      $('.gallery').unscrollex();

      // Generic sections.
      $('.main.style1').unscrollex();

      $('.main.style2').unscrollex();

      // Contact.
      $('#contact').unscrollex();
    };

    breakpoints.on('<=small', off);
    breakpoints.on('>small', on);
  }

  // Events.
  var resizeTimeout, resizeScrollTimeout;

  $window
    .on('resize', function() {
      // Disable animations/transitions.
      $body.addClass('is-resizing');

      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(function() {
        // Update scrolly links.
        $('a[href^="#"]').scrolly({
          speed: 1500,
          offset: $header.outerHeight() - 1
        });

        // Re-enable animations/transitions.
        setTimeout(function() {
          $body.removeClass('is-resizing');
          $window.trigger('scroll');
        }, 0);
      }, 100);
    })
    .on('load', function() {
      $window.trigger('resize');
    });
})(jQuery);

// MUSIC PLAYER

// audioPlayer();
function audioPlayer() {
  let currentSong = 0;

  $('#audioPlayer')[0].src = $('#playlist li a')[0];
  $('#audioPlayer')[0].play();
  $('#playlist li a').click(function(e) {
    e.preventDefault();
    $('#audioPlayer')[0].src = this;
    $('#audioPlayer')[0].play();
    $('#playlist li').removeClass('current-song');
    currentSong = $(this)
      .parent()
      .index();
    $(this)
      .parent()
      .addClass('current-song');
  });

  $('#audioPlayer')[0].addEventListener('ended', function() {
    currentSong++;
    if (currentSong == $('#playlist li a').length) {
      currentSong = 0;
    }
    $('#playlist li').removeClass('current-song');
    $('#playlist li:eq(' + currentSong + ')').addClass('current-song');
    $('#audioPlayer')[0].src = $('#playlist li a')[currentSong].href;
    $('#audioPlayer')[0].play();
  });
}

// function playTrack() {
//   console.log('!!! play track !!!');
//   $('#audioPlayer')[0].play();
// }
