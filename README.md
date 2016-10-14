# jquery-number-format
cloned from https://code.google.com/archive/p/jquery-numberformatter/

This plugin is a number formatting and parsing plugin for jQuery.

Current Release: 1.2.4 [2013-10-22] Requires jQuery (1.x) and jshashtable (2.x or 3.0)
Thanks to all the contributions for defects and enhancements, I have more time these days to address them.
My time now will be focussed more on defects here and a rewrite hosted on github that supports more features and works with plain javascript as well as jQuery (https://github.com/andrewgp/jsNumberFormatter) _
_
Number formatting is likely familiar to anyone who's worked with server-side code like Java or PHP and who has worked with internationalization. People who aren't stuck in the US-centric frame of mind can quickly point out that people in other parts of the world don't format their numbers in the same way as Americans. For example, a number that we would write in the US as "1,250,500.75" would be written differently in different countries: "1.250.500,75" in Germany, "1 250 500,75" in France, and "1'250'500.75" in Switzerland, and "125,0500.75" in Japan. The number is exactly the same, but it's just written using a different format when presented to users of the web application.
I've been working during the 1.2 rewrite to separate the parsing and formatting more. So your now required to parse the text first into a js number, before formatting it back into text. This should hopefully give more control over the process and allow more flexibility of use.
Example #1
Here's a typical use case for what I'm describing. You have an input field in your web application that asks a person for their salary. In the US, the user can type in a varied forms of input - "$65000", "65,000", "65000", "65,000.00". All these numbers are exactly the same, but we want to control how these numbers look on the screen.

Here's an example of how you'd use this plugin.
$("#salary").blur(function(){
   $(this).parseNumber({format:"#,###.00", locale:"us"});
   $(this).formatNumber({format:"#,###.00", locale:"us"});
});


This code will ensure that any text in the "salary" textfield will be formatted properly when the user tabs out of it. For example, the user can enter "65000", "65,000", "65000.00" and when they leave the field, the field will automatically format the number to be "65,000.00".
Example #2
Say we have 2 text input fields, one accepts US format numbers, the other unformatted numbers only. When the user loses focus on the formatted input it parses the data and puts the number into the second input, when the user loses focus on the second input it formats the number back to the first input box. This is just to demonstrate how to parse and format values.

$("#salaryUS").blur(function(){
   // take US format text into std number format
   var number = $(this).parseNumber({format:"#,###.00", locale:"us"}, false);
   // write the number out
   $("#salaryUnformatted").val(number);

   // OR
   
   number = $(this).val();
   number = $.parseNumber(number, {format:"#,###.00", locale:"us"});
   $("#salaryUnformatted").val(number);


});

$("#salaryUnformatted").blur(function(){
   // take the unformatted text and format into US number format
   $("#salaryUS").val($(this).val());
   $("#salaryUS").formatNumber({format:"#,###.00", locale:"us"});

   // OR
   
   var number = $(this).val();
   number = $.formatNumber(number, {format:"#,###.00", locale:"us"});
   $("#salaryUS").val(number);
});


Right now there are dozens of countries supported. The syntax for the formatting follows that in the Java DecimalFormatter, so that you can provide a reliable format string on the server and client.
Syntax

The syntax for the formatting is:

0 = Digit
# = Digit, zero shows as absent
. = Decimal separator
- = Negative sign
, = Grouping Separator
% = Percent (multiplies number by 100)
Supported Locales

Here are the supported Locales. They were chosen because a) they are offered by the Java DecimalFormatter or b) I just felt that they were interesting and wanted to include them.

United States -> "us"
Arab Emirates -> "ae"
Egypt -> "eg"
Israel -> "il"
Japan -> "jp"
South Korea -> "kr"
Thailand -> "th"
China -> "cn"
Hong Kong -> "hk"
Taiwan -> "tw"
Australia -> "au"
Canada -> "ca"
Great Britain -> "gb"
India -> "in"
Germany -> "de"
Vietnam -> "vn"
Spain -> "es"
Denmark -> "dk"
Austria -> "at"
Greece -> "gr"
Brazil -> "br"
Czech -> "cz"
France -> "fr"
Finland -> "fi"
Russia -> "ru"
Sweden -> "se"
Switzerland -> "ch"
Mentions

Thanks to the excellent http://www.timdown.co.uk/jshashtable/'>jshashtable project, which is currently a requirement of the script, I may decide to support a standalone version too at some point.


SNAPSHOTS

Available from the svn repo (https://jquery-numberformatter.googlecode.com/svn/trunk'>https://jquery-numberformatter.googlecode.com/svn/trunk), please take care to read the notes in the main js file, may be unstable or incomplete.
