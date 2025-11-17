(() => {
 
  const SECRET_NAME = "PRO_JAMILLO098";
  const COMBO_THRESHOLDS = { 
    x2: 2,
    x3: 1.2,
    x4: 0.6
  };
  const MAX_HISTORY = 200; 
  const MAX_TOP = 3;

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
  let comboLevel = 0;
  let lastQuestionTimestamp = 0;
  let questionStartTimestamp = 0;
  let playerName = "";
  let gameHistoryEntry = null; 
  

  
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
  const restartBtn = document.getElementById("restart-btn");

  // displays
  const streakDisplay = document.createElement("div");
  streakDisplay.id = "streak-display";
  streakDisplay.textContent = "🔥 Acertos seguidos: 0";
  const comboDisplay = document.createElement("div");
  comboDisplay.id = "combo-display";
  comboDisplay.textContent = ""; 
  
  const achievementsDisplay = document.createElement("div");
  achievementsDisplay.id = "achievements-display";
  achievementsDisplay.style.minHeight = "18px";


  if (quizContainer && !quizContainer.querySelector("#streak-display")) {
    quizContainer.appendChild(streakDisplay);
    quizContainer.appendChild(comboDisplay);
    quizContainer.appendChild(achievementsDisplay);
  }

  
  const questions = {
    Fundamental: [
      { question: "Quanto é 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1, feedback: "2 + 2 é 4, simples matemática básica.", difficulty: 1 },
      { question: "Qual é a capital do Brasil?", answers: ["São Paulo", "Rio", "Brasília", "Salvador"], correct: 2, feedback: "Brasília é a capital do Brasil desde 1960.", difficulty: 1 },
      { question: "Quantas cores há no semáforo?", answers: ["2", "3", "4", "5"], correct: 1, feedback: "O semáforo possui 3 cores: vermelho, amarelo e verde.", difficulty: 1 },
      { question: "O Sol é uma...", answers: ["Estrela", "Lua", "Galáxia", "Nebulosa"], correct: 0, feedback: "O Sol é uma estrela e a nossa principal fonte de energia.", difficulty: 1 },
      { question: "Quanto é 10 ÷ 2?", answers: ["3", "4", "5", "6"], correct: 2, feedback: "10 dividido por 2 é igual a 5.", difficulty: 1 },
      { question: "Qual animal mia?", answers: ["Cachorro", "Gato", "Pássaro", "Sapo"], correct: 1, feedback: "Gatos são os animais que miam.", difficulty: 1 },
      { question: "Que cor resulta de azul + amarelo?", answers: ["Verde", "Roxo", "Laranja", "Marrom"], correct: 0, feedback: "Azul e amarelo misturados produzem verde.", difficulty: 1 },
      { question: "Quantos dias há em uma semana?", answers: ["5", "6", "7", "8"], correct: 2, feedback: "Uma semana tem 7 dias.", difficulty: 1 },
      { question: "Qual o maior planeta do sistema solar?", answers: ["Terra", "Marte", "Júpiter", "Saturno"], correct: 2, feedback: "Júpiter é o maior planeta do sistema solar.", difficulty: 1 },
      { question: "Quem descobriu o Brasil?", answers: ["Cabral", "Colombo", "Newton", "Einstein"], correct: 0, feedback: "Pedro Álvares Cabral descobriu o Brasil em 1500.", difficulty: 1 },
      { question: "Qual é o plural de 'flor'?", answers: ["flores", "flors", "floris", "flóres"], correct: 0, feedback: "O plural de flor é flores.", difficulty: 1 },
      { question: "Quantas patas tem uma aranha?", answers: ["6", "8", "10", "12"], correct: 1, feedback: "Aranhas possuem 8 patas.", difficulty: 1 },
      { question: "Qual destes é um mamífero?", answers: ["Cobra", "Sapo", "Golfinho", "Peixe"], correct: 2, feedback: "Golfinhos são mamíferos aquáticos.", difficulty: 1 },
      { question: "Qual a cor do céu em dia claro?", answers: ["Azul", "Preto", "Roxo", "Cinza"], correct: 0, feedback: "O céu geralmente é azul em dias claros.", difficulty: 1 },
      { question: "Qual instrumento mede temperatura?", answers: ["Barômetro", "Termômetro", "Anemômetro", "Régua"], correct: 1, feedback: "O termômetro mede a temperatura.", difficulty: 1 },
      { question: "Quantos meses tem um ano?", answers: ["10", "11", "12", "13"], correct: 2, feedback: "O ano possui 12 meses.", difficulty: 1 },
      { question: "Quantos segundos tem um minuto?", answers: ["30", "60", "90", "100"], correct: 1, feedback: "Um minuto possui 60 segundos.", difficulty: 1 },
      { question: "Qual destes é um meio de transporte?", answers: ["Carro", "Casa", "Mesa", "Cadeira"], correct: 0, feedback: "O carro é um meio de transporte.", difficulty: 1 },
      { question: "O que usamos para escrever?", answers: ["Papel", "Caneta", "Tesoura", "Régua"], correct: 1, feedback: "Usamos a caneta para escrever.", difficulty: 1 },
      { question: "Quantos continentes existem?", answers: ["4", "5", "6", "7"], correct: 3, feedback: "Existem 7 continentes na Terra.", difficulty: 1 }
    ],
    Médio: [
      { question: "Quem formulou a Teoria da Relatividade?", answers: ["Einstein", "Newton", "Tesla", "Galileu"], correct: 0, feedback: "Albert Einstein formulou a Teoria da Relatividade.", difficulty: 2 },
      { question: "Qual o símbolo químico do Ouro?", answers: ["Ag", "Au", "O", "G"], correct: 1, feedback: "O símbolo do ouro é Au.", difficulty: 2 },
      { question: "O que é mitose?", answers: ["Divisão celular", "Digestão", "Respiração", "Reprodução"], correct: 0, feedback: "Mitose é a divisão celular que gera duas células iguais.", difficulty: 2 },
      { question: "Qual é o maior osso do corpo humano?", answers: ["Fêmur", "Tíbia", "Úmero", "Costela"], correct: 0, feedback: "O fêmur é o maior osso do corpo humano.", difficulty: 2 },
      { question: "A água ferve a quantos graus Celsius?", answers: ["50", "100", "150", "200"], correct: 1, feedback: "A água ferve a 100°C ao nível do mar.", difficulty: 2 },
      { question: "Quem pintou a Mona Lisa?", answers: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"], correct: 1, feedback: "Leonardo da Vinci pintou a Mona Lisa.", difficulty: 2 },
      { question: "Qual planeta é conhecido como planeta vermelho?", answers: ["Vênus", "Terra", "Marte", "Júpiter"], correct: 2, feedback: "Marte é chamado de planeta vermelho devido ao óxido de ferro.", difficulty: 2 },
      { question: "Quem escreveu 'Dom Casmurro'?", answers: ["Machado de Assis", "José de Alencar", "Drummond", "Clarice Lispector"], correct: 0, feedback: "Machado de Assis é o autor de 'Dom Casmurro'.", difficulty: 2 },
      { question: "Qual é a raiz quadrada de 144?", answers: ["10", "11", "12", "13"], correct: 2, feedback: "A raiz quadrada de 144 é 12.", difficulty: 2 },
      { question: "Qual continente é o maior?", answers: ["África", "América", "Ásia", "Europa"], correct: 2, feedback: "A Ásia é o maior continente em área.", difficulty: 2 },
      { question: "Qual o principal gás do ar?", answers: ["Oxigênio", "Nitrogênio", "Hélio", "CO₂"], correct: 1, feedback: "O nitrogênio é o gás mais presente na atmosfera (~78%).", difficulty: 2 },
      { question: "Qual é o autor de 'Os Lusíadas'?", answers: ["Camões", "Pessoa", "Almeida", "Machado"], correct: 0, feedback: "Luís de Camões escreveu 'Os Lusíadas'.", difficulty: 2 },
      { question: "O DNA tem formato de?", answers: ["Espiral dupla", "Círculo", "Quadrado", "Helicóptero"], correct: 0, feedback: "O DNA tem a forma de dupla hélice.", difficulty: 2 },
      { question: "O Sol nasce em qual direção?", answers: ["Norte", "Sul", "Leste", "Oeste"], correct: 2, feedback: "O Sol nasce no Leste.", difficulty: 2 },
      { question: "Qual a capital da França?", answers: ["Berlim", "Madri", "Paris", "Lisboa"], correct: 2, feedback: "Paris é a capital da França.", difficulty: 2 },
      { question: "Quantos cromossomos humanos temos?", answers: ["44", "46", "48", "50"], correct: 1, feedback: "O ser humano possui 46 cromossomos.", difficulty: 2 },
      { question: "Quem foi o primeiro presidente do Brasil?", answers: ["Getúlio Vargas", "Deodoro da Fonseca", "Dom Pedro II", "Lula"], correct: 1, feedback: "Deodoro da Fonseca foi o primeiro presidente do Brasil.", difficulty: 2 },
      { question: "Qual elemento químico é H₂O?", answers: ["Água", "Oxigênio", "Hidrogênio", "Ácido"], correct: 0, feedback: "H₂O é a fórmula química da água.", difficulty: 2 },
      { question: "O que mede a Escala Richter?", answers: ["Vento", "Terremotos", "Temperatura", "Velocidade"], correct: 1, feedback: "A Escala Richter mede a magnitude de terremotos.", difficulty: 2 },
      { question: "Quem descobriu a gravidade?", answers: ["Einstein", "Newton", "Galileu", "Curie"], correct: 1, feedback: "Isaac Newton descobriu a gravidade ao observar a maçã cair.", difficulty: 2 }
    ],
    Faculdade: [
      { question: "O que é Big O em algoritmos?", answers: ["Complexidade", "Memória", "Código", "Interface"], correct: 0, feedback: "Big O indica a complexidade de um algoritmo.", difficulty: 3 },
      { question: "Quem criou o modelo atômico atual?", answers: ["Bohr", "Rutherford", "Schrödinger", "Dalton"], correct: 2, feedback: "Schrödinger propôs o modelo quântico do átomo.", difficulty: 3 },
      { question: "O que significa HTTP?", answers: ["HyperText Transfer Protocol", "Hyper Tool Transfer Port", "Host Transfer Type Protocol", "Nenhuma"], correct: 0, feedback: "HTTP é o protocolo de transferência de hipertexto usado na web.", difficulty: 3 },
      { question: "O que é um array?", answers: ["Lista de valores", "Loop", "Variável simples", "Função"], correct: 0, feedback: "Array é uma lista de valores indexados.", difficulty: 3 },
      { question: "O que é SQL?", answers: ["Linguagem de consulta", "Banco de dados", "Servidor", "Sistema operacional"], correct: 0, feedback: "SQL é uma linguagem de consulta para bancos de dados.", difficulty: 3 },
      { question: "Qual planeta tem mais luas?", answers: ["Saturno", "Júpiter", "Marte", "Urano"], correct: 1, feedback: "Júpiter possui mais de 90 luas conhecidas.", difficulty: 3 },
      { question: "Quem propôs o cálculo diferencial?", answers: ["Leibniz", "Descartes", "Pascal", "Gauss"], correct: 0, feedback: "Gottfried Leibniz propôs o cálculo diferencial.", difficulty: 3 },
      { question: "O que é machine learning?", answers: ["Aprendizado de máquina", "Engenharia civil", "Design gráfico", "Arte digital"], correct: 0, feedback: "Machine Learning é aprendizado de máquina, ensinando computadores a aprender.", difficulty: 3 },
      { question: "Qual linguagem é usada no Arduino?", answers: ["Python", "C++", "Java", "Ruby"], correct: 1, feedback: "O Arduino usa principalmente C++.", difficulty: 3 },
      { question: "Quem escreveu 'A República'?", answers: ["Platão", "Aristóteles", "Sócrates", "Descartes"], correct: 0, feedback: "Platão é o autor de 'A República'.", difficulty: 3 },
      { question: "O que faz uma função recursiva?", answers: ["Chama a si mesma", "Chama outra função", "Repete um laço", "Calcula médias"], correct: 0, feedback: "Função recursiva chama a si mesma para resolver problemas.", difficulty: 3 },
      { question: "O que é JSON?", answers: ["Formato de dados", "Protocolo", "Servidor", "Classe"], correct: 0, feedback: "JSON é um formato de dados leve usado para troca de informações.", difficulty: 3 },
      { question: "Quem desenvolveu o C?", answers: ["Dennis Ritchie", "Bjarne Stroustrup", "James Gosling", "Linus Torvalds"], correct: 0, feedback: "Dennis Ritchie criou a linguagem C.", difficulty: 3 },
      { question: "Qual unidade é usada em frequência?", answers: ["Hertz", "Joule", "Newton", "Watt"], correct: 0, feedback: "A frequência é medida em Hertz (Hz).", difficulty: 3 },
      { question: "Qual é o maior número primo abaixo de 20?", answers: ["19", "17", "13", "11"], correct: 0, feedback: "O maior número primo menor que 20 é 19.", difficulty: 3 },
      { question: "O que significa IA?", answers: ["Inteligência Artificial", "Interface Automática", "Instrução Avançada", "Informação Ativa"], correct: 0, feedback: "IA significa Inteligência Artificial.", difficulty: 3 },
      { question: "Qual a fórmula da velocidade média?", answers: ["v = Δs/Δt", "v = m*a", "v = E/t", "v = F*d"], correct: 0, feedback: "Velocidade média é distância dividida pelo tempo.", difficulty: 3 },
      { question: "Quem descobriu os elétrons?", answers: ["Thomson", "Bohr", "Einstein", "Planck"], correct: 0, feedback: "J.J. Thomson descobriu os elétrons.", difficulty: 3 },
      { question: "Qual é a camada mais externa da Terra?", answers: ["Crosta", "Manto", "Núcleo", "Litosfera"], correct: 0, feedback: "A crosta é a camada externa da Terra.", difficulty: 3 },
      { question: "O que é API?", answers: ["Interface de Programação", "Protocolo de Internet", "Banco de Dados", "Função lógica"], correct: 0, feedback: "API é Interface de Programação de Aplicações.", difficulty: 3 }
    ]
  };

 
  function saveJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) { console.warn("storage full? ", e); }
  }
  function loadJSON(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch(e) { return fallback; }
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function clearChildren(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  function showAchievementToast(text) {
    const toast = document.createElement("div");
    toast.className = "achievement-toast";
    toast.style.zIndex = 9999;
    toast.textContent = `🏆 ${text}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  
  function getTitleForScore(score) {
 
    if (score >= 9999) return { code: "deus", label: "🟥 DEUS DO QUIZ" };
    if (score >= 1500) return { code: "lenda", label: "🟧 Lenda" };
    if (score >= 1000) return { code: "mestre", label: "🟪 Mestre" };
    if (score >= 100) return { code: "inter", label: "🟦 Intermediário" };
    return { code: "novato", label: "🟩 Novato" };
  }

 
  function saveGameHistory(entry) {
    const hist = loadJSON("quiz_history_v1", []);
    hist.unshift(entry); 
    if (hist.length > MAX_HISTORY) hist.length = MAX_HISTORY;
    saveJSON("quiz_history_v1", hist);
  }

  
  function saveRankingRecords(level, name, score) {

    const key = `ranking_${level}_v1`;
    let data = loadJSON(key, []);
    const existingIndex = data.findIndex(e => e.name === name);
    if (existingIndex >= 0) {
      if (score > data[existingIndex].score) {
        data[existingIndex].score = score;
        data[existingIndex].date = new Date().toLocaleString();
      }
    } else {
      data.push({ name, score, date: new Date().toLocaleString() });
    }
    data.sort((a,b) => b.score - a.score);
    saveJSON(key, data.slice(0, MAX_TOP));


    const worldKey = `ranking_world_v1`;
    let world = loadJSON(worldKey, []);
    const wIdx = world.findIndex(e => e.name === name);
    if (wIdx >= 0) {
      if (score > world[wIdx].score) {
        world[wIdx].score = score;
        world[wIdx].date = new Date().toLocaleString();
        world[wIdx].level = level;
      }
    } else {
      world.push({ name, score, date: new Date().toLocaleString(), level });
    }
    world.sort((a,b) => b.score - a.score);
    saveJSON(worldKey, world);
  }

 
  function awardAchievement(playerName, key, label) {
  
    const achKey = `ach_${playerName}`;
    const ach = loadJSON(achKey, {});
    if (!ach[key]) {
      ach[key] = { label, date: new Date().toLocaleString() };
      saveJSON(achKey, ach);
      showAchievementToast(label);
    }
  }

  function checkPostGameAchievements(entry) {
 
    if (entry.score >= 500) awardAchievement(entry.name, "500pts", "💎 Fez mais de 500 pontos");
    if (entry.maxStreak >= 20) awardAchievement(entry.name, "streak20", "🔥 20 acertos seguidos");

    const doneFund = loadJSON(`completed_${entry.name}_Fundamental`, false);
    const doneMed = loadJSON(`completed_${entry.name}_Médio`, false);
    const doneFac = loadJSON(`completed_${entry.name}_Faculdade`, false);
    if (entry.perfect) saveJSON(`completed_${entry.name}_${entry.level}`, true);
    if (doneFund && doneMed && doneFac) awardAchievement(entry.name, "zerouAll", "📚 ZEROU todos os níveis");
    if (entry.fastestResponse <= 2) awardAchievement(entry.name, "2s", "⚡ Respondeu em menos de 2 segundos");
  }


  function computeTimeForLevel(base, streak) {

    const factor = Math.max(0.4, 1 - (streak * 0.03)); 
    return Math.max(3, Math.round(base * factor)); 
  }

  function computeBasePointsForLevel(level, streak) {
 
    let base =
      level === "Fundamental" ? 10 :
      level === "Médio" ? 15 : 20;
  
    const bonus = Math.floor(streak / 5) * 5;
    return base + bonus;
  }

 
  function checkAndApplyCombo(responseSeconds) {
   
    let newCombo = 0;
    if (responseSeconds <= COMBO_THRESHOLDS.x4) newCombo = 3;
    else if (responseSeconds <= COMBO_THRESHOLDS.x3) newCombo = 2;
    else if (responseSeconds <= COMBO_THRESHOLDS.x2) newCombo = 1;
    else newCombo = 0;

    if (newCombo > 0) {

      comboLevel = Math.max(comboLevel, newCombo);
      showComboVisual(comboLevel);
    } else {
      comboLevel = 0;
      updateComboDisplay("");
    }
    return comboLevel;
  }

  function getComboMultiplier(level) {
    if (level === 3) return 4;
    if (level === 2) return 3;
    if (level === 1) return 2;
    return 1;
  }

  function showComboVisual(level) {
    if (!level) {
      updateComboDisplay("");
      return;
    }
    const txt = `Combo x${getComboMultiplier(level)}!`;
    updateComboDisplay(txt);

    const explosion = document.createElement("div");
    explosion.className = "combo-explosion";
    explosion.style.position = "fixed";
    explosion.style.left = "50%";
    explosion.style.top = "40%";
    explosion.style.transform = "translate(-50%,-50%)";
    explosion.style.pointerEvents = "none";
    explosion.style.zIndex = 9998;
    explosion.style.fontSize = "36px";
    explosion.style.fontWeight = "900";
    explosion.style.color = "#ffd700";
    explosion.textContent = "💥";
    document.body.appendChild(explosion);
    setTimeout(() => explosion.remove(), 600);
  }

  function updateComboDisplay(text) {
    if (comboDisplay) comboDisplay.textContent = text;
  }

  function startGame() {
    playerName = (playerNameInput.value || "").trim();
    if (!playerName) {
      alert("Digite seu nome antes de começar!");
      return;
    }

    selectedLevel = nivelSelect.value || "Fundamental";
   
    shuffledQuestions = shuffle(questions[selectedLevel]).slice(0, totalQuestions);

    currentQuestionIndex = 0;
    score = 0;
    correctStreak = 0;
    comboLevel = 0;
    answered = false;
    lastQuestionTimestamp = 0;
    questionStartTimestamp = Date.now();

    timeAtStart =
      selectedLevel === "Fundamental" ? 45 :
      selectedLevel === "Médio" ? 30 : 20;

    gameHistoryEntry = {
      name: playerName,
      level: selectedLevel,
      startAt: new Date().toLocaleString(),
      score: 0,
      answers: [], 
      maxStreak: 0,
      fastestResponse: Infinity,
      perfect: true 
    };

    startContainer?.classList.remove("active");
    rankingContainer?.classList.remove("active");
    quizContainer?.classList.add("active");

    scoreCounter.textContent = `Pontos: ${score}`;
    streakDisplay.textContent = `🔥 Acertos seguidos: ${correctStreak}`;
    updateComboDisplay("");
    achievementsDisplay.textContent = "";

    showQuestion();
  }

  function showQuestion() {
    clearInterval(timer);
    answered = false;

    timeAtStart = computeTimeForLevel(
      selectedLevel === "Fundamental" ? 45 : selectedLevel === "Médio" ? 30 : 20,
      correctStreak
    );
    timeLeft = timeAtStart;
    timeDisplay.textContent = timeLeft;
    updateTimerColor();

    questionStartTimestamp = Date.now();

    timer = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;
      updateTimerColor();
      if (timeLeft <= 0) {
        clearInterval(timer);
      
        handleAnswerTimeout();
      }
    }, 1000);

    const q = shuffledQuestions[currentQuestionIndex];
    if (!q) {
      endGame();
      return;
    }

    questionElement.textContent = q.question;

    clearChildren(answerButtons);

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

    nextButton?.classList.add("hidden");
    scoreCounter.textContent = `Pontos: ${score}`;
    updateProgress();
  }

  function handleAnswerTimeout() {
    answered = true;
    revealCorrect();

    const q = shuffledQuestions[currentQuestionIndex];
    recordAnswerHistory(q, false, timeAtStart, 0);
    comboLevel = 0;
    correctStreak = 0;
    streakDisplay.textContent = `🔥 Acertos seguidos: ${correctStreak}`;
    nextButton?.classList.remove("hidden");
  }

 
  function recordAnswerHistory(q, wasCorrect, timeTaken, pointsGained) {
    gameHistoryEntry.answers.push({
      question: q.question,
      correct: wasCorrect,
      correctIndex: q.correct,
      chosenAt: new Date().toLocaleString(),
      timeTaken,
      pointsGained
    });
    if (!wasCorrect) gameHistoryEntry.perfect = false;
    if (timeTaken < gameHistoryEntry.fastestResponse) gameHistoryEntry.fastestResponse = timeTaken;
    if (correctStreak > gameHistoryEntry.maxStreak) gameHistoryEntry.maxStreak = correctStreak;
  }


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
      else if (idx === originalIndex && idx !== correctIndex) btn.classList.add("wrong");
      btn.disabled = true;
    });

    const responseSeconds = (Date.now() - questionStartTimestamp) / 1000;

    const newCombo = checkAndApplyCombo(responseSeconds);

 
    const basePoints = computeBasePointsForLevel(selectedLevel, correctStreak);
    let pointsGained = 0;

    if (originalIndex === correctIndex) {
    
      const multiplier = getComboMultiplier(newCombo);
     
      pointsGained = Math.round((basePoints + timeLeft) * multiplier);
      score += pointsGained;
      correctStreak++;
   
      if (correctStreak === 5) awardAchievement(playerName, "streak5", "🔥 5 acertos seguidos!");
      if (correctStreak === 10) awardAchievement(playerName, "streak10", "💥 10 acertos seguidos!");
    } else {
      
      const basePenalty = selectedLevel === "Fundamental" ? 5 : selectedLevel === "Médio" ? 10 : 15;
      const penalty = basePenalty + correctStreak * 2;
      score = Math.max(score - penalty, 0);
      pointsGained = -penalty;
      correctStreak = 0;
      comboLevel = 0;
      updateComboDisplay("");
    }

 
    recordAnswerHistory(q, originalIndex === correctIndex, Math.round(responseSeconds * 100) / 100, pointsGained);

    const feedback = document.createElement("p");
    feedback.className = "feedback";
    feedback.textContent = q.feedback || (originalIndex === correctIndex ? "Correto!" : "Resposta errada.");
    questionElement.appendChild(feedback);

    streakDisplay.textContent = `🔥 Acertos seguidos: ${correctStreak}`;
    scoreCounter.textContent = `Pontos: ${score}`;
    nextButton?.classList.remove("hidden");

    
    lastQuestionTimestamp = Date.now();
  }

 
  function revealCorrect() {
    const q = shuffledQuestions[currentQuestionIndex];
    Array.from(answerButtons.children).forEach((btn) => {
      const idx = q.answers.indexOf(btn.textContent);
      if (idx === q.correct) btn.classList.add("correct");
      btn.disabled = true;
    });
  }


  nextButton?.addEventListener("click", () => {

    const feedback = questionElement.querySelector(".feedback");
    if (feedback) feedback.remove();

    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      showQuestion();
    } else {
      endGame();
    }
  });

 
  function endGame() {
    clearInterval(timer);
    quizContainer?.classList.remove("active");


    gameHistoryEntry.score = score;
    gameHistoryEntry.endAt = new Date().toLocaleString();
    gameHistoryEntry.fastestResponse = gameHistoryEntry.fastestResponse === Infinity ? null : gameHistoryEntry.fastestResponse;
    gameHistoryEntry.maxStreak = gameHistoryEntry.maxStreak || correctStreak;
    gameHistoryEntry.perfect = gameHistoryEntry.perfect || false;

    let finalScoreToSave = score;
    if (playerName === SECRET_NAME) {
      finalScoreToSave = 9999;
      gameHistoryEntry.secretAwarded = true;

      awardAchievement(playerName, "secret", "👑 Segredo Revelado!");
    }

 
    saveGameHistory(Object.assign({}, gameHistoryEntry, { score: finalScoreToSave }));


    saveRankingRecords(selectedLevel, playerName, finalScoreToSave);

   
    if (gameHistoryEntry.perfect) saveJSON(`completed_${playerName}_${selectedLevel}`, true);

    checkPostGameAchievements(Object.assign({}, gameHistoryEntry, { score: finalScoreToSave }));

  
    let msg = `${playerName}, parabéns! 🎉\nVocê fez ${finalScoreToSave} pontos!`;
    if (gameHistoryEntry.secretAwarded) msg += "\n👑 Segredo ativado!";
    alert(msg);


    showRanking();
  }


  function showRanking() {
    rankingContainer?.classList.add("active");
    startContainer?.classList.remove("active");
    quizContainer?.classList.remove("active");
    clearChildren(rankingList);


    ["Fundamental", "Médio", "Faculdade"].forEach(level => {
      const key = `ranking_${level}_v1`;
      const data = loadJSON(key, []);
      const li = document.createElement("li");
      li.innerHTML = `<strong>${level} — Top ${MAX_TOP}:</strong><br>`;
      if (!data.length) {
        li.innerHTML += "Nenhum ranking ainda.";
      } else {
        data.forEach((entry, i) => {
          const title = getTitleForScore(entry.score).label;
          li.innerHTML += `${i+1}. ${entry.name} — ${entry.score} pts <div style="font-size:12px">${title}</div><br>`;
        });
      }
      rankingList.appendChild(li);
    });

    const sep = document.createElement("li");
    sep.innerHTML = `<strong>🏆 Rank Mundial (todos os jogadores):</strong>`;
    rankingList.appendChild(sep);

    const world = loadJSON(`ranking_world_v1`, []);
    if (!world.length) {
      const wli = document.createElement("li");
      wli.textContent = "Nenhum jogador registrado.";
      rankingList.appendChild(wli);
    } else {
      world.forEach((entry, idx) => {
        const li = document.createElement("li");
        const title = getTitleForScore(entry.score).label;
       
        li.innerHTML = `<strong>#${idx+1}</strong> ${entry.name} — ${entry.score} pts <br> <small>${entry.level} • ${entry.date} • ${title}</small>`;
        rankingList.appendChild(li);
      });
    }

    const hist = loadJSON("quiz_history_v1", []);
    if (hist.length) {
      const hli = document.createElement("li");
      hli.innerHTML = `<strong>📜 Histórico recente</strong><br>`;
      hist.slice(0, 6).forEach(h => {
        const title = getTitleForScore(h.score).label;
        hli.innerHTML += `${h.name} (${h.level}) — ${h.score} pts • ${h.endAt || h.startAt} • ${title}<br>`;
      });
      rankingList.appendChild(hli);
    }
  }


  function updateTimerColor() {
    if (!timeDisplay) return;
    if (timeLeft > timeAtStart * 0.6) timeDisplay.style.color = "limegreen";
    else if (timeLeft > timeAtStart * 0.3) timeDisplay.style.color = "gold";
    else timeDisplay.style.color = "red";
  }

  
  let progressBar = document.querySelector(".progress-bar");
  let progressFill = document.querySelector(".progress-fill");
  if (!progressBar && quizContainer) {
    progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressFill = document.createElement("div");
    progressFill.className = "progress-fill";
    progressBar.appendChild(progressFill);
    quizContainer.insertBefore(progressBar, questionElement);
  }

  function updateProgress() {
    if (!progressFill) return;
    const pct = Math.round((currentQuestionIndex / (shuffledQuestions.length || totalQuestions)) * 100);
    progressFill.style.width = `${pct}%`;
  }

 
  function restartQuiz() {
    quizContainer?.classList.remove("active");
    rankingContainer?.classList.remove("active");
    startContainer?.classList.add("active");
  }

  startBtn?.addEventListener("click", startGame);
  viewRankingBtn?.addEventListener("click", showRanking);
  backBtn?.addEventListener("click", () => {
    rankingContainer?.classList.remove("active");
    startContainer?.classList.add("active");
  });
  restartBtn?.addEventListener("click", restartQuiz);

const themeToggle = document.createElement("button");
themeToggle.id = "theme-toggle";
themeToggle.textContent = "🌙";
themeToggle.className = "theme-toggle";
document.body.appendChild(themeToggle);
themeToggle.onclick = () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
};
  
  
  window.quizDebug = {
    loadJSON,
    saveJSON,
    showRanking,
    startGame
  };

  restartQuiz();

})();
