$(document).ready(function() {

	var testResultsDiv = $(".testResults");
	var formatTestsRun = 0;
	var formatTestsFailed = 0;
	$(".formatTextTest").each(function() {
		// collect variables and elements
		var locale = $(this).find(".locale").text();
		var format = $(this).find(".format").text();
		var input = $(this).find(".input").text();
		var output = $(this).find(".output");
		var ref = $(this).find(".ref").text();
		var result = $(this).find(".result");
		
		// apply formatting
		output.text(input);
		if (format && locale)
			output.formatNumber({format:format, locale:locale});
		else if (format)
			output.formatNumber({format:format});
		else if (locale)
			output.formatNumber({locale:locale});
		else
			output.formatNumber();
		
		if (output.text() == ref)
			result.text('PASSED');
		else {
			result.text('FAILED');
			result.addClass('error');
			formatTestsFailed++;
		}
		formatTestsRun++;
	});
	
	$(".formatNumberTest").each(function() {
		// collect variables and elements
		var locale = $(this).find(".locale").text();
		var format = $(this).find(".format").text();
		var input = $(this).find(".input").text();
		var output = $(this).find(".output");
		var ref = $(this).find(".ref").text();
		var result = $(this).find(".result");
		var nanForceZero = $(this).find(".nanForceZero").text();
		var round = $(this).find(".round").text();
		var isPercentage = $(this).find('.isPercentage').text() == 'true';
		
		// apply formatting
		output.text(input);
		if (format && locale && nanForceZero)
			output.formatNumber({ format: format, locale: locale, nanForceZero: nanForceZero == 'true', isPercentage: isPercentage });
		else if (format && locale && round)
			output.formatNumber({ format:format, locale:locale, round:round, isPercentage: isPercentage });
		else if (format && locale)
			output.formatNumber({ format:format, locale:locale, isPercentage: isPercentage });
		else if (format)
			output.formatNumber({ format:format, isPercentage: isPercentage });
		else if (locale)
			output.formatNumber({ locale:locale, isPercentage: isPercentage });
		else
			output.formatNumber({ isPercentage: isPercentage });
		
		if (output.text() == ref)
			result.text('PASSED');
		else {
			result.text('FAILED');
			result.addClass('error');
			formatTestsFailed++;
		}
		formatTestsRun++;
	});
	
	var parseTestRun = 0;
	var parseTestFailed = 0;
	$(".parseTest").each(function() {
		// collect variables and elements
		var locale = $(this).find(".locale").text();
		var input = $(this).find(".input");
		var output = $(this).find(".output");
		var refString = $(this).find(".ref").text();
		var ref = parseFloat();
		var result = $(this).find(".result");
		var isPercentage = $(this).find(".isPercentage").text();
		var autoDetectPercentage = $(this).find(".autoDetectPercentage").text() != 'false';
		isPercentage = isPercentage == 'true';
		var strict = $(this).find(".strict").text();
		
		// parse to number
		var number = input.parseNumber({locale: locale, isPercentage: isPercentage, strict: strict, autoDetectPercentage: autoDetectPercentage }, false);
		output.text(number.toString());
		
		// read number back in as float, check against ref
		if (number == ref || '' + number == refString) {
			result.text('PASSED');
		} else {
			result.text('FAILED');
			result.addClass('error');
			parseTestFailed++;
		}
		parseTestRun++;
	});
	
	var elementTestsRun = 0;
	var elementTestsFailed = 0;
	$(".formatElementTest").each(function() {
		var input;
		if ($(this).is(":input"))
			input = $(this).val();
		else
			input = $(this).text();
		
		if (input != '1230.45') {
			if ($(this).is(":input"))
				$(this).val('1230.45');
			else
				$(this).text('1230.45');
		}
		
		var output;
		$(this).formatNumber({format:"#,###.00", locale:"en"});
		if ($(this).is(":input"))
			output = $(this).val();
		else
			output = $(this).text();

		if (output != '1,230.45') {
			elementTestsFailed++;
			var result = $(this).next();
			if (result.is(":input"))
				result.val("FAILED");
			else
				result.text("FAILED");
			result.addClass('error');
		} else {
			if ($(this).next().is(":input"))
				$(this).next().val("PASSED");
			else
				$(this).next().text("PASSED");
		}
		elementTestsRun++;
	});
	
	var parseOptTestRun = 0;
	var parseOptTestFailed = 0;
	$(".parseOptionsTest").each(function() {
		// collect variables and elements
		var locale = $(this).find(".locale").text();
		var input = $(this).find(".input");
		var output = $(this).find(".output");
		var refString = $(this).find(".ref").text();
		var ref = parseFloat();
		var result = $(this).find(".result");
		var groupSep = $(this).find('.groupSep').text();
		var decSep = $(this).find('.decSep').text();
		var negSign = $(this).find('.negSign').text();
		var isPercentage = $(this).find(".isPercentage").text();
		if (isPercentage == 'true')
			isPercentage = true;
		else
			isPercentage = false;
		var strict = $(this).find(".strict").text();
		
		// parse to number
		var number = input.parseNumber({locale: locale, isPercentage: isPercentage, strict: strict, overrideGroupSep: groupSep, overrideDecSep: decSep, overrideNegSign: negSign }, false);
		output.text(number.toString());
		
		// read number back in as float, check against ref
		if (number == ref || '' + number == refString) {
			result.text('PASSED');
		} else {
			result.text('FAILED');
			result.addClass('error');
			parseOptTestFailed++;
		}
		parseOptTestRun++;
	});
	
	var formatOptTestRun = 0;
	var formatOptTestFailed = 0;
	$(".formatOptionsTest").each(function() {
		// collect variables and elements
		var locale = $(this).find(".locale").text();
		var format = $(this).find(".format").text();
		var input = $(this).find(".input").text();
		var output = $(this).find(".output");
		var ref = $(this).find(".ref").text();
		var result = $(this).find(".result");
		var nanForceZero = $(this).find(".nanForceZero").text();
		var round = $(this).find(".round").text();
		var groupSep = $(this).find('.groupSep').text();
		var decSep = $(this).find('.decSep').text();
		var negSign = $(this).find('.negSign').text();
		
		// apply formatting
		output.text(input);
		if (format && locale && nanForceZero)
			output.formatNumber({ format: format, locale: locale, nanForceZero: nanForceZero == 'true', overrideGroupSep: groupSep, overrideDecSep: decSep, overrideNegSign: negSign });
		else if (format && locale && round)
			output.formatNumber({ format:format, locale:locale, round:round, overrideGroupSep: groupSep, overrideDecSep: decSep, overrideNegSign: negSign });
		else if (format && locale)
			output.formatNumber({ format:format, locale:locale, overrideGroupSep: groupSep, overrideDecSep: decSep, overrideNegSign: negSign });
		else if (format)
			output.formatNumber({ format:format, overrideGroupSep: groupSep, overrideDecSep: decSep, overrideNegSign: negSign });
		else if (locale)
			output.formatNumber({ locale:locale, overrideGroupSep: groupSep, overrideDecSep: decSep, overrideNegSign: negSign });
		else
			output.formatNumber({ overrideGroupSep: groupSep, overrideDecSep: decSep, overrideNegSign: negSign });
		
		if (output.text() == ref)
			result.text('PASSED');
		else {
			result.text('FAILED');
			result.addClass('error');
			formatOptTestFailed++;
		}
		formatOptTestRun++;
	});
	
	// display the results
	testResultsDiv.html("<p>Format Tests: " + (formatTestsRun - formatTestsFailed) + "/" + formatTestsRun + "</p>");
	testResultsDiv.append("<p>Parse Tests: " + (parseTestRun - parseTestFailed) + "/" + parseTestRun + "</p>");
	testResultsDiv.append("<p>Element Tests: " + (elementTestsRun - elementTestsFailed) + "/" + elementTestsRun + "</p>");
	testResultsDiv.append("<p>Parse Extra Option Tests: " + (parseOptTestRun - parseOptTestFailed) + "/" + parseOptTestRun + "</p>");
	testResultsDiv.append("<p>Format Extra Option Tests: " + (formatOptTestRun - formatOptTestFailed) + "/" + formatOptTestRun + "</p>");
	
	// colour the results
	if (formatTestsFailed == 0) {
		testResultsDiv.children('p:eq(0)').css('background-color', 'green');
		testResultsDiv.children('p:eq(0)').css('color', 'white');
	} else {
		testResultsDiv.children('p:eq(0)').css('background-color', 'red');
	}
	if (parseTestFailed == 0) {
		testResultsDiv.children('p:eq(1)').css('background-color', 'green');
		testResultsDiv.children('p:eq(1)').css('color', 'white');
	} else {
		testResultsDiv.children('p:eq(1)').css('background-color', 'red');
	}
	if (elementTestsFailed == 0) {
		testResultsDiv.children('p:eq(2)').css('background-color', 'green');
		testResultsDiv.children('p:eq(2)').css('color', 'white');
	} else {
		testResultsDiv.children('p:eq(2)').css('background-color', 'red');
	}
	if (parseOptTestFailed == 0) {
		testResultsDiv.children('p:eq(3)').css('background-color', 'green');
		testResultsDiv.children('p:eq(3)').css('color', 'white');
	} else {
		testResultsDiv.children('p:eq(3)').css('background-color', 'red');
	}
	if (formatOptTestFailed == 0) {
		testResultsDiv.children('p:eq(4)').css('background-color', 'green');
		testResultsDiv.children('p:eq(4)').css('color', 'white');
	} else {
		testResultsDiv.children('p:eq(4)').css('background-color', 'red');
	}
});