axios.defaults.headers.common["Authorization"] = "M813n9erPvENXeuGPzKDL1Iu";
const body = document.querySelector("body");
var quizz = {
  title: "",
  image: "",
  questions: [],
  levels: [],
};
var numeroDePerguntas = 0;
var numeroDeNiveis = 0;
var tela3 = null;
var existeNivelZero = false;

function irParaTela3() {
  const tela3Comeco = `
    <div class="tela-3">
      <h1>Comece pelo comeco</h1>
      <div class="caixa-inputs">
        <input id="criar-quizz-titulo" data-test="title-input" type="text" placeholder="Título do seu quizz">
        <input id="criar-quizz-url" data-test="img-input" type="text" placeholder="URL da imagem do seu quizz">
        <input id="criar-quizz-numeroDePerguntas" data-test="questions-amount-input" type="text" placeholder="Quantidade de perguntas do quizz">
        <input id="criar-quizz-numeroDeNiveis" data-test="levels-amount-input" type="text" placeholder="Quantidade de níveis do quizz">
      </div>
      <button onclick="irParaCriarPerguntas()" data-test="go-create-questions">Prosseguir pra criar perguntas</button>
    </div>
`;
  document.querySelector("body").innerHTML += tela3Comeco;
  tela3 = document.querySelector(".tela-3");
}

function scriptTela3() {
  let paginaHome = document.querySelector(".page1");
  let paginaQuizz = document.querySelector("parte-do-luca");
  if (paginaHome != null) paginaHome.style.display = "none";
  if (paginaQuizz != null) paginaQuizz.style.display = "none";
  irParaTela3();
}

function URLInvalida(URLString) {
  try {
    const testeURL = new URL(URLString);
    return false;
  } catch (lixo) {
    return true;
  }
}

function gerarPergunta(indice) {
  return `
  <div class="secao pergunta" data-test="question-ctn">
        <div class="tituloSecao">
          <p>Pergunta ${indice}</p>
          <ion-icon name="create-outline" onclick="expandirDiv(this)" data-test="toggle"></ion-icon>
          </div>
        <div class="caixa-inputs">
          <input id="criar-pergunta${indice}-texto" data-test="question-input" type="text" placeholder="Texto da pergunta">
          <input id="criar-pergunta${indice}-cor" data-test="question-color-input" type="text" placeholder="Cor de fundo da pergunta">
        </div>
        <div class="caixa-inputs">
          <p>Resposta correta</p>
          <input id="criar-pergunta${indice}-respostaCorreta" data-test="correct-answer-input" type="text" placeholder="Resposta correta">
          <input id="criar-pergunta${indice}-respostaCorretaURL" data-test="correct-img-input" type="text" placeholder="URL da imagem">
        </div>
        <div class="caixa-inputs">
          <p>Respostas Incorretas</p>
          <input id="criar-pergunta${indice}-respostaIncorreta1" data-test="wrong-answer-input" type="text" placeholder="Resposta Incorreta 1">
          <input id="criar-pergunta${indice}-respostaIncorreta1URL" data-test="wrong-img-input" type="text" placeholder="URL da imagem 1">
        </div>
        <div class="caixa-inputs">
          <input id="criar-pergunta${indice}-respostaIncorreta2" data-test="wrong-answer-input" type="text" placeholder="Resposta Incorreta 2">
          <input id="criar-pergunta${indice}-respostaIncorreta2URL" data-test="wrong-img-input" type="text" placeholder="URL da imagem 2">
        </div>
        <div class="caixa-inputs">
          <input id="criar-pergunta${indice}-respostaIncorreta3" data-test="wrong-answer-input" type="text" placeholder="Resposta Incorreta 3">
          <input id="criar-pergunta${indice}-respostaIncorreta3URL" data-test="wrong-img-input" type="text" placeholder="URL da imagem 3">
        </div>
      </div>
  `;
}

function gerarListaDePerguntas() {
  for (let i = 1; i <= numeroDePerguntas; i++) {
    tela3.innerHTML += gerarPergunta(i);
  }
  document.querySelector(".tela-3 > .secao").classList.add("expandida");
  tela3.scrollTop = 0;
}

function acompanharTransition(transicionando) {
  let acompanhar = setInterval(() => {
    transicionando.scrollIntoView();
    tela3.scrollTop -= 75;
  }, 10);
  setTimeout(() => {
    clearInterval(acompanhar);
  }, 1000);
}

function expandirDiv(secao) {
  let avo = secao.parentNode.parentNode;
  let expandidaAnteriormente = document.querySelector(".expandida");
  expandidaAnteriormente.classList.remove("expandida");
  avo.classList.add("expandida");
  acompanharTransition(avo);
}

function validarInfoDoQuizz() {
  let titulo = document.getElementById("criar-quizz-titulo").value;
  let URLquiz = document.getElementById("criar-quizz-url").value;

  numeroDePerguntas = Number(
    document.getElementById("criar-quizz-numeroDePerguntas").value
  );
  numeroDeNiveis = Number(
    document.getElementById("criar-quizz-numeroDeNiveis").value
  );

  if (titulo.length < 20) throw "Título muito curto!";
  else if (titulo.length > 65) throw "Título muito grande!";
  if (URLInvalida(URLquiz)) throw "URL inválida!";
  else if (numeroDePerguntas < 3)
    throw "O Quizz deve ter no mínimo 3 perguntas!";
  else if (numeroDeNiveis < 2) throw "O Quizz deve ter no mínimo 2 níveis!";

  quizz.title = titulo;
  quizz.image = URLquiz;
}

function irParaCriarPerguntas() {
  try {
    validarInfoDoQuizz();

    tela3.innerHTML = `
      <h1>Crie suas perguntas</h1>`;
    gerarListaDePerguntas();
    tela3.innerHTML += `
  <button onclick="irParaCriarNiveis()" data-test="go-create-levels">Prosseguir pra criar níveis</button>`;
  } catch (erro) {
    alert(erro);
    quizz.questions = [];
  }
}

function validarPergunta(indiceDaPergunta) {
  let perguntaTexto = document.getElementById(
    `criar-pergunta${indiceDaPergunta}-texto`
  ).value;

  let perguntaCor = document.getElementById(
    `criar-pergunta${indiceDaPergunta}-cor`
  ).value;

  let resposta = [];

  let respostaCorreta = {
    text: document.getElementById(
      `criar-pergunta${indiceDaPergunta}-respostaCorreta`
    ).value,
    image: document.getElementById(
      `criar-pergunta${indiceDaPergunta}-respostaCorretaURL`
    ).value,
    isCorrectAnswer: true,
  };

  let respostaIncorreta = {};

  if (perguntaTexto < 20)
    throw `Texto da pergunta ${indiceDaPergunta} muito curto!`;
  if (!/^#[0-9A-F]{6}$/i.test(perguntaCor))
    throw `Valor hexadecimal da pergunta ${indiceDaPergunta} inválido`;

  if (respostaCorreta.text == null || respostaCorreta.text == "")
    throw `Texto da resposta correta da pergunta ${indiceDaPergunta} está vazio!`;
  if (URLInvalida(respostaCorreta.image))
    throw `URL da resposta correta da pergunta ${indiceDaPergunta} está vazio!`;

  resposta.push(respostaCorreta);

  for (let i = 1; i < 4; i++) {
    respostaIncorreta = {
      text: document.getElementById(
        `criar-pergunta${indiceDaPergunta}-respostaIncorreta${i}`
      ).value,
      image: document.getElementById(
        `criar-pergunta${indiceDaPergunta}-respostaIncorreta${i}URL`
      ).value,
      isCorrectAnswer: false,
    };
    if(respostaIncorreta.text != null && respostaIncorreta.text != "")resposta.push(respostaIncorreta);
  }

  if(resposta.length < 2)throw `A pergunta ${indiceDaPergunta} deve ter pelo menos uma resposta incorreta!`

  for(let i = 1; i < resposta.length; i++){
    if (resposta[i].text == null || resposta[i].text == "")
        throw `Texto da resposta incorreta da pergunta ${indiceDaPergunta} está vazio!`;
    if (URLInvalida(resposta[i].image))
      throw `URL da resposta incorreta da pergunta ${indiceDaPergunta} inválida!`;
  }

  let blueprintPergunta = {
    title: perguntaTexto,
    color: perguntaCor,
    answers: [],
  };

  for (let i = 0; i < resposta.length; i++) {
    blueprintPergunta.answers.push(resposta[i]);
  }

  quizz.questions.push(blueprintPergunta);
}

function irParaCriarNiveis() {
  try {
    for (let i = 1; i <= numeroDePerguntas; i++) {
      validarPergunta(i);
    }

    tela3.innerHTML = "<h1>Agora, decida os níveis!</h1>";

    for (let i = 1; i <= numeroDeNiveis; i++) {
      tela3.innerHTML += `
    <div class="secao nivel" data-test="level-ctn">
        <div class="tituloSecao">
          <p>Nivel ${i}</p>
          <ion-icon name="create-outline" onclick="expandirDiv(this)" data-test="toggle"></ion-icon>
        </div>
        <div class="caixa-inputs">
          <input id="criar-nivel${i}-titulo" data-test="level-input" type="text" placeholder="Título do nível">
          <input id="criar-nivel${i}-porcento" data-test="level-percent-input" type="text" placeholder="% de acerto mínima">
          <input id="criar-nivel${i}-url" data-test="level-img-input" type="text" placeholder="URL da imagem do nível">
          <textarea id="criar-nivel${i}-descricao" data-test="level-description-input" type="text" placeholder="Descrição do nível"></textarea>
        </div>
      </div>`;
    }
    document.querySelector(".tela-3 > .secao").classList.add("expandida");
    tela3.innerHTML += `<button onclick="finalizar()" data-test="finish">Finalizar Quizz</button>`;
  } catch (erro) {
    alert(erro);
  }
}

function validarNivel(indiceDoNivel) {
  let tituloDoNivel = document.getElementById(
    `criar-nivel${indiceDoNivel}-titulo`
  ).value;

  let URLDoNivel = document.getElementById(
    `criar-nivel${indiceDoNivel}-url`
  ).value;

  let descricaoDoNivel = document.getElementById(
    `criar-nivel${indiceDoNivel}-descricao`
  ).value;

  let porcentoDoNivel = Number(
    document.getElementById(`criar-nivel${indiceDoNivel}-porcento`).value
  );

  if (tituloDoNivel.length < 10)
    throw `Título do nível ${indiceDoNivel} deve ter no mínimo 10 letras!`;
  else if (URLInvalida(URLDoNivel))
    throw `URL do nível ${indiceDoNivel} inválida!`;
  else if (descricaoDoNivel.length < 30)
    throw `Descrição do nível ${indiceDoNivel} deve ter no mínimo 30 letras!`;
  else if (porcentoDoNivel < 0 || porcentoDoNivel > 100)
    throw `% do nível ${indiceDoNivel} deve ser um número de 0 a 100!`;
  else if (porcentoDoNivel === 0) existeNivelZero = true;

  let blueprintNivel = {
    title: tituloDoNivel,
    image: URLDoNivel,
    text: descricaoDoNivel,
    minValue: porcentoDoNivel,
  };

  quizz.levels.push(blueprintNivel);
}

function finalizar() {
  try {
    for (let i = 1; i <= numeroDeNiveis; i++) {
      validarNivel(i);
    }
    if (!existeNivelZero) throw "Deve existir um nível com 0%!";

    let prom = axios.post(
      "https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes",
      quizz
    );
    prom.then((resp) => {
      let quizzCriado = {
        id: resp.data.id,
      };

      let arrayDeQuizzes = JSON.parse(localStorage.getItem("ids"));

      if (arrayDeQuizzes === null) arrayDeQuizzes = [];
      arrayDeQuizzes.push(quizzCriado);

      localStorage.setItem("ids", JSON.stringify(arrayDeQuizzes));

      const id_quiz = resp.data.id;

      tela3.innerHTML = ` 
      <h1>Seu quizz está pronto!</h1>
      <li class="resultado" data-id="${resp.data.id}" data-test="success-banner">
        <div class="gradient"></div>
        <img
          src="${resp.data.image}"
          alt=""
        />
        <h1>${resp.data.title}</h1>
      </li>
      <button class="acessar" onclick="start_quiz(${id_quiz})" data-test="go-quiz">Acessar Quizz</button>
      <button class="voltar" onclick="scriptTela1()" data-test="go-home">Voltar pra home</button>`;
      existeNivelZero = false;
    });
    prom.catch((resp) => {
      alert("Erro " + resp.response.status);
    });
  } catch (erro) {
    alert(erro);
    quizz.levels = [];
  }
}