

// --- Variáveis ---
let currentQuestionIndex = 0;
let score = 0;
let timeAtStart = 45;
let timeLeft = timeAtStart;
let timer = null;
let selectedLevel = "";
let shuffledQuestions = [];
const totalQuestions = 20;
let answered = false;
let correctStreak = 0;

// --- Elementos DOM ---
const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const rankingContainer = document.getElementById("ranking-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timeDisplay = document.getElementById("time");
const scoreCounter = document.getElementById("score-counter");
const nivelSelect = document.getElementById("nivel");
const startBtn = document.getElementById("start-btn");
const viewRankingBtn = document.getElementById("view-ranking");
const backBtn = document.getElementById("back-btn");
const rankingList = document.getElementById("ranking-list");
const playerNameInput = document.getElementById("player-name");
const streakDisplay = document.createElement("div");
const questions = {
  Fundamental: [
    { question: "Quanto é 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1, feedback: "2 + 2 é 4, simples matemática básica." },
    { question: "Qual é a capital do Brasil?", answers: ["São Paulo", "Rio", "Brasília", "Salvador"], correct: 2, feedback: "Brasília é a capital do Brasil desde 1960." },
    { question: "Quantas cores há no semáforo?", answers: ["2", "3", "4", "5"], correct: 1, feedback: "O semáforo possui 3 cores: vermelho, amarelo e verde." },
    { question: "O Sol é uma...", answers: ["Estrela", "Lua", "Galáxia", "Nebulosa"], correct: 0, feedback: "O Sol é uma estrela e a nossa principal fonte de energia." },
    { question: "Quanto é 10 ÷ 2?", answers: ["3", "4", "5", "6"], correct: 2, feedback: "10 dividido por 2 é igual a 5." },
    { question: "Qual animal mia?", answers: ["Cachorro", "Gato", "Pássaro", "Sapo"], correct: 1, feedback: "Gatos são os animais que miam." },
    { question: "Que cor resulta de azul + amarelo?", answers: ["Verde", "Roxo", "Laranja", "Marrom"], correct: 0, feedback: "Azul e amarelo misturados produzem verde." },
    { question: "Quantos dias há em uma semana?", answers: ["5", "6", "7", "8"], correct: 2, feedback: "Uma semana tem 7 dias." },
    { question: "Qual o maior planeta do sistema solar?", answers: ["Terra", "Marte", "Júpiter", "Saturno"], correct: 2, feedback: "Júpiter é o maior planeta do sistema solar." },
    { question: "Quem descobriu o Brasil?", answers: ["Cabral", "Colombo", "Newton", "Einstein"], correct: 0, feedback: "Pedro Álvares Cabral descobriu o Brasil em 1500." },
    { question: "Qual é o plural de 'flor'?", answers: ["flores", "flors", "floris", "flóres"], correct: 0, feedback: "O plural de flor é flores." },
    { question: "Quantas patas tem uma aranha?", answers: ["6", "8", "10", "12"], correct: 1, feedback: "Aranhas possuem 8 patas." },
    { question: "Qual destes é um mamífero?", answers: ["Cobra", "Sapo", "Golfinho", "Peixe"], correct: 2, feedback: "Golfinhos são mamíferos aquáticos." },
    { question: "Qual a cor do céu em dia claro?", answers: ["Azul", "Preto", "Roxo", "Cinza"], correct: 0, feedback: "O céu geralmente é azul em dias claros." },
    { question: "Qual instrumento mede temperatura?", answers: ["Barômetro", "Termômetro", "Anemômetro", "Régua"], correct: 1, feedback: "O termômetro mede a temperatura." },
    { question: "Quantos meses tem um ano?", answers: ["10", "11", "12", "13"], correct: 2, feedback: "O ano possui 12 meses." },
    { question: "Quantos segundos tem um minuto?", answers: ["30", "60", "90", "100"], correct: 1, feedback: "Um minuto possui 60 segundos." },
    { question: "Qual destes é um meio de transporte?", answers: ["Carro", "Casa", "Mesa", "Cadeira"], correct: 0, feedback: "O carro é um meio de transporte." },
    { question: "O que usamos para escrever?", answers: ["Papel", "Caneta", "Tesoura", "Régua"], correct: 1, feedback: "Usamos a caneta para escrever." },
    { question: "Quantos continentes existem?", answers: ["4", "5", "6", "7"], correct: 3, feedback: "Existem 7 continentes na Terra." }
  ],

  Médio: [
    { question: "Quem formulou a Teoria da Relatividade?", answers: ["Einstein", "Newton", "Tesla", "Galileu"], correct: 0, feedback: "Albert Einstein formulou a Teoria da Relatividade." },
    { question: "Qual o símbolo químico do Ouro?", answers: ["Ag", "Au", "O", "G"], correct: 1, feedback: "O símbolo do ouro é Au." },
    { question: "O que é mitose?", answers: ["Divisão celular", "Digestão", "Respiração", "Reprodução"], correct: 0, feedback: "Mitose é a divisão celular que gera duas células iguais." },
    { question: "Qual é o maior osso do corpo humano?", answers: ["Fêmur", "Tíbia", "Úmero", "Costela"], correct: 0, feedback: "O fêmur é o maior osso do corpo humano." },
    { question: "A água ferve a quantos graus Celsius?", answers: ["50", "100", "150", "200"], correct: 1, feedback: "A água ferve a 100°C ao nível do mar." },
    { question: "Quem pintou a Mona Lisa?", answers: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"], correct: 1, feedback: "Leonardo da Vinci pintou a Mona Lisa." },
    { question: "Qual planeta é conhecido como planeta vermelho?", answers: ["Vênus", "Terra", "Marte", "Júpiter"], correct: 2, feedback: "Marte é chamado de planeta vermelho devido ao óxido de ferro." },
    { question: "Quem escreveu 'Dom Casmurro'?", answers: ["Machado de Assis", "José de Alencar", "Drummond", "Clarice Lispector"], correct: 0, feedback: "Machado de Assis é o autor de 'Dom Casmurro'." },
    { question: "Qual é a raiz quadrada de 144?", answers: ["10", "11", "12", "13"], correct: 2, feedback: "A raiz quadrada de 144 é 12." },
    { question: "Qual continente é o maior?", answers: ["África", "América", "Ásia", "Europa"], correct: 2, feedback: "A Ásia é o maior continente em área." },
    { question: "Qual o principal gás do ar?", answers: ["Oxigênio", "Nitrogênio", "Hélio", "CO₂"], correct: 1, feedback: "O nitrogênio é o gás mais presente na atmosfera (~78%)." },
    { question: "Qual é o autor de 'Os Lusíadas'?", answers: ["Camões", "Pessoa", "Almeida", "Machado"], correct: 0, feedback: "Luís de Camões escreveu 'Os Lusíadas'." },
    { question: "O DNA tem formato de?", answers: ["Espiral dupla", "Círculo", "Quadrado", "Helicóptero"], correct: 0, feedback: "O DNA tem a forma de dupla hélice." },
    { question: "O Sol nasce em qual direção?", answers: ["Norte", "Sul", "Leste", "Oeste"], correct: 2, feedback: "O Sol nasce no Leste." },
    { question: "Qual a capital da França?", answers: ["Berlim", "Madri", "Paris", "Lisboa"], correct: 2, feedback: "Paris é a capital da França." },
    { question: "Quantos cromossomos humanos temos?", answers: ["44", "46", "48", "50"], correct: 1, feedback: "O ser humano possui 46 cromossomos." },
    { question: "Quem foi o primeiro presidente do Brasil?", answers: ["Getúlio Vargas", "Deodoro da Fonseca", "Dom Pedro II", "Lula"], correct: 1, feedback: "Deodoro da Fonseca foi o primeiro presidente do Brasil." },
    { question: "Qual elemento químico é H₂O?", answers: ["Água", "Oxigênio", "Hidrogênio", "Ácido"], correct: 0, feedback: "H₂O é a fórmula química da água." },
    { question: "O que mede a Escala Richter?", answers: ["Vento", "Terremotos", "Temperatura", "Velocidade"], correct: 1, feedback: "A Escala Richter mede a magnitude de terremotos." },
    { question: "Quem descobriu a gravidade?", answers: ["Einstein", "Newton", "Galileu", "Curie"], correct: 1, feedback: "Isaac Newton descobriu a gravidade ao observar a maçã cair." }
  ],

  Faculdade: [
    { question: "O que é Big O em algoritmos?", answers: ["Complexidade", "Memória", "Código", "Interface"], correct: 0, feedback: "Big O indica a complexidade de um algoritmo." },
    { question: "Quem criou o modelo atômico atual?", answers: ["Bohr", "Rutherford", "Schrödinger", "Dalton"], correct: 2, feedback: "Schrödinger propôs o modelo quântico do átomo." },
    { question: "O que significa HTTP?", answers: ["HyperText Transfer Protocol", "Hyper Tool Transfer Port", "Host Transfer Type Protocol", "Nenhuma"], correct: 0, feedback: "HTTP é o protocolo de transferência de hipertexto usado na web." },
    { question: "O que é um array?", answers: ["Lista de valores", "Loop", "Variável simples", "Função"], correct: 0, feedback: "Array é uma lista de valores indexados." },
    { question: "O que é SQL?", answers: ["Linguagem de consulta", "Banco de dados", "Servidor", "Sistema operacional"], correct: 0, feedback: "SQL é uma linguagem de consulta para bancos de dados." },
    { question: "Qual planeta tem mais luas?", answers: ["Saturno", "Júpiter", "Marte", "Urano"], correct: 1, feedback: "Júpiter possui mais de 90 luas conhecidas." },
    { question: "Quem propôs o cálculo diferencial?", answers: ["Leibniz", "Descartes", "Pascal", "Gauss"], correct: 0, feedback: "Gottfried Leibniz propôs o cálculo diferencial." },
    { question: "O que é machine learning?", answers: ["Aprendizado de máquina", "Engenharia civil", "Design gráfico", "Arte digital"], correct: 0, feedback: "Machine Learning é aprendizado de máquina, ensinando computadores a aprender." },
    { question: "Qual linguagem é usada no Arduino?", answers: ["Python", "C++", "Java", "Ruby"], correct: 1, feedback: "O Arduino usa principalmente C++." },
    { question: "Quem escreveu 'A República'?", answers: ["Platão", "Aristóteles", "Sócrates", "Descartes"], correct: 0, feedback: "Platão é o autor de 'A República'." },
    { question: "O que faz uma função recursiva?", answers: ["Chama a si mesma", "Chama outra função", "Repete um laço", "Calcula médias"], correct: 0, feedback: "Função recursiva chama a si mesma para resolver problemas." },
    { question: "O que é JSON?", answers: ["Formato de dados", "Protocolo", "Servidor", "Classe"], correct: 0, feedback: "JSON é um formato de dados leve usado para troca de informações." },
    { question: "Quem desenvolveu o C?", answers: ["Dennis Ritchie", "Bjarne Stroustrup", "James Gosling", "Linus Torvalds"], correct: 0, feedback: "Dennis Ritchie criou a linguagem C." },
    { question: "Qual unidade é usada em frequência?", answers: ["Hertz", "Joule", "Newton", "Watt"], correct: 0, feedback: "A frequência é medida em Hertz (Hz)."} ,
    { question: "Qual é o maior número primo abaixo de 20?", answers: ["19", "17", "13", "11"], correct: 0, feedback: "O maior número primo menor que 20 é 19." },
    { question: "O que significa IA?", answers: ["Inteligência Artificial", "Interface Automática", "Instrução Avançada", "Informação Ativa"], correct: 0, feedback: "IA significa Inteligência Artificial." },
    { question: "Qual a fórmula da velocidade média?", answers: ["v = Δs/Δt", "v = m*a", "v = E/t", "v = F*d"], correct: 0, feedback: "Velocidade média é distância dividida pelo tempo." },
    { question: "Quem descobriu os elétrons?", answers: ["Thomson", "Bohr", "Einstein", "Planck"], correct: 0, feedback: "J.J. Thomson descobriu os elétrons." },
    { question: "Qual é a camada mais externa da Terra?", answers: ["Crosta", "Manto", "Núcleo", "Litosfera"], correct: 0, feedback: "A crosta é a camada externa da Terra." },
    { question: "O que é API?", answers: ["Interface de Programação", "Protocolo de Internet", "Banco de Dados", "Função lógica"], correct: 0, feedback: "API é Interface de Programação de Aplicações." }
  ]
};

// --- Contador de streak ---
streakDisplay.id = "streak-display";
streakDisplay.textContent = "🔥 Acertos seguidos: 0";
quizContainer.appendChild(streakDisplay);

// --- Barra de progresso ---
const progressBar = document.createElement("div");
progressBar.className = "progress-bar";
const progressFill = document.createElement("div");
progressFill.className = "progress-fill";
progressBar.appendChild(progressFill);
quizContainer.insertBefore(progressBar, questionElement);

// === CONQUISTAS ===
function showAchievement(message) {
  const toast = document.createElement("div");
  toast.className = "achievement-toast";
  toast.innerHTML = `🏆 ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = "slideOut 0.5s forwards";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// === EMBARALHAR ===
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// === INICIAR ===
function startGame() {
  const playerName = playerNameInput.value.trim();
  if (!playerName) {
    alert("Digite seu nome antes de começar!");
    return;
  }

  selectedLevel = nivelSelect.value;
  shuffledQuestions = shuffle(questions[selectedLevel]).slice(0, totalQuestions);
  currentQuestionIndex = 0;
  score = 0;
  correctStreak = 0;
  answered = false;

  timeAtStart =
    selectedLevel === "Fundamental" ? 45 :
    selectedLevel === "Médio" ? 30 : 20;

  startContainer.classList.remove("active");
  rankingContainer.classList.remove("active");
  quizContainer.classList.add("active");

  scoreCounter.textContent = `Pontos: ${score}`;
  streakDisplay.textContent = `🔥 Acertos seguidos: ${correctStreak}`;
  showQuestion();
}

// === MOSTRAR PERGUNTA ===
function showQuestion() {
  clearInterval(timer);
  answered = false;
  timeLeft = timeAtStart;
  timeDisplay.textContent = timeLeft;
  updateTimerColor();

  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    updateTimerColor();
    if (timeLeft <= 0) {
      clearInterval(timer);
      revealCorrect();
      nextButton.classList.remove("hidden");
      answered = true;
    }
  }, 1000);

  const q = shuffledQuestions[currentQuestionIndex];
  if (!q) {
    endGame();
    return;
  }

  questionElement.textContent = q.question;
  answerButtons.innerHTML = "";

  const pairs = q.answers.map((text, idx) => ({ text, idx }));
  const shuffledPairs = shuffle(pairs);

  shuffledPairs.forEach((p) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = p.text;
    btn.addEventListener("click", () => {
      if (answered) return;
      handleAnswerSelection(p.idx, btn);
    });
    answerButtons.appendChild(btn);
  });

  nextButton.classList.add("hidden");
  scoreCounter.textContent = `Pontos: ${score}`;
  updateProgress();
}

// === SELEÇÃO DE RESPOSTA ===
function handleAnswerSelection(originalIndex, clickedBtn) {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  const q = shuffledQuestions[currentQuestionIndex];
  const correctIndex = q.correct;
  const btns = Array.from(answerButtons.children);

  btns.forEach((btn) => {
    const idx = q.answers.indexOf(btn.textContent);
    if (idx === correctIndex) btn.classList.add("correct");
    else if (idx === originalIndex && idx !== correctIndex)
      btn.classList.add("wrong");
    btn.disabled = true;
  });

  const feedback = document.createElement("p");
  feedback.className = "feedback";
  feedback.textContent = q.feedback || "Boa tentativa!";
  questionElement.appendChild(feedback);

  if (originalIndex === correctIndex) {
    let basePoints =
      selectedLevel === "Fundamental" ? 10 :
      selectedLevel === "Médio" ? 15 : 20;
    score += basePoints + timeLeft;
    correctStreak++;

    if (correctStreak === 5) showAchievement("🔥 5 acertos seguidos!");
    if (correctStreak === 10) showAchievement("💥 10 acertos seguidos!");
    if (correctStreak === shuffledQuestions.length) showAchievement("🏆 Acertou todas!");
  } else {
    let penalty = 5 + correctStreak * 2;
    score = Math.max(score - penalty, 0);
    correctStreak = 0;
  }

  streakDisplay.textContent = `🔥 Acertos seguidos: ${correctStreak}`;
  scoreCounter.textContent = `Pontos: ${score}`;
  nextButton.classList.remove("hidden");
}

// === REVELAR CORRETA ===
function revealCorrect() {
  const q = shuffledQuestions[currentQuestionIndex];
  Array.from(answerButtons.children).forEach((btn) => {
    const idx = q.answers.indexOf(btn.textContent);
    if (idx === q.correct) btn.classList.add("correct");
    btn.disabled = true;
  });
}

// === PRÓXIMA ===
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) showQuestion();
  else endGame();
});

// === FINAL ===
function endGame() {
  clearInterval(timer);
  quizContainer.classList.remove("active");

  const percent = Math.round((score / (totalQuestions * 30)) * 100);
  alert(`${playerNameInput.value}, parabéns! 🎉\nVocê fez ${score} pontos!\nAproveitamento: ${percent}%`);

  saveRanking();
  showRanking();
}

// === SALVAR RANKING TOP 3 POR NÍVEL ===
function saveRanking() {
  const name = playerNameInput.value.trim() || "Jogador";
  const key = `ranking_${selectedLevel}`;
  let data = JSON.parse(localStorage.getItem(key) || "[]");
  const existingIndex = data.findIndex(entry => entry.name === name);
  if (existingIndex >= 0) {
    if (score > data[existingIndex].score) {
      data[existingIndex].score = score;
      data[existingIndex].date = new Date().toLocaleString();
    }
  } else {
    data.push({ name, score, date: new Date().toLocaleString() });
  }
  data.sort((a, b) => b.score - a.score);
  localStorage.setItem(key, JSON.stringify(data.slice(0, 3)));
}

// === MOSTRAR RANKING TOP 3 ===
function showRanking() {
  rankingContainer.classList.add("active");
  startContainer.classList.remove("active");
  quizContainer.classList.remove("active");
  rankingList.innerHTML = "";

  ["Fundamental", "Médio", "Faculdade"].forEach(level => {
    const key = `ranking_${level}`;
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    const li = document.createElement("li");
    li.innerHTML = `<strong>${level}:</strong><br>`;
    if (data.length === 0) li.innerHTML += "Nenhum ranking ainda.";
    else {
      data.forEach((entry, i) => {
        let medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "";
        li.innerHTML += `${medal} ${entry.name}: ${entry.score} pts (${entry.date})<br>`;
      });
    }
    rankingList.appendChild(li);
  });
}

// === BARRA DE TEMPO COLORIDA ===
function updateTimerColor() {
  if (timeLeft > timeAtStart * 0.6) timeDisplay.style.color = "limegreen";
  else if (timeLeft > timeAtStart * 0.3) timeDisplay.style.color = "gold";
  else timeDisplay.style.color = "red";
}

// === PROGRESSO ===
function updateProgress() {
  const pct = Math.round((currentQuestionIndex / (shuffledQuestions.length || totalQuestions)) * 100);
  progressFill.style.width = `${pct}%`;
}

// === REINICIAR ===
function restartQuiz() {
  quizContainer.classList.remove("active");
  startContainer.classList.add("active");
}
document.getElementById("restart-btn")?.addEventListener("click", restartQuiz);

// === BOTÕES ===
startBtn.addEventListener("click", startGame);
viewRankingBtn.addEventListener("click", showRanking);
backBtn.addEventListener("click", () => {
  rankingContainer.classList.remove("active");
  startContainer.classList.add("active");
});

// === TEMA CLARO/ESCURO ===
const themeToggle = document.createElement("button");
themeToggle.id = "theme-toggle";
themeToggle.textContent = "🌙";
themeToggle.className = "theme-toggle";
document.body.appendChild(themeToggle);
themeToggle.onclick = () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
};
