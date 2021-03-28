getPiatti();

function getPiatti() {
    var query = db.collection('menu');

    query.onSnapshot((snapshot) => {
        var messagesDivElement = document.getElementById('item');
        messagesDivElement.innerHTML = "";


        snapshot.forEach(function(doc) {
            var item = doc.data();

            let str = "<p><b>Code: </b>" + item.code + "<br>" +
                "<b>Nome: </b>" + item.nome + "<br>" +
                "<b>Prezzo: </b>" + item.prezzo + "<br>" +
                "<b>Calorie: </b>" + item.calorie + "<br>" +
                "<b>Note: </b>" + item.note + "<br></p>";


            var messagesDivElement = document.getElementById('item');
            messagesDivElement.innerHTML += str;

            console.log(
                "Code: " + item.code + "\n" +
                "Nome: " + item.nome + "\n" +
                "Prezzo: " + item.prezzo + "\n" +
                "Calorie: " + item.calorie + "\n" +
                "Note: " + item.note + "\n"
            );

        });
    });
}