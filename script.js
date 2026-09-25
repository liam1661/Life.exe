const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const gameScreen = document.getElementById("gameScreen");

const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");

const questionNumber = document.getElementById("questionNumber");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");

const characterTitle = document.getElementById("characterTitle");
const statsContainer = document.getElementById("stats");

const dayNumber = document.getElementById("dayNumber");
const moneyDisplay = document.getElementById("money");
const moodDisplay = document.getElementById("mood");
const energyDisplay = document.getElementById("energy");

const luckDisplay = document.getElementById("luck");
const eventTitle = document.getElementById("eventTitle");
const eventDescription = document.getElementById("eventDescription");
const eventChoices = document.getElementById("eventChoices");

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


/* =========================
   START QUIZ
========================= */

startButton.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
});


/* =========================
   QUIZ
========================= */

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


/* =========================
   CHARACTER RESULT
========================= */

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


/* =========================
   GAME STATE
========================= */

let gameState = {
    day: 1,
    money: 500,
    mood: 50,
    energy: clamp(stats.energy),
    luck: clamp(stats.luck),

    gaming: clamp(stats.gaming),
    music: clamp(stats.music),
    social: clamp(stats.social),
    impulsive: clamp(stats.impulsive),
    creative: clamp(stats.creative),

    flags: [],
    usedEvents: []
};


/* =========================
   EVENTS
========================= */

const events = [

    {
        id: "lost_money",
        title: "💸 Du mister dine penge",
        description:
            "Du går ned ad gaden og opdager pludselig, at din pung ikke er i lommen.",
        choices: [
            {
                text: "🔍 Gå tilbage og lede",
                effects: { energy: -10, mood: -5 },
                chance: 0.6,
                success: {
                    text: "Du finder den! Hvordan fanden havde du overset den?",
                    effects: { mood: 20, luck: 5 }
                },
                fail: {
                    text: "Ingenting. Pungen er væk.",
                    effects: { mood: -15, money: -100 }
                }
            },
            {
                text: "🤷 Accepter det og gå videre",
                effects: { mood: -5, impulsive: 5 }
            },
            {
                text: "📱 Tjek om du har betalt med mobilen",
                effects: { creative: 5, mood: 5 }
            }
        ]
    },

    {
        id: "friend_message",
        title: "📱 Din ven skriver",
        description:
            "Din telefon vibrerer. Din ven spørger, om du vil hænge ud senere.",
        choices: [
            {
                text: "🔥 Selvfølgelig",
                effects: { social: 10, mood: 15, energy: -10 }
            },
            {
                text: "😎 Måske senere",
                effects: { social: 5 }
            },
            {
                text: "🛋️ Nej, jeg bliver hjemme",
                effects: { energy: 10, mood: 5 }
            },
            {
                text: "💀 Svarer ikke",
                effects: { social: -5, mood: -5 }
            }
        ]
    },

    {
        id: "random_200",
        title: "💰 Du finder 200 kr.",
        description:
            "Der ligger en 200-kroneseddel på jorden foran dig. Ingen andre ser ud til at have opdaget den.",
        choices: [
            {
                text: "💰 Tage pengene",
                effects: { money: 200, impulsive: 10, luck: 5 },
                flag: "found_money"
            },
            {
                text: "👮 Aflevere dem",
                effects: { mood: 10, social: 5 },
                flag: "returned_money"
            },
            {
                text: "🚶 Gå videre",
                effects: { mood: 2 }
            },
            {
                text: "👀 Vente lidt og se om nogen leder efter dem",
                effects: { creative: 5, energy: -5 }
            }
        ]
    },

    {
        id: "gaming",
        title: "🎮 Du får lyst til at game",
        description:
            "Du har egentlig andre ting, du burde lave. Men CS2 starter næsten af sig selv.",
        choices: [
            {
                text: "🎮 Spil et par games",
                effects: { gaming: 10, mood: 15, energy: -15 }
            },
            {
                text: "🏆 Gå all-in og grind",
                effects: { gaming: 20, mood: 5, energy: -25 }
            },
            {
                text: "❌ Lad være",
                effects: { energy: 5 }
            },
            {
                text: "📱 Se highlights i stedet",
                effects: { gaming: 5, mood: 5, energy: -5 }
            }
        ]
    },

    {
        id: "music",
        title: "🎵 Den perfekte sang",
        description:
            "Du finder en sang, du ikke har hørt i lang tid. Den rammer præcis den rigtige vibe.",
        choices: [
            {
                text: "🔊 Skru helt op",
                effects: { music: 15, mood: 20, energy: 5 }
            },
            {
                text: "🎧 Læg dig bare og lyt",
                effects: { music: 10, mood: 15, energy: 10 }
            },
            {
                text: "📱 Lav en ny playlist",
                effects: { music: 15, creative: 10 }
            },
            {
                text: "➡️ Skip",
                effects: { music: -5 }
            }
        ]
    },

    {
        id: "late_night_idea",
        title: "💡 En genial idé",
        description:
            "Klokken er 01:37. Du får pludselig en idé, som du er 100% sikker på kan blive genial.",
        choices: [
            {
                text: "🚀 Gå i gang med det samme",
                effects: { creative: 20, energy: -15 },
                flag: "midnight_creator"
            },
            {
                text: "📝 Skriv idéen ned",
                effects: { creative: 15 }
            },
            {
                text: "😴 Sov videre",
                effects: { energy: 15 }
            },
            {
                text: "📱 Send idéen til en ven",
                effects: { creative: 5, social: 10 }
            }
        ]
    },

    {
        id: "bad_weather",
        title: "🌧️ Vejret er helt elendigt",
        description:
            "Du havde planer om at tage ud. Så begynder det selvfølgelig at regne.",
        choices: [
            {
                text: "🌧️ Gå ud alligevel",
                effects: { mood: 5, energy: -10, impulsive: 10 }
            },
            {
                text: "🛋️ Bliv hjemme",
                effects: { mood: 10, energy: 10 }
            },
            {
                text: "🎮 Perfekt gaming-vejr",
                effects: { gaming: 10, mood: 10 }
            },
            {
                text: "🎵 Musik + regn",
                effects: { music: 10, mood: 15 }
            }
        ]
    },

    {
        id: "random_purchase",
        title: "🛍️ Du ser noget, du virkelig vil have",
        description:
            "Du går forbi en butik og ser noget, du har tænkt på at købe i lang tid.",
        choices: [
            {
                text: "💳 Køb det",
                effects: { money: -150, mood: 20, impulsive: 10 }
            },
            {
                text: "🤔 Vent med at købe det",
                effects: { mood: 2, creative: 5 }
            },
            {
                text: "💀 Køb noget endnu dyrere",
                effects: { money: -300, mood: 25, impulsive: 20 }
            },
            {
                text: "🚶 Gå væk",
                effects: { energy: 5 }
            }
        ]
    },

    {
        id: "sleep",
        title: "😴 Du er helt færdig",
        description:
            "Du kan mærke, at du næsten ikke har mere energi tilbage.",
        choices: [
            {
                text: "🛌 Gå tidligt i seng",
                effects: { energy: 25, mood: 10 }
            },
            {
                text: "🎮 Bare ét game mere",
                effects: { gaming: 5, energy: -15, mood: 5 }
            },
            {
                text: "📱 Scrolle lidt",
                effects: { energy: -5, mood: 5 }
            },
            {
                text: "☕ Finde noget at lave",
                effects: { energy: -10, mood: 10, impulsive: 5 }
            }
        ]
    },

    {
        id: "challenge",
        title: "🔥 En udfordring",
        description:
            "En ven udfordrer dig til noget, du aldrig har prøvet før.",
        choices: [
            {
                text: "🔥 JA",
                effects: { mood: 20, impulsive: 20, energy: -10 }
            },
            {
                text: "🤔 Hvad går det ud på?",
                effects: { creative: 5, social: 5 }
            },
            {
                text: "😐 Nej tak",
                effects: { energy: 5 }
            },
            {
                text: "😂 Udfordr ham tilbage",
                effects: { social: 10, impulsive: 15 }
            }
        ]
    },

    {
        id: "creative_project",
        title: "🧠 Du får lyst til at lave noget",
        description:
            "Du har pludselig lyst til at starte på et projekt. Du ved ikke helt hvad endnu.",
        choices: [
            {
                text: "💻 Lav en hjemmeside",
                effects: { creative: 20, energy: -15 }
            },
            {
                text: "🎵 Lav noget musik",
                effects: { creative: 15, music: 10, energy: -10 }
            },
            {
                text: "✏️ Tegn eller skriv noget",
                effects: { creative: 15, mood: 10 }
            },
            {
                text: "🤷 Drop idéen",
                effects: { energy: 5 }
            }
        ]
    }
];


/* =========================
   START GAME
========================= */

continueButton.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    showEvent();
});


/* =========================
   EVENT SYSTEM
========================= */

function getAvailableEvents() {
    return events.filter(event => {
        return !gameState.usedEvents.includes(event.id);
    });
}


function getRandomEvent() {
    const availableEvents = getAvailableEvents();

    if (availableEvents.length === 0) {
        gameState.usedEvents = [];
        return events[Math.floor(Math.random() * events.length)];
    }

    return availableEvents[
        Math.floor(Math.random() * availableEvents.length)
    ];
}


function showEvent() {
    updateGameStats();

    const event = getRandomEvent();

    gameState.currentEvent = event;
    gameState.usedEvents.push(event.id);

    eventTitle.textContent = event.title;
    eventDescription.textContent = event.description;

    eventChoices.innerHTML = "";

    event.choices.forEach((choice) => {
        const button = document.createElement("button");

        button.textContent = choice.text;

        button.addEventListener("click", () => {
            makeChoice(choice);
        });

        eventChoices.appendChild(button);
    });
}


/* =========================
   CHOICE SYSTEM
========================= */

function makeChoice(choice) {
    applyEffects(choice.effects);

    if (choice.flag && !gameState.flags.includes(choice.flag)) {
        gameState.flags.push(choice.flag);
    }

    if (choice.chance) {
        const roll = Math.random();

        if (roll < choice.chance) {
            if (choice.success) {
                applyEffects(choice.success.effects);

                if (choice.success.flag) {
                    gameState.flags.push(choice.success.flag);
                }

                showChoiceResult(
                    choice.success.text,
                    choice.success.effects
                );

                return;
            }
        } else {
            if (choice.fail) {
                applyEffects(choice.fail.effects);

                showChoiceResult(
                    choice.fail.text,
                    choice.fail.effects
                );

                return;
            }
        }
    }

    nextDay();
}


/* =========================
   EFFECTS
========================= */

function applyEffects(effects) {
    for (const stat in effects) {
        if (gameState[stat] !== undefined) {
            gameState[stat] += effects[stat];
        }
    }

    gameState.mood = clamp(gameState.mood);
    gameState.energy = clamp(gameState.energy);
    gameState.luck = clamp(gameState.luck);

    gameState.gaming = clamp(gameState.gaming);
    gameState.music = clamp(gameState.music);
    gameState.social = clamp(gameState.social);
    gameState.impulsive = clamp(gameState.impulsive);
    gameState.creative = clamp(gameState.creative);

    if (gameState.money < 0) {
        gameState.money = 0;
    }
}


/* =========================
   RESULT AFTER CHOICE
========================= */

function showChoiceResult(text) {
    eventChoices.innerHTML = "";

    eventTitle.textContent = "📌 Konsekvens";

    eventDescription.textContent = text;

    const button = document.createElement("button");

    button.textContent = "NÆSTE DAG →";

    button.addEventListener("click", () => {
        nextDay();
    });

    eventChoices.appendChild(button);

    updateGameStats();
}


/* =========================
   NEXT DAY
========================= */

function nextDay() {
    gameState.day++;

    eventTitle.textContent = `🌅 DAG ${gameState.day}`;

    eventDescription.textContent =
        "En ny dag begynder. Du aner ikke, hvad der kommer til at ske.";

    eventChoices.innerHTML = "";

    const button = document.createElement("button");

    button.textContent = "SE HVAD DER SKER →";

    button.addEventListener("click", () => {
        showEvent();
    });

    eventChoices.appendChild(button);

    updateGameStats();
}


/* =========================
   UPDATE UI
========================= */

function updateGameStats() {
    dayNumber.textContent = `DAG ${gameState.day}`;

    moneyDisplay.textContent = gameState.money;
    moodDisplay.textContent = gameState.mood;
    energyDisplay.textContent = gameState.energy;
    luckDisplay.textContent = gameState.luck;
}