axios.defaults.headers.common['Authorization'] = 'M813n9erPvENXeuGPzKDL1Iu';

const tela1 = `
<section class="page1">
      <header>
        BuzzQuizz
      </header>
      <main>
        <div class="user-quizz">
          <div class="no-quizz ">
            <p>
              Você não criou nenhum<br>quizz ainda :(
            </p>
            <button>Criar Quizz</button>
          </div>
          <div class="quizz-list hidden">
            <header>
              <h1>Seus quizes</h1>
              <ion-icon name="add-circle"></ion-icon>
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
`

function showTela1 () {
  document.querySelector("body").innerHTML = tela1;
}

// showTela1();

function getQuizz () {
  axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes')
  .then((res) => {
      console.log(res);
      showTela1();

      const userQuizzList = document.querySelector('.user-quizz ul');
      const allQuizzList = document.querySelector('.all-quizz ul');

      const userLocalStorage = JSON.parse(localStorage.getItem('ids'));
      let validUserQuiz = false;
      console.log(userLocalStorage);
      
      res.data.forEach((quiz) => {
        if(userLocalStorage != null) {
          userLocalStorage.forEach((item) => {
            if (quiz.id === item.id) {
              validUserQuiz = true;
              
              userQuizzList.innerHTML += `
                <li data-id='${quiz.id}'>
                  <div class="gradient"></div>
                  <img src="${quiz.image}" alt="">
                  <h1>${quiz.title}</h1>
                </li>
              `;
            } 
          });
        }
        allQuizzList.innerHTML += `
          <li data-id='${quiz.id}'>
            <div class="gradient"></div>
            <img src="${quiz.image}" alt="">
            <h1>${quiz.title}</h1>
          </li>
        `;
      })

      if(validUserQuiz) {
        document.querySelector('.no-quizz').classList.add('hidden');
        document.querySelector('.user-quizz .quizz-list').classList.remove('hidden');
      }
    })
    .catch(error => console.log(error));
}

// getQuizz();