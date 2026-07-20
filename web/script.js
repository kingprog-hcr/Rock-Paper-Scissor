const btns = document.querySelectorAll("button");
const userScoreContent = document.querySelector("#user-score");
const computerScoreContent = document.querySelector("#computer-score");
const roundContent = document.querySelector("#round");
const info = document.querySelector("#info");
const choicesContent = document.querySelector("#choices");
const resultContent = document.querySelector("#result");

const choices = ["pierre", "papier", "ciseaux"];

const rules = {
    pierre: "ciseaux",
    papier: "pierre",
    ciseaux: "papier"
};

// On garde le score en mémoire en dehors des fonctions
let userScore = 0;
let computerScore = 0;
let roundNumber = 1;

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function getHumanChoice(event) {
    const idBouton = event.currentTarget.id;
    switch (idBouton) {
        case "rock": return "pierre";
        case "paper": return "papier";
        case "cissor": return "ciseaux";
        default: return null;
    }
}

function playRound(player, computer) {
    if (player === null) return "invalid";
    if (player === computer) return "draw";
    if (rules[player] === computer) return "player";
    return "computer"; 
}

// C'est cette fonction qui gère un tour COMPLET à chaque clic
function handleRound(event) {
    // Si l'un des deux a déjà atteint 5, on arrête de jouer
    if (userScore >= 5 || computerScore >= 5) {
        console.log("La partie est finie ! Recharge la page pour rejouer.");
        return;
    }

    console.log(`\n--- ROUND ${roundNumber} ---`);
    roundContent.textContent = `ROUND ${roundNumber}`;
    
    
    let userChoice = getHumanChoice(event);
    let computerChoice = getComputerChoice();
    
    
    let result = playRound(userChoice, computerChoice);

    choicesContent.textContent = `Vous : ${userChoice.toUpperCase()} | Ordinateur : ${computerChoice.toUpperCase()}`;

    choicesContent.style.color = "black"
    if (result === "draw") {
        resultContent.textContent = "Match nul pour ce round !";
        resultContent.style.color = "#d97706";          // Jaune/Orange ambré
        roundContent.style.color = "#d97706";
        info.style.backgroundColor = "#fef3c7";         // Fond jaune très doux

    } else if (result === "player") {
        userScore++;
        resultContent.textContent = `Gagné ! ${userChoice} bat ${computerChoice}.`;
        resultContent.style.color = "#15803d";          // Vert émeraude
        roundContent.style.color = "#15803d";
        
        info.style.backgroundColor = "#dcfce7";         // Fond vert pastel

    } else {
        computerScore++;
        resultContent.textContent = `Perdu... ${computerChoice} bat ${userChoice}.`;
        resultContent.style.color = "#b91c1c";          // Rouge corail foncé
        roundContent.style.color = "#b91c1c";
        info.style.backgroundColor = "#fee2e2";         // Fond rouge pastel
    }

    // 4. Mise à jour de l'affichage HTML
    userScoreContent.textContent = userScore;
    computerScoreContent.textContent = computerScore;
    
    roundNumber++;

    if (userScore === 5 || computerScore === 5) {
        checkFinalWinner();
    }
}

function checkFinalWinner() {
    roundContent.textContent = "FIN DE LA PARTIE";
     
    if (userScore === computerScore) {
        resultContent.textContent = "Égalité parfaite !";
        resultContent.style.color = "#d97706";
        roundContent.style.color = "#d97706";
        info.style.backgroundColor = "#fef3c7";

    } else if (userScore > computerScore) {
        resultContent.textContent = "VICTOIRE ! Tu es le grand vainqueur ! 🎉";
        resultContent.style.color = "#15803d";
        roundContent.style.color = "#15803d";
        info.style.backgroundColor = "#dcfce7";

    } else {
        resultContent.textContent = "Dommage... L'ordinateur a gagné.";
        resultContent.style.color = "#b91c1c";
        roundContent.style.color = "#b91c1c";
        info.style.backgroundColor = "#fee2e2";
    }

    const btnRestart = document.createElement("button");
    btnRestart.textContent = "Rejouer une partie";
    
    btnRestart.addEventListener("click", () => {
        location.reload(); 
    });
    const sectionChoix = document.querySelector("#choix");
    sectionChoix.replaceChildren(btnRestart);
}

btns.forEach(bouton => {
    bouton.addEventListener('click', handleRound);
});