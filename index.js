//Config inicial
const express = require('express');
const mongoose = require('mongoose');
const app = express(); //Inicializa o express



const Ficheiro = require('./models/File') //nao colocar extensao arquivo


//Ler JSON /middlewares
app.use(            //criar um middleware
    express.urlencoded({
        extended: true,
    }),

) 
app.use(express.json())


//rotas API
//Enviar Documentos
app.post('/submeter', async (req, res) => {  //assyncrona adicionar espera

    //req.body  =>tudo o que é recebido
    const {nameFile, nivel, instituicao, curso, disciplina, tipo, espaco, anonymous, username, date} = req.body   //destruturação
    //{nameFile: "Derivadas",nivel: 1,instituicao: "FCUL",disciplina: "Calculo infinitesimal", curso:"Bioquimica", tipo: "Resumos",espaco: 10000,anonymous: 0,username: User111,date: HOJE}

    const ficheiro = { //objecto com toda a info recebida
        nameFile,
        nivel,
        instituicao,
        curso,
        disciplina,
        tipo,
        espaco,
        anonymous,
        username,
        date
    }

    try {
        //criar dados na DB
        await Ficheiro.create(ficheiro)

        //CRIAR VALIDAÇÔES
        res.status(201).json({message: 'Ficheiro submetido com sucesso'}) //recurso criado no servidor
    } catch(error) { //caso haja erro
        res.status(500).json({error: error}) //erro de servidor
    }

})






//Rota inicial/ endpoint
app.get('/site', (req, res) => {      //  '/'=>endpoint req=>request res=>resposta


    res.json({message: "Mekie"}) //resposta json com key,value(json)

}) 


mongoose
    .connect("mongodb://STRING CONNECTAR") //Ver como ficar

    .then(() => {
        console.log('Conexao com MongoDB com sucesso!');
        app.listen(3000)
    })
    .catch((err) => console.log(err))

//Defenir port
app.listen(3000)