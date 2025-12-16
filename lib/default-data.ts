import type { News } from "./types"

export const defaultNews: News[] = [
  {
    id: "1",
    title: "Début du semestre académique 2024-2025",
    excerpt:
      "Les cours commencent lundi 2 septembre 2024. Veuillez consulter votre emploi du temps et vous présenter 15 minutes avant le début de vos cours.",
    category: "Annonce",
    date: "2024-08-25",
    featuredImage: "https://images.unsplash.com/photo-1523050854058-f1b8b6c04860?w=800&h=400&fit=crop",
    content: [
      {
        type: "text",
        id: "text-1",
        content:
          "L'année académique 2024-2025 commence officiellement lundi 2 septembre 2024. Tous les étudiants inscrits doivent consulter leur emploi du temps personnalisé disponible sur le portail étudiant et se présenter 15 minutes avant le début de leur premier cours.",
      },
      {
        type: "image",
        id: "img-1",
        content: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=800&h=500&fit=crop",
      },
      {
        type: "text",
        id: "text-2",
        content:
          "Informations importantes :\n• Les amphithéâtres ouvrent à 7h30\n• Les badges d'accès doivent être validés auprès du bureau des étudiants\n• Les retards seront enregistrés pour les 2 premières semaines\n• Une réunion d'orientation aura lieu le mercredi 4 septembre à 14h",
      },
      {
        type: "image",
        id: "img-2",
        content: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop",
      },
      {
        type: "text",
        id: "text-3",
        content:
          "Pour toute question ou assistance, n'hésitez pas à contacter le bureau des services aux étudiants (Bureau 102, Bâtiment A) du lundi au vendredi de 8h à 17h. Nous vous souhaitons une excellente année académique !",
      },
    ],
    published: true,
  },
  {
    id: "2",
    title: "Journée portes ouvertes - 15 novembre",
    excerpt:
      "Rejoignez-nous pour découvrir nos programmes, rencontrer nos enseignants et explorer notre campus. Entrée gratuite!",
    category: "Événement",
    date: "2024-09-01",
    featuredImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    content: [
      {
        type: "text",
        id: "text-1",
        content:
          "Nous vous invitons chaleureusement à notre journée portes ouvertes du 15 novembre 2024. C'est une excellente opportunité pour découvrir notre établissement, rencontrer nos professeurs et explorer les différents programmes académiques que nous proposons.",
      },
      {
        type: "image",
        id: "img-1",
        content: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
      },
      {
        type: "text",
        id: "text-2",
        content:
          "Programme de la journée :\n• 9h00 - 11h00 : Tours guidés du campus\n• 11h00 - 12h30 : Présentation des programmes par les facultés\n• 12h30 - 13h30 : Déjeuner convivial\n• 13h30 - 15h00 : Ateliers interactifs et rencontres avec les étudiants\n• 15h00 - 17h00 : Consultations individuelles",
      },
      {
        type: "image",
        id: "img-2",
        content: "https://images.unsplash.com/photo-1517245386807-bb43f82bd1c3?w=800&h=500&fit=crop",
      },
      {
        type: "text",
        id: "text-3",
        content:
          "Accès gratuit pour tous | Parking gratuit disponible | Restauration sur place | Navette depuis la gare",
      },
    ],
    published: true,
  },
  {
    id: "3",
    title: "⚠️ Maintenance du portail étudiant",
    excerpt: "Le portail étudiant sera indisponible le 5 septembre de 22h à 6h pour maintenance programmée.",
    category: "Urgence",
    date: "2024-08-30",
    featuredImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    content: [
      {
        type: "text",
        id: "text-1",
        content:
          "ATTENTION : Maintenance programmée du portail étudiant\n\nLe portail étudiant sera indisponible pour maintenance le 5 septembre 2024 de 22h00 à 6h00 (heure locale). Nous nous excusons pour les inconvénients que cela pourrait causer.",
      },
      {
        type: "image",
        id: "img-1",
        content: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop",
      },
      {
        type: "text",
        id: "text-2",
        content:
          "Durant cette période, vous ne pourrez pas :\n• Consulter vos notes et résultats\n• Modifier votre inscription aux cours\n• Télécharger vos documents\n• Accéder à votre emploi du temps\n\nCes services seront restaurés dès la fin de la maintenance.",
      },
      {
        type: "text",
        id: "text-3",
        content:
          "Si vous avez besoin d'assistance urgente, veuillez contacter le support IT au : support@universite.edu ou appeler le +33 1 23 45 67 89 (disponible 24h/24)",
      },
    ],
    published: true,
  },
  {
    id: "4",
    title: "Résultats disponibles - Session été 2024",
    excerpt:
      "Les résultats de la session d'été 2024 sont maintenant disponibles. Consultez-les via votre portail étudiant.",
    category: "Résultats",
    date: "2024-08-20",
    featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    content: [
      {
        type: "text",
        id: "text-1",
        content:
          "Les résultats de la session d'été 2024 sont maintenant disponibles. Tous les étudiants peuvent consulter leurs résultats via leur portail étudiant en utilisant leurs identifiants habituels.",
      },
      {
        type: "image",
        id: "img-1",
        content: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
      },
      {
        type: "text",
        id: "text-2",
        content:
          "Comment accéder à vos résultats :\n1. Connectez-vous au portail étudiant avec vos identifiants\n2. Allez dans la section 'Résultats académiques'\n3. Sélectionnez 'Session été 2024'\n4. Vos notes et votre moyenne générale s'afficheront\n5. Vous pouvez télécharger un relevé de notes officiel",
      },
      {
        type: "text",
        id: "text-3",
        content:
          "Recours en cas de contestation :\nLes réclamations concernant les résultats peuvent être déposées jusqu'au 31 août 2024 auprès du bureau des examens. Les demandes reçues après cette date ne seront pas acceptées.",
      },
      {
        type: "image",
        id: "img-2",
        content: "https://images.unsplash.com/photo-1434958388323-15cf2cc6fe56?w=800&h=500&fit=crop",
      },
      {
        type: "text",
        id: "text-4",
        content: "Pour toute assistance technique, contactez support@universite.edu",
      },
    ],
    published: true,
  },
  {
    id: "5",
    title: "Nouvelle cafétéria ouverte sur le campus",
    excerpt: "Nous annonçons l'ouverture d'une nouvelle cafétéria avec des options végétariennes et sans gluten.",
    category: "Annonce",
    date: "2024-09-03",
    featuredImage: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=400&fit=crop",
    content: [
      {
        type: "text",
        id: "text-1",
        content:
          "Nous sommes heureux d'annoncer l'ouverture d'une nouvelle cafétéria moderne et spacieuse sur notre campus. Ce nouvel espace a été conçu pour offrir un environnement convivial et agréable à tous nos étudiants et personnels.",
      },
      {
        type: "image",
        id: "img-1",
        content: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=500&fit=crop",
      },
      {
        type: "text",
        id: "text-2",
        content:
          "Caractéristiques principales :\n• Menu diversifié avec options végétariennes et végans\n• Repas sans gluten disponibles tous les jours\n• Cuisine biologique et locale privilégiée\n• Espace assis confortable avec 200 places\n• Free Wi-Fi et prises électriques à chaque table\n• Paiement par carte étudiant ou espèces",
      },
      {
        type: "image",
        id: "img-2",
        content: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=500&fit=crop",
      },
      {
        type: "text",
        id: "text-3",
        content:
          "Horaires d'ouverture :\n• Petit-déjeuner : 7h30 - 9h30\n• Déjeuner : 11h30 - 14h30\n• Collation/Goûter : 14h30 - 17h00\n• Fermeture : 18h00 les jours de semaine",
      },
      {
        type: "image",
        id: "img-3",
        content: "https://images.unsplash.com/photo-1504674900947-ab1e7b8e4c91?w=800&h=500&fit=crop",
      },
      {
        type: "text",
        id: "text-4",
        content:
          "Nous vous invitons à venir découvrir ce nouvel espace ! Pour plus d'informations, consultez le panneau d'affichage à l'entrée ou envoyez-nous un email à cafeteria@universite.edu",
      },
    ],
    published: true,
  },
]
