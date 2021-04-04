const remoteDB = firebase.firestore();
const type = [];
const cards = [];
var queryResult = [];
var conto = 0;
var ordine = [];



//*** SEZIONE GENERALE ***//

/**
 * @description Funzione che permette la generazione del menù.
 */
function generaMenu() {
    remoteDB.collection("menu").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let data = doc.data();
            let piatto = new Piatto(doc.id, data.code, data.nome, data.prezzo, data.calorie, data.note, data.imgPath, data.section, data.tipo);
            //console.log(doc.id, " => ", doc.data());
            console.log(piatto.toJSON());


            // Creazione dei divisori per i piatti
            if (!type.includes(piatto.tipo)) {
                type.push(piatto.tipo);

                // Container generale
                let cont = document.getElementById("container");

                // Tipo di containter
                let containerType = document.createElement('section');
                containerType.className = "container clearfix";
                containerType.id = piatto.tipo;

                // Titolo del Container
                let h = document.createElement('h1');
                let text = document.createTextNode(piatto.tipo);
                h.appendChild(text);

                // Append
                containerType.appendChild(h);
                cont.appendChild(containerType);
            }

            // In base al tipo crea la card nel container corrispondente;
            if (piatto.tipo === "appetizers") {
                let containerAppetizer = document.getElementById("appetizers");
                containerAppetizer.appendChild(createDyCard(piatto));
            } else if (piatto.tipo === "salads") {
                let containerSalad = document.getElementById("salads");
                containerSalad.appendChild(createDyCard(piatto));
            }
        });
    });
}

/**
 * 
 * @param {Object} piatto => Istanza della classe Piatto.
 * @returns => Ritorna una card DOM.
 * 
 * @description La funzione permette di creare delle card dinamiche in base
 *      al contenuto dell'istanza piatto che viene passata come argomento.
 */
function createDyCard(piatto) {
    //Card generale
    let card = document.createElement("div");
    card.className = "demo-card-square mdl-card mdl-shadow--2dp clearfix";
    card.id = piatto.id;

    // Immagine della card
    let cardMedia = document.createElement("div");
    cardMedia.className = "mdl-card__media";
    let img = document.createElement("img");
    img.src = piatto.imgPath;
    cardMedia.appendChild(img);

    // Testo della card
    let txt = document.createElement("div");
    txt.className = "mdl-card__supporting-text";
    let data = document.createTextNode(piatto.code + " - " + piatto.nome + " - " + piatto.prezzo);
    txt.appendChild(data);


    // Container dei bottoni
    let btnContainer = document.createElement("div");
    btnContainer.className = "mdl-card__actions";
    btnContainer.id = piatto.prezzo;

    // Bottoni della card
    let btnAdd = document.createElement("button");
    btnAdd.className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect add";
    btnAdd.id = piatto.nome;
    let txtBtnAdd = document.createTextNode("ADD");
    btnAdd.appendChild(txtBtnAdd);
    btnContainer.appendChild(btnAdd);

    let btnDel = document.createElement("button");
    btnDel.className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect del";
    btnDel.id = piatto.nome;
    let txtBtnDel = document.createTextNode("DEL");
    btnDel.appendChild(txtBtnDel);
    btnContainer.appendChild(btnDel);

    // Append necessari per comporre la CARD finale.
    card.appendChild(cardMedia);
    card.appendChild(txt);
    card.appendChild(btnContainer);

    return card;
}


//*** SEZIONE CARRELLO ***//

/**
 * 
 * @param {String} id => ID Firebase relativo al codice piatto.
 * @param {Number} pr => Prezzo del singolo piatto.
 * @param {String} nome => Nome del singolo piatto.
 * 
 * @description {
 *      La funzione permette di AGGIUNGERE un piatto alla lista degl'ordini
 *      controllando se un determinato piatto esista o meno nella suddetta
 *      lista. }
 */
function aggiungiPiatto(id, pr, nome) {
    // Oggetto base ordine
    let ord = {
        piatto: id,
        nome: nome,
        qt: 1,
        pr: pr
    }

    // Controllo che lo stesso piatto non sia già presente nel vettore ordine!
    if (arrayContainsObject(ord, ordine)) {
        let i = ordine.findIndex(item => item.piatto === id);
        ordine[i].qt++;
    } else {
        ordine.push(ord);
    }
    aggiornaOrdine();
}

/**
 * 
 * @param {String} id => ID Firebase relativo al codice piatto.
 * @param {Number} pr => Prezzo del singolo piatto.
 * 
 * @description {
 *      La funzione permette di RIMUOVERE un piatto alla lista degl'ordini
 *      controllando se un determinato piatto esista o meno nella suddetta
 *      lista. }
 */
function rimuoviPiatto(id, pr) {
    for (const ord of ordine) {
        if (ord.piatto === id) {
            if (ord.qt > 1) {
                ord.qt--;
            } else if (ord.qt <= 1) {
                ordine.splice(ordine.findIndex(item => item.piatto === id), 1);
            }
        } else {
            console.error("Piatto " + id + " non trovato.");
        }
    }
    aggiornaOrdine();
}

/**
 * @description {
 *      La funzione permette di CANCELLARE l'ordine agendo su:
 *          - DB locale per tenere traccia degli ordini.
 *          - DB Firebase in caso un ordine sia già pervenuto. 
 *      }
 */
function cancellaOrdine() {
    ordine = [];
    aggiornaOrdine();
    deleteOrder();
}

/**
 * @description {
 *      La funzione permette di INVIARE l'ordine sul DB di Firebase. }
 */
function inviaOrdine() {
    for (const ord of ordine) {
        write(ord);
    }
}

/**
 * @description {
 *      La funzione permette di AGGIORNARE le informazioni relative allo stato dell'ordine: 
 *          - N° di piatti ordinati.
 *          - Prezzo totale.
 *      }
 */
function aggiornaOrdine() {
    let prezzo = document.getElementById("conto");
    let nOrdini = document.getElementById("ordini");

    // nOrdini.innerHTML = ordine.length;

    conto = 0;
    nOrd = 0;
    for (const ord of ordine) {
        conto += ord.pr * ord.qt;
        nOrd += ord.qt;
    }

    prezzo.innerHTML = "€" + conto;
    nOrdini.innerHTML = "N° ordini " + nOrd;
}


//*** SEZIONE CONTROLLO ***//

/**
 * 
 * @param {Object} obj => Oggetto da passare. 
 * @param {Array} arr => Array dove controllare che l'oggetto vi sia o meno.
 * @returns {Boolean} obj è contenuto in arr -> true, altrimenti false.
 * 
 * @description Questa funzione serve per controllare che l'oggetto ord (ordine) esista già 
 *      all'interno del vetttore ordine.
 */
function arrayContainsObject(obj, arr) {
    return arr.some(item => item.piatto === obj.piatto);
}



//*** SEZIONE FIREBASE ***//

/**
 * @deprecated
 * 
 * @param {String} id => ID Firebase relativo al codice piatto.
 * @description Questa funzione serve per scaricare i vari dati dal DB Firebase.
 */
function query(id) {
    remoteDB.collection('menu').doc(id)
        .get()
        .then(doc => {
            if (doc.exists) {
                console.log(doc.data());
                queryResult.push(doc.data())
            } else {
                console.error("ID non esistente");
            }
        })
        .catch(error => {
            console.error(error);
        });
}


/**
 * 
 * @param {Object} obj => Oggetto piatto da scrivere.
 * @description Questa funzione permette di SCRIVERE un oggetto sul db Firebase. 
 */
function write(obj) {
    remoteDB.collection("ordine")
        .add(obj)
        .then(() => {
            console.log("Ordine inviato con successo!");
        })
        .catch(error => {
            console.error(error);
        });
}

/**
 * @description Questa funzione permette di ELIMINARE tutti gli ordini pervenuti al
 *      DB di Firebase.
 */
function deleteOrder() {
    remoteDB.collection("ordine")
        .get()
        .then((snap) => {
            snap.forEach(doc => {
                doc.ref.delete();
            })
        });
}


//*** SEZIONE DOM ***//

/**
 * @description Funzione per generare il menù in automatico, non appena il 
 *      DOM sarà caricato
 */
document.addEventListener("DOMContentLoaded", function() {
    generaMenu();
});


document.addEventListener("click", (event) => {
    // console.log(event.target.className);
    // console.log(event.target.parentNode.parentNode.id);


    // TODO: 
    //  - event.target.className contiene "add" o "del" -> richiama le funzioni aggiungiPiatto() o rimuoviPiatto();
    //  - event.target.parentNode.parentNode.id: da qui prendi l'ID del piatto, fare una query per valutarne la presenza;
    //  - IMPLEMENT: 
    //      - Logica di invio degli ordini.
    //      - Logica eliminazione ordine.

    let prezzo = parseFloat(event.target.parentNode.id);
    let nome = event.target.id;

    if (event.target.className.includes("add")) {
        aggiungiPiatto(event.target.parentNode.parentNode.id, prezzo, nome)
    } else if (event.target.className.includes("del")) {
        rimuoviPiatto(event.target.parentNode.parentNode.id, prezzo, nome);
    }

});