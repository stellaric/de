var currentPlayer = 1;
var roundScore = 0;
var globalScore1 = 0;
var globalScore2 = 0;

// Fonction de lancer de dé
function launchDice() {
    var diceNumber = Math.floor(Math.random() * 6) + 1; // Génération d'un nombre aléatoire entre 1 et 6
    var diceElement = document.querySelector('.score img'); // Sélection de l'élément d'affichage du dé
    diceElement.src = '../src/img/dice/de' + diceNumber + '.png'; // Mise à jour de l'image du dé en fonction du résultat

    if (diceNumber !== 1) {
        roundScore += diceNumber; // Ajout du résultat du lancer de dé au score temporaire
        document.getElementById('roundScore' + currentPlayer).textContent = roundScore;
    } else {
        roundScore = 0; // Réinitialisation du score temporaire à 0
        document.getElementById('roundScore' + currentPlayer).textContent = roundScore;
        switchPlayer(); // Passage au joueur suivant
    }
    // Jouer le son du dé
    var diceSound = new Audio('../../src/son/son_dice.mp3');
    diceSound.play();

    // Ajouter la classe "bounce-animation" au dé
    diceElement.classList.add('bounce-animation');

    // Supprimer la classe "bounce-animation" après un court délai
    setTimeout(function() {
        diceElement.classList.remove('bounce-animation');
    }, 500); // Durée de l'animation en millisecondes
}

// Fonction pour passer au joueur suivant
function switchPlayer() {
    roundScore = 0; // Réinitialisation du score temporaire à 0

    // Mise à jour de l'affichage du score temporaire pour les deux joueurs
    document.getElementById('roundScore1').textContent = roundScore;
    document.getElementById('roundScore2').textContent = roundScore;

    // Passage au joueur suivant
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    // Mise à jour de la classe active pour les profils des joueurs
    document.getElementById('player1').classList.toggle('active');
    document.getElementById('player2').classList.toggle('active');
}

// Fonction pour ajouter le score temporaire au score global
function hold() {
    if (currentPlayer === 1) {
        globalScore1 += roundScore; // Ajout du score temporaire au score global du joueur 1
        document.getElementById('globalScore1').textContent = globalScore1;
    } else {
        globalScore2 += roundScore; // Ajout du score temporaire au score global du joueur 2
        document.getElementById('globalScore2').textContent = globalScore2;
    }

    if (globalScore1 >= 100 || globalScore2 >= 100) {
        // Vérification si l'un des joueurs a atteint 100 points ou plus
        endGame();
    } else {
        roundScore = 0; // Réinitialisation du score temporaire à 0
        document.getElementById('roundScore' + currentPlayer).textContent = roundScore;
        switchPlayer(); // Passage au joueur suivant
    }
}

// Fonction pour terminer le jeu
function endGame() {
    // Afficher un message ou effectuer des actions spécifiques pour la fin du jeu
    var winner = globalScore1 >= 100 ? 'Joueur 1' : 'Joueur 2';
    alert('Le jeu est terminé ! ' + winner + ' a gagné !');
}

// Ajout des écouteurs d'événements aux boutons
document.getElementById('rollBtn').addEventListener('click', launchDice);
document.getElementById('holdBtn').addEventListener('click', hold);