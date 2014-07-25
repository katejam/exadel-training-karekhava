//localStorage.clear();

readUrl();
// showQuestion

function readUrl(){
    var url = window.location.hash;
    var steps = url.split('/');
    console.log('url '+steps);
    steps[0] = steps[0].substring(1,2);
    console.log('url '+steps);
    //topicNumber = steps[0];
    //questionNumber = steps[1];
    return steps;
}



function Application(){

}








window.onload = function () {

    var firstPage = document.getElementById('firstPage'),
        secondPage = document.getElementById('secondPage'),
        topicNumber;

    for (var i = 0; i < quizzData.length; i++) {
        var questionsList = document.getElementById('questionsList');
        var question = document.createElement('li');
        question.appendChild(document.createTextNode(quizzData[i].title));
        questionsList.appendChild(question);
        question.setAttribute('number', i);
    }

    var questionNumber,
        questionsNumber,
        answeredQuestionsNumber = 0,
        rightAnswersNumber = 0;

    if(localStorage.length){
        showSecondPage();
        getSavedValues();
        showQuestion(questionNumber);
    }

    questionsList.addEventListener('click', function (event) {
        showSecondPage();

        topicNumber = event.target.getAttribute('number');

        questionsNumber = quizzData[topicNumber].questions.length;
        localStorage.questionsNumber = questionsNumber;

        //debugger;

        if(topicNumber == localStorage.topicNumber){
            questionNumber = +localStorage.questionNumber || 0;
        }else{
            resetValues();
        }

        localStorage.topicNumber = topicNumber;

        showQuestion(questionNumber);

        setUrl(+topicNumber+1, questionNumber+1);

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
            questionTitle.appendChild(document.createTextNode(quizzData[topicNumber].title));
            secondPage.appendChild(questionTitle);

            var questionCounter = document.createElement('span');
            questionCounter.appendChild(document.createTextNode(rightAnswersNumber + ' / ' + questionsNumber));
            questionTitle.appendChild(questionCounter);

            var questionText = document.createElement('p');
            questionText.appendChild(document.createElement('span').appendChild(document.createTextNode(questionNumber + 1 + ". ")));
            questionText.appendChild(document.createTextNode(quizzData[topicNumber].questions[questionNumber].question));
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
            for (var j = 0; j < quizzData[topicNumber].questions[questionNumber].answers.length; j++) {
                var answer = document.createElement('li');

                var radioButton = document.createElement('input');
                radioButton.setAttribute('type', 'radio');
                radioButton.setAttribute('name', 'answerRadioButton');
                radioButton.setAttribute('value', j + 1);

                answer.appendChild(document.createElement('label').appendChild(radioButton));
                answer.appendChild(document.createTextNode(quizzData[topicNumber].questions[questionNumber].answers[j]));

                answers.appendChild(answer);
            }

            rightAnswer = quizzData[topicNumber].questions[questionNumber].right;
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
                    quizzData[topicNumber].questions[questionNumber].answered = true;
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
//                      saveValues(topicNumber, questionNumber, answeredQuestionsNumber, rightAnswersNumber )
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
                    if (!quizzData[topicNumber].questions[questionNumber].answered) {
                        showQuestion(questionNumber);
                        setUrl(+topicNumber+1, questionNumber+1);
                        //debugger;
                    } else {
                        questionNumber++;
                        goToNextQuestion();
                        //setUrl(+topicNumber, questionNumber);
                    }
                } else {
                    questionNumber = 0;
                    goToNextQuestion();
                    //setUrl(+topicNumber, questionNumber);

                }

            } else {
                debugger;
                alert("congratulations!")
            }

        }



        //saveValues(topicNumber, questionNumber, answeredQuestionsNumber, rightAnswersNumber );

    }
    function setUrl(topicNumber, questionNumber){
        window.location.hash = topicNumber + '/' + questionNumber;
        console.log('url '+ topicNumber + ' '+questionNumber);
    }


    function getSavedValues(){
        topicNumber = +localStorage.topicNumber || 0;
        questionNumber = +localStorage.questionNumber || 0;
        answeredQuestionsNumber = +localStorage.answeredQuestionsNumber || 0;
        rightAnswersNumber = +localStorage.rightAnswersNumber || 0;
        questionsNumber = +localStorage.questionsNumber || 0;
    }
    /*function saveValues(topicNumber, questionNumber, answeredQuestionsNumber, rightAnswersNumber ){
        localStorage.topicNumber = topicNumber;
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

