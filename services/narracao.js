// services/narracao.js
const Narracao = require("../models/Narracao");

async function gerarNarracao(descricao, userId) {
  try {
    // 🔹 Exemplo de chamada fictícia a uma API de IA
    // Aqui você troca pela API que escolher (OpenAI, Gemini, etc.)
    const respostaIA = `📖 Cena narrada:\n${descricao}\n\n✨ A escuridão envolve o ambiente, e os passos ecoam...`;

    // Salvar no banco
    await Narracao.create({
      userId,
      descricao,
      resposta: respostaIA,
      data: new Date()
    });

    return respostaIA;
  } catch (err) {
    console.error(err);
    return "⚠️ Ocorreu um erro ao narrar a cena.";
  }
}

module.exports = { gerarNarracao };
