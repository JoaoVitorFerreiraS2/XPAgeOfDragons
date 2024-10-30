class Player {
    constructor() {
        this.reset();
    }

    // Função para resetar o jogador
    reset() {
        this.level = 1;
        this.currentXP = 0;
        this.totalXP = 0;
        this.nextLevelXP = 100;
    }

    addXP(xp) {
        this.currentXP += xp;
        this.totalXP += xp;

        while (this.currentXP >= this.nextLevelXP) {
            this.levelUp();
        }
    }

    levelUp() {
        this.currentXP -= this.nextLevelXP;
        this.level += 1;

        if (this.level <= 10) {
            this.nextLevelXP = this.level * 100;
        } else {
            this.nextLevelXP = 1000;
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

// Instancia o jogador
const player = new Player();

// Função para atualizar o nível e XP no HTML
function updateDisplay() {
    const status = player.getStatus();
    document.querySelector("h2").textContent = `Seu nível é: ${status.level}`;
    document.querySelector("h3").textContent = `XP Atual: ${status.currentXP} / ${status.nextLevelXP}`;
}

// Função chamada ao clicar no botão
function addExperience() {
    const xpInput = document.getElementById("xp");
    const xpToAdd = parseInt(xpInput.value);

    if (!isNaN(xpToAdd) && xpToAdd > 0) {
        player.reset();  // Reseta o jogador
        player.addXP(xpToAdd);
        updateDisplay();
        xpInput.value = "";  // Limpa o valor do campo de input
    } else {
        alert("Por favor, insira um valor de XP válido.");
    }
}

// Adiciona o evento de clique ao botão
document.querySelector("button").onclick = addExperience;
