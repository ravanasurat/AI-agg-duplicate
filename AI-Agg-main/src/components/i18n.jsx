import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to Toolify.ai",
        products: "Products",
        categoryRanking: "Category Ranking",
        allModels: "All Models",
        socialListening: "Social Listening",
        submitAdvertise: "Submit & Advertise",
        favourite: "Favourite",
        login: "Login",
      },
    },
    es: {
      translation: {
        welcome: "Bienvenido a Toolify.ai",
        products: "Productos",
        categoryRanking: "Clasificación de Categorías",
        allModels: "Todos los Modelos",
        socialListening: "Escucha Social",
        submitAdvertise: "Enviar y Publicitar",
        favourite: "Favorito",
        login: "Iniciar sesión",
      },
    },
    fr: {
      translation: {
        welcome: "Bienvenue sur Toolify.ai",
        products: "Produits",
        categoryRanking: "Classement des Catégories",
        allModels: "Tous les Modèles",
        socialListening: "Écoute Sociale",
        submitAdvertise: "Soumettre et Faire de la Publicité",
        favourite: "Favori",
        login: "Connexion",
      },
    },
    de: {
      translation: {
        welcome: "Willkommen bei Toolify.ai",
        products: "Produkte",
        categoryRanking: "Kategorie-Ranking",
        allModels: "Alle Modelle",
        socialListening: "Social Listening",
        submitAdvertise: "Einreichen & Werbung",
        favourite: "Favorit",
        login: "Anmeldung",
      },
    },
  },
  lng: "en", // default language English
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
