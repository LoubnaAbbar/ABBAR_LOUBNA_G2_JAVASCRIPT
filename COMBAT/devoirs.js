class Personnage {
    constructor(nom, pointsDeVie, attaque, precision) {
        this.nom = nom;
        this.pointsDeVie = pointsDeVie;
        this.attaque = attaque;
        this.precision = precision;
    }

    attaquer(adversaire) {
        const tiragePrecision = Math.random();
        this.ajouterLog(`${this.nom} tente d'attaquer ${adversaire.nom}...`);

        if (tiragePrecision < this.precision) {
            this.ajouterLog(`${this.nom} a réussi à toucher ${adversaire.nom}!`);
            adversaire.subirDegats(this.attaque);
        } else {
            this.ajouterLog(`${this.nom} a raté son attaque!`);
        }
    }

    subirDegats(dégats) {
        this.pointsDeVie -= dégats;
        this.ajouterLog(`${this.nom} perd ${dégats} points de vie, il lui en reste ${this.pointsDeVie}.`);

        if (this.pointsDeVie <= 0) {
            this.ajouterLog(`${this.nom} est KO!`);
        }
    }

    estVivant() {
        return this.pointsDeVie > 0;
    }

    ajouterLog(message) {
        const logDiv = document.getElementById('combatLog');
        logDiv.innerHTML += `<p>${message}</p>`;
        logDiv.scrollTop = logDiv.scrollHeight;
    }
}

function demarrerCombat() {
    const guerrier1 = new Personnage("Xena", 100, 15, 0.8);
    const guerrier2 = new Personnage("Thor", 100, 15, 0.7);

    document.getElementById('combatLog').innerHTML = '';
    guerrier1.ajouterLog(`${guerrier1.nom} entre dans le Colisée avec ${guerrier1.pointsDeVie} points de vie.`);
    guerrier2.ajouterLog(`${guerrier2.nom} entre dans le Colisée avec ${guerrier2.pointsDeVie} points de vie.`);

    const intervalId = setInterval(() => {
        if (guerrier1.estVivant() && guerrier2.estVivant()) {
            guerrier1.attaquer(guerrier2);
            if (guerrier2.estVivant()) {
                guerrier2.attaquer(guerrier1);
            }
        } else {
            clearInterval(intervalId);
            const gagnant = guerrier1.estVivant() ? guerrier1 : guerrier2;
            gagnant.ajouterLog(`${gagnant.nom} gagne le combat!`);
        }
    }, 1500);
}


document.getElementById('startCombatBtn').addEventListener('click', demarrerCombat);

// Gestion du mode sombre
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const body = document.body;

// Vérifier si le mode sombre est activé via localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    toggleDarkModeButton.textContent = 'Mode Clair';
}

// Basculer entre le mode sombre et clair
toggleDarkModeButton.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        toggleDarkModeButton.textContent = 'Mode Sombre';
        localStorage.setItem('darkMode', 'disabled');
    } else {
        body.classList.add('dark-mode');
        toggleDarkModeButton.textContent = 'Mode Clair';
        localStorage.setItem('darkMode', 'enabled');
    }
});
