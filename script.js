const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");

const questionNumber = document.getElementById("questionNumber");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");

const characterTitle = document.getElementById("characterTitle");
const statsContainer = document.getElementById("stats");

let currentQuestion = 0;

const stats = {
    gaming: 50,
    music: 50,
    social: 50,
    impulsive: 50,
    creative: 50,
    luck: 50,
    energy: 50
};

const questions = [
    {
        question: "Hvad laver du helst en fredag aften?",
        answers: [
            { text: "🎮 Gamer", stats: { gaming: 15 } },
            { text: "👥 Er sammen med venner", stats: { social: 15 } },
            { text: "🎵 Hører musik", stats: { music: 15 } },
            { text: "🛋️ Chiller derhjemme", stats: { energy: 10 } },
            { text: "🚲 Tager ud og laver noget", stats: { energy: 15, impulsive: 5 } }
        ]
    },
    {
        question: "Du får 1.000 kr. Hvad gør du?",
        answers: [
            { text: "💰 Gemmer næsten det hele", stats: { luck: 5 } },
            { text: "🛍️ Køber noget, jeg har ønsket mig", stats: { impulsive: 10 } },
            { text: "🎮 Køber noget til gaming", stats: { gaming: 10 } },
            { text: "👥 Bruger dem sammen med venner", stats: { social: 10 } },
            { text: "🤷 Aner det ikke – jeg finder ud af det", stats: { impulsive: 15 } }
        ]
    },
    {
        question: "Hvordan har du det med nye mennesker?",
        answers: [
            { text: "😎 Jeg snakker bare med dem", stats: { social: 15 } },
            { text: "🙂 Det kommer an på personen", stats: { social: 5 } },
            { text: "😶 Jeg siger ikke så meget", stats: { social: -10 } },
            { text: "😂 Jeg laver en joke og ser hvad der sker", stats: { social: 10, impulsive: 5 } }
        ]
    },
    {
        question: "Du har en hel dag uden planer. Hvad sker der?",
        answers: [
            { text: "🎮 Gaming hele dagen", stats: { gaming: 15, energy: -5 } },
            { text: "🎵 Musik og afslapning", stats: { music: 15, energy: 5 } },
            { text: "🚲 Jeg finder på noget at lave", stats: { energy: 15, impulsive: 10 } },
            { text: "👥 Jeg skriver til nogen", stats: { social: 15 } },
            { text: "😴 Jeg laver absolut ingenting", stats: { energy: 15 } }
        ]
    },
    {
        question: "Du får en idé midt om natten. Hvad gør du?",
        answers: [
            { text: "💡 Skriver den ned med det samme", stats: { creative: 15 } },
            { text: "🚀 Går i gang med den", stats: { creative: 10, impulsive: 10 } },
            { text: "😴 Glemmer den og sover", stats: { energy: 10 } },
            { text: "👥 Sender den til en ven", stats: { social: 10, creative: 5 } }
        ]
    },
    {
        question: "Hvordan vil du beskrive dit held?",
        answers: [
            { text: "🍀 Jeg er absurd heldig", stats: { luck: 20 } },
            { text: "🙂 Jeg er normalt ret heldig", stats: { luck: 10 } },
            { text: "😐 Helt gennemsnitlig", stats: { luck: 0 } },
            { text: "💀 Jeg taber altid", stats: { luck: -15 } }
        ]
    },
    {
        question: "Hvad gør du, hvis dine venner foreslår noget helt spontant?",
        answers: [
            { text: "🔥 JA. Lad os gøre det", stats: { impulsive: 20 } },
            { text: "😎 Hvis det lyder sjovt", stats: { impulsive: 10 } },
            { text: "🤔 Jeg skal lige tænke", stats: { impulsive: -5 } },
            { text: "🛋️ Nej tak, jeg bliver hjemme", stats: { energy: 10, impulsive: -10 } }
        ]
    },
    {
        question: "Hvad betyder mest for dig?",
        answers: [
            { text: "🏆 At være god til det, jeg laver", stats: { gaming: 5, creative: 10 } },
            { text: "👥 Mine venner og gode oplevelser", stats: { social: 15 } },
            { text: "🎵 At have en god vibe", stats: { music: 15, energy: 5 } },
            { text: "🚀 At prøve nye ting", stats: { impulsive: 10, creative: 10 } },
            { text: "😌 Bare at have det godt", stats: { energy: 15 } }
        ]
    }
];

startButton.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
});

function showQuestion() {
    const question = questions[currentQuestion];

    questionNumber.textContent =
        `SPØRGSMÅL ${currentQuestion + 1} / ${questions.length}`;

    const progress = Math.round(
        (currentQuestion / questions.length) * 100
    );

    progressText.textContent = `${progress}%`;
    progressBar.style.width = `${progress}%`;

    questionText.textContent = question.question;

    answersContainer.innerHTML = "";

    question.answers.forEach((answer) => {
        const button = document.createElement("button");

        button.textContent = answer.text;

        button.addEventListener("click", () => {
            chooseAnswer(answer);
        });

        answersContainer.appendChild(button);
    });
}

function chooseAnswer(answer) {
    for (const stat in answer.stats) {
        stats[stat] += answer.stats[stat];
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    progressText.textContent = "100%";
    progressBar.style.width = "100%";

    characterTitle.textContent = getCharacterTitle();

    statsContainer.innerHTML = "";

    const statNames = {
        gaming: "🎮 Gaming",
        music: "🎵 Musik",
        social: "👥 Social",
        impulsive: "🚀 Impulsiv",
        creative: "🧠 Kreativitet",
        luck: "🍀 Held",
        energy: "⚡ Energi"
    };

    for (const stat in stats) {
        const statElement = document.createElement("div");

        statElement.classList.add("stat");

        statElement.innerHTML = `
            <span class="stat-name">${statNames[stat]}</span>
            <span class="stat-value">${clamp(stats[stat])}/100</span>
        `;

        statsContainer.appendChild(statElement);
    }
}

function getCharacterTitle() {
    const highestStat = Object.keys(stats).reduce((highest, stat) => {
        return stats[stat] > stats[highest] ? stat : highest;
    });

    const titles = {
        gaming: "🎮 Den Digitale Overlever",
        music: "🎵 Playlist-professoren",
        social: "👥 Den Sociale Legende",
        impulsive: "🚀 Den Dårlige Indflydelse",
        creative: "🧠 Den Kreative Hjerne",
        luck: "🍀 Den Uforskammet Heldige",
        energy: "⚡ Den Rastløse"
    };

    return titles[highestStat];
}

function clamp(value) {
    return Math.max(0, Math.min(100, value));
}

const gameScreen = document.getElementById("gameScreen");

const dayNumber = document.getElementById("dayNumber");
const moneyDisplay = document.getElementById("money");
const moodDisplay = document.getElementById("mood");
const energyDisplay = document.getElementById("energy");
const luckDisplay = document.getElementById("luck");

const eventTitle = document.getElementById("eventTitle");
const eventDescription = document.getElementById("eventDescription");
const eventChoices = document.getElementById("eventChoices");

let gameState = {
    day: 1,
    money: 500,
    mood: 50,
    energy: 50,
    luck: clamp(stats.luck)
};

continueButton.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    showEvent();
});

function updateGameStats() {
    dayNumber.textContent = `DAG ${gameState.day}`;
    moneyDisplay.textContent = gameState.money;
    moodDisplay.textContent = clamp(gameState.mood);
    energyDisplay.textContent = clamp(gameState.energy);
    luckDisplay.textContent = clamp(gameState.luck);
}

function showEvent() {
    updateGameStats();

    eventChoices.innerHTML = "";

    const choices = [
        {
            text: "🎮 Spil CS2",
            effect: {
                mood: 15,
                energy: -10
            }
        },
        {
            text: "🎵 Sæt musik på og chill",
            effect: {
                mood: 10,
                energy: 10
            }
        },
        {
            text: "🚲 Tag ud på cyklen",
            effect: {
                mood: 15,
                energy: -5
            }
        },
        {
            text: "👥 Skriv til en ven",
            effect: {
                mood: 10,
                energy: 0
            }
        },
        {
            text: "🛋️ Bliv liggende",
            effect: {
                mood: 5,
                energy: 15
            }
        }
    ];

    choices.forEach((choice) => {
        const button = document.createElement("button");

        button.textContent = choice.text;

        button.addEventListener("click", () => {
            makeChoice(choice);
        });

        eventChoices.appendChild(button);
    });
}

function makeChoice(choice) {
    gameState.mood += choice.effect.mood;
    gameState.energy += choice.effect.energy;

    gameState.mood = clamp(gameState.mood);
    gameState.energy = clamp(gameState.energy);

    gameState.day++;

    showNextDay();
}

function showNextDay() {
    eventChoices.innerHTML = "";

    eventTitle.textContent = `Dag ${gameState.day} begynder...`;

    eventDescription.textContent =
        "Du vågner op og aner ikke, hvad dagen har i vente.";

    const button = document.createElement("button");

    button.textContent = "FORTSÆT";

    button.addEventListener("click", () => {
        showEvent();
    });

    eventChoices.appendChild(button);

    updateGameStats();
}