(function(window, $, undefined) {
    var DURATION = .35; /* seconds */

    // DOM Ready event
    $(function(){
        makeMenu('.RubixMenu');
     });

    // Loop though the elements of a list and
    // return the sum of the offset heights.
    function getContentHeight(selector) {
        var height = 0;
        $(selector).children().each(function() {
                height += $(this).offset().height;
            });

        return height;
    }

    // Animate the resizing of an element.
    function animateHeightChange(selector, height, callback) {
        $(selector).anim({height: height + 'px'}, DURATION, 'linear', callback);
    }

    /* makeMenu:
     * - selector: CSS selector for the menu(s).
     *
     * Enables the accordion menu on selector.
     */
    function makeMenu(selector) {
        $(selector).each(function() {
                var $menu          = $(this),
                    prefix         = $menu.data('prefix'),
                    submenuClass   = prefix + 'Submenu',
                    openClass      = prefix + 'Open',
                    openSelector   = '.' + openClass,
                    closedSelector = ':not(' + openSelector + ')',
                    $items         = $menu.children('li.' + submenuClass);

                function animationComplete() {
                    var $item = $items.filter(openSelector),
                        offset = $item.offset(),
                        $scrollTarget;
                    // If there is an open item...
                    if($item.length) {
                        // If the item would not be fully shown if we just scrolled to the menu,
                        // scroll to the item.  Otherwise, scroll to the menu so as much of the
                        // menu is as visible as possible (including the item).
                        $scrollTarget =
                            (offset.top + offset.height - $menu.offset().top) > window.innerHeight ?
                                    $item : $menu;
                        $item.length && scrollToElement($scrollTarget, DURATION);
                    }

                    // Actually hide the submenu when it is closed.  This is required for Android 2.3
                    // and below as even though the menu items are hidden by overflow:hidden and
                    // height:0, they still show up on the tap layer possibly due to poor device
                    // handling of CSS3 transitions.  Forcibly hiding them should make them go away.
                    $items.filter(closedSelector).children('ul').css('visibility', 'hidden');
                }

                // Open a menu and close all other menus.
                function openItem(index) {
                    var $item    = $($items.get(index)),
                        $submenu = $item.children('ul');

                    // Cancel if the menu is open or there is no submenu.
                    if($item.hasClass(openClass) || !$submenu.length)
                        return;

                    // Close all other items.
                    for(var i = 0; i < $items.length; i ++) {
                        i != index && closeItem(i);
                    }

                    $item.addClass(openClass);
                    $submenu.attr('aria-hidden', 'false')
                            .css('visibility', 'visible');
                    animateHeightChange($submenu, getContentHeight($submenu), animationComplete);
                }

                // Close a menu.
                function closeItem(index) {
                    var $item    = $($items.get(index)),
                        $submenu = $item.children('ul');

                    // Cancel if the menu is closed or there is no submenu.
                    if(!$item.hasClass(openClass) || !$submenu.length)
                        return;

                    $item.removeClass(openClass);
                    $submenu.attr('aria-hidden', 'true');
                    animateHeightChange($submenu, 0, animationComplete);
                }

                $items.each(function(index) {
                        var $item    = $(this),
                            $button  = $item.children().first(),
                            $submenu = $item.children('ul'),

                        // Check if we are open.  This is used for determining the appropriate height
                        // and assigning the ARIA-hidden attribute since we are no longer using
                        // display:none.
                        initiallyOpen = $item.hasClass(openClass);

                        // Don't do anything if there is no submenu.
                        if(!$submenu.length)
                            return;

                        // Set the height either to the submenu height if open or 0 if closed.
                        // Also, hide the overflow and display the box.
                        $submenu.css({
                                height:     (initiallyOpen ? getContentHeight($submenu) : 0) + 'px',
                                overflow:   'hidden',
                                display:    'block',
                                visibility: initiallyOpen ? 'visible' : 'hidden'
                            });

                        !initiallyOpen && $submenu.attr('aria-hidden', 'true');

                        $button.bind('click', function() {
                                $item.hasClass(openClass) ? closeItem(index) : openItem(index);
                            });
                    });
            });
    }

    /* scrollToElement:
     * - selector: A CSS selector pointing to the element(s) to be displayed.
     * - duration: The duration in seconds for the scrolling to take.
     *
     * Smoothly scrolls the page to display a specified element.  If the element is smaller than
     * the screen, the scrolling will occur if the element is partially off of the screen and will
     * scroll so that the whole element is visible. If the element is larger than the screen,
     * the page will scroll so that the top of the element is at the top of the screen.
     */
    var scrollTimer;
    function scrollToElement(selector, duration) {
        var screenHeight      = window.innerHeight,
            startTop          = window.scrollY,
            startBottom       = startTop + screenHeight,
            startTime         = Date.now(),
            offset            = $(selector).offset(),
            offsetTop         = offset.top,
            offsetHeight      = offset.height,
            targetTop;

        scrollTimer && clearInterval(scrollTimer);

        if(offsetTop < startTop || offsetHeight >= screenHeight) {
            targetTop = offsetTop;
        } else if(offsetTop + offsetHeight > startBottom) {
            targetTop = offsetTop + offsetHeight - screenHeight;
        } else {
            return;
        }

        scrollTimer = setInterval(function() {
                var now = Date.now(),
                    dt   = (now - startTime) / (duration * 1000),
                    y;

                if(dt > 1) {
                    y = targetTop;
                    clearTimeout(scrollTimer);
                } else {
                    y = Math.round(
                            ((-Math.cos(dt*Math.PI) / 2) + 0.5) *
                            (targetTop - startTop) + startTop);
                }

                window.scrollTo(0, y);

            }, 34);
    }

    
    window.DEBUG && (window.RUBIX_DEBUG_OBJECT = {
            getContentHeight: getContentHeight,
            animateHeightChange: animateHeightChange,
            makeMenu: makeMenu,
            scrollToElement: scrollToElement
        });

})(window, Zepto);