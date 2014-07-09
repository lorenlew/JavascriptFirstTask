Window.onload = (function () {

    var outputButton = document.getElementById("format");

    var inputFormatTypeList = document.getElementById("inputFormatTypeList");
    var outputFormatTypeList = document.getElementById("outputFormatTypeList");

    var dateInputLabel = document.getElementById("dateInputLabel");
    var inputFormatTypeListLabel = document.getElementById("inputFormatTypeListLabel");
    var outputFormatTypeListLabel = document.getElementById("outputFormatTypeListLabel");

    var inputLog = document.getElementById("input");
    var outputLog = document.getElementById("output");
    var dateLog = document.getElementById("date");
    var resultLog = document.getElementById("result");

    function isDateStringValid(inputDate, selectedInputFormatValue) {
        var regExpForDateString = /\d{8}/;
        var regExpForHoursString = /^[1-9][0-9]*$/;
        if (selectedInputFormatValue === "hours") {
            return regExpForHoursString.exec(inputDate);
        } else {
            return regExpForDateString.exec(inputDate);
        }
    };
    outputButton.onclick = function validateInput() {

        var selectedInputFormatValue = inputFormatTypeList.options[inputFormatTypeList.selectedIndex].value;
        var selectedOutputFormatValue = outputFormatTypeList.options[outputFormatTypeList.selectedIndex].value;
        var inputDate = document.getElementById("dateInput").value;
        var isDateValid = isDateStringValid(inputDate, selectedInputFormatValue) && dateFormatter.formatDate(inputDate, selectedInputFormatValue, selectedOutputFormatValue);

        if (inputDate === "") {
            dateLog.innerHTML = '';
            dateInputLabel.innerHTML = 'no date';
        } else if (!isDateValid) {
            dateInputLabel.innerHTML = 'invalid string';
        } else {
            dateLog.innerHTML = "input data: " + inputDate;
            dateInputLabel.innerHTML = '';
        }

        if (selectedInputFormatValue === "Not selected") {
            inputFormatTypeListLabel.innerHTML = 'not input format';
            inputLog.innerHTML = '';
        } else {
            inputLog.innerHTML = "Input format: " + selectedInputFormatValue;
            inputFormatTypeListLabel.innerHTML = '';
        }

        if (selectedOutputFormatValue === "Not selected") {
            outputFormatTypeListLabel.innerHTML = 'no output format';
            outputLog.innerHTML = '';
        } else {
            outputLog.innerHTML = "Output format: " + selectedOutputFormatValue;
            outputFormatTypeListLabel.innerHTML = '';
        }
        if (inputDate !== "" && isDateValid && selectedInputFormatValue !== "Not selected" && selectedOutputFormatValue !== "Not selected") {
            resultLog.innerHTML = 'Result: '+ dateFormatter.formatDate(inputDate, selectedInputFormatValue, selectedOutputFormatValue);
        } else {
            resultLog.innerHTML = '';
        }
    };
})();
