var time, current, hours, minutes, seconds, customHr, customMin, customSec;

function addZero(n) {
    return (n < 10 ? "0" + n : n);
}

function timerStart() {
    document.querySelector("#customHr").value = "";
    document.querySelector("#customMin").value = "";
    document.querySelector("#customSec").value = "";
    current = new Date();
    hours = addZero(current.getHours());
    minutes = addZero(current.getMinutes());
    seconds = addZero(current.getSeconds());

    time = setInterval(function() {
        current = new Date();
        hours = addZero(current.getHours());
        minutes = addZero(current.getMinutes());
        seconds = addZero(current.getSeconds());
        document.getElementById("currentTime").innerHTML = hours + ":" + minutes + ":" + seconds;
    }, 1000);

    document.getElementById("currentTime").innerHTML = hours + ":" + minutes + ":" + seconds;
}

function setEnd() {
    customHr = (document.querySelector('#customHr').value).replace(/\s/g, '');
    customMin = (document.querySelector('#customMin').value).replace(/\s/g, '');
    customSec = (document.querySelector('#customSec').value).replace(/\s/g, '');

    if (customHr !== "" && !isNaN(customHr) && customHr < 24) { hours = customHr; }
    if (customMin !== "" && !isNaN(customMin) && customMin < 60) { minutes = customMin; }
    if (customSec !== "" && !isNaN(customSec) && customSec < 60) { seconds = customSec; }

    if (hours >= 23 && minutes >= 42) {
        document.getElementById("intermissionEnd").innerHTML = "00" + ":" + addZero((parseInt(minutes) + 18) - 60) + ":" + seconds;
    } else if (hours < 23 && minutes >= 42) {
        document.getElementById("intermissionEnd").innerHTML = (parseInt(hours) + 1) + ":" + addZero((parseInt(minutes) + 18) - 60) + ":" + seconds;
    } else {
        document.getElementById("intermissionEnd").innerHTML = hours + ":" + (parseInt(minutes) + 18) + ":" + seconds;
    }
}

function timerReset() {
    document.getElementById("intermissionEnd").innerHTML = "-";
    clearInput();
}

function clearInput() {
    document.querySelector("#customHr").value = "";
    document.querySelector("#customMin").value = "";
    document.querySelector("#customSec").value = "";
}


document.getElementById("btnStart").addEventListener("click", setEnd);

document.getElementById("btnReset").addEventListener("click", timerReset);
