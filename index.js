// INPUTS
const userDay = document.querySelectorAll('input')[0];
const userMonth = document.querySelectorAll('input')[1];
const userYear = document.querySelectorAll('input')[2];
// WARNINGS
const warningTextDay = document.querySelector('.warning-day');
const warningTextMonth = document.querySelector('.warning-month');
const warningTextYear = document.querySelector('.warning-year');
// OUTPUTS
const outputDays = document.querySelectorAll('span')[2];
const outputMonths = document.querySelectorAll('span')[1];
const outputYears = document.querySelectorAll('span')[0];
// BUTTON
const submitButton = document.querySelector('button');

function addRed() {
    for (var i=0; i<3; i++){
        document.querySelectorAll('label')[i].classList.add('warning-text');
        document.querySelectorAll('input')[i].classList.add('warning-box');
    }
}
function removeRed() {
    for (var i=0; i<3; i++){
        document.querySelectorAll('label')[i].classList.remove('warning-text');
        document.querySelectorAll('input')[i].classList.remove('warning-box');
    }
}
function hideWarningText() {
    for (var i=0; i<3; i++){
        document.querySelectorAll('small')[i].innerText = "";
    }
}

submitButton.addEventListener("click", function(e) {
    e.preventDefault();
    removeRed();
    hideWarningText();
    var state = true;

    // PRESENT DATE
    const presentDate = new Date();
    const userDate = new Date(userYear.value, userMonth.value-1, userDay.value);

    const date_prevMonthDays = new Date(presentDate.getDate(), presentDate.getMonth(), 0);

    const date_daysInMonth = new Date(userYear.value, userMonth.value, 0);
    const daysInMonth = date_daysInMonth.getDate();

    // DAY CHECKER
    if (userDay.value == ""){
        warningTextDay.innerText = "This field is required";
        state = false;
        addRed();
    } else if ((userDay.value<=0) || (userDay.value>31)){
        warningTextDay.innerText = "Must be a valid day";
        state = false;
        addRed();
    } else if (userDay.value > daysInMonth){
        warningTextDay.innerText = "Must be a valid date";
        state = false;
        addRed();
    }

    // MONTH CHECKER
    if (userMonth.value == ""){
        warningTextMonth.innerText = "This field is required";
        state = false;
        addRed();
    } else if ((userMonth.value<=0) || (userMonth.value>12)){
        warningTextMonth.innerText = "Must be a valid month";
        state = false;
        addRed();
    }

    // YEAR CHECKER
    if (userYear.value == ""){
        warningTextYear.innerText = "This field is required";
        state = false;
        addRed();
    } else if (userYear.value<=0){
        warningTextYear.innerText = "Must be a valid year";
        state = false;
        addRed();
    } else if (userDate.getTime() > presentDate.getTime()) {
        warningTextYear.innerText = "Must be in the past";
        state = false;
        addRed();
    }

    // CALCULATE
    if (state) {
        var years = presentDate.getFullYear() - userYear.value;
        var months = (presentDate.getMonth()+1) - userMonth.value;
        var days = presentDate.getDate() - userDay.value;
        if (months<0) {
            years--;
            months = months + 12;
        }
        if (days<0) {
            months--;
            days = days + date_prevMonthDays.getDate();
        }
    }

    // OUTOUT
    var d = 0;
    var m = 0;
    var y = 0;
    const myInterval = setInterval (function(){
        if (y<=years){
            outputYears.innerText = y;
            y++;
        }
        if (m<=months){
            outputMonths.innerText = m;
            m++;
        }
        if (d<=days){
            outputDays.innerText = d;
            d++;
        }
        if ((y==years) && (m==months) && (d==days)){
            clearInterval(myInterval);
        }
    },10)
});