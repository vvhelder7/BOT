// models/Narracao.js
const mongoose = require("mongoose");

const narracaoSchema = new mongoose.Schema({
  userId: String,
  descricao: String,
  resposta: String,
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Narracao", narracaoSchema);
