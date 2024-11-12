// Dados dos personagens e seus níveis
const characterData = [
    { name: "Lando Akinkawon", level: 8, xp: 150, nextLevelXP: 800 },

    { name: "Kaella Vanthorn", level: 7, xp: 450, nextLevelXP: 700 },
    { name: "Aurion Pavarell", level: 7, xp: 200, nextLevelXP: 700 },
    { name: "Stradh Von Zarovich", level: 7, xp: 100, nextLevelXP: 700 },
    { name: "Lunette Windrider", level: 7 },

    { name: "Maekon Shadowfen", level: 6, xp: 500, nextLevelXP: 600 },
    { name: "Oliver Shadowfen", level: 6, xp: 100, nextLevelXP: 600 },
    { name: "Roselyn Ashford", level: 6, xp: 400, nextLevelXP: 600 },
    { name: "Laenor Astralis", level: 6 },

    { name: "Annelise Windrider", level: 5, xp: 250, nextLevelXP: 500 },
    { name: "Lyonel Tannenwood", level: 5, xp: 350, nextLevelXP: 400 },

    { name: "Daveryn Rivermoore", level: 4, xp: 100, nextLevelXP: 400 },

    { name: "Mierin Shiōr", level: 3, xp: 250, nextLevelXP: 300 },
    { name: "Kaiser Sunscorch", level: 3, xp: 100, nextLevelXP: 300 },

    { name: "Maegor Skylance", level: 2, xp: 100, nextLevelXP: 200 },
    { name: "Halvard Sunheaven", level: 2, xp: 50, nextLevelXP: 200 },

    { name: "Catherine D. Rivermoor", level: 1 },
    { name: "Aesterys Stoneshire", level: 1 },
    { name: "Ton Sanders", level: 1 },
    { name: "Yara A'tlantes Seagate", level: 1 },
    { name: "Tauriel", level: 1 },
    { name: "Manoel Álvares", level: 1 },
    { name: "Silvano Astralis", level: 1 },
    { name: "Amélia Feralas", level: 1 },
    { name: "Catherine Windrider", level: 1 },
    { name: "Mathias Pavarell", level: 1 },
    { name: "Baldrin Sunhaven", level: 1 },
    { name: "Valerian Ashford", level: 1 },
    { name: "Haydée Sunheaven", level: 1 },
    { name: "Louis Windrider", level: 1 },
    { name: "Odélia Feralas", level: 1 },
];

// Função para exibir a lista de personagens organizada por nível
function displayCharacterLevels() {
    const leaderboard = document.getElementById("xp-leaderboard");

    // Agrupar personagens por nível
    const groupedCharacters = characterData.reduce((acc, character) => {
        if (!acc[character.level]) acc[character.level] = [];
        acc[character.level].push(character);
        return acc;
    }, {});

    // Iterar sobre os níveis e adicionar ao leaderboard
    for (const [level, characters] of Object.entries(groupedCharacters).sort((a, b) => b[0] - a[0])) {
        const levelTitle = document.createElement("div");
        levelTitle.className = "level-title";
        levelTitle.textContent = `Nível ${level}`;

        leaderboard.appendChild(levelTitle);

        characters.forEach(character => {
            const characterItem = document.createElement("li");
            characterItem.className = "character-name";
            const xpText = character.xp ? ` (XP ${character.xp} | ${character.nextLevelXP})` : '';
            characterItem.textContent = `• ${character.name}${xpText}`;
            leaderboard.appendChild(characterItem);
        });
    }
}

// Inicializar a exibição da lista de personagens
displayCharacterLevels();

class Player {
    constructor() {
        this.level = 1;
        this.currentXP = 0;
        this.totalXP = 0;
        this.nextLevelXP = 100;
    }

    // Função para configurar nível e XP inicial
    setInitialValues(level, xp) {
        this.level = level;
        this.currentXP = xp;
        this.totalXP = xp;
        this.nextLevelXP = level <= 10 ? level * 100 : 1000;
    }

    addXP(xp) {
        this.currentXP += xp;
        this.totalXP += xp;

        // Checa se é necessário subir de nível
        while (this.currentXP >= this.nextLevelXP) {
            this.levelUp();
        }
    }

    levelUp() {
        this.currentXP -= this.nextLevelXP;
        this.level += 1;
        this.nextLevelXP = this.level <= 10 ? this.level * 100 : 1000;

        if (this.currentXP < 0) {
            this.currentXP = 0;
        }
    }

    getStatus() {
        return {
            level: this.level,
            currentXP: this.currentXP,
            totalXP: this.totalXP,
            nextLevelXP: this.nextLevelXP,
        };
    }
}

const player = new Player();

function updateDisplay() {
    const status = player.getStatus();
    document.querySelector("h2").textContent = Seu nível é: ${status.level};
    document.querySelector("h3").textContent = XP Atual: ${status.currentXP} / ${status.nextLevelXP};
}

function addExperience() {
    const levelInput = parseInt(document.getElementById("currentLevel").value);
    const currentXPInput = parseInt(document.getElementById("currentXP").value);
    const xpToAdd = parseInt(document.getElementById("xp").value);

    if (!isNaN(levelInput) && levelInput > 0 && !isNaN(currentXPInput) && currentXPInput >= 0) {
        player.setInitialValues(levelInput, currentXPInput);
    } else {
        alert("Por favor, insira um nível e XP inicial válidos.");
        return;
    }

    if (!isNaN(xpToAdd) && xpToAdd > 0) {
        player.addXP(xpToAdd);
        updateDisplay();
        document.getElementById("xp").value = "";
    } else {
        alert("Por favor, insira um valor de XP válido para somar.");
    }
}


