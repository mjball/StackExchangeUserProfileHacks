// ==UserScript==
// @name			Stack Overflow rep per Q&A
// @namespace		http://mjball.github.com
// @description		Too lazy to bust out a calculator (forget about mental math)
// @include			http://stackoverflow.com/users/*
// @include			http://meta.stackoverflow.com/users/*
// @include			http://*.stackexchange.com/users/*
// @include			http://superuser.com/users/*
// ==/UserScript==

(function ()
{
    function calc()
    {
    	$(function ()
    	{
	    	var userrep = parseInt($('td.summaryinfo span.summarycount').text(), 10),
		    questioncount = parseInt($('#questions-table .summarycount').text(), 10),
		    answercount = parseInt($('#answers-table .summarycount').text(), 10),
		    rawaverage =  userrep/(questioncount+answercount),
		    averagerep = Math.round(rawaverage),
		    $dest = $('table.vcard table td.summaryinfo:contains(views)');
		
		$dest.attr('title', rawaverage).text($dest.text() + ' | ' + averagerep + ' rep/q&a');
    	});
    }
    
    var script = document.createElement("script");
    script.textContent = "(" + calc.toString() + ")();";
    document.body.appendChild(script);
})();