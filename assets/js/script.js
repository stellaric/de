var currentPlayer = 1;
var roundScore = 0;
var globalScore1 = 0;
var globalScore2 = 0;
var newSound;
var winner;
var winSound;
var diceNumber;
var diceElement;
var diceSound;
// Fonction de lancer de dé
function launchDice() {
    diceNumber = Math.floor(Math.random() * 6) + 1; // Génération d'un nombre aléatoire entre 1 et 6
    diceElement = document.querySelector('.score img'); // Sélection de l'élément d'affichage du dé
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
    diceSound = new Audio('../../src/son/son_dice.mp3');
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

    // Jouer le son lorsque les joueurs changent
    var switchSound = new Audio('../../../src/son/son_hold.mp3');
    switchSound.play();
}


// Fonction pour ajouter le score temporaire au score global
function hold() {
    if (currentPlayer === 1) {
        globalScore1 += roundScore;
        document.getElementById('globalScore1').textContent = globalScore1;
    } else {
        globalScore2 += roundScore;
        document.getElementById('globalScore2').textContent = globalScore2;
    }



    if (globalScore1 >= 100 || globalScore2 >= 100) {
        endGame();
    } else {
        roundScore = 0;
        document.getElementById('roundScore' + currentPlayer).textContent = roundScore;
        switchPlayer();
    }

    ;
}




// Fonction pour terminer le jeu
function endGame() {
    // Afficher un message ou effectuer des actions spécifiques pour la fin du jeu
    winner = globalScore1 >= 100 ? 'Joueur 1' : 'Joueur 2';
    alert('Le jeu est terminé ! ' + winner + ' a gagné !');


    // Désactiver les boutons "Roll" et "Hold"
    document.getElementById('rollBtn').disabled = true;
    document.getElementById('holdBtn').disabled = true;

    // Jouer le son de victoire
    winSound = document.getElementById("winSound");
    winSound.play();

}




// Fonction pour démarrer un nouveau jeu
function startNewGame() {
    currentPlayer = 1;
    roundScore = 0;
    globalScore1 = 0;
    globalScore2 = 0;

    // Réinitialisation des affichages des scores
    document.getElementById('roundScore1').textContent = roundScore;
    document.getElementById('roundScore2').textContent = roundScore;
    document.getElementById('globalScore1').textContent = globalScore1;
    document.getElementById('globalScore2').textContent = globalScore2;

    // Réinitialisation des classes actives
    document.getElementById('player1').classList.add('active');
    document.getElementById('player2').classList.remove('active');
    newSound = document.getElementById("newSound");
    newSound.play();
    document.getElementById('rollBtn').disabled = false;
    document.getElementById('holdBtn').disabled = false;
}



// Ajout des écouteurs d'événements aux boutons
document.getElementById('newGameBtn').addEventListener('click', startNewGame);
document.getElementById('rollBtn').addEventListener('click', launchDice);
document.getElementById('holdBtn').addEventListener('click', hold);

// formulaire regex

function validateForm(event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    // Récupération des valeurs des champs du formulaire
    var nom = document.getElementById("nom").value.trim();
    var prenom = document.getElementById("prenom").value.trim();
    var email = document.getElementById("email").value.trim();
    var sujet = document.getElementById("sujet").value.trim();
    var message = document.getElementById("message").value.trim();

    // Expression régulière pour vérifier le format de l'email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Vérification des champs du formulaire avec les expressions régulières
    if (nom === "" || prenom === "" || email === "" || sujet === "" || message === "") {
        alert("Veuillez remplir tous les champs du formulaire.");
    } else if (!emailRegex.test(email)) {
        alert("Veuillez entrer une adresse email valide.");
    } else {
        // Le formulaire est valide, afficher une alerte pour dire que le message a été envoyé
        alert("Votre message a été envoyé !");
        // Réinitialisation du formulaire
        document.getElementById("contactForm").reset();
    }
}