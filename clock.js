var time, current, hours, minutes, seconds;

function addZero(n) {
  return (n < 10 ? "0" + n : n);
}

function timerStart() {
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
}


document.getElementById("btnStart").addEventListener("click", setEnd);

document.getElementById("btnReset").addEventListener("click", timerReset);
