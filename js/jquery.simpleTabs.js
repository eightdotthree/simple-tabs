(function($)
{
    $.simpleTabs = function(el, options)
    {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data('simpleTabs', base);

        base.init = function()
        {
            base.options = $.extend({},$.simpleTabs.defaultOptions, options);

            $('a', base.el).each(function(key, value)
            {
                $(value).on('click', base.tabClicked);

                if(base.options.startIndex == key)
                    $(value).addClass('active');
            });
        };

        base.tabClicked = function(e)
        {
            e.preventDefault();

            $('a', base.el).removeClass('active');
            $(e.currentTarget).addClass('active');
        };

        // Run initializer
        base.init();
    };

    $.simpleTabs.defaultOptions = 
    {
        startIndex: -1,
        activeClassName: 'active'
    };

    $.fn.simpleTabs = function(options)
    {
        return this.each(function()
        {
            (new $.simpleTabs(this, options));
        });
    };

})(jQuery);