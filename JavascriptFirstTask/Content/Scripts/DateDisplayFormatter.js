function dateFormatter() {

    var outputButton = document.getElementById("format");

    outputButton.onclick = function checkInput() {
        var inputContext = document.getElementById("input");
        var outputContext = document.getElementById("output");
        var dateContext = document.getElementById("date");
        var inputFormatTypeList = document.getElementById("inputFormatTypeList");
        var inputDate = document.getElementById("dateInput").value;
        if (inputDate != "") {
            dateContext.innerHTML = "input data: " + inputDate;
            document.getElementById("dateInputLabel").innerHTML = '';
        } else {
            dateContext.innerHTML = '';
            document.getElementById("dateInputLabel").innerHTML = 'no date';
        }
        var selectedInputFormatValue = inputFormatTypeList.options[inputFormatTypeList.selectedIndex].value;

        if (selectedInputFormatValue === "Not selected") {
            document.getElementById("inputFormatTypeListLabel").innerHTML = 'not selected';
            inputContext.innerHTML = '';
        } else {
            inputContext.innerHTML = "Input format: " + selectedInputFormatValue;
            document.getElementById("inputFormatTypeListLabel").innerHTML = '';
        }
        var outputFormatTypeList = document.getElementById("outputFormatTypeList");
        var selectedOutputFormatValue = outputFormatTypeList.options[outputFormatTypeList.selectedIndex].value;

        if (selectedOutputFormatValue === "Not selected") {
            document.getElementById("outputFormatTypeListLabel").innerHTML = 'not selected';
            outputContext.innerHTML = '';
        } else {
            outputContext.innerHTML = "Output format: " + selectedOutputFormatValue;
            document.getElementById("outputFormatTypeListLabel").innerHTML = '';
        }

    };
};

dateFormatter();