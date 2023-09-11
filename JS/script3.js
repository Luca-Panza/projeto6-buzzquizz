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
var existeRespostaInvalida = false;

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

function criarErro(el, str) {
	if (!el.classList.contains("alerta")) {
		let erro = document.createElement("i-erro");
		el.classList.add("alerta");
		erro.innerHTML = str;
		el.after(erro);
	}
}

function corrigirInput(inp) {
	if (inp.classList.contains("alerta")) {
		inp.classList.remove("alerta");
		inp.nextElementSibling.remove();
	}
}

function validarInfoDoQuizz() {
	let existeInputInvalido = false;
	let titulo = document.getElementById("criar-quizz-titulo");
	let URLquiz = document.getElementById("criar-quizz-url");
	let inputNumeroPerguntas = document.getElementById(
		"criar-quizz-numeroDePerguntas"
	);
	let inputNumeroNiveis = document.getElementById("criar-quizz-numeroDeNiveis");

	numeroDePerguntas = Number(inputNumeroPerguntas.value);
	numeroDeNiveis = Number(inputNumeroNiveis.value);

	if (titulo.value.length < 20 || titulo.value === "") {
		corrigirInput(titulo);
		criarErro(titulo, "Título muito curto!");
		existeInputInvalido = true;
	} else if (titulo.value.length > 65) {
		corrigirInput(titulo);
		criarErro(titulo, "Título muito grande!");
		existeInputInvalido = true;
	} else corrigirInput(titulo);

	if (URLInvalida(URLquiz.value)) {
		criarErro(URLquiz, "URL inválida!");
		existeInputInvalido = true;
	} else corrigirInput(URLquiz);

	if (numeroDePerguntas < 3) {
		criarErro(inputNumeroPerguntas, "O Quizz deve ter no mínimo 3 perguntas!");
		existeInputInvalido = true;
	} else corrigirInput(inputNumeroPerguntas);

	if (numeroDeNiveis < 2) {
		criarErro(inputNumeroNiveis, "O Quizz deve ter no mínimo 2 níveis!");
		existeInputInvalido = true;
	} else corrigirInput(inputNumeroNiveis);

	if (existeInputInvalido) throw "Por favor, preencha corretamente!";

	quizz.title = titulo.value;
	quizz.image = URLquiz.value;
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
	let existeInputInvalido = false;
	let perguntaTexto = document.getElementById(
		`criar-pergunta${indiceDaPergunta}-texto`
	);

	let perguntaCor = document.getElementById(
		`criar-pergunta${indiceDaPergunta}-cor`
	);

	let respostas = [];

	let inputCorreta = {
		inpTextoCorreta: document.getElementById(
			`criar-pergunta${indiceDaPergunta}-respostaCorreta`
		),
		inpURLCorreta: document.getElementById(
			`criar-pergunta${indiceDaPergunta}-respostaCorretaURL`
		),
		respostaCorreta: {
			text: document.getElementById(
				`criar-pergunta${indiceDaPergunta}-respostaCorreta`
			).value,
			image: document.getElementById(
				`criar-pergunta${indiceDaPergunta}-respostaCorretaURL`
			).value,
			isCorrectAnswer: true,
		},
	};

	respostas.push(inputCorreta.respostaCorreta);

	if (perguntaTexto.value.length < 20) {
		criarErro(perguntaTexto, "Texto da pergunta muito curto!");
		existeInputInvalido = true;
	} else corrigirInput(perguntaTexto);

	if (!/^#[0-9A-F]{6}$/i.test(perguntaCor.value)) {
		criarErro(perguntaCor, "Valor hexadecimal inválido!");
		existeInputInvalido = true;
	} else corrigirInput(perguntaCor);

	if (
		inputCorreta.respostaCorreta.text == null ||
		inputCorreta.respostaCorreta.text == ""
	) {
		criarErro(inputCorreta.inpTextoCorreta, "Texto da resposta está vazio!");
		existeInputInvalido = true;
	} else corrigirInput(inputCorreta.inpTextoCorreta);

	if (URLInvalida(inputCorreta.respostaCorreta.image)) {
		criarErro(inputCorreta.inpURLCorreta, "URL inválida!");
		existeInputInvalido = true;
	} else corrigirInput(inputCorreta.inpURLCorreta);

	for (let i = 1; i < 4; i++) {
		let inputIncorreta = {
			inpTextoIncorreta: document.getElementById(
				`criar-pergunta${indiceDaPergunta}-respostaIncorreta${i}`
			),
			inpURLIncorreta: document.getElementById(
				`criar-pergunta${indiceDaPergunta}-respostaIncorreta${i}URL`
			),
			respostaIncorreta: {
				text: document.getElementById(
					`criar-pergunta${indiceDaPergunta}-respostaIncorreta${i}`
				).value,
				image: document.getElementById(
					`criar-pergunta${indiceDaPergunta}-respostaIncorreta${i}URL`
				).value,
				isCorrectAnswer: false,
			},
		};

		if (
			(inputIncorreta.respostaIncorreta.text != null &&
				inputIncorreta.respostaIncorreta.text != "") ||
			(inputIncorreta.respostaIncorreta.image != null &&
				inputIncorreta.respostaIncorreta.image != "")
		) {
			respostas.push(inputIncorreta);
		}
	}

	if (respostas.length < 2)
		throw `A pergunta ${indiceDaPergunta} deve ter pelo menos uma resposta incorreta!`;
	else {
		for (let i = 1; i < respostas.length; i++) {
			if (
				respostas[i].respostaIncorreta.text == null ||
				respostas[i].respostaIncorreta.text == ""
			) {
				criarErro(
					respostas[i].inpTextoIncorreta,
					"A resposta nao pode estar vazia!"
				);
				existeRespostaInvalida = true;
			} else corrigirInput(respostas[i].inpTextoIncorreta);

			if (URLInvalida(respostas[i].respostaIncorreta.image)) {
				criarErro(respostas[i].inpURLIncorreta, "URL invalida!");
				existeRespostaInvalida = true;
			} else corrigirInput(respostas[i].inpURLIncorreta);
		}
	}
	if (existeInputInvalido) throw "Por favor, preencha corretamente!";

	let blueprintPergunta = {
		title: perguntaTexto.value,
		color: perguntaCor.value,
		answers: [],
	};

	blueprintPergunta.answers.push(respostas[0]);

	for (let i = 1; i < respostas.length; i++) {
		blueprintPergunta.answers.push(respostas[i].respostaIncorreta);
	}

	quizz.questions.push(blueprintPergunta);
}

function irParaCriarNiveis() {
	try {
		for (let i = 1; i <= numeroDePerguntas; i++) {
			validarPergunta(i);
		}
		if (existeRespostaInvalida) {
			existeRespostaInvalida = false;
			throw "Por favor, preencha corretamente!";
		}
		console.log(quizz);

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
		quizz.questions = [];
	}
}

function validarNivel(indiceDoNivel) {
	let tituloDoNivel = document.getElementById(
		`criar-nivel${indiceDoNivel}-titulo`
	);

	let URLDoNivel = document.getElementById(`criar-nivel${indiceDoNivel}-url`);

	let descricaoDoNivel = document.getElementById(
		`criar-nivel${indiceDoNivel}-descricao`
	);

	let porcentoDoNivel = document.getElementById(
		`criar-nivel${indiceDoNivel}-porcento`
	);
	let existeInputInvalido = false;

	if (tituloDoNivel.value.length < 10) {
		criarErro(tituloDoNivel, "Título do nível deve ter no mínimo 10 letras!");
		existeInputInvalido = true;
	} else corrigirInput(tituloDoNivel);

	if (URLInvalida(URLDoNivel.value)) {
		criarErro(URLDoNivel, "URL inválida!");
		existeInputInvalido = true;
	} else corrigirInput(URLDoNivel);

	if (descricaoDoNivel.value.length < 30) {
		criarErro(
			descricaoDoNivel,
			"Descrição do nível deve ter no mínimo 30 letras!"
		);
		existeInputInvalido = true;
	} else corrigirInput(descricaoDoNivel);

	if (
		Number(porcentoDoNivel.value) < 0 ||
		Number(porcentoDoNivel.value) > 100 ||
		isNaN(Number(porcentoDoNivel.value))
	) {
		criarErro(porcentoDoNivel, "Deve ser um número de 0 a 100!");
		existeInputInvalido = true;
	} else corrigirInput(porcentoDoNivel);

	if (Number(porcentoDoNivel.value) === 0) existeNivelZero = true;

	if (existeInputInvalido) throw "Por favor, preencha corretamente!";

	let blueprintNivel = {
		title: tituloDoNivel.value,
		image: URLDoNivel.value,
		text: descricaoDoNivel.value,
		minValue: Number(porcentoDoNivel.value),
	};

	console.log(blueprintNivel);

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
