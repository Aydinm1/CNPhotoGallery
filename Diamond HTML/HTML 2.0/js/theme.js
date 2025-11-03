"use strict";

var header = jQuery('.main_header'),
    header_w = header.width() + parseInt(header.css('padding-left')) + parseInt(header.css('padding-right')),
    header_h = header.height(),
    headerWrapper = jQuery('.header_wrapper'),
    headerScroll = jQuery('.header_scroll'),
    html = jQuery('html'),
    body = jQuery('body'),
    footer = jQuery('.footer_wrapper'),
    window_h = jQuery(window).height(),
    window_w = jQuery(window).width(),
    main_wrapper = jQuery('.main_wrapper'),
    site_wrapper = jQuery('.site_wrapper'),
    preloader_block = jQuery('.preloader'),
    fullscreen_block = jQuery('.fullscreen_block'),
    is_masonry = jQuery('.is_masonry'),
    grid_portfolio_item = jQuery('.grid-portfolio-item'),
    pp_block = jQuery('.pp_block'),
    head_border = 1;

jQuery(document).ready(function ($) {
	"use strict";
    if (jQuery('.preloader').size() > 0) {
        setTimeout("jQuery('.preloader').fadeOut(500)", 1);
        setTimeout("jQuery('.peloader_logo').fadeOut(500)", 1);
    }
	
	if (body.hasClass('admin-bar') && window_w > 760) {
		jQuery('.logo').css('padding-top', parseInt(header.css('padding-top')) + jQuery('#wpadminbar').height());
    }
	
    content_update();
    var settings = {
        showArrows: false,
        autoReinitialise: true
    };
    if (window_w > 760) {
        headerScroll.jScrollPane(settings);
        headerScroll.scroll(function () {
            if (header.hasClass('hasScroll') && parseInt(headerScroll.find('.jspPane').css('top')) < 0) {
                header.addClass('top_shade');
            } else {
                header.removeClass('top_shade');
            }
            if (header.hasClass('hasScroll') && parseInt(headerScroll.find('.jspPane').css('top')) == header.find('.jspContainer').height() - header.find('.jspPane').height()) {
                header.addClass('no_bot_shade');
            } else {
                header.removeClass('no_bot_shade');
            }
        });
    }
	
	//Flickr Widget
    if (jQuery('.flickr_widget_wrapper').size() > 0) {
        jQuery('.flickr_badge_image a').each(function () {
            jQuery(this).append('<div class="flickr_fadder"></div>');
        });
    }
	
	//Main and Mobile Menu
    jQuery('.menu-item-has-children').children('a').click(function () {
        jQuery(this).next('ul').slideToggle(250);
        setTimeout("content_update()", 250);
        setTimeout("content_update()", 350);
    });
		
    header.find('.header_wrapper').append('<a href="javascript:void(0)" class="menu_toggler"></a>');
    if (jQuery('.header_filter').size() > 0) {
        jQuery('.header_filter').before('<div class="mobile_menu_wrapper"><ul class="mobile_menu container"/></div>');
    } else {
        header.append('<div class="mobile_menu_wrapper"><ul class="mobile_menu container"/></div>');
    }
    jQuery('.mobile_menu').html(header.find('.menu').html());
    jQuery('.mobile_menu_wrapper').hide();
    jQuery('.menu_toggler').click(function () {
        jQuery('.mobile_menu_wrapper').slideToggle(300);
        jQuery('.main_header').toggleClass('opened');
    });
	if (jQuery('.site_wrapper').size() > 0) {
		setTimeout("jQuery('.site_wrapper').animate({'opacity' : '1'}, 500)", 500);
	} 
	if (jQuery('.fullscreen_block').size() > 0) {
		setTimeout("jQuery('.fullscreen_block').animate({'opacity' : '1'}, 500)", 500);
	}
	
	// PrettyPhoto
	jQuery("a[rel^='prettyPhoto'], .prettyPhoto").prettyPhoto();	
	
	jQuery('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});
	
	/* NivoSlider */
	jQuery('.nivoSlider').each(function(){
		jQuery(this).nivoSlider({
			directionNav: true,
			controlNav: false,
			effect:'fade',
			pauseTime:4000,
			slices: 1
		});
	});
	
	/* Accordion & Toggle */
	jQuery('.shortcode_accordion_item_title').click(function(){
		if (!jQuery(this).hasClass('state-active')) {
			jQuery(this).parents('.shortcode_accordion_shortcode').find('.shortcode_accordion_item_body').slideUp('fast',function(){
				content_update();
			});
			jQuery(this).next().slideToggle('fast',function(){
				content_update();
			});
			jQuery(this).parents('.shortcode_accordion_shortcode').find('.state-active').removeClass('state-active');
			jQuery(this).addClass('state-active');
		}
	});
	jQuery('.shortcode_toggles_item_title').click(function(){
		jQuery(this).next().slideToggle('fast',function(){
			content_update();
		});
		jQuery(this).toggleClass('state-active');
	});

	jQuery('.shortcode_accordion_item_title.expanded_yes, .shortcode_toggles_item_title.expanded_yes').each(function( index ) {
		jQuery(this).next().slideDown('fast',function(){
			content_update();
		});
		jQuery(this).addClass('state-active');
	});

	jQuery('.shortcode_accordion_item_title.expanded_yes, .shortcode_toggles_item_title.expanded_yes').each(function( index ) {
		jQuery(this).next().slideDown('fast',function(){
			content_update();
		});
		jQuery(this).addClass('state-active');
	});
	
	/* Counter */
	if (jQuery(window).width() > 760) {						
		jQuery('.shortcode_counter').each(function(){							
			if (jQuery(this).offset().top < jQuery(window).height()) {
				if (!jQuery(this).hasClass('done')) {
					var set_count = jQuery(this).find('.stat_count').attr('data-count');
					jQuery(this).find('.stat_temp').stop().animate({width: set_count}, {duration: 3000, step: function(now) {
							var data = Math.floor(now);
							jQuery(this).parents('.counter_wrapper').find('.stat_count').html(data);
							jQuery(this).parents('.counter_wrapper').find('.counter_body').width(jQuery(this).parents('.counter_wrapper').width() - 20 - jQuery(this).parents('.counter_wrapper').find('.stat_count').width());
						}
					});	
					jQuery(this).addClass('done');
					jQuery(this).find('.stat_count');
				}							
			} else {
				jQuery(this).waypoint(function(){
					if (!jQuery(this).hasClass('done')) {
						var set_count = jQuery(this).find('.stat_count').attr('data-count');
						jQuery(this).find('.stat_temp').stop().animate({width: set_count}, {duration: 3000, step: function(now) {
								var data = Math.floor(now);
								jQuery(this).parents('.counter_wrapper').find('.stat_count').html(data);
								jQuery(this).parents('.counter_wrapper').find('.counter_body').width(jQuery(this).parents('.counter_wrapper').width() - 20 - jQuery(this).parents('.counter_wrapper').find('.stat_count').width());
							}
						});	
						jQuery(this).addClass('done');
						jQuery(this).find('.stat_count');
					}
				},{offset: 'bottom-in-view'});								
			}														
		});
	} else {
		jQuery('.shortcode_counter').each(function(){							
			var set_count = jQuery(this).find('.stat_count').attr('data-count');
			jQuery(this).find('.stat_temp').animate({width: set_count}, {duration: 3000, step: function(now) {
					var data = Math.floor(now);
					jQuery(this).parents('.counter_wrapper').find('.stat_count').html(data);
					jQuery(this).parents('.counter_wrapper').find('.counter_body').width(jQuery(this).parents('.counter_wrapper').width() - 20 - jQuery(this).parents('.counter_wrapper').find('.stat_count').width());
				}
			});
			jQuery(this).find('.stat_count');
		},{offset: 'bottom-in-view'});	
	}
	
	/* Tabs */
	jQuery('.shortcode_tabs').each(function(index) {
		/* GET ALL HEADERS */
		var i = 1;
		jQuery(this).find('.shortcode_tab_item_title').each(function(index) {
			jQuery(this).addClass('it'+i); jQuery(this).attr('whatopen', 'body'+i);
			jQuery(this).addClass('head'+i);
			jQuery(this).parents('.shortcode_tabs').find('.all_heads_cont').append(this);
			i++;
		});

		/* GET ALL BODY */
		var i = 1;
		jQuery(this).find('.shortcode_tab_item_body').each(function(index) {
			jQuery(this).addClass('body'+i);
			jQuery(this).addClass('it'+i);
			jQuery(this).parents('.shortcode_tabs').find('.all_body_cont').append(this);
			i++;
		});

		/* OPEN ON START */
		jQuery(this).find('.expand_yes').addClass('active');
		var whatopenOnStart = jQuery(this).find('.expand_yes').attr('whatopen');
		jQuery(this).find('.'+whatopenOnStart).addClass('active');
	});

	jQuery(document).on('click', '.shortcode_tab_item_title', function(){
		jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_body').removeClass('active');
		jQuery(this).parents('.shortcode_tabs').find('.shortcode_tab_item_title').removeClass('active');
		var whatopen = jQuery(this).attr('whatopen');
		jQuery(this).parents('.shortcode_tabs').find('.'+whatopen).addClass('active');
		jQuery(this).addClass('active');
		content_update();
	});
	
	/* Messagebox */
	jQuery('.shortcode_messagebox').find('.box_close').click(function(){
		jQuery(this).parents('.module_messageboxes').fadeOut(400);
	});
	
	/* Skills */
	jQuery('.chart').each(function(){
		jQuery(this).css({'font-size' : jQuery(this).parents('.skills_list').attr('data-fontsize'), 'line-height' : jQuery(this).parents('.skills_list').attr('data-size')});
		jQuery(this).find('span').css('font-size' , jQuery(this).parents('.skills_list').attr('data-fontsize'));
	});

	if (jQuery(window).width() > 760) {
		jQuery('.skill_li').waypoint(function(){							
			jQuery('.chart').each(function(){
				jQuery(this).easyPieChart({
					barColor: jQuery(this).parents('ul.skills_list').attr('data-color'),
					trackColor: jQuery(this).parents('ul.skills_list').attr('data-bg'),
					scaleColor: false,
					lineCap: 'square',
					lineWidth: parseInt(jQuery(this).parents('ul.skills_list').attr('data-width')),
					size: parseInt(jQuery(this).parents('ul.skills_list').attr('data-size')),
					animate: 1500
				});
				jQuery(this).parents('.skill_item').css('padding-left', jQuery(this).width()+20+'px');
			});
		},{offset: 'bottom-in-view'});
	} else {
		jQuery('.chart').each(function(){
			jQuery(this).easyPieChart({
				barColor: jQuery(this).parents('ul.skills_list').attr('data-color'),
				trackColor: jQuery(this).parents('ul.skills_list').attr('data-bg'),
				scaleColor: false,
				lineCap: 'square',
				lineWidth: parseInt(jQuery(this).parents('ul.skills_list').attr('data-width')),
				size: parseInt(jQuery(this).parents('ul.skills_list').attr('data-size')),
				animate: 1500
			});
			jQuery(this).parents('.skill_item').css('padding-left', jQuery(this).width()+20+'px');
		});
	}
	
	// Contact Form
	jQuery("#ajax-contact-form").submit(function() {
		var str = $(this).serialize();		
		$.ajax({
			type: "POST",
			url: "contact_form/contact_process.php",
			data: str,
			success: function(msg) {
				// Message Sent - Show the 'Thank You' message and hide the form
				if(msg == 'OK') {
					var result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
					jQuery("#fields").hide();
				} else {
					var result = msg;
				}
				jQuery('#note').html(result);
			}
		});
		return false;
	});
	
	if (pp_block.size() > 0) {
        pp_center();
    }
		
});

jQuery(window).resize(function () {
	"use strict";
    window_h = jQuery(window).height();
    window_w = jQuery(window).width();
    header_w = header.width() + parseInt(header.css('padding-left')) + parseInt(header.css('padding-right'));
    content_update();
});

jQuery(window).load(function () {
	"use strict";
    content_update();
});

function content_update() {
	"use strict";
    if (window_w > 760) { 
        if (body.hasClass('admin-bar')) {
            headerWrapper.css('min-height', window_h - parseInt(footer.css('padding-bottom')) - footer.height());
            headerScroll.height(window_h - parseInt(header.css('padding-top')) - parseInt(header.css('padding-bottom')));
        } else {
            headerWrapper.css('min-height', window_h - parseInt(footer.css('padding-bottom')) - footer.height());
            headerScroll.height(window_h - parseInt(header.css('padding-top')) - parseInt(header.css('padding-bottom')));
        }

        if (header.height() < header.find('.jspPane').height()) {
            header.addClass('hasScroll');
        } else {
            header.removeClass('hasScroll');
        }
    }
}

var setTop = 0;
function pp_center() {
	"use strict";
    var pp_block = jQuery('.pp_block');
    setTop = (window_h - pp_block.height()) / 2;
    pp_block.css('top', setTop + 'px');
    pp_block.removeClass('fixed');
}
