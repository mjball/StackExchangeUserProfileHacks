// ==UserScript==
// @name        Stack Exchange user profile hacks
// @namespace       http://mjball.github.com
// @description     Shows a SE user's reputation, divided by the number of their questions and answers.
// @include     http://stackoverflow.com/users/*
// @include     http://meta.stackoverflow.com/users/*
// @include     http://*.stackexchange.com/users/*
// @include     http://superuser.com/users/*
// ==/UserScript==

(function () {
    function calc() {
        $(function () {
            function parseText($j) {
                return parseIntLenient($j.text());
            }

            function parseIntLenient(input) {
                if (input) {
                    return parseInt(input.replace(/\D+/g, ''), 10)
                }
                
                return NaN;
            }

            function ownText($j) {
                var textNodes = $j.contents().filter(function() {
                    return this.nodeType == 3; 
                });

                if (textNodes.length) {
                    return textNodes[0].nodeValue;
                }

            }

            var $rep = $('#avatar-card .reputation');
            var userrep = parseIntLenient(ownText($rep));
            var questioncount = parseText($('.user-stats .stat.questions span.number'));
            var answercount = parseText($('.user-stats .stat.answers span.number'));
            var rawaverage = userrep/(questioncount+answercount);
            var averagerep = Math.round(rawaverage);

            if (isNaN(averagerep)) {
                return;
            }

            $('<div/>', {
                title: rawaverage,
                text: averagerep + ' rep/post',
                'class': 'reputation-per-post',
                style: 'position: relative; top: -0.5em'
            }).insertAfter($rep);
        });
    }

    var script = document.createElement("script");
    script.textContent = "(" + calc.toString() + ")();";
    document.body.appendChild(script);
})();
