const mongoose = require('mongoose')

const MaquinaSchema = new mongoose.Schema({
    nome:String,
    capacidade:String,
    dataCompra:String,
    tempoVida:String,
    descricao:String,
    fornecedor:String,
    marca:String,
    localizacao:String,
})


mongoose.model("maquina",MaquinaSchema)