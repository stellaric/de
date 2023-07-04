// Fonction de lancer de dé
function launchDice() {
    // Génération d'un nombre aléatoire entre 1 et 6
    var diceNumber = Math.floor(Math.random() * 6) + 1;

    // Sélection de l'élément d'affichage du dé
    var diceElement = document.querySelector('.score img');

    // Mise à jour de l'image du dé en fonction du résultat
    diceElement.src = 'src/img/dice/de' + diceNumber + '.png';

    // Si le résultat est différent de 1, on met à jour le score temporaire du joueur actif
    if (diceNumber !== 1) {
        updateRoundScore(diceNumber);
    } else {
        // Sinon, on passe au joueur suivant
        switchPlayer();
    }
}


// Fonction de mise à jour du score temporaire du joueur actif
function updateRoundScore(diceNumber) {
    // Sélection de l'élément d'affichage du score temporaire du joueur actif
    var roundScoreElement = document.querySelector('.joueur_un.active #roundScore1');

    // Récupération du score temporaire actuel du joueur actif
    var roundScore = parseInt(roundScoreElement.textContent);

    // Mise à jour du score temporaire en ajoutant le résultat du lancer de dé
    roundScore += diceNumber;

    // Mise à jour de l'affichage du score temporaire
    roundScoreElement.textContent = roundScore;
}

// Fonction de passage au joueur suivant
function switchPlayer() {
    // Sélection des éléments des joueurs
    var player1Element = document.querySelector('.joueur_un');
    var player2Element = document.querySelector('.joueur_deux');

    // Vérification du joueur actif
    if (player1Element.classList.contains('active')) {
        // Si le joueur 1 est actif, on le désactive et active le joueur 2
        player1Element.classList.remove('active');
        player2Element.classList.add('active');
    } else {
        // Sinon, on désactive le joueur 2 et active le joueur 1
        player2Element.classList.remove('active');
        player1Element.classList.add('active');
    }
}

// Ajout des écouteurs d'événements aux boutons
document.getElementById('rollBtn').addEventListener('click', launchDice);
document.getElementById('holdBtn').addEventListener('click', switchPlayer);