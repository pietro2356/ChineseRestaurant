# ChineseRestaurant
TODO

## Scopo 
Replicare un sito di un ristorante cinese [link](<<Link>>), utilizzando HTML, CSS e JS di base. 
Opzionale è l'implementazione di Firebase :fire: nel progetto. 

## Livelli di consegna
1. CLIENT WEB
    * Il menù viene generato _dinamicamente_ partendo da un oggetto JS e un form permette di memorizzare in un seondo oggetto l'ordine del cliente.
2. FIREBASE READ/WRITE
    * il menù vinene generato dinamicamente interrogando i dati da un collecion menu su firestore accessibile in lettura senza login. Step ulteriore anche l'ordine vinene memorizzato in una collecion _orders_ accessibile in scrittura senza login. 
3. FIREBASE AUTH/ADMIN
    * L'ordine viene memorizzato in una collection _orders_ accessibile in scrittura solo dopo aver effettuato il login tramite account Google.
    * Step ulteriore, gli ordini possono essere letti solo da un utente con accesso privileggiato _admin_ e vengono visualizzati, dopo l'accesso, in una pagina separata del sito.


## Creato con:
 * [Firebase](https://firebase.google.com/)
 
## Istruzioni per l'uso:
* TODO

# Sviluppo:
>  - **Pietro Rocchio**

## License
[MIT](LICENSE.md)