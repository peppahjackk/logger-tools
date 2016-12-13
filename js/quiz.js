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
  var score = 0, asked = 0;
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
    }
  }

  function startQuiz(questions) {
    score = 0;
    asked = 0;
    let quizLength = Object.keys(questions).length;
    while (order.length < quizLength) {
      let x = Math.floor(Math.random() * (quizLength));
      if (order.indexOf(x) === -1) {
        order.push(x);
      }
    }
    showElt(activeQuiz);
    hideElt(start);
    displayNextQuestion(questions, order);
  }

  function displayNextQuestion(questionSet, order) {
    //console.log(questionSet.msg.stadium)
    question.innerHTML = "Where do the " + questionSet[order[0]].team + " play?";
  }

  function scoreQuestion(order) {
    asked++;
    if (answer.value.toLowerCase() === questions[order[0]].stadium) {
      score++;
    }
    scoreCount.innerHTML = "Score: " + score + " correct out of " + asked;
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
    final.innerHTML = "Your answered " + score + " out of " + asked + " questions correctly (%" + (score/asked*100) + ")!";
    start.innerHTML = "Play again";
  }

  function showElt(elt) {
    elt.className = elt.className.replace(/(?:^|\s)hidden(?!\S)/g, '');
  }

  function hideElt(elt) {
    elt.className += "hidden";
  }

  start.addEventListener('click', function() {
    startQuiz(questions)
  });
  submit.addEventListener('click', function() {
    scoreQuestion(order)
  });
}

globalFunction();