// script.js

// Game Variables
let heroHealth = 100;
let monsterHealth = 50;
let inventory = {
    potions: 3,
};

// Update Health Stats
function updateStats() {
    document.getElementById("hero-health").textContent = heroHealth;
    document.getElementById("monster-health").textContent = monsterHealth;
}

// Battle Log
function logMessage(message) {
    const log = document.getElementById("battle-log");
    const newLog = document.createElement("div");
    newLog.textContent = message;
    log.appendChild(newLog);
    log.scrollTop = log.scrollHeight;
}

// Monster Attack
function monsterAttack() {
    const damage = Math.floor(Math.random() * 10) + 5;
    heroHealth -= damage;
    logMessage(`Monster attacks for ${damage} damage!`);
}

// Hero Attack
function heroAttack() {
    const damage = Math.floor(Math.random() * 15) + 5;
    monsterHealth -= damage;
    logMessage(`You attack for ${damage} damage!`);
    if (monsterHealth <= 0) {
        logMessage("You defeated the monster!");
        monsterHealth = 50; // Respawn monster with full health
        logMessage("A new monster appears!");
    }
}

// Heal Hero
function healHero() {
    if (inventory.potions > 0) {
        const healAmount = Math.floor(Math.random() * 20) + 10;
        heroHealth += healAmount;
        inventory.potions--;
        logMessage(`You healed for ${healAmount} HP. Potions left: ${inventory.potions}`);
    } else {
        logMessage("No potions left!");
    }
}

// Check Game Over
function checkGameOver() {
    if (heroHealth <= 0) {
        alert("Game Over! You have been defeated.");
        location.reload(); // Restart game
    }
}

// Event Listeners
document.getElementById("attack-btn").addEventListener("click", () => {
    heroAttack();
    if (monsterHealth > 0) {
        monsterAttack();
    }
    updateStats();
    checkGameOver();
});

document.getElementById("heal-btn").addEventListener("click", () => {
    healHero();
    if (monsterHealth > 0) {
        monsterAttack();
    }
    updateStats();
    checkGameOver();
});

document.getElementById("inventory-btn").addEventListener("click", () => {
    logMessage(`Inventory: ${inventory.potions} potions.`);
});

// Initialize Game
updateStats();
logMessage("A wild monster appears! Prepare for battle!");
