axios.defaults.headers.common["Authorization"] = "M813n9erPvENXeuGPzKDL1Iu";

// Home page template/layout
const tela1Template = `
    <section class="page1">
      <main>
        <div class="user-quizz">
          <div class="no-quizz ">
            <p>
              Você não criou nenhum<br>quizz ainda :(
            </p>
            <button data-test="create-btn" onclick="scriptTela3()">Criar Quizz</button>
          </div>
          <div class="quizz-list hidden">
            <header>
              <h1>Seus quizes</h1>
              <ion-icon name="add-circle" data-test="create-btn" onclick="scriptTela3()"></ion-icon>
            </header>
            <ul>
            </ul>
          </div>
        </div>
        <div class="all-quizz">
          <div class="quizz-list">
            <header>
              <h1>Todos os Quizzes</h1>
            </header>
            <ul>
            </ul>
        </div>
      </main>
    </section>
`;

function scriptTela1() {
  let paginaCriarQuizz = document.querySelector(".tela-3");
  let paginaQuizz = document.querySelector("parte-do-luca");

  if (paginaCriarQuizz != null) paginaCriarQuizz.style.display = "none";
  if (paginaQuizz != null) paginaQuizz.style.display = "none";

  getQuizz();
}

function showTela1() {
  document.querySelector("body").innerHTML += tela1Template;
}

function getQuizz() {
  axios
    .get("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes")
    .then((res) => {
      console.log(res);
      showTela1(); // displays the

      const userQuizzList = document.querySelector(".user-quizz ul");
      const allQuizzList = document.querySelector(".all-quizz ul");

      const userLocalStorage = JSON.parse(localStorage.getItem("ids"));
      let validUserQuiz = false; // used to keep track if there is any user quizz, if so, at the end of the function will display the USER QUIZ LIST

      res.data.forEach((quiz) => {
        let userQuiz = false; // defines either the current quiz is going to be displayed as user quizz or not

        if (userLocalStorage != null) {
          userLocalStorage.forEach((item) => {
            // check if the current quiz equals any of the local stored IDS
            if (quiz.id === item.id) {
              userQuiz = true;
              validUserQuiz = true;
            }
          });
        }

        if (userQuiz) {
          userQuizzList.innerHTML += `
          <li data-test="my-quiz" data-id='${quiz.id}'>
            <div class="gradient"></div>
            <img src="${quiz.image}" alt="">
            <h1>${quiz.title}</h1>
          </li>
        `;
        } else {
          allQuizzList.innerHTML += `
            <li data-test="others-quiz" data-id='${quiz.id}'>
              <div class="gradient"></div>
              <img src="${quiz.image}" alt="">
              <h1>${quiz.title}</h1>
            </li>
          `;
        }
      });

      if (validUserQuiz) {
        // displays the users quiz
        document.querySelector(".no-quizz").classList.add("hidden");
        document
          .querySelector(".user-quizz .quizz-list")
          .classList.remove("hidden");
      }
    })
    .catch((error) => console.log(error));
}

scriptTela1();