const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = express();
const mongoose = require('mongoose');
require('./Maquina');
app.use(express.json({ limit: '10kb' }));

const Maquina = mongoose.model('maquina');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo yeahhh');
});
mongoose.connection.on('error', (err) => {
  console.log('error', err);
});

app.get('/', (req, res) => {
  Maquina.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/maquina/:id', (req, res) => {
  const { id } = req.params;
  Maquina.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'Máquina não encontrada' });
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Erro ao buscar a máquina' });
    });
});

app.post('/send-data', (req, res) => {
  const employee = new Maquina({
    nome: req.body.nome,
    capacidade: req.body.capacidade,
    dataCompra: req.body.dataCompra,
    tempoVida: req.body.tempoVida,
    descricao: req.body.descricao,
    fornecedor: req.body.fornecedor,
    marca: req.body.marca,
    localizacao: req.body.localizacao,
  });
  employee
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/delete', (req, res) => {
  Maquina.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put('/update', (req, res) => {
  Maquina.findByIdAndUpdate(req.body.id, {
    nome: req.body.nome,
    capacidade: req.body.capacidade,
    dataCompra: req.body.dataCompra,
    tempoVida: req.body.tempoVida,
    descricao: req.body.descricao,
    fornecedor: req.body.fornecedor,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server running');
});
