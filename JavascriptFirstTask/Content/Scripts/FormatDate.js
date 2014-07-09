Window.onload = (function () {

    var outputButton = document.getElementById("format");
    var inputLog = document.getElementById("input");
    var outputLog = document.getElementById("output");
    var dateLog = document.getElementById("date");
    var resultLog = document.getElementById("result");

    var inputFormatTypeList = document.getElementById("inputFormatTypeList");
    var outputFormatTypeList = document.getElementById("outputFormatTypeList");

    outputButton.onclick = function validateInput() {

        var selectedInputFormatValue = inputFormatTypeList.options[inputFormatTypeList.selectedIndex].value;
        var selectedOutputFormatValue = outputFormatTypeList.options[outputFormatTypeList.selectedIndex].value;
        var inputDate = document.getElementById("dateInput").value;

        if (inputDate !== "") {
            dateLog.innerHTML = "input data: " + inputDate;
            document.getElementById("dateInputLabel").innerHTML = '';
        } else {
            dateLog.innerHTML = '';
            document.getElementById("dateInputLabel").innerHTML = 'no date';
        }

        if (selectedInputFormatValue === "Not selected") {
            document.getElementById("inputFormatTypeListLabel").innerHTML = 'not input format';
            inputLog.innerHTML = '';
        } else {
            inputLog.innerHTML = "Input format: " + selectedInputFormatValue;
            document.getElementById("inputFormatTypeListLabel").innerHTML = '';
        }

        if (selectedOutputFormatValue === "Not selected") {
            document.getElementById("outputFormatTypeListLabel").innerHTML = 'no output format';
            outputLog.innerHTML = '';
        } else {
            outputLog.innerHTML = "Output format: " + selectedOutputFormatValue;
            document.getElementById("outputFormatTypeListLabel").innerHTML = '';
        }
        if (inputDate !== "" && selectedInputFormatValue !== "Not selected" && selectedOutputFormatValue !== "Not selected") {
            resultLog.innerHTML = 'Result: '+ dateFormatter.formatDate(inputDate, selectedInputFormatValue, selectedOutputFormatValue);
        } else {
            resultLog.innerHTML = '';
        }
    };
})();
