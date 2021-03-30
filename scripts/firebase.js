/**
 * @param {Array} localDB => DB locale per test.
 */
function writeMenuOnDB() {
    localDB.forEach((item) => {
        write(item);
    });
}

/**
 * 
 * @param {Object} item => Oggetto contenente tutti i dati necessari!
 * @returns => Promises
 */
function write(item) {
    return firebase.firestore().collection('menu').add({
        code: item.id,
        nome: item.name,
        prezzo: item.pr,
        calorie: item.cals,
        note: item.note,
        imgPath: item.img,
        section: item.section,
        tipo: item.tipo
    }).catch(function(error) {
        console.error('Error writing new message to database', error);
    });
}

function createFirestoreLocalDB() {
    var query = db.collection('menu');

    query.onSnapshot((snapshot) => {
        snapshot.forEach(function(doc) {
            var item = doc.data();
            firestoreDB.push(item);
        });
    });
}

function query(key, val, op = "==") {
    db.collection('menu').where(key, op, val)
        .get()
        .then(querySnap => {
            querySnap.forEach(doc => {
                console.log(doc.id);
                // console.log(doc.data());
                queryResult.push(doc.data());
            })
        }).catch(error => {
            console.log(error.message);
        });

    return queryResult;
}