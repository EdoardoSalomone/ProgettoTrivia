// Classe Domanda
//FIXME BISOGNA INSERIRE CONTROLLI QUANDO L'ARRAY DELLE DOMANDE E' COSTITUITO SOLO DA 2 DOMANDE
//FIXME BISOGNA FARE IN MODO CHE ALL' USCITA DELL' ALERT CHE DICE RISPOSTA SBAGLIATA NON SI CAMBI DOMANDA
//TODO SE IL TESTO è TROPPO GRANDE NELLE RISPOSTE, NON SI ADATTA LA CARD SOTTO MA SOLO IL TRATTO CON I BUTTON, FIXARE
class Domanda {
    constructor(dati) {
        this.domanda = dati.question; // la domanda
        this.risposte = dati.incorrect_answers; // le risposte sbagliate
        this.rispostaCorretta = dati.correct_answer; //risposta corretta
        this.categoria = dati.category; // la categoria
        this.difficolta = dati.difficulty; // la difficoltà
        // puoi aggiungere altre proprietà se vuoi
    }
}

// Classe Quiz
class Quiz {
    constructor(url) {
        this.domande = []; // l'array di domande
        this.url = url; // l'url da cui ottenere le domande
        this.indice=0; //indice delle domande
        //this.caricaDomande(); // avvia la richiesta al JSON
    }

    // Metodo per caricare le domande dal JSON
    caricaDomande() {
        // Crea una promessa che restituisce i dati dal JSON
        return new Promise((resolve, reject) => {
            // Usa il metodo $.getJSON per fare una richiesta all'url
            $.getJSON(this.url, (data) => {
                // Quando la richiesta ha successo, usa un ciclo for per iterare sui risultati
                for (let i = 0; i < data.results.length; i++) {
                    // Crea un oggetto Domanda per ogni elemento del JSON
                    let domanda = new Domanda(data.results[i]);
                    // Aggiungi l'oggetto Domanda all'array domande
                    this.domande.push(domanda);
                }
                // Risolvi la promessa passando l'array domande
                resolve(this.domande);
            }).fail((error) => {
                // Se la richiesta fallisce, rifiuta la promessa passando l'errore
                reject(error);
            });
        });
    }

    mostraDomanda(){
        let domanda=this.domande[this.indice];
        // Usa il selettore ID di jQuery per ottenere gli elementi della card
        let titoloCarta=$('#titoloCarta');
        let testoDomanda=$('#testoDomanda');
        let difficoltaDomanda=$('#difficoltaDomanda');
        let listaBottoni = $('#list-group-numbered');
        let numeroDomanda = $('#numeroDomanda');

        // Rimuovi il numero della domanda precedente se esiste
        numeroDomanda.remove();

        // Crea un elemento h6 che contenga il numero della domanda corrente
        numeroDomanda = $('<h6></h6>');
        numeroDomanda.attr('id', 'numeroDomanda');
        numeroDomanda.html("Domanda " + (this.indice + 1) + " di " + this.domande.length);

        // Inserisci il numero della domanda prima del titolo della card
        titoloCarta.before(numeroDomanda);

        // Rimuovi tutti i bottoni precedenti dalla lista
        listaBottoni.empty();

        // Crea un array con le risposte mescolate in modo casuale
        let risposte = [domanda.rispostaCorretta, ...domanda.risposte];
        risposte.sort(() => Math.random() - 0.5);

        // Crea un bottone per ogni risposta e aggiungilo alla lista
        for (let i = 0; i < risposte.length; i++) {
            // Crea un elemento li
            let li = $('<li></li>');
            li.addClass('list-group-item bg-warning-subtle');

            // Crea un elemento button
            let button = $('<button></button>');
            button.attr('type', 'button');
            button.addClass('btn bg-success-subtle');
            button.html(risposte[i]);

            // Aggiungi un evento click al bottone
            button.click(() => {
                // Controlla se la risposta è corretta
                if (risposte[i] === domanda.rispostaCorretta) {
                    // Incrementa l'indice e mostra la domanda successiva
                    this.indice++;
                    this.mostraDomanda();
                } else {
                    // Mostra un messaggio di errore
                    alert("Risposta sbagliata, riprova!");
                }
            });

            // Aggiungi il bottone al li
            li.append(button);

            // Aggiungi il li alla lista
            listaBottoni.append(li);
        }

        titoloCarta.html(domanda.categoria);
        testoDomanda.html(domanda.domanda);
        difficoltaDomanda.html(domanda.difficolta);
    }
    // Puoi aggiungere qui altri metodi alla classe Quiz per gestire la logica del quiz
}
// Funzione $(document).ready
$(document).ready(function () {
    // Crea un'istanza della classe Quiz passando l'url desiderato
    let quiz = new Quiz("https://opentdb.com/api.php?amount=10");
    // Usa l'oggetto quiz per accedere alle domande e manipolarle come preferisci
    console.log(quiz.domande);
    quiz.caricaDomande().then(()=>{
        quiz.mostraDomanda();
    }).catch((error)=>{
        console.error(error);
    });
});
