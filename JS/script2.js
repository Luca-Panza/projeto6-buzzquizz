axios.defaults.headers.common['Authorization'] = 'M813n9erPvENXeuGPzKDL1Iu';

let package;
let score = 0;
let score_negative = 0;
let score_total = 0;
let resultado = 0;
let centralizar;
let k = 0;

function start_quiz(link){

const promise = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/'+ link.dataset.id);

promise.then((messages) => {

	package = messages.data;
	score_total = package.questions.length;

	let Tela_2 = document.querySelector("body")

	Tela_2.innerHTML =
		`
	<div class="Hub-central"> <h1>BuzzQuizz</h1> </div>
	<div data-test="banner" class="Hub-title"> 
		<img src="${package.image}"/>
		<div class="Title">${package.title}</div>
	</div>
	<div class="Hub_centralizar"></div>
	`;

	centralizar = document.querySelector(".Hub_centralizar")
	
	
	
	for (i = 0; i < package.questions.length; i++) {
		centralizar.innerHTML +=
			`
			<div class="Hub_question"> 
				<div class="Question_box" style="background-color:${package.questions[i].color}" ><h2>${package.questions[i].title}</h2></div>
				<div class="img_box" id="${i}"></div>
			`

		package.questions[i].answers.sort (() => Math.random()- 0.5)

		let id_box = document.getElementById(i)
		for (j = 0; j < package.questions[i].answers.length; j++) {
			id_box.innerHTML +=
				`
				<div onclick="click_answers (this)" class="${package.questions[i].answers[j].isCorrectAnswer}"><img class="img_question" src="${package.questions[i].answers[j].image}"/><p class="txt_answers">${package.questions[i].answers[j].text}</p></div> 
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

	start_quiz();
}

function finalizarQuiz (){
	resultado = Math.round(score/score_total*100)
	for(i=0;i<package.levels.length;i++){
		if(package.levels[i].minValue>resultado || package.levels.length === i){
		k = i;
	}
}

	centralizar.innerHTML +=
	`
	<div class="Hub_final"> 
	<div class="final_answer"><h2>${resultado}% de acerto: ${package.levels[k].title}</h2></div>
		<div class="img_box_final">
			<div class="Centralizar_final">
				<img class="img_final" src="${package.levels[k].image}"/>
				<p class="final_txt">${package.levels[k].text}</p></div>
			</div>
		</div>
	</div>
	<div class="formatador">
		<button class="reiniciar_quiz" onclick="reiniciar_quiz()"><p>Reiniciar Quizz</p></button>
		<button class="voltar_home" onclick="window.location.reload()"><p>Voltar pra home</p></button>
	</div>
	`
}



function click_answers(clicked) {

if (clicked.classList.contains('true') && (!clicked.parentElement.classList.contains('opacity'))){
	clicked.parentElement.classList.add('opacity');
	clicked.classList.add('clicado');
	score++;
	console.log(score);
}else if (clicked.classList.contains('false') && (!clicked.parentElement.classList.contains('opacity'))){
		clicked.classList.add('clicado');
		clicked.parentElement.classList.add('opacity');
		score_negative++;
		console.log(score_negative)
	}

if (score + score_negative === score_total){
	setTimeout(finalizarQuiz,2000)
	}
}