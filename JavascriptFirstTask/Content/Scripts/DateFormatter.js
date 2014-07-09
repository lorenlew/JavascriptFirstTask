var dateFormatter = {
    formatDate: function (inputDate, selectedInputFormatValue, selectedOutputFormatValue) {
        var day;
        var month;
        var year;
        var formatedDate;
        var months = {
            01: "January",
            02: "February",
            03: "March",
            04: "April",
            05: "May",
            06: "June",
            07: "July",
            08: "August",
            09: "September",
            10: "October",
            11: "November",
            12: "December"
        };

        function getDateInFormatMmmmddyyyy() {
            formatedDate = months[+month] + " " + day + " " + year;
            return formatedDate;
        }

        function getDateInFormatDdmmmmyyyy() {
            formatedDate = day + " " + months[month] + " " + year;
            return formatedDate;
        }

        function getDateInFormatYyyyddmmmm() {
            formatedDate = year + " " + day + " " + months[month];
            return formatedDate;
        }

        function getDateInFormatYyyymmmmdd() {
            formatedDate = year + " " + months[month] + " " + day;
            return formatedDate;
        }

        function getDateInFormatMmddyyyyPoint() {
            formatedDate = month + "." + day + "." + year;
            return formatedDate;
        }

        function getDateInFormatMmddyyyyHyphen() {
            formatedDate = month + "-" + day + "-" + year;
            return formatedDate;
        }

        function getDateInFormatDdmmyyyyPoint() {
            formatedDate = day + "." + month + "." + year;
            return formatedDate;
        }

        function getDateInFormatDdmmyyyyHyphen() {
            formatedDate = day + "-" + month + "-" + year;
            return formatedDate;
        }

        function getDateInFormatYyyyddmmPoint() {
            formatedDate = year + "." + day + "." + month;
            return formatedDate;
        }

        function getDateInFormatYyyyddmmHyphen() {
            formatedDate = year + "-" + day + "-" + month;
            return formatedDate;
        }

        function getDateInFormatYyyymmddPoint() {
            formatedDate = year + "." + month + "." + day;
            return formatedDate;
        }

        function getDateInFormatYyyymmddHyphen() {
            formatedDate = year + "-" + month + "-" + day;
            return formatedDate;
        }

        function getComponentsFromHoursFormat() {
            //initial time from 1/1/1970 03-00(GMT+3) 
            var msInHours = parseInt(inputDate - 3, 10) * 60 * 60 * 1000;
            var dateFromHours = new Date(msInHours);
            day = dateFromHours.getDate() - 1;
            month = dateFromHours.getMonth();
            year = dateFromHours.getFullYear() - 1970;
        }

        function getComponentsFromYyyymmddFormat() {
            day = inputDate.substring(6, 8);
            month = inputDate.substring(4, 6);
            year = inputDate.substring(0, 4);
        }

        function getComponentsFromYyyyddmmFormat() {
            day = inputDate.substring(4, 6);
            month = inputDate.substring(6, 8);
            year = inputDate.substring(0, 4);
        }

        function getComponentsFromDdmmyyyyFormat() {
            day = inputDate.substring(0, 2);
            month = inputDate.substring(2, 4);
            year = inputDate.substring(4, 8);
        }

        function getComponentsFromMmddyyyyFormat() {
            day = inputDate.substring(2, 4);
            month = inputDate.substring(0, 2);
            year = inputDate.substring(4, 8);
        }

        switch (selectedInputFormatValue) {

            case "hours":
                getComponentsFromHoursFormat(); break;
            case "YYYYMMDD":
                getComponentsFromYyyymmddFormat(); break;
            case "YYYYDDMM":
                getComponentsFromYyyyddmmFormat(); break;
            case "DDMMYYYY":
                getComponentsFromDdmmyyyyFormat(); break;
            case "MMDDYYYY":
                getComponentsFromMmddyyyyFormat(); break;
        }
        if ((day <= 31 && day > 0 && month > 0 && month <= 12 && year > 0 ) || (selectedInputFormatValue === "hours")) {

            switch (selectedOutputFormatValue) {

                case "YYYY-MM-DD":
                    return getDateInFormatYyyymmddHyphen();
                case "YYYY.MM.DD":
                    return getDateInFormatYyyymmddPoint();
                case "YYYY-DD-MM":
                    return getDateInFormatYyyyddmmHyphen();
                case "YYYY.DD.MM":
                    return getDateInFormatYyyyddmmPoint();
                case "DD-MM-YYYY":
                    return getDateInFormatDdmmyyyyHyphen();
                case "DD.MM.YYYY":
                    return getDateInFormatDdmmyyyyPoint();
                case "MM-DD-YYYY":
                    return getDateInFormatMmddyyyyHyphen();
                case "MM.DD.YYYY":
                    return getDateInFormatMmddyyyyPoint();
                case "YYYY MMMM DD":
                    return getDateInFormatYyyymmmmdd();
                case "YYYY DD MMMM":
                    return getDateInFormatYyyyddmmmm();
                case "DD MMMM YYYY":
                    return getDateInFormatDdmmmmyyyy();
                case "MMMM DD YYYY":
                    return getDateInFormatMmmmddyyyy();
            }
            return true;
        } else {
            return false;
        }
    }
};