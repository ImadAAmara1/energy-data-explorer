# 🔋 Energy Data Explorer

<div align="center">

![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-7.9-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

**Plateforme interactive de visualisation des données énergétiques mondiales**

[🚀 Démo Live](https://ImadAAmara1.github.io/energy-data-explorer) · [📊 Sources de Données](https://ourworldindata.org/energy)

</div>

---

## 📸 Aperçu

<div align="center">
  <img src="docs/screenshot-main.png" alt="Dashboard Energy Data Explorer" width="800"/>
  <p><em>Dashboard interactif avec sélection de pays et comparaison des sources d'énergie</em></p>
</div>

## ✨ Fonctionnalités

- **📊 Visualisations Interactives** - Graphiques linéaires et en barres animés avec D3.js
- **🌍 Analyse Multi-Pays** - Sélection et comparaison de plusieurs pays simultanément
- **⚡ 10 Sources d'Énergie** - Renouvelables, fossiles, nucléaire, hydraulique et plus
- **🎬 Animations Dynamiques** - Course de barres avec contrôles play/pause
- **📱 Design Responsive** - Interface optimisée mobile et desktop
- **💡 Tooltips Intelligents** - Informations contextuelles au survol

## 🛠️ Stack Technique

- **React 19** - Framework UI moderne avec hooks
- **Vite 7** - Outil de build ultra-rapide
- **D3.js 7** - Visualisations de données avancées
- **Tailwind CSS 4** - Framework CSS utility-first

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/ImadAAmara1/energy-data-explorer.git

# Installer les dépendances
cd energy-data-explorer
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir `http://localhost:5173` pour voir l'application.

## 📊 Sources de Données

Données provenant d'organisations internationales de confiance :

- **[Our World in Data](https://ourworldindata.org/energy)** - Statistiques énergétiques mondiales
- **[IEA](https://www.iea.org/)** - Agence Internationale de l'Énergie
- **[Banque Mondiale](https://www.worldbank.org/)** - Statistiques énergétiques officielles

_Toutes les données exprimées en TWh (Térawatt-heures) pour la période 1985-2016_

## 🏗️ Structure du Projet

```
src/
├── components/
│   ├── charts/              # Composants de visualisation D3.js
│   ├── layout/              # Composants de mise en page
│   └── ui/                  # Composants UI réutilisables
├── hooks/                   # Hooks React personnalisés
├── constants/               # Configuration et constantes
└── App.jsx                  # Composant principal
```

## 🎨 Caractéristiques Techniques

- **Performance** - Build optimisé (67KB gzippé)
- **Accessibilité** - Conforme aux standards WCAG
- **Responsive** - Design mobile-first
- **Animations** - Transitions fluides D3.js
- **Gestion d'État** - Hooks React
- **Architecture Modulaire** - Composants réutilisables

## 🔧 Scripts Disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualisation du build
npm run lint     # Vérification qualité du code
```

## 📝 Licence

Licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨💻 Développeur

**Imad Amara**
Développeur Frontend | Spécialiste React & D3.js
[GitHub](https://github.com/ImadAAmara1)

---

_Construit avec des technologies web modernes pour démontrer l'expertise en React, D3.js et visualisation de données_
