/**
 * @preserve
 * bootpag - jQuery plugin for dynamic pagination
 *
 * Copyright (c) 2015 botmonster@7items.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://botmonster.com/jquery-bootpag/
 *
 * Version:  1.0.7
 *
 */
(function ($, window) {

    $.fn.bootpag = function (options) {

        var $owner = this,
            settings = $.extend({
                total: 0,
                page: 1,
                maxVisible: null,
                leaps: true,
                href: 'javascript:void(0);',
                hrefVariable: '{{number}}',
                next: '&raquo;',
                prev: '&laquo;',
                firstLastUse: true,
                first: '<span aria-hidden="true">&larr;</span>',
                last: '<span aria-hidden="true">&rarr;</span>',
                wrapClass: 'pagination',
                activeClass: 'active',
                disabledClass: 'disabled',
                nextClass: 'next',
                prevClass: 'prev',
                lastClass: 'last',
                firstClass: 'first',
                //我的定义;
                record:0,
                rowNum: 0,
                rowList:[10,15,20],
                pagerview: '在{2} 条记录中，显示 {0} - {1} 条数据记录，'
            },
            $owner.data('settings') || {},
            options || {});

        if (settings.total <= 0)
            return this;

        if (!$.isNumeric(settings.maxVisible) && !settings.maxVisible) {
            settings.maxVisible = parseInt(settings.total, 10);
        }

        $owner.data('settings', settings);

        function renderPage($bootpag, page) {

            page = parseInt(page, 10);
            var lp,
                maxV = settings.maxVisible == 0 ? 1 : settings.maxVisible,
                step = settings.maxVisible == 1 ? 0 : 1,
                vis = Math.floor((page - 1) / maxV) * maxV,
                $page = $bootpag.find('li');
            settings.page = page = page < 0 ? 0 : page > settings.total ? settings.total : page;
            $page.removeClass(settings.activeClass);
            lp = page - 1 < 1 ? 1 :
                    settings.leaps && page - 1 >= settings.maxVisible ?
                        Math.floor((page - 1) / maxV) * maxV : page - 1;

            if (settings.firstLastUse) {
                $page
					.first()
					.toggleClass(settings.disabledClass, page === 1);
            }

            var lfirst = $page.first();
            if (settings.firstLastUse) {
                lfirst = lfirst.next();
            }

            lfirst
                .toggleClass(settings.disabledClass, page === 1)
                .attr('data-lp', lp)
                .find('a').attr('href', href(lp));

            var step = settings.maxVisible == 1 ? 0 : 1;

            lp = page + 1 > settings.total ? settings.total :
                    settings.leaps && page + 1 < settings.total - settings.maxVisible ?
                        vis + settings.maxVisible + step : page + 1;

            var llast = $page.last();
            if (settings.firstLastUse) {
                llast = llast.prev();
            }

            llast
                .toggleClass(settings.disabledClass, page === settings.total)
                .attr('data-lp', lp)
                .find('a').attr('href', href(lp));

            $page
				.last()
				.toggleClass(settings.disabledClass, page === settings.total);


            var $currPage = $page.filter('[data-lp=' + page + ']');

            var clist = "." + [settings.nextClass,
							   settings.prevClass,
                               settings.firstClass,
                               settings.lastClass].join(",.");
            if (!$currPage.not(clist).length) {
                var d = page <= vis ? -settings.maxVisible : 0;
                $page.not(clist).each(function (index) {
                    lp = index + 1 + vis + d;
                    $(this)
                        .attr('data-lp', lp)
                        .toggle(lp <= settings.total)
                        .find('a').html(lp).attr('href', href(lp));
                });
                $currPage = $page.filter('[data-lp=' + page + ']');
            }
            $currPage.not(clist).addClass(settings.activeClass);
            $owner.data('settings', settings);
        }

        function href(c) {

            return settings.href.replace(settings.hrefVariable, c);
        }

        return this.each(function () {

            var $bootpag, lp, me = $(this),

             //   p = ['<ul class="', settings.wrapClass, ' bootpag">'];
        
           p = ['<ul class="', settings.wrapClass, ' subpage ">'];
          //  p=p.concat(['<li>', settings.pagerview, '</li>']);

            if (settings.firstLastUse) {
              
                if (settings.maxVisible < settings.total && settings.page>settings.maxVisible) {
                    p = p.concat(['<li data-lp="1" class="', settings.firstClass,
                           '"><a href="', href(1), '">', settings.first, '</a></li>']);
                } else {
                    p = p.concat(['<li style="display:none" data-lp="1" class="', settings.firstClass,
                          '"><a href="', href(1), '">', settings.first, '</a></li>']);
                }
            }
            if (settings.prev) {
                p = p.concat(['<li  data-lp="1" class="', settings.prevClass,
                       '"><a href="', href(1), '">', settings.prev, '</a></li>']);
            }
            for (var c = 1; c <= Math.min(settings.total, settings.maxVisible) ; c++) {
                p = p.concat(['<li data-lp="', c, '"><a href="', href(c), '">', c, '</a></li>']);
            }
            if (settings.next) {
                lp = settings.leaps && settings.total > settings.maxVisible
                    ? Math.min(settings.maxVisible + 1, settings.total) : 2;
                p = p.concat(['<li data-lp="', lp, '" class="',
                             settings.nextClass, '"><a href="', href(lp),
                             '">', settings.next, '</a></li>']);
            }
            if (settings.firstLastUse) {
              
                if (settings.total > settings.maxVisible && (settings.page-1) / settings.maxVisible <  parseInt ((settings.total) / settings.maxVisible)) {
                    p = p.concat(['<li  data-lp="', settings.total, '" class="last"><a href="',
                             href(settings.total), '">', settings.last, '</a></li>']);
                }
                else
                    p = p.concat(['<li style="display:none"  data-lp="', settings.total, '" class="last"><a href="',
                          href(settings.total), '">', settings.last, '</a></li>']);
            }

         
            p.push('</ul>');
            me.find('ul.bootpag').remove();
         //  console.log(settings.rowList)

            var ss = "";
            for (var i = 0; i < settings.rowList.length; i++)
            {
                   var set=settings.rowList;
                   if (set[i] == settings.rowNum)
                       ss += "<option selected value=" + set[i] + ">" + set[i] + "</option>"
                   else
                       ss += "<option value=" + set[i] + ">" + set[i] + "</option>"


                    //$("#selectrow").append("<option value=" + set[i] + ">" + set[i] + "</option>");
            }

            var page1 = settings.pagerview.replace("{0}", (settings.page - 1) * settings.rowNum + 1).replace("{1}", (settings.page) * settings.rowNum > settings.record ? settings.record : (settings.page) * settings.rowNum).replace("{2}", settings.record);
            var ssss = "<p style='width:60px;float:left;display:inline;margin:0 0 0 5px;'>\u6BCF\u9875\u663E\u793A <select name=\"userTable_length\" style='width:60px;display:inline;height:30px;' aria-controls=\"userTable\" class=\"form-control input-sm\" id=\"selectrow\">".concat(ss, "</select>  \u6761\u6570\u636E</p>");

            
            var page1 = "<p style='float:left;margin:5px 0 0 0px;'>" + page1 + "</p>";

            me.append("<ul class='bootpag'><li style='float:left;display:inline;margin:12px 0px 0px -20px;'>" + page1 +ssss + "</li>" + "<li style='float:right;display:inline;margin:-12px 4px 0 0;'>" + p.join('') + "</li></ul>");
            $bootpag = me.find('ul.bootpag');

            me.find('.subpage li').click(function paginationClick() {

                var me = $(this);
                if (me.hasClass(settings.disabledClass) || me.hasClass(settings.activeClass)) {
                    return;
                }
                var page = parseInt(me.attr('data-lp'), 10);
                $owner.find('ul.bootpag').each(function () {
                    renderPage($(this), page);
                });

                $owner.trigger('page', page);
            });

            me.find("#selectrow").on("change", function () {
                $owner.trigger('rowChange',  $(this).val());


            })
            renderPage($bootpag.find("ul"), settings.page);
        });
    }

})(jQuery, window);