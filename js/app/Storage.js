function Storage(){
/*    this.testNumber = 0;
    this.currentQuestionNumber = 0;
    this.answeredQuestionsNumber = 0;
    this.rightAnswersNumber = 0;*/

    this.setTestNumber = function(number){
        localStorage.testNumber = number;
    };

    this.setCurrentQuestionNumber = function(number){
        localStorage.currentQuestionNumber = number;
    };

    this.setAnsweredQuestionsNumber = function(number){
        localStorage.answeredQuestionsNumber = number;
    };

    this.setRightAnswersNumber = function(number){
        localStorage.rightAnswersNumber = number;
    };

    this.setQuestionsNumber = function(number){
        localStorage.questionsNumber = number;
    };


    this.getTestNumber = function(){
        return localStorage.testNumber;
    };

    this.getCurrentQuestionNumber = function(){
        return localStorage.currentQuestionNumber;
    };

    this.getAnsweredQuestionsNumber = function(){
        return localStorage.answeredQuestionsNumber;
    };
    this.getRightAnswersNumber = function(){
        return localStorage.rightAnswersNumber;
    };
    this.getQuestionsNumber = function(){
        return localStorage.questionsNumber;
    };

    this.clearStorage = function(){
        localStorage.clear();

    }
}
