/*global dateFormatter*/
(function (dateFormatter) {

    'use strict';

    var maxDay = 31;
    var minDay = 1;
    var maxMonth = 12;
    var minMonth = 1;
    var minYear = 0;
    var months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    };
    var tokens = ['/dd/', '/DD/', '/mm/', '/MM/', '/mmmm/', '/yy/', '/yyyy/'];
    var day;
    var month;
    var year;
    var foundTokensInInputString = {};
    var foundTokensInOutputString = {};
    var outputDateString = '';

    function findTokens(selectedFormat) {

        var positionOfToken;
        var foundTokens = {};
        var i;
        for (i = 0; i < tokens.length; i += 1) {
            positionOfToken = selectedFormat.indexOf(tokens[i]);
            if (positionOfToken >= 0) {
                foundTokens[tokens[i]] = positionOfToken;
            }
        }
        return foundTokens;
    }

    function trimDateParts(inputDate, tokensInString) {

        var datePart;
        var datePartStartIndex;
        var datePartEndIndex;
        var tokenInLowerCase;
        var token;

        for (token in tokensInString) {
            datePartStartIndex = tokensInString[token] + 1;
            datePartEndIndex = datePartStartIndex + token.length - 2;
            datePart = inputDate.substring(datePartStartIndex, datePartEndIndex);
            tokenInLowerCase = token.toLowerCase();

            if (tokenInLowerCase.indexOf('m') >= 0) {
                month = datePart;
            }
            if (tokenInLowerCase.indexOf('d') >= 0) {
                day = datePart;
            }
            if (tokenInLowerCase.indexOf('y') >= 0) {
                year = datePart;
            }
        }
    }

    dateFormatter.validateInputDate = function (inputDate, selectedInputFormatValue) {

        var isUsedBefore = isEmpty(foundTokensInInputString);
        if (!isUsedBefore) {
            foundTokensInInputString = findTokens(selectedInputFormatValue);
            trimDateParts(inputDate, foundTokensInInputString);
        }
        if ((day <= maxDay && day > minDay && month > minMonth && month <= maxMonth && year > minYear)) {
            return true;
        }
        throw Error('Invalid input date');
    };

    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return true;
    }

    dateFormatter.fromNow = function (inputDate, selectedInputFormatValue) {

        foundTokensInInputString = findTokens(selectedInputFormatValue);
        trimDateParts(inputDate, foundTokensInInputString);
        dateFormatter.validateInputDate(inputDate, selectedInputFormatValue);

        var providedYear = parseInt(year, 10);
        var providedMonth = parseInt(month, 10) - 1;
        var providedDay = parseInt(day, 10);

        var providedDate = new Date(providedYear, providedMonth, providedDay);
        var currentDate = new Date(Date.now());
        var timeFromNow = new Date(currentDate - providedDate);

        var fromNowYear = (timeFromNow.getFullYear() - 1970).toString();
        var fromNowMonth = (timeFromNow.getMonth()).toString();
        var fromNowDay = (timeFromNow.getDate()).toString();
        var timeFromNowString = fromNowDay + ' days ' + fromNowMonth + ' months ' + fromNowYear + ' years';
        return timeFromNowString;
    };

    function formOutputDate(separator) {

        var datePartsSeparator = separator || '';
        var sortedFoundTokensInOutputString = [];
        var item;
        for (item in foundTokensInOutputString) {
            sortedFoundTokensInOutputString.push([item, foundTokensInOutputString[item]]);
        }
        sortedFoundTokensInOutputString.sort(function (a, b) {
            return a[1] - b[1];

        });
        var tokenInLowerCase;
        var i;
        for (i = 0; i < sortedFoundTokensInOutputString.length; i += 1) {
            tokenInLowerCase = sortedFoundTokensInOutputString[i][0].toLowerCase();

            if (tokenInLowerCase.indexOf('m') >= 0) {
                if (tokenInLowerCase === '/mmmm/') {
                    outputDateString += months[month] + datePartsSeparator;
                } else {
                    outputDateString += month + datePartsSeparator;
                }
            }
            if (tokenInLowerCase.indexOf('d') >= 0) {
                outputDateString += day + datePartsSeparator;
            }
            if (tokenInLowerCase.indexOf('y') >= 0) {
                if (tokenInLowerCase === '/yy/') {
                    outputDateString += year.substr(2, 3) + datePartsSeparator;
                } else {
                    outputDateString += year + datePartsSeparator;
                }
            }
        }
    }

    dateFormatter.formatDate = function (inputDate, selectedInputFormatValue, selectedOutputFormatValue, separator) {

        foundTokensInInputString = findTokens(selectedInputFormatValue);
        foundTokensInOutputString = findTokens(selectedOutputFormatValue);
        trimDateParts(inputDate, foundTokensInInputString);
        dateFormatter.validateInputDate(inputDate, selectedInputFormatValue);
        formOutputDate(separator);

        console.log('\n Input date string - ' + inputDate + '\n\n Input format - ' + selectedInputFormatValue +
            '\n\n Output format - ' + selectedOutputFormatValue + '\n\n Output date string - ' + outputDateString);
        return outputDateString;
    };

}(window.dateFormatter = window.dateFormatter || {}));


dateFormatter.formatDate('today is a great day/15/ for our country/06/!!/2014/',
    'xxxxxxxxxxxxxxxxxxxx/DD/xxxxxxxxxxxxxxxx/mm/xx/yyyy/', '/yy//mmmm//DD/', '.');

console.log('dateFormatter.fromNow(\'-12--06--2014-\', \'/dd//mm//yyyy/\') = ' +
    dateFormatter.fromNow('-12--06--2014-', '/dd//mm//yyyy/'));

console.log('dateFormatter.validateInputDate(\'-12--06--2014-\', \'/dd//mm//yyyy/\') = ' +
    dateFormatter.validateInputDate('-12--12--2014-', '/dd//mm//yyyy/'));