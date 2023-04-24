axios.defaults.headers.common['Authorization'] = 'M813n9erPvENXeuGPzKDL1Iu';

let package;
let score = 0;
let score_negative = 0;
let score_total = 0;
let resultado = 0;
let centralizar;
let k = 0;
let element = 0;

function start_quiz(link){

const promise = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/'+ link);

promise.then((messages) => {

	package = messages.data;
	score_total = package.questions.length;

	let Tela_2 = document.querySelector("body")

	Tela_2.innerHTML =
		`
	<div class="tela_2">
	<div onclick="window.location.reload()" class="Hub-central"> <h1>BuzzQuizz</h1> </div>
	<div data-test="banner" class="Hub-title"> 
		<img src="${package.image}"/>
		<div class="Title"><h2>${package.title}</h2></div>
	</div>
	<div class="Hub_centralizar"></div></div>
	`;

	centralizar = document.querySelector(".Hub_centralizar")
	
	
	
	for (i = 0; i < package.questions.length; i++) {
		centralizar.innerHTML +=
			`
			<div data-test="question" class="Hub_question"> 
				<div data-test="question-title" class="Question_box" style="background-color:${package.questions[i].color}" ><h2>${package.questions[i].title}</h2></div>
				<div class="img_box" id="${i}"></div>
			`

		package.questions[i].answers.sort (() => Math.random()- 0.5)

		let id_box = document.getElementById(i)
		for (j = 0; j < package.questions[i].answers.length; j++) {
			id_box.innerHTML +=
				`
				<div data-test="answer" onclick="click_answers (this)" class="${package.questions[i].answers[j].isCorrectAnswer}"><img class="img_question" src="${package.questions[i].answers[j].image}"/><p data-test="answer-text" class="txt_answers">${package.questions[i].answers[j].text}</p></div> 
				`;
		}
	}

});

}

function reiniciar_quiz (){
	let package;
	let score = 0;
	let score_negative = 0;
	let score_total = 0;
	let resultado = 0;
	let centralizar;
	let k = 0;
	let element = 0;

	start_quiz();
}

function finalizarQuiz (){
	resultado = Math.round(score/score_total*100)
	for(i=0;i<package.levels.length;i++){
		if(package.levels[i].minValue<=resultado){
		k = i;
	}
}
	
	centralizar.innerHTML +=
	`
	<div class="Hub_final"> 
	<div data-test="level-title" class="final_answer"><h2>${resultado}% de acerto: ${package.levels[k].title}</h2></div>
		<div class="img_box_final">
			<div class="Centralizar_final">
				<img data-test="level-img" class="img_final" src="${package.levels[k].image}"/>
				<p data-test="level-text" class="final_txt">${package.levels[k].text}</p></div>
			</div>
		</div>
	</div>
	<div class="formatador">
		<button data-test="restart" class="reiniciar_quiz" onclick="reiniciar_quiz()"><p>Reiniciar Quizz</p></button>
		<button data-test="go-home" class="voltar_home" onclick="window.location.reload()"><p>Voltar pra home</p></button>
	</div>
	`
	
	const scroll_bottom = document.querySelector(".Hub_final")
	scrollToBottom(scroll_bottom)

}

function scrollToBottom(el){
    el.scrollIntoView({ block: 'end', behavior: 'smooth' });
}

function click_answers(clicked) {

if (clicked.classList.contains('true') && (!clicked.parentElement.classList.contains('opacity'))){
	clicked.parentElement.classList.add('opacity');
	clicked.classList.add('clicado');

	score++;
}else if (clicked.classList.contains('false') && (!clicked.parentElement.classList.contains('opacity'))){
		clicked.classList.add('clicado');
		clicked.parentElement.classList.add('opacity');
		score_negative++;
	}

	const resken = document.getElementById(element+1)
	if (resken !== null)
	setTimeout (scrollToBottom, 2000, resken)
	element++;

if (score + score_negative === score_total){
	setTimeout(finalizarQuiz,2000)
	}
}


