// INPUTS
var day = document.querySelectorAll('input')[0];
var month = document.querySelectorAll('input')[1];
var year = document.querySelectorAll('input')[2];
// WARNINGS
var pDay = document.getElementById('pDay');
var pMonth = document.getElementById('pMonth');
var pYear = document.getElementById('pYear');
// OUTPUTS
var oYears = document.querySelectorAll('span')[0];
var oMonths = document.querySelectorAll('span')[1];
var oDays = document.querySelectorAll('span')[2];
// BUTTON
const submit = document.querySelector('button');

// PRESENT DATE (TODAY)
const date = new Date();
const presentDays = date.getDate() + (date.getMonth()*30) + (date.getFullYear()* 365);

function addRed() {
    for (var i=0; i<3; i++){
        document.querySelectorAll('h2')[i].classList.add('errorh2');
        document.querySelectorAll('input')[i].classList.add('errorinput');
    }
}

function removeRed() {
    for (var i=0; i<3; i++){
        document.querySelectorAll('h2')[i].classList.remove('errorh2');
        document.querySelectorAll('input')[i].classList.remove('errorinput');
    }
}

function hideP() {
    for (var i=0; i<3; i++){
        document.querySelectorAll('p')[i].innerText = "";
    }
}

submit.addEventListener("click", function (){
        
    removeRed();
    hideP();

    if ((day.value>0) && (day.value<32)){
        if ((month.value>0) && (month.value<13)){
            if (year.value<=date.getFullYear()){
                // ACTION
                const dateInput = new Date(year.value+"-"+month.value+"-"+day.value);
                const pastDays = dateInput.getDate() + (dateInput.getMonth()*30) + (dateInput.getFullYear()* 365);
                
                const dayDiff = presentDays-pastDays;
                const y = Math.trunc(dayDiff/365);
                const m = Math.trunc((dayDiff%365)/30);
                const d = Math.trunc((dayDiff%365)%30);

                oYears.innerText = y;
                oMonths.innerText = m;
                oDays.innerText = d;
            } else { 
                addRed();
                pYear.innerText = "Must be in the past" };
        } else {
            addRed();
            pMonth.innerText = "Must be a valid month"  };
    } else {
        addRed();
        pDay.innerText = "Must be a valid day"  };

    if (day.value == ""){
        pDay.innerText = "This field is required";
        addRed();
    } 
    if (month.value == ""){
        pMonth.innerText = "This field is required";
        addRed();
    } 
    if (year.value == ""){
        pYear.innerText = "This field is required";
        addRed();
    }

    if (((month.value==9)||(month.value==4)||(month.value==6)||(month.value==11)) && (day.value>30)){
        pDay.innerText = "Must be a valid date";
        addRed();
    } else if ((month.value==2) && (day.value>28) && (year.value%4!==0)) {
        pDay.innerText = "Must be a valid date";
        addRed();
    } else if ((month.value==2) && (day.value>29) && (year.value%4==0)) {
        pDay.innerText = "Must be a valid date";
        addRed();
    }
})