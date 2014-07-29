localStorage.clear();

readUrl();
// showQuestion

function readUrl(){
    var url = window.location.hash;
    var steps = url.split('/');
    console.log('url '+steps);
    steps[0] = steps[0].substring(1,2);
    console.log('url '+steps);
    //testNumber = steps[0];
    //questionNumber = steps[1];
    return steps;
}



/*function Application(){

}

function Statistics(){
    var questionNumber = 0;
    var questionsNumber = 0;
    var answeredQuestionsNumber = 0;
    var rightAnswersNumber = 0;
    this.getQuestionNumber = function(){
        return questionNumber;
    };
    this.getQuestionsNumber = function(){
        return questionsNumber;
    };
    this.getAnsweredQuestionsNumber = function(){
        return answeredQuestionsNumber;
    };
    this.getRightAnswersNumber = function(){
        return rightAnswersNumber;
    };

    
}

var statistic = new Statistics();
//console.log('statistic.getQuestionNumber '+statistic.getQuestionNumber());


 */



window.onload = function () {

    var firstPage = document.getElementById('firstPage'),
        secondPage = document.getElementById('secondPage'),
        testNumber;

    for (var i = 0; i < quizzData.length; i++) {
        var questionsList = document.getElementById('questionsList');
        var question = document.createElement('li');
        question.appendChild(document.createTextNode(quizzData[i].title));
        questionsList.appendChild(question);
        question.setAttribute('number', i);
    }

/*    var questionNumber,
        questionsNumber,
        answeredQuestionsNumber = 0,
        rightAnswersNumber = 0;*/

    if(localStorage.length){
        showSecondPage();
        getSavedValues();
        showQuestion(questionNumber);
    }

    questionsList.addEventListener('click', function (event) {
        showSecondPage();

        testNumber = event.target.getAttribute('number');

        questionsNumber = quizzData[testNumber].questions.length;
        localStorage.questionsNumber = questionsNumber;

        //debugger;

        if(testNumber == localStorage.testNumber){
            questionNumber = +localStorage.questionNumber || 0;
        }else{
            resetValues();
        }

        localStorage.testNumber = testNumber;

        showQuestion(questionNumber);

        setUrl(+testNumber+1, questionNumber+1);

    });

    function showQuestion(questionNumber) {
        console.log('localStorage.questionNumber = '+localStorage.questionNumber);

        showQuestionText();
        showAnswers();
        showButtons();

        var rightAnswer;

        function showQuestionText() {
            while (secondPage.lastChild) {
                secondPage.removeChild(secondPage.lastChild);
            }

            var mainTitle = document.createElement('h1');
            mainTitle.appendChild(document.createTextNode('ПДД'));
            secondPage.appendChild(mainTitle);

            var goBackLink = document.createElement('a');
            goBackLink.appendChild(document.createTextNode('Вернуться к списку тем'));
            goBackLink.setAttribute('href', '#');
            mainTitle.appendChild(goBackLink);

            var questionTitle = document.createElement('h2');
            questionTitle.appendChild(document.createTextNode(quizzData[testNumber].title));
            secondPage.appendChild(questionTitle);

            var questionCounter = document.createElement('span');
            questionCounter.appendChild(document.createTextNode(rightAnswersNumber + ' / ' + questionsNumber));
            questionTitle.appendChild(questionCounter);

            var questionText = document.createElement('p');
            questionText.appendChild(document.createElement('span').appendChild(document.createTextNode(questionNumber + 1 + ". ")));
            questionText.appendChild(document.createTextNode(quizzData[testNumber].questions[questionNumber].question));
            secondPage.appendChild(questionText);

            goBackLink.addEventListener('click', function(){
                showFirstPage();
                resetValues();
                localStorage.clear();
                //debugger;
            });
        }

        function showAnswers() {
            var answers = document.createElement('ul');
            for (var j = 0; j < quizzData[testNumber].questions[questionNumber].answers.length; j++) {
                var answer = document.createElement('li');

                var radioButton = document.createElement('input');
                radioButton.setAttribute('type', 'radio');
                radioButton.setAttribute('name', 'answerRadioButton');
                radioButton.setAttribute('value', j + 1);

                answer.appendChild(document.createElement('label').appendChild(radioButton));
                answer.appendChild(document.createTextNode(quizzData[testNumber].questions[questionNumber].answers[j]));

                answers.appendChild(answer);
            }

            rightAnswer = quizzData[testNumber].questions[questionNumber].right;
            console.log('rightAnswer: ' + rightAnswer);

            secondPage.appendChild(answers);


        }

        function showButtons() {
            var buttons = document.createElement('div');
            buttons.className = 'buttons';
            showSendButton();
            showSkipButton();
            secondPage.appendChild(buttons);

            function showSendButton() {
                var sendButton = document.createElement('a');
                sendButton.setAttribute("href", "javascript:void;");
                sendButton.setAttribute("id", "sendButton");
                sendButton.innerHTML = 'ответить';

                sendButton.addEventListener('click', function () {
                    quizzData[testNumber].questions[questionNumber].answered = true;
                    answeredQuestionsNumber++;
                    localStorage.answeredQuestionsNumber = answeredQuestionsNumber;

                    checkAnswers();
                    return false;
                });

                buttons.appendChild(sendButton);
            }

            function showSkipButton() {
                var skipButton = document.createElement('a');
                skipButton.setAttribute("href", "javascript:void;");
                skipButton.setAttribute("id", "skipButton");
                skipButton.innerHTML = 'пропустить';
                skipButton.addEventListener('click', function () {
                    questionNumber++;
//                      localStorage.questionNumber = questionNumber;
//                      saveValues(testNumber, questionNumber, answeredQuestionsNumber, rightAnswersNumber )
                    goToNextQuestion();
                    return false;
                });

                buttons.appendChild(skipButton);

            }

            function checkAnswers() {
                var radioButtons = document.getElementsByName('answerRadioButton');
                for (var k = 0; k < radioButtons.length; k++) {
                    if (radioButtons[k].checked) {
                        if (radioButtons[k].value == rightAnswer) {
                            console.log("it's right answ");
                            rightAnswersNumber++;
                            questionNumber++;

                            localStorage.rightAnswersNumber = rightAnswersNumber;
                            localStorage.questionNumber = questionNumber;

                            goToNextQuestion();
                        } else {
                            console.log("wrong");
                            //alert("Right answer is "+ rightAnswer);
                            questionNumber++;
                            localStorage.questionNumber = questionNumber;
                            goToNextQuestion();
                        }
                    }
                }
            }


        }

        function goToNextQuestion() {
            console.log("===! questionsNumber: " + questionsNumber + " questionNumber " + questionNumber);
            if (answeredQuestionsNumber != questionsNumber) {
                if (questionNumber < questionsNumber) {
                    if (!quizzData[testNumber].questions[questionNumber].answered) {
                        showQuestion(questionNumber);
                        setUrl(+testNumber+1, questionNumber+1);
                        //debugger;
                    } else {
                        questionNumber++;
                        goToNextQuestion();
                        //setUrl(+testNumber, questionNumber);
                    }
                } else {
                    questionNumber = 0;
                    goToNextQuestion();
                    //setUrl(+testNumber, questionNumber);

                }

            } else {
                debugger;
                alert("congratulations!")
            }

        }



        //saveValues(testNumber, questionNumber, answeredQuestionsNumber, rightAnswersNumber );

    }
    function setUrl(testNumber, questionNumber){
        window.location.hash = testNumber + '/' + questionNumber;
        console.log('url ' + testNumber + ' ' + questionNumber);
    }


    function getSavedValues(){
        testNumber = +localStorage.testNumber || 0;
        questionNumber = +localStorage.questionNumber || 0;
        answeredQuestionsNumber = +localStorage.answeredQuestionsNumber || 0;
        rightAnswersNumber = +localStorage.rightAnswersNumber || 0;
        questionsNumber = +localStorage.questionsNumber || 0;
    }
    /*function saveValues(testNumber, questionNumber, answeredQuestionsNumber, rightAnswersNumber ){
        localStorage.testNumber = testNumber;
        localStorage.questionNumber = questionNumber;
        localStorage.answeredQuestionsNumber = answeredQuestionsNumber;
        localStorage.rightAnswersNumber = rightAnswersNumber;
        localStorage.questionsNumber = questionsNumber;

    }*/

    function resetValues(){
        questionNumber = 0;
        answeredQuestionsNumber = 0;
        rightAnswersNumber = 0;

    }

    function showFirstPage(){
        firstPage.className = 'visible';
        secondPage.className = 'hidden';
    }
    function showSecondPage(){
        firstPage.className = 'hidden';
        secondPage.className = 'visible';
    }



    //localStorage.clear();
}

