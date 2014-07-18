
window.onload = function(){



    var firstPage = document.getElementById('firstPage'),
        secondPage = document.getElementById('secondPage'),
        topicNumber;

    for(var i = 0; i<quizzData.length; i++){
        var question = document.createElement('li');

        question.appendChild(document.createTextNode(quizzData[i].title));
        document.getElementById('questionsList').appendChild(question);


        question.setAttribute('n', i);

        question.onclick = function(){
            firstPage.style.display = 'none';
            secondPage.style.display = 'block';

            console.log(this.getAttribute('n'));
            topicNumber = this.getAttribute('n');

            var questionNumber = 0;
            var rightAnswersNumber = 0;

            showQuestion(questionNumber);

            function showQuestion(questionNumber){

                var questionTitle = document.createElement('h2');
                questionTitle.appendChild(document.createTextNode(quizzData[topicNumber].title));

                var questionsNumber = quizzData[topicNumber].questions.length;

                var questionCounter = document.createElement('span');
                questionCounter.appendChild(document.createTextNode(rightAnswersNumber + ' / ' + questionsNumber));

                questionTitle.appendChild(questionCounter);

                var questionText = document.createElement('p');
                questionText.appendChild(document.createElement('span').appendChild(document.createTextNode(questionNumber+1 + ". ")));
                questionText.appendChild(document.createTextNode(quizzData[topicNumber].questions[questionNumber].question));

                for(var i = 0; i<questionsNumber;i++){
                    quizzData[topicNumber].questions[i].answered = false;
                }

                var answers = document.createElement('ul');
                for(var j = 0; j<quizzData[topicNumber].questions[questionNumber].answers.length; j++){
                    var answer = document.createElement('li');

                    var radioButton = document.createElement('input');
                    radioButton.setAttribute('type', 'radio');
                    radioButton.setAttribute('name', 'answerRadioButton');
                    radioButton.setAttribute('value', j+1);

                    answer.appendChild(document.createElement('label').appendChild(radioButton));
                    answer.appendChild(document.createTextNode(quizzData[topicNumber].questions[questionNumber].answers[j]));

                    answers.appendChild(answer);
                }

                var rightAnswer = quizzData[topicNumber].questions[questionNumber].right;
                console.log('rightAnswer: '+rightAnswer );

                var buttons = document.createElement('div');
                buttons.className = 'buttons';

                var sendButton = document.createElement('a');
                sendButton.setAttribute("href", "#");
                sendButton.setAttribute("id", "sendButton");
                sendButton.innerHTML = 'ответить';
                sendButton.onclick = function(){
                    var radioButtons = document.getElementsByName('answerRadioButton');
                    for (var k=0; k < radioButtons.length; k++){
                        if (radioButtons[k].checked){
                            if(radioButtons[k].value == rightAnswer){
                                console.log("it's right answ");
                                rightAnswersNumber++;
                                changeContent();
                                questionNumber++;
                            }else{
                                console.log("you are wrong");
                                alert("Right answer is "+ rightAnswer);
                                goToNextQuestion();
                            }
                        }
                    }
                    quizzData[topicNumber].questions[questionNumber].answered = true;

                    return false;
                };

                var skipButton = document.createElement('a');
                skipButton.setAttribute("href", "#");
                skipButton.setAttribute("id", "skipButton");
                skipButton.innerHTML = 'пропустить';
                skipButton.onclick = function(){
                    goToNextQuestion();
                    return false;
                };

                buttons.appendChild(sendButton);
                buttons.appendChild(skipButton);

                secondPage.appendChild(questionTitle);
                secondPage.appendChild(questionText);
                secondPage.appendChild(answers);
                secondPage.appendChild(buttons);

                function goToNextQuestion(){
                    console.log("===! questionsNumber: "+questionsNumber+" questionNumber " +questionNumber);

                    while (secondPage.lastChild) {
                        secondPage.removeChild(secondPage.lastChild);
                        if(secondPage.children.length ==1){
                            break;
                        }
                    }
                    if(questionNumber < questionsNumber-1){
                        questionNumber++;
                        if (!quizzData[topicNumber].questions[questionNumber].answered){
                            showQuestion(questionNumber);
                        }else{
                            goToNextQuestion();
                        }

                    }else{
                        questionNumber = 0;
                        goToNextQuestion();
                    }



                }

                function changeContent(){
                    questionTitle.innerHTML = quizzData[topicNumber].title;

                    questionCounter.innerHTML = rightAnswersNumber + ' / ' + questionsNumber;

                    var questionText = document.createElement('p');
                    questionText.appendChild(document.createElement('span').appendChild(document.createTextNode(questionNumber+1 + ". ")));
                    questionText.appendChild(document.createTextNode(quizzData[topicNumber].questions[questionNumber].question));

                    for(var i = 0; i<questionsNumber;i++){
                        quizzData[topicNumber].questions[i].answered = false;
                    }

                    var answers = document.createElement('ul');
                    for(var j = 0; j<quizzData[topicNumber].questions[questionNumber].answers.length; j++){
                        var answer = document.createElement('li');

                        var radioButton = document.createElement('input');
                        radioButton.setAttribute('type', 'radio');
                        radioButton.setAttribute('name', 'answerRadioButton');
                        radioButton.setAttribute('value', j+1);

                        answer.appendChild(document.createElement('label').appendChild(radioButton));
                        answer.appendChild(document.createTextNode(quizzData[topicNumber].questions[questionNumber].answers[j]));

                        answers.appendChild(answer);
                    }

                    var rightAnswer = quizzData[topicNumber].questions[questionNumber].right;
                    console.log('rightAnswer: '+rightAnswer );
                }

               console.log('----! questionNumber  '+ questionNumber + ' question.answered = ' +quizzData[topicNumber].questions[questionNumber].answered);

            }

            }






    }


//    console.log(quizzData);
//    console.log(quizzData[1]);
//    console.log(quizzData[1].title);
//    console.log(quizzData[1].questions[1].answers[1]);











}

