;(function($)
{
    var pluginName = 'simpleTabs';

    function Plugin(el, options)
    {
        // To avoid scope issues, use 'base' instead of 'this' to reference this class from internal events and functions.
        var base = this;
        
        base.active;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        base.init = function()
        {
            base.options = $.extend({}, $.fn[pluginName].defaultOptions, options);

            $('a', base.el).each(function(key, value)
            {
                $(value).on('click', base.tabClicked);

                if(base.options.startIndex == key)
                {
                    base.active = value;
                    $(value).addClass('active');
                }
            });
        };

        base.tabClicked = function(e)
        {
            e.preventDefault();

            if(base.options.toggle)
            {                
                if(base.active && base.active != e.currentTarget)
                {
                    $(base.active).removeClass('active');
                    $(e.currentTarget).toggleClass('active');
                }
                else
                {
                    $(e.currentTarget).toggleClass('active');
                }
            }
            else
            {
                if(base.active)
                    $(base.active).removeClass('active');

                $(e.currentTarget).addClass('active');
            }

            base.active = e.currentTarget;
        };

        /** 
         * public functions
         */

        /** run initializer */
        base.init();

        /** 
         * expose methods of Plugin we wish to be public. 
         */
        return {
        };
    };    

    $.fn[pluginName] = function(options)
    {
        /**
         * If the first parameter is a string, treat this as a call to
         *   a public method.
         */
        if (typeof arguments[0] === 'string') 
        {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;

            this.each(function()
            {
                /**
                 * Check that the element has a plugin instance, and that
                 *  the requested public method exists.
                 */
                if($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') 
                {
                    // Call the method of the Plugin instance, and Pass it
                    // the supplied arguments.
                    returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
                }
                else
                {
                    throw new Error('Method ' +  methodName + ' does not exist on jQuery.' + pluginName);
                }
            });

            if(returnVal !== undefined)
            {
                /** If the method returned a value, return the value. */
                return returnVal;
            }
            else
            {
                /** Otherwise, returning 'this' preserves chainability. */
                return this;
            }

        /** 
         * If the first parameter is an object (options), or was omitted,
         *  instantiate a new instance of the plugin.
         */
        } 
        else if (typeof options === "object" || !options) 
        {
            return this.each(function(){
                // Only allow the plugin to be instantiated once.
                if (!$.data(this, 'plugin_' + pluginName)) 
                {
                    /**
                     * Pass options to Plugin constructor, and store Plugin
                     *  instance in the elements jQuery data object.
                     */
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        }
    };

    $.fn[pluginName].defaults =
    {
        startIndex: -1,
        activeClassName: 'active',
        toggle: true
    };

})(jQuery);