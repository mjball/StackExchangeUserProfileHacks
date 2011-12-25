// ==UserScript==
// @name        Stack Exchange rep per Q&A
// @namespace       http://mjball.github.com
// @description     Shows a SE user's reputation, divided by the number of their questions and answers.
// @include     http://stackoverflow.com/users/*
// @include     http://meta.stackoverflow.com/users/*
// @include     http://*.stackexchange.com/users/*
// @include     http://superuser.com/users/*
// ==/UserScript==

(function ()
{
    function calc()
    {
        $(function ()
        {
            function p($j) { return parseInt($j.text().replace(/\D+/, ''), 10); }
        
            var $rep = $('#large-user-info div.reputation'),
                userrep = p($rep.find('span > a')),
                questioncount = p($('#user-panel-questions > div.subheader span.count')),
                answercount = p($('#user-panel-answers > div.subheader span.count')),
                rawaverage =  userrep/(questioncount+answercount),
                averagerep = Math.round(rawaverage);
                
            if (isNaN(averagerep)) return;

            $('<div/>', {title: rawaverage, text: averagerep + ' rep/q&a', 'class': 'reputation'}).insertAfter($rep);
        });
    }
    
    var script = document.createElement("script");
    script.textContent = "(" + calc.toString() + ")();";
    document.body.appendChild(script);
})();