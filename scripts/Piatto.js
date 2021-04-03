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