"use strict";

function globalFunction() {
  var order = [];
  var submit = document.getElementById('btnSubmit');
  var start = document.getElementById('btnStart');
  var activeQuiz = document.getElementById('activeQuiz');
  var question = document.getElementById('question');
  var answer = document.getElementById('answer');
  var scoreCount = document.getElementById('score');
  var final = document.getElementById('final');
  var score = 0, answered = 0;
  
  const questions = {
    0: {
      stadium: 'prudential center',
      city: 'newark',
      team: 'Devils'
    },
    1: {
      stadium: 'td garden',
      city: 'boston',
      team: 'Bruins'
    },
    2: {
      stadium: 'madison square garden',
      city: 'new york city',
      team: 'Rangers'
    },
    3: {
      stadium: 'barclays center',
      city: 'brooklyn',
      team: 'Islanders'
    },
    4: {
      stadium: 'bell centre',
      city: 'montreal',
      team: 'Canadiens'
    },
    5: {
      stadium: 'joe louis arena',
      city: 'detroit',
      team: 'Red Wings'
    },
    6: {
      stadium: 'united center',
      city: 'chicago',
      team: 'Blackhawks'
    },
    7: {
      stadium: 'wells fargo center',
      city: 'philadelphia',
      team: 'Flyers'
    },
    8: {
      stadium: 'scotiabank saddledome',
      city: 'calgary',
      team: 'Flames'
    },
    9: {
      stadium: 'bb&t center',
      city: 'sunrise',
      team: 'Panthers'
    },
    10: {
      stadium: 'amalie arena',
      city: 'tampa',
      team: 'Lightning'
    },
    11: {
      stadium: 'canadia tire centre',
      city: 'ottawa',
      team: 'Senators'
    },
    12: {
      stadium: 'scottrade center',
      city: 'st. louis',
      team: 'Blues'
    },
    13: {
      stadium: 'keybank center',
      city: 'buffalo',
      team: 'Sabres'
    },
    14: {
      stadium: 'rogers arena',
      city: 'vancouver',
      team: 'Canucks'
    },
    15: {
      stadium: 'air canada center',
      city: 'toronto',
      team: 'Maple Leafs'
    },
    16: {
      stadium: 'pnc arena',
      city: 'raleigh',
      team: 'Hurricanes'
    },
    17: {
      stadium: 'rodgers place',
      city: 'edmonton',
      team: 'Oilers'
    },
    18: {
      stadium: 'american airlines arena',
      city: 'dallas',
      team: 'Stars'
    },
    19: {
      stadium: 'verizon center',
      city: 'washington dc',
      team: 'Capitals'
    },
    20: {
      stadium: 'consol energy center',
      city: 'pittsburgh',
      team: 'Penguins'
    },
    21: {
      stadium: 'nationwide arena',
      city: 'columbus',
      team: 'Blue Jackets'
    },
    22: {
      stadium: 'staples center',
      city: 'los angeles',
      team: 'Kings'
    },
    23: {
      stadium: 'xcel energy center',
      city: 'st. paul',
      team: 'Wild'
    },
    24: {
      stadium: 'pepsi center',
      city: 'denver',
      team: 'Avalanche'
    },
    25: {
      stadium: 'sap center',
      city: 'san jose',
      team: 'Sharks'
    },
    26: {
      stadium: 't-mobile arena',
      city: 'las vegas',
      team: 'Golden Knights'
    },
    27: {
      stadium: 'honda center',
      city: 'anaheim',
      team: 'Ducks'
    },
    28: {
      stadium: 'gila river arena',
      city: 'glendale',
      team: 'Coyotes'
    },
    29: {
      stadium: 'bridgestone arena',
      city: 'nashville',
      team: 'Predators'
    },
    30: {
      stadium: 'mts centre',
      city: 'winnipeg',
      team: 'Jets'
    }
  };

  function startQuiz(questions) {
    score = 0;
    answered = 0;
    scoreCount.innerHTML = "Good Luck!";
    let quizLength = Object.keys(questions).length;
    while (order.length < quizLength) {
      let x = Math.floor(Math.random() * (quizLength));
      if (order.indexOf(x) === -1) {
        order.push(x);
      }
    }
    hideElt(final);
    showElt(activeQuiz);
    hideElt(start);
    displayNextQuestion(questions, order);
  }

  function displayNextQuestion(questionSet, order) {
    //console.log(questionSet.msg.stadium)
    question.innerHTML = "Where do the " + questionSet[order[0]].team + " play?";
  }

  function scoreQuestion(order) {
    answered++;
    if (answer.value.toLowerCase() === questions[order[0]].stadium) {
      score++;
    }
    scoreCount.innerHTML = "Score: " + score + " correct out of " + answered;
    answer.value = '';
    order.shift();
    if (order.length > 0) {
      displayNextQuestion(questions, order);
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    hideElt(activeQuiz);
    showElt(start);
    showElt(final);
    final.innerHTML = "Your answered " + score + " out of " + answered + " questions correctly (%" + (Math.round(score / answered * 100)) + ")!";
    start.innerHTML = "Play again";
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
 
  answer.onkeydown = function(event) {
    if (event.keyCode == 13) {
        scoreQuestion(order);
    }
  };

  start.addEventListener('click', function() {
    startQuiz(questions)
  });
  submit.addEventListener('click', function() {
    scoreQuestion(order)
  });
}

globalFunction();