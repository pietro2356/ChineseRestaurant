function writeMenuOnDB() {
    // Add a new message entry to the database.

    localDB.forEach((item) => {
        write(item);
    });


}

function write(item) {
    return firebase.firestore().collection('menu').add({
        code: item.id,
        nome: item.name,
        prezzo: item.pr,
        calorie: item.cals,
        note: item.note
    }).catch(function(error) {
        console.error('Error writing new message to database', error);
    });
}