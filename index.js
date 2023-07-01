// FORM
const form = document.querySelector('form');
// INPUTS
const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
// OUTPUTS
const outputDay = document.getElementById('output-day');
const outputMonth = document.getElementById('output-month');
const outputYear = document.getElementById('output-year');

form.addEventListener("submit", function(e){
    e.preventDefault();
    var state = true;

    // DATES
    const presentDate = new Date();
    const userDate = new Date(inputYear.value, inputMonth.value-1, inputDay.value);
    // DAYS IN THE MONTH
    const daysInMonth = new Date(inputYear.value, inputMonth.value, 0);

    // DAY CHECK
    if (inputDay.value == ""){
        setError(inputDay, "This field is required");
        state = false;
    } else if (inputDay.value > 31 || inputDay.value < 1){
        setError(inputDay, "Must be a valid day");
        state = false;
    } else if (inputDay.value > daysInMonth.getDate()){
        setError(inputDay, "Must be a valid date");
        state = false;
    } else {
        removeError(inputDay);
    };

    // MONTH CHECK
    if (inputMonth.value == ""){
        setError(inputMonth, "This field is required");
        state = false;
    } else if (inputMonth.value > 12 || inputMonth.value < 1){
        setError(inputMonth, "Must be a valid month");
        state = false;
    } else {
        removeError(inputMonth);
    };

    // YEAR CHECK
    if (inputYear.value == ""){
        setError(inputYear, "This field is required");
        state = false;
    } else if (presentDate.getTime() < userDate.getTime()){
        setError(inputYear, "Must be in the past");
        state = false;
    } else {
        removeError(inputYear);
    };

    // CALCULATE
    if(state){
        var years = presentDate.getFullYear() - userDate.getFullYear();
        var months = presentDate.getMonth() - userDate.getMonth();
        var days = presentDate.getDate() - userDate.getDate();
        const daysPreviousMonth = new Date (presentDate.getFullYear(), presentDate.getMonth(), 0).getDate();
        const daysPreviousPreviousMonth = new Date (presentDate.getFullYear(), presentDate.getMonth()-1, 0).getDate();

        if (days < 0){
            months--;
            days = daysPreviousMonth + days;
        }
        if (days < 0){
            months--;
            days = daysPreviousPreviousMonth + days;
        }
        if (months < 0){
            years--;
            months = 12 + months;
        }

        print(days, months, years);
    };

});

function print(days, months, years){
    var d = 0;
    var m = 0;
    var y = 0;

    const myInterval = setInterval (function(){
        if (y<=years){
            outputYear.innerText = y;
            y++;
        }
        if (m<=months){
            outputMonth.innerText = m;
            m++;
        }
        if (d<=days){
            outputDay.innerText = d;
            d++;
        }
        if ((y==years) && (m==months) && (d==days)){
            clearInterval(myInterval);
        }
    },25)
};


// submit.addEventListener("click", function(e) {
    // e.preventDefault();
    // removeRed();
    // hideWarningText();
    // var state = true;

    // PRESENT DATE
    // const presentDate = new Date();
    // const userDate = new Date(userYear.value, userMonth.value-1, userDay.value);

    // const date_prevMonthDays = new Date(presentDate.getDate(), presentDate.getMonth(), 0);

    // const date_daysInMonth = new Date(userYear.value, userMonth.value, 0);
    // const daysInMonth = date_daysInMonth.getDate();

    // DAY CHECKER
    // if (userDay.value == ""){
    //     warningTextDay.innerText = "This field is required";
    //     state = false;
    //     addRed();
    // } else if ((userDay.value<=0) || (userDay.value>31)){
    //     warningTextDay.innerText = "Must be a valid day";
    //     state = false;
    //     addRed();
    // } else if (userDay.value > daysInMonth){
    //     warningTextDay.innerText = "Must be a valid date";
    //     state = false;
    //     addRed();
    // }

    // MONTH CHECKER
    // if (userMonth.value == ""){
    //     warningTextMonth.innerText = "This field is required";
    //     state = false;
    //     addRed();
    // } else if ((userMonth.value<=0) || (userMonth.value>12)){
    //     warningTextMonth.innerText = "Must be a valid month";
    //     state = false;
    //     addRed();
    // }

    // YEAR CHECKER
    // if (userYear.value == ""){
    //     warningTextYear.innerText = "This field is required";
    //     state = false;
    //     addRed();
    // } else if (userYear.value<=0){
    //     warningTextYear.innerText = "Must be a valid year";
    //     state = false;
    //     addRed();
    // } else if (userDate.getTime() > presentDate.getTime()) {
    //     warningTextYear.innerText = "Must be in the past";
    //     state = false;
    //     addRed();
    // }

    // CALCULATE
    // if (state) {
    //     var years = presentDate.getFullYear() - userYear.value;
    //     var months = (presentDate.getMonth()+1) - userMonth.value;
    //     var days = presentDate.getDate() - userDay.value;
    //     if (months<0) {
    //         years--;
    //         months = months + 12;
    //     }
    //     if (days<0) {
    //         months--;
    //         days = days + date_prevMonthDays.getDate();
    //     }
    // }

    // OUTOUT
    // var d = 0;
    // var m = 0;
    // var y = 0;
    // const myInterval = setInterval (function(){
    //     if (y<=years){
    //         outputYears.innerText = y;
    //         y++;
    //     }
    //     if (m<=months){
    //         outputMonths.innerText = m;
    //         m++;
    //     }
    //     if (d<=days){
    //         outputDays.innerText = d;
    //         d++;
    //     }
    //     if ((y==years) && (m==months) && (d==days)){
    //         clearInterval(myInterval);
    //     }
    // },10)
// });

function setError(errorElement, message){
    const parentElement = errorElement.parentElement;
    parentElement.classList.add('error');
    parentElement.querySelector('small').innerText = message;
};

function removeError(errorElement){
    const parentElement = errorElement.parentElement;
    parentElement.classList.remove('error');
    parentElement.querySelector('small').innerText = "";
};
