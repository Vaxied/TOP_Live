(function (window, document) {
    const loadButtonListeners = () => {
        // Initializes button listeners
        console.log("loaded");
        let operands = document.querySelectorAll(".operand");
        //console.log(operands);
        operands.forEach(operand => {
            operand.addEventListener("click", () => writeToDisplay(operand));
        });
        let operators = document.querySelectorAll(".operator");
        //console.log(operators);
        operators.forEach(operator => {
            operator.addEventListener("click", () => prepareOperation(operator));
        });
        let sign = document.querySelector(".sign");
        sign.addEventListener("click", () => writeToDisplay(sign));
        let percent = document.querySelector(".percent");
        percent.addEventListener("click", () => writeToDisplay(percent));
        let decimal = document.querySelector(".decimal");
        decimal.addEventListener("click", () => writeToDisplay(decimal));
        let equals = document.querySelector(".equals");
        equals.addEventListener("click", () => prepareOperation(equals));
        clearbtn = document.querySelector(".clear");
        clearbtn.addEventListener("click", clearDisplay);
        let keys = document.querySelectorAll(".key");
        keys.forEach(key => key.addEventListener("transitionend", removeTransition));
    }
    
    const writeToDisplay = (element) => {
        let sound1 = document.querySelector(".s1");
        sound1.currentTime = 0;
        //console.log(sound1);
        //console.log(element);
        if (element.classList.contains("operand")) {
            sound1.play();
            //console.log("numero y boton");
            let displaytext = document.querySelector("#display").textContent;
            //console.log(displaytext);
            let number = element.textContent;
            //console.log(number);
            //displaytext = document.querySelector("#display").textContent;
            if (!operatorSelected && displaytext == "0") {
                document.querySelector("#display").textContent  = number;
                overwrite = false;
            }
            else if (!operatorSelected && !overwrite && displaytext.length < 9) {
                document.querySelector("#display").textContent += number;    
            }
            else if (operatorSelected && overwrite) {
                document.querySelector("#display").textContent = number;
                overwrite = false;
            }
            else if (operatorSelected && !overwrite && displaytext.length < 9) {
                document.querySelector("#display").textContent += number;
            }
            else if (!operatorSelected && overwrite) {
                document.querySelector("#display").textContent = number;
                overwrite = false;
            }
        }
        else if (element.classList.contains("sign")) {
            sound1.play();
            if (errorFound())
            clearDisplay();
            let number = document.querySelector("#display").textContent;
            document.querySelector("#display").textContent = (-1 * +number);
            //if (number === "Error")
            if (firstoperand === "") {
                firstoperand = document.querySelector("#display").textContent;
                console.log(number);
            }
            else
                secondoperand = document.querySelector("#display").textContent;
        }
        else if (element.classList.contains("percent")) {
            sound1.play();
            console.log("percent");
            let number = document.querySelector("#display").textContent;
            //if (number === "Error") {
            if (errorFound()) {
                clearDisplay();
                //return;
            }
            console.log(number);
            number /= 100;
            //console.log(number.toString().length);

            if (number.toString().length >= 7) {
                //console.log("long ass number");
                number = Math.round(number * 10000000) / 10000000;
            }
            console.log(number);
            document.querySelector("#display").textContent = number;
        }
        else if (element.classList.contains("decimal")) {
            sound1.play();
            //check condition for when an operation has been made
            console.log("decimal");
            //console.log(firstoperand);
            //console.log(op);
            text =  document.querySelector("#display").textContent;
            //if (text === "Error")
            if (errorFound())
                clearDisplay();
            if (text.length >= 9)
                return;
            else if (firstoperand !== "" && op === "") {
                document.querySelector("#display").textContent = "0.";
                firstoperand = "";
                op = ""; //if stuff breaks its here
                overwrite = false;
            }
            else if (text.indexOf(".") !== -1) {
                console.log("number has a decimal already");
            }
            else
                document.querySelector("#display").textContent += ".";
        }
    }
    const prepareOperation = (element) => {
        //console.log(element);
        let sound2 = document.querySelector(".s2");
        //console.log(sound2);
        sound2.currentTime = 0;
        let sound3 = document.querySelector(".s3");
        //console.log(sound3);
        sound3.currentTime = 0;
        //let user write numbers after pressing an operator
        overwrite = true;
        if (element.classList.contains("operator")) {
            sound2.play();
            let operator = element;
            //console.log(errorFound());
            if (errorFound()) {
                console.log("error on display");
                clearDisplay();
            }
            else if (firstoperand !== "" && op != "" && firstoperand == document.querySelector("#display").textContent
                && secondoperand === "") {
                    secondoperand = firstoperand;
                    document.querySelector("#display").textContent = operate(op, firstoperand, secondoperand);
                    op = operator.textContent;
                    console.log(op);
                    console.log("only first operand was entered");
                }
                else if (firstoperand !== "" && op!== "" && secondoperand !== "") {
                    console.log("handling operand change and operating");
                    console.log(firstoperand);
                    console.log(op);
                    console.log(secondoperand);
                    document.querySelector("#display").textContent = operate(op, firstoperand, secondoperand);
                    secondoperand = "";
                    op = operator.textContent;
                }
                else if (firstoperand !== "" && op !=="" && secondoperand === "") {
                    console.log("normal operation");
                    console.log(firstoperand);
                    console.log(op);
                    //console.log(secondoperand);
                    secondoperand = document.querySelector("#display").textContent;
                    console.log(secondoperand);
                    document.querySelector("#display").textContent = operate(op, firstoperand, secondoperand);
                    secondoperand = "";
                    //cleanAfterOperate();
                    op = operator.textContent;
                }
                else if (firstoperand !== "" && op === "") {
                    op = operator.textContent;
                    firstoperand = document.querySelector("#display").textContent;
                    console.log("result found, waiting for second operand");
                }
                else if (firstoperand === "" && secondoperand === "") {
                    console.log("first operand saved");
                    op = operator.textContent;
                    firstoperand = document.querySelector("#display").textContent;
                    console.log(firstoperand);
                    console.log(op);
                }
                // put overwrite true here??
        }
        else if (element.classList.contains("equals")) {
            sound3.play();
            console.log(op, firstoperand, secondoperand);
            //if (firstoperand === "Error")
            if (errorFound()) {
                clearDisplay();
            }
            else if (firstoperand !== "" && op !== "") {
                secondoperand = document.querySelector("#display").textContent;
                console.log(op, firstoperand, secondoperand);
                document.querySelector("#display").textContent = operate(op, firstoperand, secondoperand);
                overwrite = true;
                op = "";
                secondoperand = "";
                //cleanAfterOperate();
            }
            else {
                return;
            }
        }
    }
    const operate = (operator, number1, number2) => {
        operatorSelected = false;
        overwrite = true;
        if (operator === "+") {
            let sum = +number1 + +number2;
            firstoperand = sum;
            secondoperand = "";
            //operatorSelected = false;
            //overwrite = true;
            //console.log(sum % 1);
            if (sum.toString().length > 9) {
                sum = "Too big";
                return sum;
            }
            if (sum % 1 == 0) {
                console.log("whole number");
                console.log(sum);
                return sum;
            }   
            else if (sum.toPrecision().length >= 8);
                return Math.round(sum * 10000000) / 10000000;   
        }
        if (operator === "-") {
            let substraction = +number1 - +number2;
            firstoperand = substraction;
            secondoperand = "";
            //operatorSelected = false;
            //overwrite = true;
            console.log(substraction);
            if (substraction % 1 == 0)
                return substraction;
            else if (substraction.length >= 8);
                return Math.round(substraction * 10000000) / 10000000;
        }
        if (operator === "*") {
            let multiplication = +number1 * +number2;
            firstoperand = multiplication;
            secondoperand = "";
            //operatorSelected = false;
            //overwrite = true;
            console.log(`result is ${multiplication}`);
            if (multiplication.toString().length > 9) {
                multiplication = "Too big";
                return multiplication;
            }
            if (multiplication % 1 == 0)
                return multiplication;
            else if (multiplication.length >= 8);
                return Math.round(multiplication* 10000000) / 10000000;
        }
        if (operator === "/" && number2 != "0") {
            let division = +number1 * +(1/number2);
            firstoperand = division;
            secondoperand = "";
            //operatorSelected = false;
            //overwrite = true;
            console.log(division);
            if (division % 1 == 0)
                return division;
            else if (division.length >= 7);
                return Math.round(division * 10000000) / 10000000;
            }
        else
            return "Error";
        }
    const clearDisplay = () => {
        let sound1 = document.querySelector(".s1");
        sound1.currentTime = 0;
        //console.log(sound1);
        sound1.play();
        document.querySelector("#display").textContent = "0";
        firstoperand = "";
        secondoperand = "";
        op = "";
        operatorSelected = false;
        overwrite = false;
        console.log("cleared");
    }
    const loadKeyListeners = () => {
        window.addEventListener("keydown", function(e) {
            //key = e.key;
            //select element attached to the pressed key
            element = document.querySelector(`button[data-key="${e.key.charCodeAt(0)}"]`);
            //console.log(element);
            //console.log(key);
            kCode = e.key.charCodeAt(0);
            console.log(kCode);
            if (!element) {
                return;
            }
            if (kCode >= 48 && kCode <= 57 || kCode == 65 || kCode == 46
                 || kCode == 112) {
                //console.log(element);
                element.classList.add("pressed");
                writeToDisplay(element);
                console.log("number or special key");
                //console.log(element);
            }
            else if (kCode == 43 || kCode == 45 || kCode == 42 || kCode == 47
                 || kCode == 69) {
                console.log(element);
                element.classList.add("pressed");
                prepareOperation(element);
                console.log("operator or equals");
                //console.log(element);
            }
            else if (kCode == 66) {
                //console.log(element);
                element.classList.add("pressed");
                let sound1 = document.querySelector(".s1");
                sound1.currentTime = 0;
                //console.log(sound1);
                sound1.play();
                clearDisplay();
            }
        });
    }
    function removeTransition(e) {
        if (e.propertyName !== "transform") {
            return;
        }
        //console.log(this);
        //console.log("transition");
        this.classList.remove("pressed");
    }
    const errorFound = () => {
        let text = document.querySelector("#display").textContent;
        if (text === "Error" || text === "Too big") {
            //console.log("texto");
            return true;
        }
        else
            return false;
    }
    var op = "";
    var firstoperand = "";
    var secondoperand = "";
    var operatorSelected = false;
    var overwrite = false;
    window.addEventListener("load", loadButtonListeners);
    window.addEventListener("load", loadKeyListeners);
})(window, document);