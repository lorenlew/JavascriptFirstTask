var dateFormatter = {
    formatDate: function (inputDate, selectedInputFormatValue, selectedOutputFormatValue, separator) {
        var day;
        var month;
        var year;
        var formatedDate;
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
        var tokens = ['/dd/', '/DD/', '/mm/', '/MM/', '/MMMM/', '/yy/', '/yyyy/'];
        var datePartsSeparator = separator || '';
        var foundTokensInInputString = {};
        var foundTokensInOutputString = {};
        var getIndexOf = String.prototype.indexOf;

        function findTokens(selectedFormat) {
            var i;
            var positionOfToken;
            var foundTokens = {};

            for (i = 0; i < tokens.length; i += 1) {
                positionOfToken = getIndexOf.call(selectedFormat, tokens[i]);
                if (positionOfToken >= 0) {
                    foundTokens[tokens[i]] = positionOfToken;
                }
            }
            return foundTokens;
        };

        function trimDateParts(inputString, tokensInString) {
            var i;
            var datePart;

            for (var token in tokensInString) {

                var datePartStartIndex = foundTokensInInputString[token] + 1;
                var datePartEndIndex = datePartStartIndex + token.length - 2;
                datePart = inputString.substring(datePartStartIndex, datePartEndIndex);

                if (token.toLowerCase().indexOf('m') >= 0) {
                    month = datePart;
                }
                if (token.toLowerCase().indexOf('d') >= 0) {
                    day = datePart;
                }
                if (token.toLowerCase().indexOf('y') >= 0) {
                    year = datePart;
                }
            }
        }

        function validateInputDate() {
            if ((day <= maxDay && day > minDay && month > minMonth && month <= maxMonth && year > minYear)) {
                return true;
            }
            throw Error('Invalid input date');
        }

        function formOutputDateString() {
            var outputString = '';
            var sortedFoundTokensInOutputString = [];
            for (var item in foundTokensInOutputString) {
                sortedFoundTokensInOutputString.push([item, foundTokensInOutputString[item]]);
            }
            sortedFoundTokensInOutputString.sort(function (a, b) {
                return a[1] - b[1];

            });
            var test = sortedFoundTokensInOutputString[1][1];
            var i;
            for (i = 0; i < sortedFoundTokensInOutputString.length; i += 1) {
                var tokenInLower = sortedFoundTokensInOutputString[i][0].toLowerCase();

                if (tokenInLower.indexOf('m') >= 0) {
                    outputString += month + datePartsSeparator;
                }
                if (tokenInLower.indexOf('d') >= 0) {
                    outputString += day + datePartsSeparator;
                }
                if (tokenInLower.indexOf('y') >= 0) {
                    outputString += year + datePartsSeparator;
                }
            }
            var stop;
            return outputString;
        }

        foundTokensInInputString = findTokens(selectedInputFormatValue);
        foundTokensInOutputString = findTokens(selectedOutputFormatValue);
        trimDateParts(inputDate, foundTokensInInputString);
        validateInputDate();
        console.log('\n' + inputDate + '\n\n' + selectedInputFormatValue + '\n\n' + selectedOutputFormatValue +
            '\n\n' + formOutputDateString(selectedOutputFormatValue));
        return formOutputDateString(selectedOutputFormatValue);
    }
};
dateFormatter.formatDate('today is a great day/31/ for our country/10/!/2009/', 'xxxxxxxxxxxxxxxxxxxx/DD/xxxxxxxxxxxxxxxx/mm/x/yyyy/',
    '/yyyy//mm//DD/', '.');