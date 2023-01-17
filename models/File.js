//Fornecer metodos
const mongoose = require('mongoose');

const Ficheiro = mongoose.model('Ficheiro', {  //cria uma collection na DB chamada "Ficheiros"
    nameFile: String,
    nivel: Boolean,  //universidade(1) ou secundario(0)
    instituicao: String,
    curso: String,
    disciplina: String,
    tipo: String,

    //documentoData: IDK,

    espaco: Number,
    anonymous: Boolean,
    username: String,
    date: Date
})

module.exports = Ficheiro
