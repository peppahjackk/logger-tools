var time, current, hours, minutes, seconds, customHr, customMin, customSec;
var launchBtn = document.getElementById("launchStream");
var launchFrench = document.getElementById("launchFrench");
var launchTips = document.getElementById("launchTips");
var showLaunch = document.getElementById("showLaunch");

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
    // Remove any input spaces
    customHr = (document.querySelector('#customHr').value).replace(/\s/g, '');
    customMin = (document.querySelector('#customMin').value).replace(/\s/g, '');
    customSec = (document.querySelector('#customSec').value).replace(/\s/g, '');
    
    // Makes sure input is a valid time
    if (customHr !== "" && !isNaN(customHr) && customHr < 24) { hours = customHr; }
    if (customMin !== "" && !isNaN(customMin) && customMin < 60) { minutes = customMin; }
    if (customSec !== "" && !isNaN(customSec) && customSec < 60) { seconds = customSec; }
    
    // Handles the changing of an hour
    if (hours >= 23 && minutes >= 42) {
        document.getElementById("intermissionEnd").innerHTML = "00" + ":" + addZero((parseInt(minutes) + 18) - 60) + ":" + seconds;
    } else if (hours < 23 && minutes >= 42 && current.getMinutes() > 17) {
        document.getElementById("intermissionEnd").innerHTML = (parseInt(hours) + 1) + ":" + addZero((parseInt(minutes) + 18) - 60) + ":" + seconds;
    } else if (hours < 23 && minutes >= 42 && current.getMinutes() <= 17){
        document.getElementById("intermissionEnd").innerHTML = hours + ":" + addZero((parseInt(minutes) + 18) - 60) + ":" + seconds;
    }  else {
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

function showElt(elt) {
    elt.className = elt.className.replace(/(?:^|\s)hidden(?!\S)/g, '');
  }

  function hideElt(elt) {
    if (!elt.className.match(/(?:^|\s)hidden(?!\S)/g)) {
      if (elt.className.length > 0) {elt.className += " hidden";}
      else {elt.className += "hidden";
      }
    }  
  }

function launch(num) {
  for (var i = 0; i < num; i++) {
    window.open("https://www.nhl.com/tv/2016020480", "", "width=1024,height=820,top=260, left=" + (260 * i) + '"');
  }
  hideElt(launchBtn);
  hideElt(launchFrench);
  hideElt(launchTips);
  showElt(showLaunch);
}

document.getElementById("btnStart").addEventListener("click", setEnd);

document.getElementById("btnReset").addEventListener("click", timerReset);

launchBtn.addEventListener("click", function() {launch(3)});
launchFrench.addEventListener("click", function(){launch(4)})

showLaunch.addEventListener("click", function() {
  showElt(launchBtn);
  showElt(launchFrench);
  showElt(launchTips);
  hideElt(showLaunch);
});
