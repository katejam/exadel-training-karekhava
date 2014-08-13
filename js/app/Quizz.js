function Quizz(app){

    this.app = app;
    this.quizzData = this.app.getData();
    this.testNumber = 0;
    this.questionNumber = 0;
    this.rightAnswersNumber = 0;
    this.questionsNumber = 0;
    this.answeredQuestionsNumber = 0;

    this.createQuizz();

}


Quizz.prototype.createQuizz = function(){
    //localStorage.clear();

    console.log('localst '+ localStorage.currentQuestionNumber);

    var firstPage = document.getElementById('firstPage'),
        secondPage = document.getElementById('secondPage');
        //testNumber;

    for (var i = 0; i < this.quizzData.length; i++) {
        var questionsList = document.getElementById('questionsList');
        var question = document.createElement('li');
        question.appendChild(document.createTextNode(this.quizzData[i].title));
        questionsList.appendChild(question);
        question.setAttribute('number', i);
    }


    if(localStorage.length){
        this.visibilityChange(firstPage, secondPage);
        this.getSavedValues();
        this.showQuestion(this.testNumber, this.questionNumber, this.questionsNumber);
    }

    var thisQuizz = this;

    questionsList.addEventListener('click', function (event) {
        thisQuizz.visibilityChange(firstPage, secondPage);
        thisQuizz.testNumber = Number(event.target.getAttribute('number'));

        thisQuizz.questionsNumber = thisQuizz.quizzData[thisQuizz.testNumber].questions.length;
        //questionsNumber = thisQuizz.questionsNumber;
        thisQuizz.app.storage.setTestNumber(thisQuizz.testNumber);
        thisQuizz.app.storage.setQuestionsNumber(thisQuizz.questionsNumber);


        thisQuizz.showQuestion(thisQuizz.testNumber, thisQuizz.questionNumber, thisQuizz.questionsNumber);

    });
};

Quizz.prototype.visibilityChange = function(visible, invisible){
    invisible.className = 'visible';
    visible.className = 'hidden';
};
/*Quizz.prototype.SaveValues = function(){
    var thisQuizz = this;
    thisQuizz.app.storage.setTestNumber(thisQuizz.testNumber);
    thisQuizz.app.storage.setQuestionsNumber(thisQuizz.questionsNumber);

}*/
Quizz.prototype.getSavedValues = function(){
    //debugger;

    var testNumber = +this.app.storage.getTestNumber();
    var questionNumber = +this.app.storage.getCurrentQuestionNumber();
    var questionsNumber = +this.app.storage.getQuestionsNumber();
    var answeredQuestionsNumber = +this.app.storage.getAnsweredQuestionsNumber();
    var rightAnswersNumber = +this.app.storage.getRightAnswersNumber();

    console.log('SAVED: '+'testNumber: '+testNumber+ ' questionNumber: '+questionNumber+' questionsNumber: '+questionsNumber+' answeredQuestionsNumber: '+answeredQuestionsNumber+' rightAnswersNumber: '+rightAnswersNumber);

    this.testNumber = testNumber || 0;
    this.questionNumber = questionNumber || 0;
    this.questionsNumber = questionsNumber || 0;
    this.answeredQuestionsNumber = answeredQuestionsNumber || 0;
    this.rightAnswersNumber = rightAnswersNumber || 0;
};

Quizz.prototype.showQuestionText = function(testNumber, questionNumber){
    var firstPage = document.getElementById('firstPage'),
        secondPage = document.getElementById('secondPage'),
        thisQuizz = this;

    while (secondPage.lastChild) {
        secondPage.removeChild(secondPage.lastChild);
    }

    var mainTitle = document.createElement('h1');
    mainTitle.appendChild(document.createTextNode('ПДД'));
    secondPage.appendChild(mainTitle);

    var goBackLink = document.createElement('a');
    goBackLink.appendChild(document.createTextNode('Вернуться к списку тем'));
    goBackLink.setAttribute('href', 'javascript:void(0);');
    mainTitle.appendChild(goBackLink);

    var questionTitle = document.createElement('h2');
    questionTitle.appendChild(document.createTextNode(this.quizzData[testNumber].title));
    secondPage.appendChild(questionTitle);

    var questionCounter = document.createElement('span');
    questionCounter.appendChild(document.createTextNode(this.rightAnswersNumber + ' / ' + this.questionsNumber));
    questionTitle.appendChild(questionCounter);

    var questionText = document.createElement('p');
    questionText.appendChild(document.createElement('span').appendChild(document.createTextNode(questionNumber + 1 + ". ")));
    questionText.appendChild(document.createTextNode(this.quizzData[testNumber].questions[questionNumber].question));
    secondPage.appendChild(questionText);

    goBackLink.addEventListener('click', function(){
        thisQuizz.resetAnswers(thisQuizz.testNumber);
        thisQuizz.visibilityChange(secondPage, firstPage);
    });
};

Quizz.prototype.showAnswers = function(testNumber, questionNumber) {
    var answers = document.createElement('ul');
    for (var j = 0; j < this.quizzData[testNumber].questions[questionNumber].answers.length; j++) {
        var answer = document.createElement('li');

        var radioButton = document.createElement('input');
        radioButton.setAttribute('type', 'radio');
        radioButton.setAttribute('name', 'answerRadioButton');
        radioButton.setAttribute('value', j + 1);

        answer.appendChild(document.createElement('label').appendChild(radioButton));
        answer.appendChild(document.createTextNode(this.quizzData[testNumber].questions[questionNumber].answers[j]));

        answers.appendChild(answer);
    }

    var rightAnswer = this.quizzData[testNumber].questions[questionNumber].right;
    console.log('rightAnswer: ' + rightAnswer);

    secondPage.appendChild(answers);


};

Quizz.prototype.showButtons = function(testNumber, questionNumber){
    var buttons = document.createElement('div');
    buttons.className = 'buttons';
    showSendButton();
    showSkipButton();
    secondPage.appendChild(buttons);

    var thisQuizz = this;
    //console.log('==thisQuizz.quizzData' + thisQuizz.quizzData);

    function showSendButton() {
        var sendButton = document.createElement('a');
        sendButton.setAttribute("href", "javascript:void(0);");
        sendButton.setAttribute("id", "sendButton");
        sendButton.innerHTML = 'ответить';

        sendButton.addEventListener('click', function () {
            //debugger;
            thisQuizz.quizzData[testNumber].questions[questionNumber].answered = true;
            thisQuizz.answeredQuestionsNumber++;
            thisQuizz.app.storage.setAnsweredQuestionsNumber(thisQuizz.answeredQuestionsNumber);

            //localStorage.answeredQuestionsNumber = answeredQuestionsNumber;
            thisQuizz.checkAnswers(thisQuizz.testNumber, thisQuizz.questionNumber, thisQuizz.questionsNumber);
            return false;
        });

        buttons.appendChild(sendButton);
    }

    function showSkipButton() {
        var skipButton = document.createElement('a');
        skipButton.setAttribute("href", "javascript:void(0);");
        skipButton.setAttribute("id", "skipButton");
        skipButton.innerHTML = 'пропустить';
        skipButton.addEventListener('click', function () {
            thisQuizz.questionNumber++;
            thisQuizz.app.storage.setCurrentQuestionNumber(thisQuizz.questionNumber);
            thisQuizz.goToNextQuestion(thisQuizz.testNumber, thisQuizz.questionNumber, thisQuizz.questionsNumber);
            return false;
        });

        buttons.appendChild(skipButton);

    }
};

Quizz.prototype.checkAnswers = function(testNumber, questionNumber, questionsNumber){
    //debugger;
    var thisQuizz = this;
    var rightAnswer = thisQuizz.quizzData[testNumber].questions[questionNumber].right;
    //console.log('rightAnswer: ' + rightAnswer);
    var radioButtons = document.getElementsByName('answerRadioButton');
    for (var k = 0; k < radioButtons.length; k++) {
        if (radioButtons[k].checked) {
            if (radioButtons[k].value == rightAnswer) {
                console.log("right answer!");
                thisQuizz.rightAnswersNumber++;
                //console.log(' this.app.statistics RightAnswersNumber ' + this.app.statistics.getRightAnswersNumber());
                questionNumber++;
                thisQuizz.questionNumber++;

                this.app.storage.setRightAnswersNumber(thisQuizz.rightAnswersNumber);
                this.app.storage.setCurrentQuestionNumber(questionNumber);

                this.goToNextQuestion(testNumber, questionNumber, questionsNumber);
            } else {
                console.log("wrong");
                console.log("Right answer is "+ rightAnswer);
                questionNumber++;
                thisQuizz.questionNumber++;

                this.app.storage.setRightAnswersNumber(thisQuizz.rightAnswersNumber);
                this.app.storage.setCurrentQuestionNumber(questionNumber);

                this.goToNextQuestion(testNumber, questionNumber, questionsNumber);
            }
        }
    }
};

Quizz.prototype.goToNextQuestion = function(testNumber, questionNumber, questionsNumber){
    debugger;

    console.log("--- testNumber: " + testNumber + " questionNumber " + questionNumber);
    /*console.log('localst getRightAnswersNumber '+ this.app.storage.getRightAnswersNumber());
    console.log('localst getCurrentQuestionNumber '+ this.app.storage.getCurrentQuestionNumber());
    console.log('localst getAnsweredQuestionsNumber '+ this.app.storage.getAnsweredQuestionsNumber());
    console.log('localst getQuestionsNumber '+ this.app.storage.getQuestionsNumber());*/
    if (this.answeredQuestionsNumber != questionsNumber) {
        if (questionNumber < questionsNumber) {
            if (!this.quizzData[testNumber].questions[questionNumber].answered) {
                this.showQuestion(testNumber, questionNumber, questionsNumber);
                //setUrl(+testNumber+1, questionNumber+1);
                //debugger;
            } else {
                questionNumber++;
                this.goToNextQuestion(testNumber, questionNumber, questionsNumber);
                //setUrl(+testNumber, questionNumber);
            }
        } else {
            questionNumber = 0;
            this.goToNextQuestion(testNumber, questionNumber, questionsNumber);
            //setUrl(+testNumber, questionNumber);

        }
    }else{
        this.visibilityChange(secondPage, firstPage);
        alert('sfwew');
    }
};

Quizz.prototype.showQuestion = function(testNumber, questionNumber){
    //debugger;

    this.showQuestionText(testNumber, questionNumber);
    this.showAnswers(testNumber, questionNumber);
    this.showButtons(testNumber, questionNumber);

};


Quizz.prototype.resetAnswers = function(testNumber){
    localStorage.clear();
    //this.app.storage.clearStorage();

    this.answeredQuestionsNumber = 0;
    this.rightAnswersNumber = 0;
    this.questionNumber = 0;
    for(var i = 0; i < this.questionsNumber-1; i++){
        //debugger;
        this.quizzData[testNumber].questions[i].answered = null;
    }

};