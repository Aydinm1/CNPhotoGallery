var fs_body = jQuery('body');
jQuery.fn.fs_gallery = function (fs_options) {
    if (fs_options.slides.length > 1) {
        var fs_interval = setInterval('nextSlide()', fs_options.slide_time);
    }
    if (fs_options.thmb_state == 'off') {
        set_state = "fs_hide";
    } else {
        set_state = "";
    }
    if (fs_options.autoplay == 0) {
        playpause = "fs_play";
        clearInterval(fs_interval);
    } else {
        playpause = "fs_pause";
    }
    fs_body.append('<div class="fs_gallery_wrapper"><ul class="' + fs_options.fit + ' fs_gallery_container ' + fs_options.fx + '"/></div>');
    fs_container = jQuery('.fs_gallery_container');
    fs_body.append('<div class="fs_title_wrapper ' + set_state + '"><h1 class="fs_title"></h1><h3 class="fs_descr"></h3></div>');
    if (fs_options.slides.length > 1) {
        // add a fullscreen toggle button next to play/pause
        fs_body.append('<div class="controls_wrapper">' +
            '<a href="javascript:void(0)" class="fs_slider_prev"></a>' +
            '<a href="javascript:void(0)" id="fs_play-pause" class="' + playpause + '"></a>' +
            '<a href="javascript:void(0)" class="fs_fullscreen" title="Toggle Fullscreen"></a>' +
            '<a href="javascript:void(0)" class="fs_slider_next"></a>' +
            '</div>');
    }
    fs_body.append('<div class="fs_thmb_viewport ' + set_state + '"><div class="thmb-left"></div><div class="thmb-right"></div><div class="fs_thmb_wrapper"><ul class="fs_thmb_list" style="width:' + fs_options.slides.length * 80 + 'px"></ul</div></div>');
    fs_thmb = jQuery('.fs_thmb_list');
    if (fs_options.autoplay == 0) {
        fs_thmb.addClass('paused');
    }
    fs_thmb_viewport = jQuery('.fs_thmb_viewport');
    $fs_title = jQuery('.fs_title');
    $fs_descr = jQuery('.fs_descr');

    thisSlide = 0;
    while (thisSlide <= fs_options.slides.length - 1) {
        if (fs_options.slides[thisSlide].type == "image") {
            fs_container.append('<li class="fs_slide slide' + thisSlide + '" data-count="' + thisSlide + '" data-src="' + fs_options.slides[thisSlide].image + '" data-type="' + fs_options.slides[thisSlide].type + '"></li>');
        } else if (fs_options.slides[thisSlide].type == "youtube") {
            fs_container.append('<li class="fs_slide yt_slide video_slide slide' + thisSlide + '" data-count="' + thisSlide + '" data-bg="' + fs_options.slides[thisSlide].thmb + '" data-src="' + fs_options.slides[thisSlide].src + '" data-type="' + fs_options.slides[thisSlide].type + '"></li>');
        } else if (fs_options.slides[thisSlide].type == "mp4") {
            fs_container.append('<li class="fs_slide video_slide slide' + thisSlide + '" data-count="' + thisSlide + '" data-src="' + fs_options.slides[thisSlide].src + '" data-bg="' + (fs_options.slides[thisSlide].thmb || '') + '" data-type="mp4"></li>');
        } else {
            fs_container.append('<li class="fs_slide video_slide slide' + thisSlide + '" data-id="player' + fs_options.slides[thisSlide].uniqid + '" data-count="' + thisSlide + '" data-bg="' + fs_options.slides[thisSlide].thmb + '" data-src="' + fs_options.slides[thisSlide].src + '" data-type="' + fs_options.slides[thisSlide].type + '"></li>');
        }

        if (fs_options.slides[thisSlide].type == "image") {
            fs_thmb.append('<li class="fs_slide_thmb slide' + thisSlide + '" data-count="' + thisSlide + '"><img alt="' + fs_options.slides[thisSlide].alt + ' ' + thisSlide + '" src="' + fs_options.slides[thisSlide].thmb + '"/><div class="fs_thmb_fadder"></div></li>');
        } else if (fs_options.slides[thisSlide].type == "youtube") {
            fs_thmb.append('<li class="fs_slide_thmb video_thmb yt_thmb slide' + thisSlide + '" data-count="' + thisSlide + '"><img alt="' + fs_options.slides[thisSlide].alt + ' ' + thisSlide + '" src="' + fs_options.slides[thisSlide].thmb + '"/><div class="fs_thmb_fadder"></div></li>');
        } else {
            fs_thmb.append('<li class="fs_slide_thmb video_thmb slide' + thisSlide + '" data-count="' + thisSlide + '"><img alt="' + fs_options.slides[thisSlide].alt + ' ' + thisSlide + '" src="' + fs_options.slides[thisSlide].thmb + '"/><div class="fs_thmb_fadder"></div></li>');
        }
        thisSlide++;
    }
    jQuery('li.slide0').addClass('current-slide');

    firstObj = fs_container.find('li.slide0');
    fNextObj = fs_container.find('li.slide1');
    var gallery_fixer = 0;

	if (jQuery('.gallery_post_controls').size() > 0) {
        gallery_fixer = jQuery('.gallery_post_controls').find('a').size()*65 + parseInt(jQuery('.gallery_post_controls').css('right'));
		console.log(gallery_fixer);
    }

    if (firstObj.attr('data-type') == 'image') {
        firstObj.attr('style', 'background:url(' + fs_container.find('li.slide0').attr('data-src') + ') no-repeat;');
    } else if (firstObj.attr('data-type') == 'youtube') {
        firstObj.attr('style', 'background:url(' + fs_options.slides[0].thmb + ') no-repeat;');
        firstObj.append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + fs_options.slides[0].src + '?controls=0&autoplay=0&showinfo=0&modestbranding=1&wmode=opaque&rel=0&hd=1&disablekb=1" frameborder="0" allowfullscreen></iframe>');
    } else if (firstObj.attr('data-type') == 'mp4') {
        firstObj.attr('style', 'background:url(' + fs_options.slides[0].thmb + ') no-repeat;');
        var v0 = jQuery('<video width="100%" height="100%" playsinline muted controls preload="metadata"></video>');
        v0.attr('src', fs_options.slides[0].src);
        firstObj.append(v0);
        try { v0.get(0).play(); } catch (e) { console.warn('MP4 autoplay blocked or failed for first slide', e); }
        v0.on('ended', function () {
            try {
                firstObj.attr('style', '');
                v0.remove();
                setTimeout(function () { nextSlide(); }, 50);
            } catch (e) { console.warn('nextSlide error on ended (first slide)', e); }
        });
    } else {
        firstObj.attr('style', 'background:url(' + fs_options.slides[0].thmb + ') no-repeat;');
        firstObj.append('<iframe src="https://player.vimeo.com/video/' + fs_options.slides[0].src + '?autoplay=0&loop=0&api=1&player_id=player' + fs_options.slides[0].uniqid + '" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
    }
    if (fs_options.slides.length > 1) {
        if (fNextObj.attr('data-type') == 'image') {
            fNextObj.attr('style', 'background:url(' + fs_container.find('li.slide1').attr('data-src') + ') no-repeat;');
        } else if (fNextObj.attr('data-type') == 'youtube') {
            fNextObj.attr('style', 'background:url(' + fs_options.slides[1].thmb + ') no-repeat;');
            fNextObj.append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + fs_options.slides[1].src + '?controls=0&autoplay=0&showinfo=0&modestbranding=1&wmode=opaque&rel=0&hd=1&disablekb=1" frameborder="0" allowfullscreen></iframe>');
        } else if (fNextObj.attr('data-type') == 'mp4') {
            fNextObj.attr('style', 'background:url(' + fs_options.slides[1].thmb + ') no-repeat;');
            // do not auto-insert video for nextObj to avoid multiple players; background is enough
        } else {
            fNextObj.attr('style', 'background:url(' + fs_options.slides[1].thmb + ') no-repeat;');
            firstObj.append('<iframe src="https://player.vimeo.com/video/' + fs_options.slides[1].src + '?autoplay=0&loop=0&api=1&player_id=player' + fs_options.slides[1].uniqid + '" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
        }
    }

    if (jQuery(window).width() > 1024) {
        if (jQuery('iframe').size() > 0) {
            if (((window_h + 150) / 9) * 16 > window_w) {
                jQuery('iframe').height(window_h + 150).width(((window_h + 150) / 9) * 16);
                jQuery('iframe').css({
                    'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
                    'top': "-75px",
                    'margin-top': '0px'
                });
            } else {
                jQuery('iframe').width(window_w).height(((window_w) / 16) * 9);
                jQuery('iframe').css({
                    'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
                    'margin-top': (-1 * jQuery('iframe').height() / 2) + 'px',
                    'top': '50%'
                });
            }
        }
    } else if (jQuery(window).width() < 760) {
            jQuery('iframe').height(window_h).width(window_w).css({
                'top': '0px',
                'margin-left': -1 * window_w / 2,
                'margin-top': '0px'
            });
	} else {
                jQuery('iframe').height(window_h).width(window_w).css({
                    'top': '0px',
                    'margin-left' : '0px',
                    'left' : '0px',
                    'margin-top': '0px'
                });
	}

    $fs_title.html(fs_options.slides[0].title).css('color', fs_options.slides[0].titleColor);
    $fs_descr.html(fs_options.slides[0].description).css('color', fs_options.slides[0].descriptionColor);

    if (jQuery('.gallery_post_controls').size() > 0) {
        fs_thmb_viewport.width(window_w - parseInt(fs_thmb_viewport.css('left')) - gallery_fixer);
    } else {
        fs_thmb_viewport.width(window_w - parseInt(fs_thmb_viewport.css('left')));
    }

    if (fs_options.slides.length > 1) {

        jQuery('.fs_slide_thmb').click(function () {
            goToSlide(parseInt(jQuery(this).attr('data-count')));
        });
        jQuery('.fs_slider_prev').click(function () {
            prevSlide();
        });
        jQuery('.fs_slider_next').click(function () {
            nextSlide();
        });

        jQuery(document.documentElement).keyup(function (event) {
            if ((event.keyCode == 37) || (event.keyCode == 40)) {
                prevSlide();
            } else if ((event.keyCode == 39) || (event.keyCode == 38)) {
                nextSlide();
            }
        });

        jQuery('#fs_play-pause').click(function () {
            if (jQuery(this).hasClass('fs_pause')) {
                fs_thmb.addClass('paused');
                jQuery(this).removeClass('fs_pause').addClass('fs_play');
                clearInterval(fs_interval);
            } else {
                fs_thmb.removeClass('paused');
                jQuery(this).removeClass('fs_play').addClass('fs_pause');
                fs_interval = setInterval('nextSlide()', fs_options.slide_time);
            }
        });

        // Fullscreen toggle handler
        jQuery('.fs_fullscreen').click(function () {
            var el = document.querySelector('.fs_gallery_wrapper');
            if (!el) return;
            var isFull = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            if (!isFull) {
                if (el.requestFullscreen) el.requestFullscreen();
                else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
                else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                else if (el.msRequestFullscreen) el.msRequestFullscreen();
                jQuery('html').addClass('is-fullscreen');
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                else if (document.msExitFullscreen) document.msExitFullscreen();
                jQuery('html').removeClass('is-fullscreen');
            }
        });

        // Keep html.is-fullscreen in sync with native fullscreenchange events
        function fsChange() {
            var isFullNow = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            if (isFullNow) jQuery('html').addClass('is-fullscreen');
            else jQuery('html').removeClass('is-fullscreen');
        }
        document.addEventListener('fullscreenchange', fsChange);
        document.addEventListener('webkitfullscreenchange', fsChange);
        document.addEventListener('mozfullscreenchange', fsChange);
        document.addEventListener('MSFullscreenChange', fsChange);

        // Show controls on mouse movement while in fullscreen. Hide after inactivity.
        (function () {
            var controlsTimer = null;
            var HIDE_MS = 2000;

            function showControlsForAWhile() {
                try {
                    jQuery('html').addClass('show-controls');
                    if (controlsTimer) clearTimeout(controlsTimer);
                    controlsTimer = setTimeout(function () {
                        jQuery('html').removeClass('show-controls');
                    }, HIDE_MS);
                } catch (e) {
                    console.warn('showControlsForAWhile error', e);
                }
            }

            // Keep controls visible while the cursor is over the gallery element
            var galleryEl = document.querySelector('.fs_gallery_wrapper');
            if (galleryEl) {
                galleryEl.addEventListener('mouseenter', function () {
                    try {
                        if (controlsTimer) clearTimeout(controlsTimer);
                        jQuery('html').addClass('show-controls');
                    } catch (e) { console.warn('gallery mouseenter error', e); }
                }, { passive: true });

                galleryEl.addEventListener('mouseleave', function () {
                    try {
                        if (controlsTimer) clearTimeout(controlsTimer);
                        controlsTimer = setTimeout(function () { jQuery('html').removeClass('show-controls'); }, HIDE_MS);
                    } catch (e) { console.warn('gallery mouseleave error', e); }
                }, { passive: true });
            }

            // Listen for mouse/pointer/touch move and show controls if in fullscreen
            function onPointerEvent() {
                var galleryExists = document.querySelector('.fs_gallery_wrapper');
                if (!galleryExists) return;
                showControlsForAWhile();
            }

            // Attach a document-level pointer/mouse listener so normal fullscreen and normal pages work
            document.addEventListener('mousemove', onPointerEvent, { passive: true });
            document.addEventListener('pointermove', onPointerEvent, { passive: true });
            document.addEventListener('touchstart', onPointerEvent, { passive: true });

            // When entering fullscreen, attach the same handlers directly to the fullscreen element
            // Some browsers (Chrome) route pointer events to the fullscreen element (video/iframe)
            var _fsAttachedEl = null;
            function attachToFullscreenElement() {
                try {
                    var el = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
                    // remove listeners from previous element
                    if (_fsAttachedEl && _fsAttachedEl !== el) {
                        _fsAttachedEl.removeEventListener('pointermove', onPointerEvent);
                        _fsAttachedEl.removeEventListener('mousemove', onPointerEvent);
                        _fsAttachedEl.removeEventListener('touchstart', onPointerEvent);
                        _fsAttachedEl = null;
                    }
                    if (el && _fsAttachedEl !== el) {
                        el.addEventListener('pointermove', onPointerEvent, { passive: true });
                        el.addEventListener('mousemove', onPointerEvent, { passive: true });
                        el.addEventListener('touchstart', onPointerEvent, { passive: true });
                        _fsAttachedEl = el;
                    }
                    // always reveal controls immediately on fullscreen change
                    var galleryExists = document.querySelector('.fs_gallery_wrapper');
                    if (galleryExists) showControlsForAWhile();
                } catch (e) {
                    console.warn('attachToFullscreenElement error', e);
                }
            }

            document.addEventListener('fullscreenchange', attachToFullscreenElement);
            document.addEventListener('webkitfullscreenchange', attachToFullscreenElement);
            document.addEventListener('mozfullscreenchange', attachToFullscreenElement);
            document.addEventListener('MSFullscreenChange', attachToFullscreenElement);
        })();
    }
    /* N E X T   S L I D E */
    nextSlide = function () {
        clearInterval(fs_interval);
        thisSlide = parseInt(fs_container.find('.current-slide').attr('data-count'));
        fs_container.find('.slide' + thisSlide).find('iframe, video').remove();
        thisSlide++;
        cleanSlide = thisSlide - 2;
        nxtSlide = thisSlide + 1;
        if (thisSlide == fs_container.find('li').size()) {
            thisSlide = 0;
            cleanSlide = fs_container.find('li').size() - 3;
            nxtSlide = thisSlide + 1;
        }
        if (thisSlide == 1) {
            cleanSlide = fs_container.find('li').size() - 2;
        }
        $fs_title.fadeOut(300);
        $fs_descr.fadeOut(300, function () {
            $fs_title.html(fs_options.slides[thisSlide].title).css('color', fs_options.slides[thisSlide].titleColor);
            $fs_descr.html(fs_options.slides[thisSlide].description).css('color', fs_options.slides[thisSlide].descriptionColor);
            $fs_title.fadeIn(300);
            $fs_descr.fadeIn(300);
        });

        currentObj = fs_container.find('.slide' + thisSlide);
        nextObj = fs_container.find('.slide' + nxtSlide);

        fs_container.find('.slide' + cleanSlide).attr('style', '');
        if (currentObj.attr('data-type') == 'image') {
            currentObj.attr('style', 'background:url(' + currentObj.attr('data-src') + ') no-repeat;');
            } else if (currentObj.attr('data-type') == 'youtube') {
            currentObj.attr('style', 'background:url(' + currentObj.attr('data-bg') + ') no-repeat;');
            currentObj.append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + currentObj.attr('data-src') + '?controls=0&autoplay=1&showinfo=0&modestbranding=1&wmode=opaque&rel=0&hd=1&disablekb=1" frameborder="0" allowfullscreen></iframe>');
            } else if (currentObj.attr('data-type') == 'mp4') {
                // For mp4 slides do NOT show the thumbnail as a background (prevents flash before/after)
                // Set a neutral background and make container positioned so the video can fill it
                currentObj.attr('style', 'background-color:#000; position:relative; overflow:hidden;');
                // Insert HTML5 video element (do not loop so we can advance when it ends)
                var v = jQuery('<video width="100%" height="100%" playsinline muted controls preload="metadata"></video>');
                v.attr('src', currentObj.attr('data-src'));
                // Make the video absolutely fill the slide and cover any aspect difference
                v.css({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 'object-fit': 'cover' });
                currentObj.append(v);
                // stop the slide interval while video plays
                try { if (typeof fs_interval !== 'undefined') clearInterval(fs_interval); } catch (e) {}
                // attempt to play and advance to nextSlide when it ends
                try {
                    v.get(0).play();
                } catch (e) {
                    console.warn('MP4 autoplay blocked or failed', e);
                }
                v.on('ended', function () {
                    try {
                        // remove video and clear styling before advancing to avoid showing thumbnail
                        v.remove();
                        currentObj.attr('style', 'background-color:#000; position:relative; overflow:hidden;');
                        setTimeout(function () { nextSlide(); }, 50);
                    } catch (e) { console.warn('nextSlide error on ended', e); }
                });
            } else {
            currentObj.attr('style', 'background:url(' + currentObj.attr('data-bg') + ') no-repeat;');
            currentObj.append(jQuery('<iframe width="100%" height="100%" src="https://player.vimeo.com/video/' + currentObj.attr('data-src') + '?api=1&amp;title=0&amp;byline=0&amp;portrait=0&autoplay=1&loop=0&controls=0&player_id=' + currentObj.attr('data-id') + '" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>').attr('id', currentObj.attr('data-id')));
        }

        if (nextObj.attr('data-type') == 'image') {
            nextObj.attr('style', 'background:url(' + nextObj.attr('data-src') + ') no-repeat;');
            } else if (fNextObj.attr('data-type') == 'youtube') {
            fNextObj.attr('style', 'background:url(' + fNextObj.attr('data-bg') + ') no-repeat;');
        } else {
            nextObj.attr('style', 'background:url(' + nextObj.attr('data-bg') + ') no-repeat;');
        }
        jQuery('.current-slide').removeClass('current-slide');
        jQuery('.slide' + thisSlide).addClass('current-slide');

        if (jQuery(window).width() > 1024) {
            if (jQuery('iframe').size() > 0) {
                if (((window_h + 150) / 9) * 16 > window_w) {
                    jQuery('iframe').height(window_h + 150).width(((window_h + 150) / 9) * 16);
                    jQuery('iframe').css({
                        'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
                        'top': "-75px",
                        'margin-top': '0px'
                    });
                } else {
                    jQuery('iframe').width(window_w).height(((window_w) / 16) * 9);
                    jQuery('iframe').css({
                        'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
                        'margin-top': (-1 * jQuery('iframe').height() / 2) + 'px',
                        'top': '50%'
                    });
                }
            }
        } else if (jQuery(window).width() < 760) {
            jQuery('iframe').height(window_h).width(window_w).css({
                'top': '0px',
                'margin-left': -1 * window_w / 2,
                'margin-top': '0px'
            });
        }
	
        /*SETUP VIDEO*/
        if (jQuery(window).width() > 1024) {
            if (jQuery('iframe').size() > 0) {
                if (((window_h + 150) / 9) * 16 > window_w) {
                    jQuery('iframe').height(window_h + 150).width(((window_h + 150) / 9) * 16);
                    jQuery('iframe').css({
                        'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
                        'top': "-75px",
                        'margin-top': '0px'
                    });
                } else {
                    jQuery('iframe').width(window_w).height(((window_w) / 16) * 9);
                    jQuery('iframe').css({
                        'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
                        'margin-top': (-1 * jQuery('iframe').height() / 2) + 'px',
                        'top': '50%'
                    });
                }
            }
        } else if (jQuery(window).width() < 760) {
            jQuery('iframe').height(window_h).width(window_w).css({
                'top': '0px',
                'margin-left': -1 * window_w / 2,
                'margin-top': '0px'
            });
        } else {
                    jQuery('iframe').height(window_h).width(window_w).css({
                        'top': '0px',
                        'margin-left': '0px',
                        'left': '0px',
                        'margin-top': '0px'
                    });
		}
        if (!fs_thmb.hasClass('paused') && currentObj.attr('data-type') == 'image') {
            fs_interval = setInterval('nextSlide()', fs_options.slide_time);
        }		
    }

    /* P R E V I O U S   S L I D E */
    prevSlide = function () {
        clearInterval(fs_interval);
        thisSlide = parseInt(fs_container.find('.current-slide').attr('data-count'));
        fs_container.find('.slide' + thisSlide).find('iframe, video').remove();
        thisSlide--;
        nxtSlide = thisSlide - 1;
        cleanSlide = thisSlide + 2;
        if (thisSlide < 0) {
            thisSlide = fs_container.find('li').size() - 1;
            cleanSlide = 1;
        }
        if (thisSlide == fs_container.find('li').size() - 2) {
            cleanSlide = 0;
        }
        $fs_title.fadeOut(300);
        $fs_descr.fadeOut(300, function () {
            $fs_title.html(fs_options.slides[thisSlide].title).css('color', fs_options.slides[thisSlide].titleColor);
            $fs_descr.html(fs_options.slides[thisSlide].description).css('color', fs_options.slides[thisSlide].descriptionColor);
            $fs_title.fadeIn(300);
            $fs_descr.fadeIn(300);
        });

        currentObj = fs_container.find('.slide' + thisSlide);
        nextObj = fs_container.find('.slide' + nxtSlide);

        fs_container.find('.slide' + cleanSlide).attr('style', '');
        if (currentObj.attr('data-type') == 'image') {
            currentObj.attr('style', 'background:url(' + currentObj.attr('data-src') + ') no-repeat;');
        } else if (currentObj.attr('data-type') == 'youtube') {
            currentObj.attr('style', 'background:url(' + nextObj.attr('data-bg') + ') no-repeat;');
            currentObj.append('<iframe width="100%" height="100%" src="http://www.youtube.com/embed/' + currentObj.attr('data-src') + '?controls=0&autoplay=1&showinfo=0&modestbranding=1&wmode=opaque&rel=0&hd=1&disablekb=1" frameborder="0" allowfullscreen></iframe>');
        } else if (currentObj.attr('data-type') == 'mp4') {
            currentObj.attr('style', 'background-color:#000; position:relative; overflow:hidden;');
            var v = jQuery('<video width="100%" height="100%" playsinline muted controls preload="metadata"></video>');
            v.attr('src', currentObj.attr('data-src'));
            v.css({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 'object-fit': 'cover' });
            currentObj.append(v);
            try { if (typeof fs_interval !== 'undefined') clearInterval(fs_interval); } catch (e) {}
            try { v.get(0).play(); } catch (e) { console.warn('MP4 autoplay blocked or failed (prevSlide)', e); }
            v.on('ended', function () {
                try {
                    v.remove();
                    currentObj.attr('style', 'background-color:#000; position:relative; overflow:hidden;');
                    setTimeout(function () { nextSlide(); }, 50);
                } catch (e) { console.warn('nextSlide error on ended', e); }
            });
        } else {
            currentObj.attr('style', 'background:url(' + currentObj.attr('data-bg') + ') no-repeat;');
            currentObj.append(jQuery('<iframe width="100%" height="100%" src="http://player.vimeo.com/video/' + currentObj.attr('data-src') + '?api=1&amp;title=0&amp;byline=0&amp;portrait=0&autoplay=1&loop=0&controls=0&player_id=' + currentObj.attr('data-id') + '" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>').attr('id', currentObj.attr('data-id')));
        }

        if (nextObj.attr('data-type') == 'image') {
            nextObj.attr('style', 'background:url(' + nextObj.attr('data-src') + ') no-repeat;');
            } else if (fNextObj.attr('data-type') == 'youtube') {
            fNextObj.attr('style', 'background:url(' + fNextObj.attr('data-bg') + ') no-repeat;');
            fNextObj.append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + fNextObj.attr('data-src') + '?controls=0&autoplay=0&showinfo=0&modestbranding=1&wmode=opaque&rel=0&hd=1&disablekb=1" frameborder="0" allowfullscreen></iframe>');
            nextObj.attr('style', 'background:url(' + nextObj.attr('data-bg') + ') no-repeat;');
        }
        jQuery('.current-slide').removeClass('current-slide');
        jQuery('.slide' + thisSlide).addClass('current-slide');

        if (jQuery(window).width() > 1024) {
            if (jQuery('iframe').size() > 0) {
                if (((window_h + 150) / 9) * 16 > window_w) {
                    jQuery('iframe').height(window_h + 150).width(((window_h + 150) / 9) * 16);
                    jQuery('iframe').css({
                        'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
                        'top': "-75px",
                        'margin-top': '0px'
                    });
                } else {
                    jQuery('iframe').width(window_w).height(((window_w) / 16) * 9);
                    jQuery('iframe').css({
                        'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
                        'margin-top': (-1 * jQuery('iframe').height() / 2) + 'px',
                        'top': '50%'
                    });
                }
            }
        } else if (jQuery(window).width() < 760) {
            jQuery('iframe').height(window_h).width(window_w).css({
                'top': '0px',
                'margin-left': -1 * window_w / 2,
                'margin-top': '0px'
            });
        } else {
                    jQuery('iframe').height(window_h).width(window_w).css({
                        'top': '0px',
                        'margin-left': '0px',
                        'left': '0px',
                        'margin-top': '0px'
                    });
		}

        jQuery('.current-slide').removeClass('current-slide');
        jQuery('.slide' + thisSlide).addClass('current-slide');

        if (!fs_thmb.hasClass('paused') && currentObj.attr('data-type') == 'image') {
            fs_interval = setInterval('nextSlide()', fs_options.slide_time);
        }
    }

    /* S E L E C T   S L I D E */
    goToSlide = function (set_slide) {
        clearInterval(fs_interval);
        oldSlide = parseInt(fs_container.find('.current-slide').attr('data-count'));
        thisSlide = set_slide;

        $fs_title.fadeOut(300);
        $fs_descr.fadeOut(300, function () {
            $fs_title.html(fs_options.slides[thisSlide].title).css('color', fs_options.slides[thisSlide].titleColor);
            $fs_descr.html(fs_options.slides[thisSlide].description).css('color', fs_options.slides[thisSlide].descriptionColor);
            $fs_title.fadeIn(300);
            $fs_descr.fadeIn(300);
        });

        fs_container.find('.fs_slide').attr('style', '');
        fs_container.find('.fs_slide').find('iframe, video').remove();
        currentObj = fs_container.find('.slide' + thisSlide);
        if (currentObj.attr('data-type') == 'image') {
            currentObj.attr('style', 'background:url(' + currentObj.attr('data-src') + ') no-repeat;');
        } else if (currentObj.attr('data-type') == 'youtube') {
            currentObj.attr('style', 'background:url(' + currentObj.attr('data-bg') + ') no-repeat;');
            currentObj.append('<iframe width="100%" height="100%" src="http://www.youtube.com/embed/' + currentObj.attr('data-src') + '?controls=0&autoplay=1&showinfo=0&modestbranding=1&wmode=opaque&rel=0&hd=1&disablekb=1" frameborder="0" allowfullscreen></iframe>');
        } else if (currentObj.attr('data-type') == 'mp4') {
            currentObj.attr('style', 'background-color:#000; position:relative; overflow:hidden;');
            var v = jQuery('<video width="100%" height="100%" playsinline muted controls preload="metadata"></video>');
            v.attr('src', currentObj.attr('data-src'));
            v.css({ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 'object-fit': 'cover' });
            currentObj.append(v);
            try { if (typeof fs_interval !== 'undefined') clearInterval(fs_interval); } catch (e) {}
            try { v.get(0).play(); } catch (e) { console.warn('MP4 autoplay blocked or failed (goToSlide)', e); }
            v.on('ended', function () {
                try {
                    v.remove();
                    currentObj.attr('style', 'background-color:#000; position:relative; overflow:hidden;');
                    setTimeout(function () { nextSlide(); }, 50);
                } catch (e) { console.warn('nextSlide error on ended', e); }
            });
        } else {
            currentObj.attr('style', 'background:url(' + currentObj.attr('data-bg') + ') no-repeat;');
            currentObj.append(jQuery('<iframe width="100%" height="100%" src="http://player.vimeo.com/video/' + currentObj.attr('data-src') + '?api=1&amp;title=0&amp;byline=0&amp;portrait=0&autoplay=1&loop=0&controls=0&player_id=' + currentObj.attr('data-id') + '" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>').attr('id', currentObj.attr('data-id')));
        }

        jQuery('.current-slide').removeClass('current-slide');
        jQuery('.slide' + thisSlide).addClass('current-slide');

        if (!fs_thmb.hasClass('paused') && currentObj.attr('data-type') == 'image') {
            fs_interval = setInterval('nextSlide()', fs_options.slide_time);
        }

        /*SETUP VIDEO*/
        if (jQuery(window).width() > 1024) {
            if (jQuery('iframe').size() > 0) {
                if (((window_h + 150) / 9) * 16 > window_w) {
                    jQuery('iframe').height(window_h + 150).width(((window_h + 150) / 9) * 16);
                    jQuery('iframe').css({
                        'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
                        'top': "-75px",
                        'margin-top': '0px'
                    });
                } else {
                    jQuery('iframe').width(window_w).height(((window_w) / 16) * 9);
                    jQuery('iframe').css({
                        'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
                        'margin-top': (-1 * jQuery('iframe').height() / 2) + 'px',
                        'top': '50%'
                    });
                }
            }
        } else if (jQuery(window).width() < 760) {
            jQuery('iframe').height(window_h).width(window_w).css({
                'top': '0px',
                'margin-left': -1 * window_w / 2,
                'margin-top': '0px'
            });
        } else {
            jQuery('iframe').height(window_h).width(window_w).css({
                'top': '0px',
                'margin-left' : '0px',
                'left' : '0px',
                'margin-top': '0px'
            });
        }
    }
}

var max_left = 0,
max_right = jQuery('.fs_thmb_viewport').width() - jQuery('.fs_thmb_list').width(),
step = 80,
intRuned = false;

jQuery(document).ready(function ($) {
	html.addClass('no-thmb-left');
	if (jQuery('.gallery_post_controls').size() > 0) {
		jQuery('.gallery_post_controls').width(jQuery('.gallery_post_controls').find('a').size()*65);
	}
    var fs_thmb_list = $('.fs_thmb_list');
    fs_thmb_list.mousedown(function () {
        fs_thmb_list.addClass('clicked');
    });
    fs_thmb_list.mouseup(function () {
        fs_thmb_list.removeClass('clicked');
    });

	setw = Math.floor((window_w - (jQuery('.gallery_post_controls').find('a').size()*65) - parseInt(jQuery('.fs_thmb_viewport').css('left'))- parseInt(jQuery('.gallery_post_controls').css('right')))/80)*80;	
	jQuery('.fs_thmb_viewport').width(setw);
	
	if (window_w > 1200) {
		jQuery('.thmb-left').hover(function(e){
			intRuned = true;
			scrollThmbs = setInterval('scrollThmb("right")', 350);
		}, function(e) {
			if (intRuned == true) {
				clearInterval(scrollThmbs);
				intRuned = false;
			}
		});
		jQuery('.thmb-right').hover(function(e){
			intRuned = true;
			scrollThmbs = setInterval('scrollThmb("left")', 350);
		}, function(e) {
			if (intRuned == true) {
				clearInterval(scrollThmbs);
				intRuned = false;
			}
		});	
	} else {
		jQuery('.thmb-left').click(function(){
			scrollThmb("right");
		});
		jQuery('.thmb-right').click(function(){
			scrollThmb("left");
		});		
	}
	if (window_w < 760) {
		jQuery('.fs_title_wrapper').css('top', header.height());
	}
});

function scrollThmb(dir) {
	var max_left = 0,
	max_right = jQuery('.fs_thmb_viewport').width() - jQuery('.fs_thmb_list').width(),
	step = 80;

	if (dir == 'left') {
		setStep = Math.floor((parseInt(jQuery('.fs_thmb_list').css('left'))-step)/80)*80;
		if (setStep <= max_right) {
			jQuery('.fs_thmb_list').css('left', max_right+'px');
			html.addClass('no-thmb-right');
			html.removeClass('no-thmb-left');
			clearInterval(scrollThmbs);			
		} else {
			jQuery('.fs_thmb_list').css('left', setStep+'px');
			html.removeClass('no-thmb-right');
			html.removeClass('no-thmb-left');
		}
	} else {
		setStep = Math.floor((parseInt(jQuery('.fs_thmb_list').css('left'))+step)/80)*80;
		if (setStep >= 0) {
			jQuery('.fs_thmb_list').css('left', '0px');
			html.addClass('no-thmb-left');
			html.removeClass('no-thmb-right');
			clearInterval(scrollThmbs);
		} else {			
			jQuery('.fs_thmb_list').css('left', setStep+'px');
			html.removeClass('no-thmb-right');
			html.removeClass('no-thmb-left');			
		}		
	}
}

jQuery(window).resize(function () {
	setw = Math.floor((window_w - (jQuery('.gallery_post_controls').find('a').size()*65) - parseInt(jQuery('.fs_thmb_viewport').css('left'))- parseInt(jQuery('.gallery_post_controls').css('right')))/80)*80;
	jQuery('.fs_thmb_viewport').width(setw);
    if (jQuery(window).width() > 1024) {
        if (jQuery('iframe').size() > 0) {
            if (((window_h + 150) / 9) * 16 > window_w) {
                jQuery('iframe').height(window_h + 150).width(((window_h + 150) / 9) * 16);
                jQuery('iframe').css({
                    'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
                    'top': "-75px",
                    'margin-top': '0px'
                });
            } else {
                jQuery('iframe').width(window_w).height(((window_w) / 16) * 9);
                jQuery('iframe').css({
                    'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
                    'margin-top': (-1 * jQuery('iframe').height() / 2) + 'px',
                    'top': '50%'
                });
            }
        }
    } else if (jQuery(window).width() < 760) {
        jQuery('iframe').height(window_h).width(window_w).css({
            'top': '0px',
            'margin-left': -1 * window_w / 2,
            'margin-top': '0px'
        });
    } else {
        jQuery('iframe').height(window_h).width(window_w).css({
            'top': '0px',
            'margin-left' : '0px',
            'left' : '0px',
            'margin-top': '0px'
        });
    }
});