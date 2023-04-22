axios.defaults.headers.common['Authorization'] = 'M813n9erPvENXeuGPzKDL1Iu';
const tela3 = document.querySelector(".tela-3");
const tela3Comeco = `
<div class="header-tela-3">
        <p class="buzzquizz">BuzzQuizz</p>
      </div>
    <div class="tela-3">
      <h1>Comece pelo comeco</h1>
      <div class="caixa-inputs">
        <input id="criar-quiz-titulo" type="text" placeholder="Título do seu quizz">
        <input id="criar-quiz-url" type="text" placeholder="URL da imagem do seu quizz">
        <input id="criar-quiz-nmrPerguntas" type="text" placeholder="Quantidade de perguntas do quizz">
        <input id="criar-quiz-nmrNiveis" type="text" placeholder="Quantidade de níveis do quizz">
      </div>
      <button>Prosseguir pra criar perguntas</button>
    </div>
`

gerarListaDePerguntas(10);

function showTela3(){
    document.querySelector("body").innerHTML += tela3Comeco;
}

function valido(inp){
  if(inp == '' || inp == undefined || inp == null)return false;
  else return true;
}

function showCriarPerguntas(){
  quiz.title = document.getElementById("criar-quiz-titulo").value;
  quiz.image = document.getElementById("criar-quiz-url").value;
  
  nmrDePerguntas = document.getElementById("criar-quiz-nmrPerguntas").value;
  nmrNiveis = document.getElementById("criar-quiz-nmrNiveis").value;

  if(!valido(quiz.title))return;
  if(!valido(quiz.image))return;
  if(!valido(nmrDePerguntas))return;
  if(!valido(nmrNiveis))return;

  tela3.innerHTML = `
      <h1>Crie suas perguntas</h1>`;
  gerarListaDePerguntas(nmrDePerguntas);
  tela3.innerHTML += `
  <button onclick="showCriarNiveis()">Prosseguir pra criar níveis</button>`;
}

function showCriarNiveis(){
  for(let i = 1; i <= nmrDePerguntas; i++){
    let pergunta = {
      text: document.getElementById(`criar-pergunta${i}-texto`).value,
      color: document.getElementById(`criar-pergunta${i}-cor`).value,
      answers: [
				{
					text: document.getElementById(`criar-pergunta${i}-respostaCorreta`).value,
					image: document.getElementById(`criar-pergunta${i}-respostaCorretaURL`).value,
					isCorrectAnswer: true
				},
				{
					text: document.getElementById(`criar-pergunta${i}-respostaIncorreta1`).value,
					image: document.getElementById(`criar-pergunta${i}-respostaIncorreta1URL`).value,
					isCorrectAnswer: false
				},
        {
					text: document.getElementById(`criar-pergunta${i}-respostaIncorreta2`).value,
					image: document.getElementById(`criar-pergunta${i}-respostaIncorreta2URL`).value,
					isCorrectAnswer: false
				},
        {
					text: document.getElementById(`criar-pergunta${i}-respostaIncorreta3`).value,
					image: document.getElementById(`criar-pergunta${i}-respostaIncorreta3URL`).value,
					isCorrectAnswer: false
				}
			]
    }
    quiz.questions.push(pergunta);
  }
  tela3.innerHTML = '<h1>Agora, decida os níveis!</h1>';
  for(let i = 1; i <= nmrNiveis; i++){
    tela3.innerHTML += `
    <div class="nivel retraida">
        <div class="tituloRetraida">
          <p>Nivel ${i}</p>
          <ion-icon name="create-outline" onclick="expandirPergunta(this)"></ion-icon>
        </div>
        <div class="caixa-inputs">
          <input id="criar-nivel${i}-titulo" type="text" placeholder="Titulo do nivel">
          <input id="criar-nivel${i}-porcento" type="text" placeholder="% de acerto mínima">
          <input id="criar-nivel${i}-url" type="text" placeholder="URL da imagem do nível">
          <textarea id="criar-nivel${i}-descricao" type="text" placeholder="Descrição do nível"></textarea>
        </div>
      </div>`
  }
  document.querySelector(".tela-3 > .nivel").classList.remove("retraida");

}

function gerarPergunta(numero){
  return `
  <div class="pergunta retraida">
        <div class="tituloRetraida">
          <p>Pergunta ${numero}</p>
          <ion-icon name="create-outline" onclick="expandirPergunta(this)"></ion-icon>
        </div>
        <div class="caixa-inputs">
          
          <input id="criar-pergunta${numero}-texto" type="text" placeholder="Texto da pergunta">
          <input id="criar-pergunta${numero}-cor" type="text" placeholder="Cor de fundo da pergunta">
        </div>
        <div class="caixa-inputs">
          <p>Resposta correta</p>
          <input id="criar-pergunta${numero}-respostaCorreta" type="text" placeholder="Resposta correta">
          <input id="criar-pergunta${numero}-respostaCorretaURL" type="text" placeholder="URL da imagem">
        </div>
        <div class="caixa-inputs">
          <p>Respostas Incorretas</p>
          <input id="criar-pergunta${numero}-respostaIncorreta1" type="text" placeholder="Resposta Incorreta 1">
          <input id="criar-pergunta${numero}-respostaIncorreta1URL" type="text" placeholder="URL da imagem 1">
        </div>
        <div class="caixa-inputs">
          <input id="criar-pergunta${numero}-respostaIncorreta2" type="text" placeholder="Resposta Incorreta 2">
          <input id="criar-pergunta${numero}-respostaIncorreta2URL" type="text" placeholder="URL da imagem 2">
        </div>
        <div class="caixa-inputs">
          <input id="criar-pergunta${numero}-respostaIncorreta3" type="text" placeholder="Resposta Incorreta 3">
          <input id="criar-pergunta${numero}-respostaIncorreta3URL" type="text" placeholder="URL da imagem 3">
        </div>
      </div>
  `
}

function gerarListaDePerguntas(quantia){
  for(let i = 1; i <= quantia; i++){
    tela3.innerHTML += gerarPergunta(i);
  }
  document.querySelector(".tela-3 > .pergunta").classList.remove("retraida");
}

function expandirPergunta(pgt){
  let avo = pgt.parentNode.parentNode;
  document.querySelectorAll(".pergunta").forEach((pergunta) =>{
    pergunta.classList.add("retraida");
  })
  avo.classList.remove("retraida");
}
