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
              <li>
                <div class="gradient"></div>
                <img src="" alt="">
                <h1></h1>
              </li>
            </ul>
          </div>
        </div>
        <div class="all-quizz">
          <div class="quizz-list">
            <header>
              <h1>Todos os Quizzes</h1>
            </header>
            <ul>
              <li>
                <div class="gradient"></div>
                <img src="" alt="">
                <h1></h1>
              </li>
            </ul>
        </div>
      </main>
    </section>
`

function showTela1 () {
  document.querySelector("body").innerHTML = tela1;
}

// showTela1();