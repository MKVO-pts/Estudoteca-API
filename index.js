//Config inicial
require('dotenv').config() //para variaveis protegidas
//process.env.VARIAVELNAME
const express = require('express');
const mongoose = require('mongoose');
const app = express(); //Inicializa o express
app.use(express.json())
//Importar routes
const submeter_route = require('./routes/API')
app.use('/api', submeter_route)

//COnnect to MongoDB
mongoose.set('strictQuery', true);
mongoose
    //mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
    .connect(`${process.env.MongoDB_string}`) //Ver como ficar
    .then(() => {
        console.log('Conexao com MongoDB com sucesso!');
        app.listen(3000)
    })
    .catch((err) => console.log(err))





//Ler JSON /middlewares
app.use(            //criar um middleware
    express.urlencoded({
        extended: true,
    }),

) 
app.use(express.json())



//Rota inicial/ endpoint
app.get('/teste', async (req, res) => {      //  '/'=>endpoint req=>request res=>resposta
    console.log(req)

    await res.json({message: "Ligação API Sucesso!!", info: req.params}) //resposta json com key,value(json)

}) 


//Defenir port
app.listen(3000)