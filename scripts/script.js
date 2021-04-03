const remoteDB = firebase.firestore();
const type = [];
const cards = [];


/**
 * @description Classe piatto
 */
class Piatto {
    constructor(id, code, nome, prezzo, calorie, note, imgPath, section, tipo) {
        this.id = id;
        this.code = code;
        this.nome = nome;
        this.prezzo = prezzo;
        this.calorie = calorie;
        this.note = note;
        this.imgPath = imgPath;
        this.section = section;
        this.tipo = tipo;
    }
    toString() {
        return "[" + this.id + ", " +
            this.code + ", " +
            this.nome + ", " +
            this.prezzo + ", " +
            this.calorie + ", " +
            this.note + ", " +
            this.imgPath + ", " +
            this.section + ", " +
            this.tipo + "]";
    }
}

/**
 * @description Funzione principale del programma per scaricare il db da Firebase.
 */
function getDbFromFirebase() {
    remoteDB.collection("menu").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let data = doc.data();
            let piatto = new Piatto(doc.id, data.code, data.nome, data.prezzo, data.calorie, data.note, data.imgPath, data.section, data.tipo);
            //console.log(doc.id, " => ", doc.data());
            console.log(piatto.toString());


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

            //
            //  TODO: 
            //      1: Creare la card corrispondente all'oggetto Piatto
            //      2: Ordinarle in base ai parametri

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
    let data = document.createTextNode(piatto.nome + " " + piatto.prezzo);
    txt.appendChild(data);


    // Container dei bottoni
    let btnContainer = document.createElement("div");
    btnContainer.className = "mdl-card__actions";

    // Bottoni della card
    let btnAdd = document.createElement("button");
    btnAdd.className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect";
    let txtBtnAdd = document.createTextNode("ADD");
    btnAdd.appendChild(txtBtnAdd);
    btnContainer.appendChild(btnAdd);

    let btnDel = document.createElement("button");
    btnDel.className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect";
    let txtBtnDel = document.createTextNode("DEL");
    btnDel.appendChild(txtBtnDel);
    btnContainer.appendChild(btnDel);

    // Append necessari per comporre la CARD finale.
    card.appendChild(cardMedia);
    card.appendChild(txt);
    card.appendChild(btnContainer);

    return card;
}

/**
 * @deprecated
 */
function createCard(piatto) {
    let card = "<div class='mdl-card__media' id='" + piatto.id + "'>"; // Header card.
    card += "<img src='" + piatto.imgPath + "'></div><div class='mdl-card__supporting-text'>"; // Immagine card.
    card += piatto.toString() + "</div>";

    // Footer della card con bottoni.
    card += "<div class='mdl-card__actions'><a class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'>ADD 1</a><a class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'>DEL 1</a></div></div>";

    return card;
}