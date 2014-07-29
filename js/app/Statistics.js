function Statistics(){
    this.currentQuestionNumber = 0;
    this.questionsNumber = 0;
    this.answeredQuestionsNumber = 0;
    this.rightAnswersNumber = 0;

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