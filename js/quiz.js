"use strict";
function globalFunction() {
  var order = [];
  const questions = {
    0: {
      stadium: 'Prudential Center',
      city: 'Newark',
      team: 'Devils'
    },
    1: {
      stadium: 'TD Garden',
      city: 'Boston',
      team: 'Bruins'
    },
    2: {
      stadium: 'Madison Square Garden',
      city: 'New York City',
      team: 'Rangers'
    },
    3: {
      stadium: 'Barclays Center',
      city: 'Brooklyn',
      team: 'Islanders'
    },
    4: {
      stadium: 'Bell Centre',
      city: 'Montreal',
      team: 'Canadiens'
    }
  }
  
  function startQuiz(questions) {
    let quizLength = Object.keys(questions).length;
    while (order.length < quizLength)
      {
        let x = Math.floor(Math.random() * (quizLength));
        if (order.indexOf(x) === -1) { order.push(x);}
      }
    displayNextQuestion(questions, order);
  }
  
  function displayNextQuestion(questionSet, order) {
    //console.log(questionSet.msg.stadium)
    console.log(questionSet[order[0]].team);
    order.shift();
    if (order.length > 0) {displayNextQuestion(questions,order);}
  }

  startQuiz(questions);
}

globalFunction();