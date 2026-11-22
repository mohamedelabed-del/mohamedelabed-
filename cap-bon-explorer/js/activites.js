// ============================================================
// PAGE ACTIVITÉS : recherche + filtre + compteur + fenêtre modale
// (voir TP Bootstrap : labo 14 « Cartes », labo 21 « Modale »)
// ============================================================

// ÉTAPE 1 : on récupère les éléments de la page (comme dans le cours JS)
const grille = document.getElementById('grille');      // zone où mettre les cartes
const champRecherche = document.getElementById('recherche');
const compteur = document.getElementById('nb');         // le nombre affiché
const messageVide = document.getElementById('aucun');   // message « Aucune activité »
const boutonsFiltre = document.querySelectorAll('#filtres button');

// ÉTAPE 2 : une variable qui retient la catégorie choisie
let categorieChoisie = 'Toutes';

// Enlève les majuscules et les accents : « Kélibia » devient « kelibia »
function nettoyer(texte) {
  return texte.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ÉTAPE 3 : fabrique le HTML d'UNE carte à partir d'une activité
function fabriquerCarte(a) {
  return `
    <div class="col-12 col-md-6 col-xl-3">
      <article class="card carte-activite h-100">
        <img src="images/${a.image}" class="card-img-top" alt="${a.alt}">
        <div class="card-body d-flex flex-column">
          <span class="badge badge-cat align-self-start mb-2">${a.categorie}</span>
          <h3 class="h5 card-title">${a.titre}</h3>
          <p class="card-text small">${a.accroche}</p>
          <p class="small text-muted">📍 ${a.lieu} · ⏱ ${a.duree}</p>
          <p class="prix mt-auto">${a.prix} TND / personne</p>
          <button class="btn btn-outline-secondary btn-sm mb-2" data-bs-toggle="modal"
                  data-bs-target="#modalActivite" data-id="${a.id}">Voir les détails</button>
          <a class="btn btn-cap btn-sm" href="reservation.html?activite=${a.id}">Réserver</a>
        </div>
      </article>
    </div>`;
}

// ÉTAPE 4 : la fonction principale. Elle est appelée à chaque changement.
function afficher() {
  const mot = nettoyer(champRecherche.value.trim());
  let html = '';
  let nombre = 0;

  // Boucle sur le tableau ACTIVITES (défini dans app.js)
  for (const a of ACTIVITES) {
    const bonneCategorie = (categorieChoisie === 'Toutes') || (a.categorie === categorieChoisie);
    const bonMotCle = nettoyer(a.titre + ' ' + a.lieu).includes(mot);

    // On garde l'activité seulement si les DEUX conditions sont vraies
    if (bonneCategorie && bonMotCle) {
      html += fabriquerCarte(a);
      nombre++;
    }
  }

  grille.innerHTML = html;          // on remplace les cartes
  compteur.textContent = nombre;    // on met à jour le compteur
  if (nombre === 0) {
    messageVide.classList.remove('d-none');   // on montre le message
  } else {
    messageVide.classList.add('d-none');      // on le cache
  }
}

// ÉTAPE 5 : les événements
champRecherche.addEventListener('input', afficher);   // à chaque lettre tapée

for (const bouton of boutonsFiltre) {
  bouton.addEventListener('click', function () {
    categorieChoisie = bouton.dataset.cat;            // lit data-cat="Nature" par ex.
    for (const b of boutonsFiltre) b.classList.remove('active');
    bouton.classList.add('active');
    afficher();
  });
}

// ÉTAPE 6 : la modale. Bootstrap envoie l'événement « show.bs.modal »
// et event.relatedTarget est le bouton cliqué (même technique que le TP).
const modale = document.getElementById('modalActivite');
modale.addEventListener('show.bs.modal', function (event) {
  const id = event.relatedTarget.getAttribute('data-id');
  const a = ACTIVITES.find(function (x) { return x.id === id; });
  document.getElementById('modalTitre').textContent = a.titre;
  document.getElementById('modalImg').src = 'images/' + a.image;
  document.getElementById('modalImg').alt = a.alt;
  document.getElementById('modalMeta').textContent = a.categorie + ' · ' + a.lieu + ' · ' + a.duree + ' · ' + a.prix + ' TND / personne';
  document.getElementById('modalDesc').textContent = a.description;
  document.getElementById('modalReserver').href = 'reservation.html?activite=' + a.id;
});

afficher();   // premier affichage : les 8 cartes
