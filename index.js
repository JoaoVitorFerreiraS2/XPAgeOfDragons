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
    document.querySelector("h2").textContent = `Seu nível é: ${status.level}`;
    document.querySelector("h3").textContent = `XP Atual: ${status.currentXP} / ${status.nextLevelXP}`;
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
