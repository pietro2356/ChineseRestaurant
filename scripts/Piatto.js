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
    toJSON() {
        return {
            id: this.id,
            code: this.code,
            nome: this.nome,
            prezzo: this.prezzo,
            calorie: this.calorie,
            note: this.note,
            imgPath: this.imgPath,
            section: this.section,
            tipo: this.tipo
        }
    }
}