axios.defaults.headers.common['Authorization'] = 'M813n9erPvENXeuGPzKDL1Iu';

const tela3Comeco = 
`
<div class="header-tela-3">
        <p class="buzzquizz">BuzzQuizz</p>
      </div>
    <div class="tela-3">
      <h1>Comece pelo comeco</h1>
      <div class="caixa-inputs">
        <input id="criar-comeco-input-titulo" type="text" placeholder="Título do seu quizz">
        <input id="criar-comeco-input-url" type="text" placeholder="URL da imagem do seu quizz">
        <input id="criar-comeco-input-nmrPerguntas" type="text" placeholder="Quantidade de perguntas do quizz">
        <input id="criar-comeco-input-nmrNiveis" type="text" placeholder="Quantidade de níveis do quizz">
      </div>
      <button>Prosseguir pra criar perguntas</button>
    </div>
`

function showTela3(){
    document.querySelector("body").innerHTML = tela3Comeco;
}

function expandirPergunta(pgt){
  document.querySelectorAll("pergunta").forEach((pergunta) =>{
    pergunta.classList.add("retraida");
  })
  pgt.parentElement.classList.remove("retraida");
  console.log(pgt.parentElement);
}
// showTela3();
