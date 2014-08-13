function Statistics(){
    this.testNumber = 0;
    this.currentQuestionNumber = 0;
    this.questionsNumber = 0;
    this.answeredQuestionsNumber = 0;
    this.rightAnswersNumber = 0;

    this.setTestNumber = function(number){
        this.testNumber = number;
    };
    this.setCurrentQuestionNumber = function(number){
        this.currentQuestionNumber = number;
    };
    this.setQuestionsNumber = function(number){
        this.questionsNumber = number;
    };
    this.setAnsweredQuestionsNumber = function(number){
        this.answeredQuestionsNumber = number;
    };
    this.setRightAnswersNumber = function(number){
        this.rightAnswersNumber = number;
    };

    this.getTestNumber = function(){
        return this.testNumber;
    };

    this.getCurrentQuestionNumber = function(){
        return this.currentQuestionNumber;
    };
    this.getQuestionsNumber = function(){
        return this.questionsNumber;
    };
    this.getAnsweredQuestionsNumber = function(){
        return this.answeredQuestionsNumber;
    };
    this.getRightAnswersNumber = function(){
        return this.rightAnswersNumber;
    };

}

Statistics.prototype.addAnsweredQuestion = function(){
    this.answeredQuestionsNumber++;
    return this.answeredQuestionsNumber;
};

Statistics.prototype.addRightAnswer = function(){
    this.rightAnswersNumber++;
    return this.rightAnswersNumber;
};