var messagesDivElement = document.getElementById('item');

function getPiatti() {

    firestoreDB.forEach(item => {
        let str = "<p><b>Code: </b>" + item.code + "<br>" +
            "<b>Nome: </b>" + item.nome + "<br>" +
            "<b>Prezzo: </b>" + item.prezzo + "<br>" +
            "<b>Calorie: </b>" + item.calorie + "<br>" +
            "<b>Note: </b>" + item.note + "<br></p>" +
            "<b>ImgPath: </b>" + item.imgPath + "<br>" +
            "<b>Section: </b>" + item.section + "<br>" +
            "<b>Tipo: </b>" + item.tipo + "<br>";



        messagesDivElement.innerHTML += str;

        console.log(
            "Code: " + item.code + "\n" +
            "Nome: " + item.nome + "\n" +
            "Prezzo: " + item.prezzo + "\n" +
            "Calorie: " + item.calorie + "\n" +
            "Note: " + item.note + "\n" +
            "ImgPath: " + item.imgPath + "\n" +
            "Section: " + item.section + "\n" +
            "Tipo: " + item.tipo
        );
    });
}

/**
 * 
 * @param {Array} piatti => Array contenente i vari piatti.
 * @param {Path} img => Link URL per l'immagine della card.
 * @param {number} cardNumber => Numero di card per 
 * @returns {HTML} Card
 */
function createCard(piatti, img, cardNumber) {
    let card = "<div class='mdl-card__media' id='" + cardNumber + "'>"; // Header card.
    card += "<img src='" + img + "'></div><div class='mdl-card__supporting-text'>"; // Immagine card.

    card += "<table id='tab" + tab + "'>"; // Creazione tabella piatti.
    piatti.forEach((item) => {
        card += "<tr id='" + item.id + "'><td>" + item.id + "</td>";
        card += "<td>" + item.name + "<br><i>" + item.note + "</i>" + "</td>";
        card += "<td>" + item.cals + "Cals</td>";
        card += "<td class='prezzo'>€" + item.pr + "</td>";
        card += "<td id='choose'></td></tr>";
    });
    card += "</table></div>";

    // Footer della card con bottoni.
    card += "<div class='mdl-card__actions'><a class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'>ADD 1</a><a class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'>DEL 1</a></div></div>";

    return card;
}

function createSection(params) {
    /// IMPLEMENT: 
    return undefined;
}

function generateMenu() {
    let type;
    // let arr = [];


    db.collection('menu').onSnapshot(snap => {
        snap.forEach(item => {
            let res = query("tipo", "appetizers");
            /// TODO:  
        });
    });

    return type;
}


/**
 * NON FUNZIONA!
 */
function getType() {
    db.collection('type').onSnapshot(snap => {
        snap.forEach(item => {
            // item.data().type => ["appetizers", "salads"];
            tmp = item.data().type;

            /// IMPORTANT: 
            /// TODO: Creare la funzione di generazione del menu!
        })
    });

    for (const typ of Object.keys(tmp)) {
        /// IMPORTANT: Non funziona un cazzo di nulla CAZZO!
        /// FIXME: Domani guardo, ora devo fare la notte.
        console.log(typ);
        type.push(typ);
    }
}