var dateFormatter = {
    formatDate: function (inputDate, selectedInputFormatValue, selectedOutputFormatValue) {
        var day;
        var month;
        var year;
        var months = [
                    { January: "01" },
                    { February: "02" },
                    { March: "03" },
                    { April: "04" },
                    { May: "05" },
                    { June: "06" },
                    { July: "07" },
                    { August: "08" },
                    { September: "09" },
                    { October: "10" },
                    { November: "11" },
                    { December: "12" }
        ];

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

        if (day <= 31 && month <= 12) {
            return ("day: " + day + "month: " + month + "year: " + year);
        } else {
            return false;
        }
    }

};