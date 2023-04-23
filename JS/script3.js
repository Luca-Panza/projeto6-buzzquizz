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
var tela3;
var existeNivelZero = false;

scriptTela3();

function inserirHeader() {
  body.innerHTML += `
  <div class="header-tela-3">
    <p class="buzzquizz">BuzzQuizz</p>
  </div>`;
}

function irParaTela3() {
  const tela3Comeco = `
    <div class="tela-3">
      <h1>Comece pelo comeco</h1>
      <div class="caixa-inputs">
        <input id="criar-quizz-titulo" type="text" placeholder="Título do seu quizz">
        <input id="criar-quizz-url" type="text" placeholder="URL da imagem do seu quizz">
        <input id="criar-quizz-numeroDePerguntas" type="text" placeholder="Quantidade de perguntas do quizz">
        <input id="criar-quizz-numeroDeNiveis" type="text" placeholder="Quantidade de níveis do quizz">
      </div>
      <button onclick="irParaCriarPerguntas()">Prosseguir pra criar perguntas</button>
    </div>
`;
  document.querySelector("body").innerHTML += tela3Comeco;
}

function scriptTela3() {
  inserirHeader();
  irParaTela3();
  tela3 = document.querySelector(".tela-3");
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
  <div class="pergunta retraida">
        <div class="tituloRetraida">
          <p>Pergunta ${indice}</p>
          <ion-icon name="create-outline" onclick="expandirDiv(this)"></ion-icon>
        </div>
        <div class="caixa-inputs">
          <input id="criar-pergunta${indice}-texto" type="text" placeholder="Texto da pergunta">
          <input id="criar-pergunta${indice}-cor" type="text" placeholder="Cor de fundo da pergunta">
        </div>
        <div class="caixa-inputs">
          <p>Resposta correta</p>
          <input id="criar-pergunta${indice}-respostaCorreta" type="text" placeholder="Resposta correta">
          <input id="criar-pergunta${indice}-respostaCorretaURL" type="text" placeholder="URL da imagem">
        </div>
        <div class="caixa-inputs">
          <p>Respostas Incorretas</p>
          <input id="criar-pergunta${indice}-respostaIncorreta1" type="text" placeholder="Resposta Incorreta 1">
          <input id="criar-pergunta${indice}-respostaIncorreta1URL" type="text" placeholder="URL da imagem 1">
        </div>
        <div class="caixa-inputs">
          <input id="criar-pergunta${indice}-respostaIncorreta2" type="text" placeholder="Resposta Incorreta 2">
          <input id="criar-pergunta${indice}-respostaIncorreta2URL" type="text" placeholder="URL da imagem 2">
        </div>
        <div class="caixa-inputs">
          <input id="criar-pergunta${indice}-respostaIncorreta3" type="text" placeholder="Resposta Incorreta 3">
          <input id="criar-pergunta${indice}-respostaIncorreta3URL" type="text" placeholder="URL da imagem 3">
        </div>
      </div>
  `;
}

function gerarListaDePerguntas() {
  for (let i = 1; i <= numeroDePerguntas; i++) {
    tela3.innerHTML += gerarPergunta(i);
  }
  document.querySelector(".tela-3 > .pergunta").classList.remove("retraida");
}

function expandirDiv(secao) {
  let avo = secao.parentNode.parentNode;
  document.querySelectorAll("." + avo.classList[0]).forEach((elemento) => {
    elemento.classList.add("retraida");
  });
  avo.classList.remove("retraida");
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
  <button onclick="irParaCriarNiveis()">Prosseguir pra criar níveis</button>`;
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
  let resposta = [
    {
      text: document.getElementById(
        `criar-pergunta${indiceDaPergunta}-respostaCorreta`
      ).value,
      image: document.getElementById(
        `criar-pergunta${indiceDaPergunta}-respostaCorretaURL`
      ).value,
      isCorrectAnswer: true,
    },
    {
      text: document.getElementById(
        `criar-pergunta${indiceDaPergunta}-respostaIncorreta1`
      ).value,
      image: document.getElementById(
        `criar-pergunta${indiceDaPergunta}-respostaIncorreta1URL`
      ).value,
      isCorrectAnswer: false,
    },
    {
      text: document.getElementById(
        `criar-pergunta${indiceDaPergunta}-respostaIncorreta2`
      ).value,
      image: document.getElementById(
        `criar-pergunta${indiceDaPergunta}-respostaIncorreta2URL`
      ).value,
      isCorrectAnswer: false,
    },
    {
      text: document.getElementById(
        `criar-pergunta${indiceDaPergunta}-respostaIncorreta3`
      ).value,
      image: document.getElementById(
        `criar-pergunta${indiceDaPergunta}-respostaIncorreta3URL`
      ).value,
      isCorrectAnswer: false,
    },
  ];

  if (perguntaTexto < 20)
    throw `Texto da pergunta ${indiceDaPergunta} muito curto!`;
  if (!/^#[0-9A-F]{6}$/i.test(perguntaCor))
    throw `Valor hexadecimal da pergunta ${indiceDaPergunta} inválido`;

  let blueprintPergunta = {
    title: perguntaTexto,
    color: perguntaCor,
    answers: [],
  };

  for (let i = 0; i < resposta.length; i++) {
    if (resposta[i].text == null || resposta[i].text == "")
      if (i === 0)
        throw `Texto da resposta correta da pergunta ${indiceDaPergunta} está vazio!`;
      else
        throw `Texto da resposta incorreta ${i} da pergunta ${indiceDaPergunta} está vazio!`;
    if (URLInvalida(resposta[i].image))
      if (i === 0)
        throw `URL da resposta correta da pergunta ${indiceDaPergunta} está vazio!`;
      else
        throw `URL da resposta incorreta ${i} da pergunta ${indiceDaPergunta} inválida!`;

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
    <div class="nivel retraida">
        <div class="tituloRetraida">
          <p>Nivel ${i}</p>
          <ion-icon name="create-outline" onclick="expandirDiv(this)"></ion-icon>
        </div>
        <div class="caixa-inputs">
          <input id="criar-nivel${i}-titulo" type="text" placeholder="Título do nível">
          <input id="criar-nivel${i}-porcento" type="text" placeholder="% de acerto mínima">
          <input id="criar-nivel${i}-url" type="text" placeholder="URL da imagem do nível">
          <textarea id="criar-nivel${i}-descricao" type="text" placeholder="Descrição do nível"></textarea>
        </div>
      </div>`;
    }
    document.querySelector(".tela-3 > .nivel").classList.remove("retraida");
    tela3.innerHTML += `<button onclick="finalizar()">Finalizar Quizz</button>`;
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
      console.log(resp);
      alert("suseso parsa");
    });
    prom.catch((resp) => {
      console.log(resp.response);
    });
  } catch (erro) {
    alert(erro);
    quizz.levels = [];
  }
}
