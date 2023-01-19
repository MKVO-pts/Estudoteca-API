const router = require('express').Router() 
const Ficheiro = require('../models/File') //nao colocar extensao arquivo(.. =>voltar 1 dir| . =>mesmo dir)

//Rotas API

//Criar/Enviar Documentos
router.post('/', async (req, res) => {  //assyncrona adicionar espera

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
        username
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

//Request dados
//Todos docs
router.get('/', async (req, res) => {
    try{
        const docsCompleto = await Ficheiro.find() //espera que venham os dados todos para dar resposta(res)

        res.status(200).json({docsCompleto}); //reenvia todos files
    } catch(error) {
        res.status(500).json({message: error})
    }
});

//Apenas um file pelo id
router.get('/filtro/:id', async (req,res) =>{ //:id => variavel segundo o request
    console.log(req) //print ao request completo

    //extrair dados; id|url = req.params
    const id = req.params.id; //id=dinamico
    try {
        const documento = await Ficheiro.findOne({_id: id}) //mongodb methodos {} => doc filtro

        if(!documento) { //caso id nao exista (filtro = null)
            res.status(422).json({message: 'Formato correcto, id não existente'})
            return 0 //termina processo
        }


        res.status(200).json(filtro) //
    } catch (error) {
        res.status(500).json({message: error})
    };
}) 

//UPDATE (PUT, PATCH)
router.patch('/:id', async (req,res) => {
    const id = req.params.id;
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
        const updateFile = await Ficheiro.updateOne({_id: id}, ficheiro)

        if(updateFile.matchedCount === 0){ //quando nao atualiza nada
            res.status(422).json({message: 'Formato correcto, id não existente'})
            return 0 //termina processo
        }

        res.status(200).json({message:ficheiro}) //atualizado com sucesso

    } catch (error) {
        res.status(500).json({message:'Erro Updating File params'})
    }
})


//Deletar files
router.delete('/:id', async (req,res) =>{
    const id = req.params.id

    const documento = await Ficheiro.findOne({_id: id})

    if(!documento) { //caso id nao exista (filtro = null)
        res.status(422).json({message: 'Documento não existente'})
        return 0 //termina processo
    }

    try {
        
        await Ficheiro.deleteOne({_id: id})

        res.status(200).json({message:'Ficheiro removido com sucesso'})

    } catch (error) {
        res.status(500).json({message:"Erro Deleting files"})
    }

})


//permite usar as rotas criadas no index.js
module.exports = router;