function Application(){
    this.statistics;
    this.router;
    this.quizz;
    this.data = null;
}

Application.prototype.getData = function(){
    var req = new XMLHttpRequest();
    req.open('GET', 'quizz-data.json', false);
    req.send(null);
    if (req.status == 200)
        this.quizzData = JSON.parse(req.responseText);

    return this.quizzData;

};


Application.prototype.init = function() {
    this.storage = new Storage();
    this.statistics = new Statistics();
    this.quizz = new Quizz(this);
    //this.router = new Router();

};


