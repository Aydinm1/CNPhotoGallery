/* SORTING */

jQuery(function () {
	"use strict";
    
	var $container = jQuery('.sorting_block');

    $container.isotope({
        itemSelector: '.element'
    });

    var $optionSets = jQuery('.optionset'),
        $optionLinks = $optionSets.find('a'),
        $showAll = jQuery('.show_all');

    jQuery('.filter_close').click(function (e) {
        e.preventDefault();
        $showAll.click();
		$optionSet.find('.selected').removeClass('selected');
        $showAll.parent('li').addClass('selected');

        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $showAll.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[key] = value;
        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
            // changes in layout modes need extra logic
            changeLayoutMode($this, options)
        } else {
            // otherwise, apply new options
            $container.isotope(options);
        }
        return false;
    });
    $optionLinks.click(function () {
        var $this = jQuery(this);
        // don't proceed if already selected
        if ($this.parent('li').hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.optionset');
        $optionSet.find('.selected').removeClass('selected');
        $this.parent('li').addClass('selected');

        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[key] = value;
        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
            // changes in layout modes need extra logic
            changeLayoutMode($this, options)
        } else {
            // otherwise, apply new options
            $container.isotope(options);			
			setTimeout("jQuery('.sorting_block').isotope('reLayout')", 500);			
        }
        return false;
    });

    jQuery('.sorting_block').find('img').load(function () {
		$container.isotope('reLayout');
	});
});

jQuery(window).load(function () {
	"use strict";
    jQuery('.sorting_block').isotope('reLayout');
	setTimeout("jQuery('.sorting_block').isotope('reLayout')", 500);
    
	jQuery('.optionset a').click(function () {
        setTimeout("jQuery('.sorting_block').isotope('reLayout')", 800);
    });
});
jQuery(window).resize(function () {
	"use strict";
    jQuery('.sorting_block').isotope('reLayout');    
});