const prompt = require("prompt-sync")({ sigint: true });

const choices = ["pierre", "papier", "ciseaux"];
const rounds = 5;

const rules = {
    pierre: "ciseaux",
    papier: "pierre",
    ciseaux: "papier"
};

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function getHumanChoice() {
    console.log("\n À TOI DE JOUER ");
    const choice = prompt("Choisis un nombre :\n1 - Pierre\n2 - Papier\n3 - Ciseaux\n> ");

    switch (choice) {
        case "1": return "pierre";
        case "2": return "papier";
        case "3": return "ciseaux";
        default: return null;
    }
}

function playRound(player, computer) {
    if (player === null) {
        return "invalid";
    }
    if (player === computer) {
        return "draw";
    }
    if (rules[player] === computer) {
        return "player";
    }
    return "computer"; 
}

function playGame(totalRounds) {
    let userScore = 0;
    let computerScore = 0;

    console.log(`\nDEBUT DE LA PARTIE en ${totalRounds} manches)\n`);

    for (let i = 0; i < totalRounds; i++) {
        console.log(`\n ROUND ${i + 1} / ${totalRounds}`);
        
        let computerChoice = getComputerChoice();
        let userChoice = getHumanChoice();

        let result = playRound(userChoice, computerChoice);

        console.log(`\n Ordinateur a choisi : ${computerChoice.toUpperCase()}`);
        console.log(` Tu as choisi        : ${userChoice.toUpperCase()}`);

        // Analyse du résultat de la manche
        if (result === "draw") {
            console.log(" Match nul pour ce round !");
        } else if (result === "player") {
            userScore++;
            console.log(` Gagné ! ${userChoice} bat ${computerChoice}.`);
        } else {
            computerScore++;
            console.log(` Perdu... ${computerChoice} bat ${userChoice}.`);
        }

        console.log(` Score -> Toi : ${userScore} | Robot : ${computerScore}`);
    }

    // Résultat final
    console.log("\n FIN DE LA PARTIE - RÉSULTAT FINAL \n");
    console.log(`Score définitif -> Toi : ${userScore} | Robot : ${computerScore}`);

    if (userScore === computerScore) {
        console.log("Égalité parfaite");
    } else if (userScore > computerScore) {
        console.log(" VICTOIRE ! Tu es le grand vainqueur !");
    } else {
        console.log(" Dommage... Loser.");
    }
}

// Lancement du jeu
playGame(rounds);