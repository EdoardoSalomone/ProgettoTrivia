class DomandaQuiz {
    constructor(type, difficulty, category, question, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3) {
        this.type = type;
        this.difficulty = difficulty;
        this.category = category;
        this.question = question;
        this.correct_answer = correct_answer;
        this.incorrect_answer1 = incorrect_answer1;
        this.incorrect_answer2 = incorrect_answer2;
        this.incorrect_answer3 = incorrect_answer3;
    }

}
function caricaDomande(callback) {
    $.ajax('https://opentdb.com/api.php?amount=10', {
        dataType: 'json',
        type: 'get'
    })
        .done(data => {
            console.log('sei nel done');
            let arrayDomande = [];
            for (let domanda of data.results) {
                let nuovaDomanda = new DomandaQuiz(
                    domanda.type,
                    domanda.difficulty,
                    domanda.category,
                    domanda.question,
                    domanda.correct_answer,
                    domanda.incorrect_answers[0],
                    domanda.incorrect_answers[1],
                    domanda.incorrect_answers[2]
                );
                arrayDomande.push(nuovaDomanda);
            }
            // qui invochi la funzione di callback passandole arrayDomande
            callback(arrayDomande);
        })
        .fail(error => console.error('hai sfaciolato'));
}
$(document).ready(function () {
    // qui passi una funzione anonima come callback a caricaDomande
    caricaDomande(function(arrayDomande) {
        // qui puoi usare arrayDomande come vuoi, ad esempio stamparle a schermo
        stampaDomande(arrayDomande);
        let card=$('#card');
        let titoloCarta=$('#titoloCarta');
        let testoDomanda=$('#testoDomanda');
        let spazioDomanda1=$('#bottoneDomanda1');
        let spazioDomanda2=$('#bottoneDomanda2');
        let spazioDomanda3=$('#bottoneDomanda3');
        let spazioDomanda4=$('#bottoneDomanda4');
        let difficoltaDomanda=$('#difficoltaDomanda');
        difficoltaDomanda.html(arrayDomande[0].difficulty);
        titoloCarta.html(arrayDomande[0].category);
        testoDomanda.html(arrayDomande[0].question);
        spazioDomanda1.html(arrayDomande[0].correct_answer);
        spazioDomanda2.html(arrayDomande[0].incorrect_answer1);
        spazioDomanda3.html(arrayDomande[0].incorrect_answer2);
        spazioDomanda4.html(arrayDomande[0].incorrect_answer3);



        /*for (let i = 0; i < arrayDomande.size; i++) {
            titoloCarta.html(arrayDomande[i].category);
            testoDomanda.html(arrayDomande[i].question);
            spazioDomanda1.html(arrayDomande[i].correct_answer);
            spazioDomanda2.html(arrayDomande[i].incorrect_answer1);
            spazioDomanda3.html(arrayDomande[i].incorrect_answer2);
            spazioDomanda4.html(arrayDomande[i].incorrect_answer3);
        }*/

    });
})

function stampaDomande(arrayDomande) {
   console.log(arrayDomande)
}

function pulisciCard(titoloCarta,testoCarta,button1,button2,button3,button4){
    titoloCarta.html('')
    testoCarta.html('')
    button1.html('')
    button2.html('')
    button3.html('')
    button4.html('')
}