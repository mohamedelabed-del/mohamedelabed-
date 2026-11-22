// ============================================================
// PAGE RÉSERVATION : calcul du prix + vérification du formulaire
// (voir TP Bootstrap : labo 17 et 18 « Formulaires et validation »)
// ============================================================

const form = document.getElementById('formResa');
const choixActivite = document.getElementById('activite');
const champNb = document.getElementById('participants');
const champDate = document.getElementById('dateSouhaitee');
const alerteErreur = document.getElementById('alerteErreur');
const recap = document.getElementById('recap');

// Écrit un nombre sous la forme « 70 TND »
function enTND(nombre) {
  return nombre.toLocaleString('fr-FR', { maximumFractionDigits: 2 }) + ' TND';
}

// Date d'aujourd'hui au format AAAA-MM-JJ (le format du champ date)
function aujourdhui() {
  const d = new Date();
  const mois = String(d.getMonth() + 1).padStart(2, '0');
  const jour = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + mois + '-' + jour;
}

// ÉTAPE 1 : remplir la liste déroulante avec les activités
for (const a of ACTIVITES) {
  choixActivite.add(new Option(a.titre + ' — ' + a.lieu, a.id));
}
// Si l'adresse contient ?activite=A02, on présélectionne cette activité
const idDansUrl = new URLSearchParams(location.search).get('activite');
if (idDansUrl) choixActivite.value = idDansUrl;

champDate.min = aujourdhui();   // le calendrier refuse les dates passées

// ÉTAPE 2 : le calcul. Règle : sous-total = prix × participants ;
// remise = 10 % si participants >= 4 ; total = sous-total - remise
function calculer() {
  const activite = ACTIVITES.find(function (x) { return x.id === choixActivite.value; });
  const nb = Number(champNb.value);

  let prix = 0;
  if (activite) prix = activite.prix;

  let participants = 0;
  if (nb >= 1 && nb <= 6) participants = nb;

  const sousTotal = prix * participants;
  let remise = 0;
  if (participants >= 4) remise = sousTotal * 0.10;
  const total = sousTotal - remise;

  document.getElementById('prixUnitaire').textContent = activite ? enTND(prix) : '—';
  document.getElementById('sousTotal').textContent = enTND(sousTotal);
  document.getElementById('remise').textContent = enTND(remise);
  document.getElementById('totalFinal').textContent = enTND(total);

  return { activite: activite, participants: participants, total: total };
}

// ÉTAPE 3 : la vérification. Chaque appel de « verifier » teste UNE règle.
let erreurs = [];
function verifier(champ, condition, message) {
  const zoneMessage = champ.parentElement.querySelector('.invalid-feedback');
  if (condition) {
    champ.classList.remove('is-invalid');
  } else {
    champ.classList.add('is-invalid');   // bordure rouge Bootstrap
    zoneMessage.textContent = message;
    erreurs.push(message);
  }
}

function toutVerifier() {
  erreurs = [];
  const email = document.getElementById('email');
  const nb = Number(champNb.value);

  verifier(document.getElementById('nom'), document.getElementById('nom').value.trim() !== '', 'Le nom est obligatoire.');
  verifier(document.getElementById('prenom'), document.getElementById('prenom').value.trim() !== '', 'Le prénom est obligatoire.');
  verifier(email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()), 'Saisissez une adresse e-mail valide (ex. nom@exemple.tn).');
  verifier(document.getElementById('telephone'), document.getElementById('telephone').value.trim() !== '', 'Le téléphone est obligatoire.');
  verifier(choixActivite, choixActivite.value !== '', 'Choisissez une activité.');
  verifier(champDate, champDate.value !== '', 'Choisissez une date.');
  if (champDate.value !== '') {
    verifier(champDate, champDate.value >= aujourdhui(), 'La date ne peut pas être dans le passé.');
  }
  verifier(champNb, nb >= 1 && nb <= 6, 'Le nombre de participants doit être entre 1 et 6.');
  verifier(document.getElementById('accord'), document.getElementById('accord').checked, 'Vous devez accepter les conditions de simulation.');
}

// ÉTAPE 4 : on cache les messages et le récapitulatif
function toutEffacer() {
  for (const el of form.querySelectorAll('.is-invalid')) el.classList.remove('is-invalid');
  alerteErreur.classList.add('d-none');
  recap.classList.add('d-none');
  calculer();
}

// ÉTAPE 5 : les événements
form.addEventListener('submit', function (event) {
  event.preventDefault();          // IMPORTANT : on empêche l'envoi de la page
  toutVerifier();
  recap.classList.add('d-none');

  if (erreurs.length > 0) {        // il y a des erreurs : on les affiche
    let liste = '';
    for (const message of erreurs) liste += '<li>' + message + '</li>';
    alerteErreur.innerHTML = '<strong>Veuillez corriger :</strong><ul class="mb-0">' + liste + '</ul>';
    alerteErreur.classList.remove('d-none');
    return;                        // on s'arrête : pas de récapitulatif
  }

  // Tout est correct : on remplit le récapitulatif
  alerteErreur.classList.add('d-none');
  const r = calculer();
  const morceaux = champDate.value.split('-');   // ["2026","12","05"]
  document.getElementById('recapActivite').textContent = r.activite.titre + ' — ' + r.activite.lieu;
  document.getElementById('recapDate').textContent = morceaux[2] + '/' + morceaux[1] + '/' + morceaux[0];
  document.getElementById('recapNb').textContent = r.participants;
  document.getElementById('recapTotal').textContent = enTND(r.total);
  recap.classList.remove('d-none');
});

// « reset » : le navigateur vide les champs, puis on nettoie l'affichage
form.addEventListener('reset', function () { setTimeout(toutEffacer, 0); });
document.getElementById('btnCalculer').addEventListener('click', calculer);
choixActivite.addEventListener('change', calculer);
champNb.addEventListener('input', calculer);

calculer();
