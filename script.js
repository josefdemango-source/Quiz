// ---------------- ELEMENTOS ----------------
const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const rankingContainer = document.getElementById("ranking-container");

const playerNameInput = document.getElementById("player-name");
const nivelSelect = document.getElementById("nivel");
const startBtn = document.getElementById("start-btn");
const viewRankingBtn = document.getElementById("view-ranking");
const backBtn = document.getElementById("back-btn");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreCounter = document.getElementById("score-counter");
const timerDisplay = document.getElementById("time");
const rankingList = document.getElementById("ranking-list");

// ---------------- VARIÁVEIS ----------------
let currentQuestionIndex = 0;
let score = 0;
let playerName = "";
let selectedLevel = "";
let timer;
let timeLeft = 45;
let shuffledQuestions = [];
let timeAtStart = 45;

// ---------------- PERGUNTAS ----------------
const questions = {
  "Fundamental": [
    { question: "Quanto é 5 + 3?", answers: ["6", "7", "8", "9"], correct: 2 },
    { question: "Qual o plural de 'pão'?", answers: ["pãos", "pães", "pões", "paes"], correct: 1 },
    { question: "Qual é o maior planeta do Sistema Solar?", answers: ["Terra", "Júpiter", "Saturno", "Vênus"], correct: 1 },
    { question: "Qual é o oposto de 'alegre'?", answers: ["triste", "feliz", "raivoso", "calmo"], correct: 0 },
    { question: "Em que continente está o Brasil?", answers: ["Europa", "Ásia", "América do Sul", "África"], correct: 2 },
    { question: "Quantos lados tem um triângulo?", answers: ["2", "3", "4", "5"], correct: 1 },
    { question: "Qual é a capital do Brasil?", answers: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"], correct: 1 },
    { question: "Qual animal é conhecido como o rei da selva?", answers: ["Tigre", "Elefante", "Leão", "Gorila"], correct: 2 },
    { question: "Qual é o resultado de 9 x 9?", answers: ["81", "72", "99", "90"], correct: 0 },
    { question: "Qual desses é um mamífero?", answers: ["Sapo", "Tubarão", "Golfinho", "Cobra"], correct: 2 },
    { question: "Quem descobriu o Brasil?", answers: ["Pedro Álvares Cabral", "Dom Pedro I", "Cristóvão Colombo", "Vasco da Gama"], correct: 0 },
    { question: "Quantos segundos tem 1 minuto?", answers: ["30", "60", "100", "90"], correct: 1 },
    { question: "Qual é o menor continente?", answers: ["África", "Oceania", "Europa", "Antártida"], correct: 1 },
    { question: "O que usamos para medir temperatura?", answers: ["Régua", "Balança", "Termômetro", "Relógio"], correct: 2 },
    { question: "O Sol é uma:", answers: ["Estrela", "Lua", "Planeta", "Cometa"], correct: 0 },
    { question: "Quantas cores tem o arco-íris?", answers: ["5", "6", "7", "8"], correct: 2 },
    { question: "Qual é o nome do satélite natural da Terra?", answers: ["Marte", "Lua", "Sol", "Vênus"], correct: 1 },
    { question: "Quantos meses tem um ano?", answers: ["10", "11", "12", "13"], correct: 2 },
    { question: "Quem é o autor de 'O Pequeno Príncipe'?", answers: ["Monteiro Lobato", "Antoine de Saint-Exupéry", "Machado de Assis", "J. K. Rowling"], correct: 1 },
    { question: "Qual desses é um instrumento musical?", answers: ["Tesoura", "Violão", "Panela", "Lápis"], correct: 1 }
  ],
  "Médio": [
    { question: "Quem formulou a Teoria da Relatividade?", answers: ["Einstein", "Newton", "Tesla", "Bohr"], correct: 0 },
    { question: "Qual é o elemento químico representado por 'O'?", answers: ["Ouro", "Oxigênio", "Ósmio", "Ozônio"], correct: 1 },
    { question: "O que é um polígono?", answers: ["Animal", "Forma geométrica", "Número", "Planeta"], correct: 1 },
    { question: "Quem escreveu Dom Casmurro?", answers: ["Machado de Assis", "José de Alencar", "Clarice Lispector", "Drummond"], correct: 0 },
    { question: "Qual a fórmula da água?", answers: ["H2O", "CO2", "NaCl", "O2"], correct: 0 },
    { question: "Em que ano o Brasil foi descoberto?", answers: ["1492", "1500", "1822", "1889"], correct: 1 },
    { question: "Quantos ossos tem o corpo humano?", answers: ["106", "206", "306", "406"], correct: 1 },
    { question: "Qual é o valor de π (pi) aproximado?", answers: ["2,14", "3,14", "4,14", "1,14"], correct: 1 },
    { question: "Quem pintou a Mona Lisa?", answers: ["Michelangelo", "Leonardo da Vinci", "Rafael", "Donatello"], correct: 1 },
    { question: "Qual é a capital da França?", answers: ["Londres", "Paris", "Roma", "Berlim"], correct: 1 },
    { question: "O que significa 'WWW'?", answers: ["World Wide Web", "World Web Work", "Wide World Web", "Web World Work"], correct: 0 },
    { question: "Qual é o símbolo químico do ferro?", answers: ["Ir", "Fe", "Fi", "Fo"], correct: 1 },
    { question: "Quem foi o primeiro imperador do Brasil?", answers: ["Dom Pedro II", "Dom Pedro I", "Getúlio Vargas", "Cabral"], correct: 1 },
    { question: "Qual desses é um gás nobre?", answers: ["Oxigênio", "Argônio", "Hidrogênio", "Nitrogênio"], correct: 1 },
    { question: "Qual desses números é primo?", answers: ["4", "6", "7", "8"], correct: 2 },
    { question: "Qual planeta é conhecido como o Planeta Vermelho?", answers: ["Vênus", "Terra", "Marte", "Netuno"], correct: 2 },
    { question: "O que é fotossíntese?", answers: ["Respiração", "Processo das plantas para obter energia", "Transpiração", "Digestão"], correct: 1 },
    { question: "Quem descobriu a gravidade?", answers: ["Einstein", "Newton", "Galileu", "Pascal"], correct: 1 },
    { question: "Qual é a fórmula da velocidade média?", answers: ["v = t/d", "v = d/t", "v = d + t", "v = d - t"], correct: 1 },
    { question: "Qual é a capital do Japão?", answers: ["Tóquio", "Pequim", "Seul", "Bangcoc"], correct: 0 }
  ],
  "Faculdade": [
    { question: "Qual é o princípio da incerteza de Heisenberg?", answers: ["Não é possível determinar posição e velocidade ao mesmo tempo", "Toda ação tem uma reação", "A energia se conserva", "A matéria é contínua"], correct: 0 },
    { question: "O que é Big O em ciência da computação?", answers: ["Complexidade de algoritmos", "Sistema operacional", "Tipo de dado", "Protocolo de rede"], correct: 0 },
    { question: "Quem propôs a teoria da evolução?", answers: ["Darwin", "Lamarck", "Pasteur", "Einstein"], correct: 0 },
    { question: "Qual linguagem é usada para estilizar páginas web?", answers: ["CSS", "HTML", "Python", "SQL"], correct: 0 },
    { question: "O que significa 'HTTP'?", answers: ["HyperText Transfer Protocol", "High Text Type Program", "Host Transfer Table Process", "Nenhuma das anteriores"], correct: 0 },
    { question: "O que é machine learning?", answers: ["Aprendizado de máquina", "Programação manual", "Inteligência artificial fixa", "Banco de dados"], correct: 0 },
    { question: "Quem criou o modelo atômico moderno?", answers: ["Bohr", "Rutherford", "Dalton", "Thomson"], correct: 1 },
    { question: "Em que ano ocorreu a Revolução Francesa?", answers: ["1789", "1804", "1776", "1815"], correct: 0 },
    { question: "O que é um algoritmo?", answers: ["Sequência de instruções", "Equação matemática", "Dispositivo eletrônico", "Sistema nervoso"], correct: 0 },
    { question: "Qual a unidade básica da vida?", answers: ["Átomo", "Célula", "Molécula", "Tecido"], correct: 1 },
    { question: "Quem desenvolveu o cálculo diferencial?", answers: ["Newton e Leibniz", "Einstein e Bohr", "Pascal e Fermat", "Gauss e Euler"], correct: 0 },
    { question: "O que faz a camada de transporte do modelo OSI?", answers: ["Gerencia conexões e dados", "Define endereços IP", "Envia pacotes físicos", "Faz cache de dados"], correct: 0 },
    { question: "Qual é o principal gás do efeito estufa?", answers: ["CO2", "O2", "N2", "H2"], correct: 0 },
    { question: "Qual é o teorema de Pitágoras?", answers: ["a² + b² = c²", "E = mc²", "F = ma", "PV = nRT"], correct: 0 },
    { question: "Quem escreveu 'O Príncipe'?", answers: ["Maquiavel", "Platão", "Sócrates", "Aristóteles"], correct: 0 },
    { question: "O que significa RAM?", answers: ["Random Access Memory", "Read All Memory", "Rapid Access Machine", "Run Active Memory"], correct: 0 },
    { question: "Qual é a unidade de medida de energia?", answers: ["Joule", "Watt", "Newton", "Pascal"], correct: 0 },
    { question: "O que é uma API?", answers: ["Interface de Programação de Aplicações", "Banco de Dados", "Hardware", "Sistema Operacional"], correct: 0 },
    { question: "Quem criou o primeiro computador programável?", answers: ["Alan Turing", "Bill Gates", "Steve Jobs", "Charles Babbage"], correct: 3 },
    { question: "O que é entropia?", answers: ["Medida de desordem de um sistema", "Energia potencial", "Força de atração", "Pressão de um gás"], correct: 0 }
  ]
};

// ---------------- FUNÇÕES ----------------
function startGame() {
  playerName = playerNameInput.value.trim();
  selectedLevel = nivelSelect.value;

  if (playerName === "") {
    alert("Digite seu nome!");
    return;
  }

  shuffledQuestions = [...questions[selectedLevel]];
  currentQuestionIndex = 0;
  score = 0;

  startContainer.classList.remove("active");
  quizContainer.classList.add("active");

  showQuestion();
}

function showQuestion() {
  resetState();

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  currentQuestion.answers.forEach((ans, i) => {
    const button = document.createElement("button");
    button.textContent = ans;
    button.onclick = () => selectAnswer(i);
    answerButtons.appendChild(button);
  });

  scoreCounter.textContent = `Pontos: ${score}`;
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
  clearInterval(timer);
  timeLeft = 45;
  timeAtStart = 45;
  timerDisplay.textContent = timeLeft;
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextButton.style.display = "block";
    }
  }, 1500); // tempo mais lento
}

function selectAnswer(index) {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const correct = currentQuestion.correct;

  clearInterval(timer);

  if (index === correct) {
    const pontosGanhos = 10 + timeLeft;
    score += pontosGanhos;
  }

  Array.from(answerButtons.children).forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.style.background = "#16a34a";
    else btn.style.background = "#dc2626";
  });

  nextButton.style.display = "block";
}

function handleNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) showQuestion();
  else endGame();
}

function endGame() {
  resetState();
  questionElement.textContent = `${playerName}, você fez ${score} pontos! 🎯`;
  saveRanking(playerName, selectedLevel, score);

  nextButton.textContent = "Voltar ao início";
  nextButton.style.display = "block";
  nextButton.onclick = () => {
    quizContainer.classList.remove("active");
    startContainer.classList.add("active");
    nextButton.textContent = "Próxima";
    nextButton.onclick = handleNext;
    showRanking();
  };
}

function saveRanking(name, level, score) {
  const key = `ranking_${level}`;
  const data = JSON.parse(localStorage.getItem(key)) || [];
  data.push({ name, score });
  data.sort((a, b) => b.score - a.score);
  localStorage.setItem(key, JSON.stringify(data.slice(0, 5)));
}

function showRanking() {
  rankingList.innerHTML = "";
  ["Fundamental", "Médio", "Faculdade"].forEach(level => {
    const rank = JSON.parse(localStorage.getItem(`ranking_${level}`)) || [];
    const title = document.createElement("h3");
    title.textContent = level;
    rankingList.appendChild(title);

    if (rank.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Sem pontuações ainda";
      rankingList.appendChild(li);
    } else {
      rank.forEach((r, i) => {
        const li = document.createElement("li");
        li.textContent = `${i + 1}º — ${r.name}: ${r.score} pontos`;
        rankingList.appendChild(li);
      });
    }
  });
}

// ---------------- EVENTOS ----------------
nextButton.onclick = handleNext;
startBtn.onclick = startGame;
viewRankingBtn.onclick = () => {
  startContainer.classList.remove("active");
  rankingContainer.classList.add("active");
  showRanking();
};
backBtn.onclick = () => {
  rankingContainer.classList.remove("active");
  startContainer.classList.add("active");
};
