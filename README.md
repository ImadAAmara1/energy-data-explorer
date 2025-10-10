# 🔋 Energy Data Explorer

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-7.9-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

**Une plateforme d'analyse interactive dédiée à la visualisation des données mondiales de production d'électricité**

[Demo](https://ImadAAmara1.github.io/energy-data-explorer) · [Report Bug](https://github.com/ImadAAmara1/energy-data-explorer/issues) · [Request Feature](https://github.com/ImadAAmara1/energy-data-explorer/issues)

</div>

---

## 📸 Screenshots

<div align="center">
  <img src="docs/screenshot-main.png" alt="Main Dashboard" width="800"/>
  <p><em>Interactive dashboard with country selection and energy source comparison</em></p>
</div>

## 🌟 About The Project

Energy Data Explorer is a modern web application that allows users to explore and analyze global electricity production data. Built with React and D3.js, it provides interactive visualizations to compare energy production across countries and sources

## ✨ Fonctionnalités

### 📊 Visualisations Interactives

- **Graphiques linéaires** : Analyse des tendances temporelles
- **Graphiques en barres animés** : Course dynamique entre pays avec animation
- **Tooltips informatifs** : Détails au survol pour chaque point de données

### 🌍 Sources d'Énergie Couvertes

- ⚡ Énergies Renouvelables (hydraulique, éolien, solaire, biomasse)
- 🔥 Combustibles Fossiles (charbon, pétrole, gaz naturel)
- ⚛️ Énergie Nucléaire
- 🌱 Énergies Bas-Carbone
- Et plus encore...

### 🎯 Fonctionnalités Avancées

- Sélection multiple de pays avec recherche
- Comparaison entre différentes sources d'énergie
- Indicateurs de chargement en temps réel
- Interface responsive et moderne
- Animations fluides et professionnelles

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ImadAAmara1/energy-data-explorer.git

# Navigate to the project directory
cd energy-data-explorer

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🛠️ Technologies Utilisées

### Frontend

- **React 18** : Framework UI moderne avec hooks
- **Vite** : Build tool ultra-rapide
- **Tailwind CSS** : Framework CSS utility-first

### Visualisation

- **D3.js** : Bibliothèque de visualisation de données puissante
- **SVG** : Graphiques vectoriels scalables

### Design

- **Google Material Icons** : Icônes professionnelles
- **Gradient Design** : Interface moderne et attrayante

## 📁 Structure du Projet

```
Energy-Data-Explorer/
├── src/
│   ├── components/
│   │   ├── charts/          # Composants de graphiques
│   │   │   ├── BarChart/
│   │   │   └── LineChart/
│   │   ├── layout/          # Composants de mise en page
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── GraphHeader.jsx
│   │   │   └── SourceDescription.jsx
│   │   ├── ui/              # Composants UI réutilisables
│   │   │   ├── ChartContainer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── StatsCard.jsx
│   │   └── CountrySelector.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useChartData.js
│   │   └── useCSVData.js
│   ├── constants/           # Constantes et configurations
│   │   └── sourceData.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── data/                # Fichiers CSV de données
└── README.md
```

## 📊 Sources de Données

Les données proviennent de sources fiables et reconnues :

- **Our World in Data** : Données énergétiques mondiales
- **IEA** (Agence Internationale de l'Énergie)
- **Banque Mondiale** : Statistiques énergétiques

Toutes les données sont exprimées en **TWh (Térawatt-heures)**.

## 🎨 Caractéristiques du Design

- **Palette de couleurs cohérente** : Thème vert pour l'énergie
- **Typographie claire** : Hiérarchie visuelle optimisée
- **Espacement harmonieux** : Design aéré et professionnel
- **Animations subtiles** : Transitions fluides
- **Responsive design** : Adapté à tous les écrans

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Linting
npm run lint
```

## 📈 Cas d'Usage

- **Analyse comparative** : Comparer la production énergétique entre pays
- **Études de tendances** : Observer l'évolution dans le temps
- **Recherche académique** : Support pour études énergétiques
- **Présentations professionnelles** : Visualisations pour rapports

## 🌟 Points Forts

✅ Interface intuitive et moderne  
✅ Visualisations interactives et dynamiques  
✅ Code propre et bien structuré  
✅ Performance optimisée  
✅ Design professionnel et cohérent  
✅ Données fiables et à jour

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📝 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

Project Link: [https://github.com/ImadAAmara1/energy-data-explorer](https://github.com/ImadAAmara1/energy-data-explorer)

## 🙏 Acknowledgments

- [Our World in Data](https://ourworldindata.org/) for providing comprehensive energy data
- [D3.js](https://d3js.org/) for powerful data visualization capabilities
- [React](https://reactjs.org/) for the amazing UI framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Google Material Icons](https://fonts.google.com/icons) for professional icons

## 👨‍💻 Développement

Projet développé avec les meilleures pratiques :

- Architecture modulaire et réutilisable
- Hooks personnalisés pour la logique métier
- Composants découplés et testables
- Code commenté et documenté

---

**© 2025 Explorateur de Données Énergétiques** - Conçu pour l'analyse et la visualisation professionnelle de données énergétiques mondiales
