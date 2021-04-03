const remoteDB = firebase.firestore();
const type = [];


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
            //console.log(piatto.toString());


            // Creazione dei divisori per i piatti
            if (!type.includes(piatto.tipo)) {
                type.push(piatto.tipo);

                let cont = document.getElementById("container");
                let containerType = document.createElement('div');
                containerType.className = "container";
                containerType.id = piatto.tipo;
                cont.appendChild(containerType);
            }

            //
            //  TODO: 
            //      1: Creare la card corrispondente all'oggetto Piatto
            //      2: Ordinarle in base ai parametri



        });
    });
}

function createCard(piatto) {
    console.error("Function not implemented yet!\n ID => " + piatto.id);
}