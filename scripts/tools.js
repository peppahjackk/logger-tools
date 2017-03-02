function globalFunction() {
  var time, current, countdown, hours, minutes, seconds, customHr, customMin, fhours, fminutes, fseconds;

  // Intermission Clock
  var toggleClock = document.getElementById("toggleClock");
  var innerClock = document.getElementById("innerClock");
  var custHr = document.getElementById("customHr");
  var custMin = document.getElementById("customMin");
  var timeRemaining = document.getElementById("timeRemaining");
  var intermissionEnd = document.getElementById("intermissionEnd");
  var currentTime = document.getElementById("currentTime");

  // Highlight Tracker
  var toggleHTracker = document.getElementById("toggleHTracker");
  var innerHTracker = document.getElementById("inner-h-tracker");
  var highlightHome = document.getElementById("highlight-home");
  var highlightAway = document.getElementById("highlight-away");
  var homePlus = document.getElementById("home-tracker-plus");
  var awayPlus = document.getElementById("away-tracker-plus");
  var homeMinus = document.getElementById("home-tracker-minus");
  var awayMinus = document.getElementById("away-tracker-minus");
  var clearHTotal = document.getElementById("clearHTotal");

  // Break Tracker
  var toggleTracker = document.getElementById("toggleTracker");
  var innerTracker = document.getElementById("innerTracker");
  var clearTracker = document.getElementById("clearTracker");
  var toggleP1Tracker = document.getElementById("p1-hide");
  var p1Tracker = document.getElementById("p1");
  var toggleP2Tracker = document.getElementById("p2-hide");
  var p2Tracker = document.getElementById("p2");
  var toggleP3Tracker = document.getElementById("p3-hide");
  var p3Tracker = document.getElementById("p3");

  // Stream Launcher
  var launchBtn = document.getElementById("launchStream");
  var launchNum = document.getElementById("streamCount");
  var launchTips = document.getElementById("launchTips");
  var toggleStreams = document.getElementById("toggleStreams");
  var innerLaunch = document.getElementById("innerLauncher");


  // Adds a zero to single digit numbers
  function addZero(n) {
    return (n < 10 ? "0" + n : n);
  }

  // Set time variables
  function setTimes() {
    current = new Date();
    hours = fhours = addZero(current.getHours());
    minutes = fminutes = addZero(current.getMinutes());
    seconds = fseconds = addZero(current.getSeconds());
  }

  // Initializes the current clock
  function timerStart() {
    clearInterval(time);
    setTimes();
    timeRemaining.style.color = '#EDEDED';
    // Updates clock every second
    time = setInterval(function() {
      current = new Date();
      hours = addZero(current.getHours());
      minutes = addZero(current.getMinutes());
      seconds = addZero(current.getSeconds());
      currentTime.innerHTML = hours + ":" + minutes + ":" + seconds;
    }, 1000);

    // Sets initial clock value
    currentTime.innerHTML = hours + ":" + minutes + ":" + seconds;
  }

  function setEnd() {
    clearInterval(countdown);
    // Remove any white space in input
    customHr = custHr.value.replace(/\s/g, '');
    customMin = custMin.value.replace(/\s/g, '');

    setTimes();
    timerStart();
    
    fhours = parseInt(fhours);
    fminutes = parseInt(fminutes);
    fseconds = parseInt(fseconds);

    var remainingMinutes = 18;
    var remainingSeconds = 0;

    // Makes sure input is a valid time and adjusts countdown length
    if (customHr !== "" && !isNaN(customHr) && customHr < 24) {
      fhours = customHr;
    }
    if (customMin !== "" && !isNaN(customMin) && customMin < 60) {
      if (fminutes < customMin && customMin >= 42 && (60 - customMin) + fminutes < 18) {
        remainingMinutes = 18 - ((60 + fminutes) - customMin);
      } else if ((fminutes < customMin && (60 - customMin) + fminutes > 18) || (fminutes > customMin && fminutes - customMin < 1)) {
        intermissionEnd.innerHTML = '(00:00)';
        timeRemaining.innerHTML = 'ERROR';
        clearInput();
        return;
      } else {
        remainingMinutes = 18 - (fminutes - customMin);
      }
      fminutes = customMin;
    }

    // Handles the changing of an hour
    if (fhours >= 23 && fminutes >= 42 && current.getMinutes() > 17) {
      fhours = addZero(0);
      fminutes = addZero((parseInt(fminutes) + 18) - 60);
    } else if (fhours >= 23 && fminutes >= 42 && current.getMinutes() <= 17) {
      fminutes = addZero((parseInt(fminutes) + 18) - 60);
    } else if (fhours < 23 && fminutes >= 42 && current.getMinutes() > 17) {
      fhours = (parseInt(fhours) + 1);
      fminutes = addZero((parseInt(fminutes) + 18) - 60);
    } else if (fhours < 23 && fminutes >= 42 && current.getMinutes() <= 17) {
      fminutes = addZero((parseInt(fminutes) + 18) - 60);
    } else {
      fminutes = (parseInt(fminutes) + 18);
    }
    intermissionEnd.innerHTML = '(' + fhours + ":" + fminutes + ":" + fseconds + ')';
    clearInput();

    timeRemaining.innerHTML = addZero(remainingMinutes) + ':' + addZero(remainingSeconds);

    countdown = setInterval(function countdownStart() {
      if (remainingMinutes <= 5 && remainingMinutes > 3 && timeRemaining.style.color != '#F0C402') {
        timeRemaining.style.color = '#F0C402';
      } else if (remainingMinutes <= 3 && timeRemaining.style.color != '#c84630') {
        timeRemaining.style.color = '#c84630';
      }
      if (remainingMinutes === 0 && remainingSeconds === 0) {
        timeRemaining.innerHTML = 'Play Resuming';
        intermissionEnd.innerHTML = "-";
        clearInterval(countdown);
      } else {
        if (remainingSeconds > 0) {
          remainingSeconds--;
        } else {
          remainingMinutes--;
          remainingSeconds = 59;
        }
        timeRemaining.innerHTML = addZero(remainingMinutes) + ':' + addZero(remainingSeconds);
      }
    }, 1000)
  }



  // Resets intermission end timer
  function timerReset() {
    clearInterval(countdown);
    clearInput();
    intermissionEnd.innerHTML = "(00:00)";
    timeRemaining.innerHTML = "00:00";
    timeRemaining.style.color = '#EDEDED';
  }

  // Clears optional time fields
  function clearInput() {
    custHr.value = "";
    custMin.value = "";
  }

  // Launches X number of streams for 1920x1080
  function launch(num) {
    for (var i = 0; i < num; i++) {
      window.open("https://www.nhl.com/tv/2016020480", "", "width=1024,height=820,top=260, left=" + (260 * i) + '"');
    }
    toggleView([innerLaunch], toggleStreams);
  }

  // Unchecks all checkboxes
  function clearChecks() {
    var checks = document.getElementsByTagName('input');

    for (var i = 0; i < checks.length; i++) {
      if (checks[i].type == 'checkbox') {
        checks[i].checked = false;
      }
    }
  }
  
  // Show an element(s) if not already visible
  function show(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].className.match(/(?:^|\s)hidden(?!\S)/g)) {
        arr[i].className = arr[i].className.replace(/(?:^|\s)hidden(?!\S)/g, '');
      }
    }
  }
  
  // Hides an element(s) if not already hidden
  function hide(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (!arr[i].className.match(/(?:^|\s)hidden(?!\S)/g)) {
      if (arr[i].className.length > 0) {
        arr[i].className += " hidden";
      } else {
        arr[i].className += 'hidden';
      }
    }
    }
  }

  // Toggles a hidden class (actually display: none) for the passed elements in an array and switches the toggle button text
  function toggleView(arr, btn) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].className.match(/(?:^|\s)hidden(?!\S)/g)) {
        arr[i].className = arr[i].className.replace(/(?:^|\s)hidden(?!\S)/g, '')
      } else if (arr[i].className.length > 0) {
        arr[i].className += " hidden";
      } else {
        arr[i].className += 'hidden';
      }
    }
    if (btn.innerHTML.toLowerCase().match(/(?:^|\s)show(?!\S)/g)) {
      btn.innerHTML = "- Hide Tool";
    } else if (btn.innerHTML.toLowerCase().match(/(?:^|\s)hide(?!\S)/g)) {
      btn.innerHTML = "+ Show Tool";
    } else if (btn.innerHTML.length == 1 && btn.innerHTML == "-") {
      btn.innerHTML = "+";
    } else if (btn.innerHTML.length == 1 && btn.innerHTML == "+") {
      btn.innerHTML = "-";
    } else {
      throw error;
    }
  }

  // Adds and subtracts from given args
  function plusOne(num) {
    num.innerHTML = parseInt(num.innerHTML) + 1;
  }

  function minusOne(num) {
    num.innerHTML = parseInt(num.innerHTML) - 1;
  }

  // Event Listeners
  document.getElementById("btnStart").addEventListener("click", setEnd);

  document.getElementById("btnReset").addEventListener("click", timerReset);

  clearTracker.addEventListener("click", function() {
    clearChecks();
    show([p1]);
    hide([p2,p3]);
  });
  
  clearHTotal.addEventListener("click", function() {
    highlightHome.innerHTML = 0;
    highlightAway.innerHTML = 0;
  });

  homePlus.addEventListener("click", function() {
    plusOne(highlightHome);
  });

  awayPlus.addEventListener("click", function() {
    plusOne(highlightAway);
  });

  homeMinus.addEventListener("click", function() {
    minusOne(highlightHome);
  });

  awayMinus.addEventListener("click", function() {
    minusOne(highlightAway);
  });

  launchBtn.addEventListener("click", function() {
    launch(launchNum.options[launchNum.selectedIndex].value)
  });


  // Toggles view for tools
  toggleStreams.addEventListener("click", function() {
    toggleView([innerLaunch], toggleStreams);
  });
  toggleClock.addEventListener("click", function() {
    toggleView([innerClock], toggleClock);
  });

  toggleHTracker.addEventListener("click", function() {
    toggleView([innerHTracker], toggleHTracker);
  });

  toggleTracker.addEventListener("click", function() {
    toggleView([innerTracker, clearTracker], toggleTracker);
  });

  toggleP1Tracker.addEventListener("click", function() {
    toggleView([p1], toggleP1Tracker)
  });

  toggleP2Tracker.addEventListener("click", function() {
    toggleView([p2], toggleP2Tracker)
  });

  toggleP3Tracker.addEventListener("click", function() {
    toggleView([p3], toggleP3Tracker)
  });

  clearInput();
  timerStart();
  clearChecks();
}

globalFunction();