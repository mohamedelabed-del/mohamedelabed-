// Données communes : tableau d'objets représentant les 8 activités
const ACTIVITES = [
  {
    "id": "A01",
    "titre": "Découverte de la médina",
    "lieu": "Nabeul",
    "categorie": "Culture",
    "duree": "2 h",
    "prix": 20,
    "accroche": "Ruelles, portes bleues et histoires d'un centre ancien.",
    "description": "Cette balade guidée vous emmène dans les ruelles de la médina de Nabeul. Vous découvrez les façades, les petits commerces et l'histoire de la ville. Le guide partage anecdotes et repères pour comprendre l'organisation d'un centre ancien. La visite s'achève par une pause thé dans un café traditionnel.",
    "image": "medina.svg",
    "alt": "Illustration : découverte de la médina à Nabeul"
  },
  {
    "id": "A02",
    "titre": "Atelier d'initiation à la poterie",
    "lieu": "Nabeul",
    "categorie": "Artisanat",
    "duree": "1 h 30",
    "prix": 35,
    "accroche": "Modelez votre première pièce avec un artisan potier.",
    "description": "Nabeul est réputée pour sa poterie. Au cours de cet atelier, un artisan vous montre les gestes de base du tournage et du modelage. Vous réalisez votre propre pièce en argile, guidé pas à pas. Aucune expérience n'est nécessaire, seulement de la curiosité et l'envie de se salir les mains.",
    "image": "poterie.svg",
    "alt": "Illustration : atelier d'initiation à la poterie à Nabeul"
  },
  {
    "id": "A03",
    "titre": "Parcours découverte de Kerkouane",
    "lieu": "Kerkouane",
    "categorie": "Culture",
    "duree": "2 h 30",
    "prix": 30,
    "accroche": "Marchez dans une cité punique face à la mer.",
    "description": "Kerkouane est un site archéologique d'origine punique inscrit au patrimoine mondial. Un guide vous présente le plan de la cité, ses maisons et leurs salles de bains. Vous comprenez ainsi la vie quotidienne des habitants il y a plus de deux mille ans. Le parcours se termine devant la mer, au bord du site.",
    "image": "kerkouane.svg",
    "alt": "Illustration : parcours découverte de kerkouane à Kerkouane"
  },
  {
    "id": "A04",
    "titre": "Randonnée découverte",
    "lieu": "Djebel Abderrahmane",
    "categorie": "Nature",
    "duree": "3 h",
    "prix": 25,
    "accroche": "Sentiers, panoramas et air pur sur les hauteurs.",
    "description": "Cette randonnée accessible à tous traverse les sentiers du Djebel Abderrahmane. Vous profitez de panoramas sur la campagne et la côte. Le guide présente la flore locale et les repères du paysage. Prévoyez de bonnes chaussures, de l'eau et un chapeau pour cette sortie en pleine nature.",
    "image": "randonnee.svg",
    "alt": "Illustration : randonnée découverte à Djebel Abderrahmane"
  },
  {
    "id": "A05",
    "titre": "Circuit du littoral",
    "lieu": "Kélibia",
    "categorie": "Nature",
    "duree": "3 h",
    "prix": 40,
    "accroche": "Plages, falaises et vue sur le fort de Kélibia.",
    "description": "Ce circuit longe le littoral de Kélibia, entre plages de sable clair et rochers. Vous découvrez les points de vue sur le fort et le port de pêche. Plusieurs arrêts permettent de se baigner ou de photographier le paysage. Un petit encas local est proposé en milieu de parcours.",
    "image": "littoral.svg",
    "alt": "Illustration : circuit du littoral à Kélibia"
  },
  {
    "id": "A06",
    "titre": "Peinture sur céramique",
    "lieu": "Nabeul",
    "categorie": "Artisanat",
    "duree": "2 h",
    "prix": 25,
    "accroche": "Décorez une céramique aux couleurs du Cap Bon.",
    "description": "Dans cet atelier, vous décorez une céramique avec des motifs inspirés de la tradition de Nabeul. Un artisan vous explique le choix des couleurs et le tracé des motifs. Vous repartez avec votre création une fois la cuisson terminée. L'activité convient très bien aux familles et aux petits groupes.",
    "image": "ceramique.svg",
    "alt": "Illustration : peinture sur céramique à Nabeul"
  },
  {
    "id": "A07",
    "titre": "Découverte d'un marché local",
    "lieu": "Nabeul",
    "categorie": "Découverte",
    "duree": "1 h 30",
    "prix": 15,
    "accroche": "Épices, fruits et couleurs au rythme du marché.",
    "description": "Le marché de Nabeul est un lieu vivant où l'on trouve épices, agrumes, artisanat et produits du terroir. Votre guide vous aide à repérer les spécialités et à échanger avec les vendeurs. Vous apprenez à reconnaître les épices et leurs usages en cuisine. Une dégustation de fruits de saison est incluse.",
    "image": "marche.svg",
    "alt": "Illustration : découverte d'un marché local à Nabeul"
  },
  {
    "id": "A08",
    "titre": "Promenade photographique",
    "lieu": "Hammamet",
    "categorie": "Découverte",
    "duree": "2 h",
    "prix": 30,
    "accroche": "Capturez la lumière de Hammamet avec un regard neuf.",
    "description": "Cette promenade vous invite à voir Hammamet à travers l'objectif de votre téléphone ou de votre appareil. Un photographe vous donne des conseils de cadrage et de lumière. Vous explorez la médina, les remparts et le bord de mer. À la fin, chacun présente sa photo préférée au reste du groupe.",
    "image": "photo.svg",
    "alt": "Illustration : promenade photographique à Hammamet"
  }
];

// ============================================================
// Formulaire de contact (page contact.html)
// Même technique que le TP, labo 18 : checkValidity() + was-validated
// ============================================================
const formContact = document.getElementById('formContact');
if (formContact) {                       // ce code ne s'exécute que sur contact.html
  formContact.addEventListener('submit', function (event) {
    event.preventDefault();              // pas d'envoi réel
    formContact.classList.add('was-validated');          // affiche rouge/vert
    const message = document.getElementById('confirmContact');
    if (formContact.checkValidity()) {
      message.classList.remove('d-none');                // confirmation simulée
      formContact.reset();
      formContact.classList.remove('was-validated');
    } else {
      message.classList.add('d-none');
    }
  });
}
