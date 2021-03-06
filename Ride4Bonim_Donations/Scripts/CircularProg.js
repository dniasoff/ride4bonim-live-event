﻿$(function () {

    $(".progress").each(function () {

        var value = $(this).attr('data-value');
        var left = $(this).find('.progress-left .progress-bar');
        var right = $(this).find('.progress-right .progress-bar');

        if (value > 0) {
            if (value <= 50) {
                right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
            } else {
                right.css('transform', 'rotate(180deg)')
                left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
            }
        }

    })

    function percentageToDegrees(percentage) {

        return percentage / 100 * 360

    }

});

(function ($) {
    // start writing function
    $.fn.jprogress = function (options) {
        console.log(options);
        // settings
        var settings = $.extend({
            animateTime: 3000,
            background: '#4ABFF7'
        }, options);

        // return everytime when plugin function get called
        return this.each(function () {

            // define plugin obj
            var mainobj = $(this);

            // create method
            progressmethod = {
                //progress init
                init: function (bar) {
                    if (bar !== 'undefined') {
                        $(mainobj).addClass('progress_single');
                        $(mainobj).wrap('<div class="progress_single_wrapper"></div>');
                        $(mainobj).css("background", settings.background);
                    }
                }
            };

            //check if object is exist
            if (mainobj.length > 0) {
                // call init method
                progressmethod.init();

                // get progress percent
                var percent = $(mainobj).attr('progress');
                $(mainobj).html('<span>' + percent + '</span>');
                $(mainobj).children("span").css("opacity", "0");

                // animate progress bars
                $(mainobj).animate({ width: percent }, settings.animateTime, function () {
                    $(mainobj).children("span").css("opacity", "1");
                });
            }

        });
    }
}(jQuery));

(function ($) {
    $.fn.updateprogress = function (percent) {
        var canvas = document.getElementById("prog_canvas");
        var context = canvas.getContext('2d');
        var container = $(canvas).parent();
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var degrees = percent * 360.0;
        var radians = degrees * (Math.PI / 180);
        var radius = canvas.width / 2.5;
        var startAngle = 2.3 * Math.PI;
        var endAngle = 0;
        var counterClockwise = false;
        var endPercent = percent;
        var curPerc = endPercent;
        var curStep = 0.0;
        var circ = Math.PI * 2;
        var quart = Math.PI / 2;
        var type = '';
        var fireCallback = true;
        var additionalAngelPI = 0.0;

        function animate(current) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();
            context.arc(x, y, radius, endAngle, startAngle, false);
            context.lineWidth = 11;
            context.strokeStyle = "#eee";
            context.stroke();
            context.beginPath();
            context.arc(x, y, radius, -(quart) + additionalAngelPI, ((circ) * current) - quart + additionalAngelPI, false);
            context.strokeStyle = "#eb212e";
            context.stroke();
            if (curPerc < endPercent) {
                curPerc += curStep;
                requestAnimationFrame(function () {
                    animate(Math.min(curPerc, endPercent) / 100);
                }, obj);
            }
            if (curPerc == endPercent && fireCallback && typeof (options) != "undefined") {
                if ($.isFunction(options.complete)) {
                    options.complete();

                    fireCallback = false;
                }
            }
        }
        animate(curPerc / 100);
    }
}(jQuery));

$(function () {
    $('.progress2').circliful();
});

(function ($) {

    $.fn.circliful = function (options, callback) {

        var settings = $.extend({
            // These are the defaults.
            startdegree: 240,
            fgcolor: "#556b2f",
            bgcolor: "#eee",
            fill: false,
            width: 15,
            dimension: 160,
            fontsize: 15,
            percent: 50,
            animationstep: 1.0,
            iconsize: '20px',
            iconcolor: '#999',
            border: 'default',
            complete: null,
            bordersize: 10
        }, options);

        return this.each(function () {

            var customSettings = ["fgcolor", "bgcolor", "fill", "width", "dimension", "fontsize", "animationstep", "endPercent", "icon", "iconcolor", "iconsize", "border", "startdegree", "bordersize"];

            var customSettingsObj = {};
            var icon = '';
            var endPercent = 0;
            var obj = $(this);
            var fill = false;
            var text, info;

            obj.addClass('circliful');

            checkDataAttributes(obj);

            if (obj.data('text') != undefined) {
                text = obj.data('text');

                if (obj.data('icon') != undefined) {
                    icon = $('<i></i>')
                        .addClass('fa ' + $(this).data('icon'))
                        .css({
                            'color': customSettingsObj.iconcolor,
                            'font-size': customSettingsObj.iconsize
                        });
                }

                if (obj.data('type') != undefined) {
                    type = $(this).data('type');

                    if (type == 'half') {
                        addCircleText(obj, 'circle-text-half', (customSettingsObj.dimension / 1.45));
                    } else {
                        addCircleText(obj, 'circle-text', customSettingsObj.dimension);
                    }
                } else {
                    addCircleText(obj, 'circle-text', customSettingsObj.dimension);
                }
            }

            if ($(this).data("total") != undefined && $(this).data("part") != undefined) {
                var total = $(this).data("total") / 100;

                percent = (($(this).data("part") / total) / 100).toFixed(3);
                endPercent = ($(this).data("part") / total).toFixed(3)
            } else {
                if ($(this).data("percent") != undefined) {
                    percent = $(this).data("percent") / 100;
                    endPercent = $(this).data("percent")
                } else {
                    percent = settings.percent / 100
                }
            }

            if ($(this).data('info') != undefined) {
                info = $(this).data('info');

                if ($(this).data('type') != undefined) {
                    type = $(this).data('type');

                    if (type == 'half') {
                        addInfoText(obj, 0.9);
                    } else {
                        addInfoText(obj, 1.25);
                    }
                } else {
                    addInfoText(obj, 1.25);
                }
            }

            $(this).width(customSettingsObj.dimension + 'px');

            var canvas = $('<canvas id="prog_canvas"></canvas>').attr({
                width: customSettingsObj.dimension,
                height: customSettingsObj.dimension
            }).appendTo($(this)).get(0);

            var context = canvas.getContext('2d');
            var container = $(canvas).parent();
            var x = canvas.width / 2;
            var y = canvas.height / 2;
            var degrees = customSettingsObj.percent * 360.0;
            var radians = degrees * (Math.PI / 180);
            var radius = canvas.width / 2.5;
            var startAngle = 2.3 * Math.PI;
            var endAngle = 0;
            var counterClockwise = false;
            var curPerc = customSettingsObj.animationstep === 0.0 ? endPercent : 0.0;
            var curStep = Math.max(customSettingsObj.animationstep, 0.0);
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var type = '';
            var fireCallback = true;
            var additionalAngelPI = (customSettingsObj.startdegree / 180) * Math.PI;

            if ($(this).data('type') != undefined) {
                type = $(this).data('type');

                if (type == 'half') {
                    startAngle = 2.0 * Math.PI;
                    endAngle = 3.13;
                    circ = Math.PI;
                    quart = Math.PI / 0.996;
                }
            }

            /**
             * adds text to circle
             *
             * @param obj
             * @param cssClass
             * @param lineHeight
             */
            function addCircleText(obj, cssClass, lineHeight) {
                $("<span></span>")
                    .appendTo(obj)
                    .addClass(cssClass)
                    .text(text)
                    .prepend(icon)
                    .css({
                        'line-height': lineHeight + 'px',
                        'font-size': customSettingsObj.fontsize + 'px'
                    });
            }

            /**
             * adds info text to circle
             *
             * @param obj
             * @param factor
             */
            function addInfoText(obj, factor) {
                $('<span></span>')
                    .appendTo(obj)
                    .addClass('circle-info-half')
                    .css(
                    'line-height', (customSettingsObj.dimension * factor) + 'px'
                    )
                    .text(info);
            }

            /**
             * checks which data attributes are defined
             * @param obj
             */
            function checkDataAttributes(obj) {
                $.each(customSettings, function (index, attribute) {
                    if (obj.data(attribute) != undefined) {
                        customSettingsObj[attribute] = obj.data(attribute);
                    } else {
                        customSettingsObj[attribute] = $(settings).attr(attribute);
                    }

                    if (attribute == 'fill' && obj.data('fill') != undefined) {
                        fill = true;
                    }
                });
            }

            /**
             * animate foreground circle
             * @param current
             */
            function animate(current) {

                context.clearRect(0, 0, canvas.width, canvas.height);

                context.beginPath();
                context.arc(x, y, radius, endAngle, startAngle, false);

                context.lineWidth = customSettingsObj.bordersize + 1;

                context.strokeStyle = customSettingsObj.bgcolor;
                context.stroke();

                if (fill) {
                    context.fillStyle = customSettingsObj.fill;
                    context.fill();
                }

                context.beginPath();
                context.arc(x, y, radius, -(quart) + additionalAngelPI, ((circ) * current) - quart + additionalAngelPI, false);

                if (customSettingsObj.border == 'outline') {
                    context.lineWidth = customSettingsObj.width + 13;
                } else if (customSettingsObj.border == 'inline') {
                    context.lineWidth = customSettingsObj.width - 13;
                }

                context.strokeStyle = customSettingsObj.fgcolor;
                context.stroke();

                if (curPerc < endPercent) {
                    curPerc += curStep;
                    requestAnimationFrame(function () {
                        animate(Math.min(curPerc, endPercent) / 100);
                    }, obj);
                }

                if (curPerc == endPercent && fireCallback && typeof (options) != "undefined") {
                    if ($.isFunction(options.complete)) {
                        options.complete();

                        fireCallback = false;
                    }
                }
            }

            animate(curPerc / 100);

        });
    };
}(jQuery));