function Application(){
    this.statistics;
    this.router;
    this.quizz;
}

Application.prototype.setData = function(){
    // AJAX call
};


Application.prototype.init = function() {
    this.statistics = new Statistics();
    //this.router = new Router();
    this.quizz = new Quizz();
}
