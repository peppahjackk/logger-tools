var time, current, hours, minutes, seconds, customHr, customMin, customSec;
var launchBtn = document.getElementById("launchStream");
var launchFrench = document.getElementById("launchFrench");
var launchTips = document.getElementById("launchTips");
var toggleStreams = document.getElementById("toggleStreams");
var toggleClock = document.getElementById("toggleClock");
var innerClock = document.getElementById("innerClock");
var custHr = document.getElementById("customHr");
var custMin = document.getElementById("customMin");
var custSec = document.getElementById("customSec");
var intermissionEnd = document.getElementById("intermissionEnd");
var currentTime = document.getElementById("currentTime");

function addZero(n) {
  return (n < 10 ? "0" + n : n);
}

function timerStart() {
  custHr.value = "";
  custMin.value = "";
  custSec.value = "";
  current = new Date();
  hours = addZero(current.getHours());
  minutes = addZero(current.getMinutes());
  seconds = addZero(current.getSeconds());

  time = setInterval(function() {
    current = new Date();
    hours = addZero(current.getHours());
    minutes = addZero(current.getMinutes());
    seconds = addZero(current.getSeconds());
    currentTime.innerHTML = hours + ":" + minutes + ":" + seconds;
  }, 1000);

  currentTime.innerHTML = hours + ":" + minutes + ":" + seconds;
}

function setEnd() {
  // Remove any input spaces
  customHr = custHr.value.replace(/\s/g, '');
  customMin = custMin.value.replace(/\s/g, '');
  customSec = custSec.value.replace(/\s/g, '');

  // Makes sure input is a valid time
  if (customHr !== "" && !isNaN(customHr) && customHr < 24) {
    hours = customHr;
  }
  if (customMin !== "" && !isNaN(customMin) && customMin < 60) {
    minutes = customMin;
  }
  if (customSec !== "" && !isNaN(customSec) && customSec < 60) {
    seconds = customSec;
  }

  // Handles the changing of an hour
  if (hours >= 23 && minutes >= 42 && current.getMinutes() > 17) {
    intermissionEnd.innerHTML = "00" + ":" + addZero((parseInt(minutes) + 18) - 60) + ":" + seconds;
  } else if (hours >= 23 && minutes >= 42 && current.getMinutes() <= 17) {
    intermissionEnd.innerHTML = hours + ":" + addZero((parseInt(minutes) + 18) - 60) + ":" + seconds;
  } else if (hours < 23 && minutes >= 42 && current.getMinutes() > 17) {
    intermissionEnd.innerHTML = (parseInt(hours) + 1) + ":" + addZero((parseInt(minutes) + 18) - 60) + ":" + seconds;
  } else if (hours < 23 && minutes >= 42 && current.getMinutes() <= 17) {
    intermissionEnd.innerHTML = hours + ":" + addZero((parseInt(minutes) + 18) - 60) + ":" + seconds;
  } else {
    intermissionEnd.innerHTML = hours + ":" + (parseInt(minutes) + 18) + ":" + seconds;
  }
}

function timerReset() {
  intermissionEnd.innerHTML = "-";
  clearInput();
}

function clearInput() {
  custHr.value = "";
  custMin.value = "";
  custSec.value = "";
}

function launch(num) {
  for (var i = 0; i < num; i++) {
    window.open("https://www.nhl.com/tv/2016020480", "", "width=1024,height=820,top=260, left=" + (260 * i) + '"');
  }
  toggleView([launchBtn, launchFrench], toggleStreams);
}

function toggleView(arr, btn) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].className.match(/(?:^|\s)hidden(?!\S)/g)) {
      arr[i].className = arr[i].className.replace(/(?:^|\s)hidden(?!\S)/g, '')
      btn.innerHTML = "- Hide Tool"
    } else if (arr[i].className.length > 0) {
      arr[i].className += " hidden";
      btn.innerHTML = "+ Show Tool";
    } else {
      arr[i].className += 'hidden';
      btn.innerHTML = "+ Show Tool";
    }
  }
}


document.getElementById("btnStart").addEventListener("click", setEnd);

document.getElementById("btnReset").addEventListener("click", timerReset);

launchBtn.addEventListener("click", function() {
  launch(3)
});
launchFrench.addEventListener("click", function() {
  launch(4)
})

toggleStreams.addEventListener("click", function() {
  toggleView([launchBtn, launchFrench], toggleStreams);
});
toggleClock.addEventListener("click", function() {
  toggleView([innerClock], toggleClock);
});