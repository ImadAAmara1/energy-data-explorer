# 🎤 Guide d'Entretien - Energy Data Explorer

## 📚 Explications Détaillées pour le Jury

---

## 1️⃣ LES 4 HOOKS PERSONNALISÉS

### **Hook 1: useCSVData - Le Chargeur de Données**

#### **Qu'est-ce que c'est ?**
C'est un hook qui charge automatiquement les fichiers CSV statiques (stockés dans /public/data/) et les transforme en données utilisables par React.

#### **Comment ça marche concrètement ?**

**Étape 1 - L'utilisateur sélectionne une source d'énergie :**
```
Utilisateur clique sur "Énergie Solaire"
    ↓
App.jsx change la variable "source" à "solaire"
    ↓
useCSVData détecte le changement
```

**Étape 2 - Le hook charge les données :**
```javascript
// Le hook charge le fichier CSV statique depuis /public/data/
const rows = await d3.csv('./data/generated-from-solaire.csv');

// Exemple de ce qui est reçu :
// Entity,Year,Electricity
// France,1985,0.5
// France,1986,0.8
// Germany,1985,0.3
```

**Étape 3 - Transformation des données :**
```javascript
// On transforme chaque ligne en objet JavaScript propre
const processed = rows.map((row) => ({
  entity: row.Entity,        // "France"
  year: +row.Year,           // 1985 (converti en nombre)
  electricity: +row.Electricity  // 0.5 (converti en nombre)
}));
```

**Étape 4 - Filtrage par pays sélectionnés :**
```javascript
// Si l'utilisateur a sélectionné ["France", "Germany"]
// On garde seulement les lignes de ces pays
const filteredData = processed.filter(row => 
  ["France", "Germany"].includes(row.entity)
);
```

#### **Pourquoi c'est important ?**
- **Automatique** : Dès qu'on change de source, les données se rechargent
- **Gestion des erreurs** : Si le fichier n'existe pas, on affiche un message d'erreur
- **États de chargement** : Pendant le chargement, on affiche un spinner

#### **Ce que vous dites au jury :**
> "J'ai créé useCSVData pour centraliser toute la logique de chargement des données. Les fichiers CSV sont statiques et stockés dans le dossier /public/data/. Quand l'utilisateur change de source d'énergie, le hook détecte automatiquement le changement grâce à useEffect, charge le fichier CSV correspondant avec d3.csv(), transforme les données brutes en objets JavaScript typés, et filtre selon les pays sélectionnés. Cela me permet de gérer proprement les états de chargement et les erreurs, tout en gardant mon composant App.jsx simple et lisible."

---

### **Hook 2: useChartData - L'Organisateur de Données**

#### **Qu'est-ce que c'est ?**
C'est un hook qui prend les données brutes et les organise de manière optimale pour les graphiques.

#### **Le problème qu'il résout :**

**Avant (données brutes) :**
```javascript
[
  { entity: "France", year: 1985, electricity: 10 },
  { entity: "France", year: 1986, electricity: 12 },
  { entity: "Germany", year: 1985, electricity: 8 },
  { entity: "Germany", year: 1986, electricity: 9 },
  // ... 480 lignes au total
]
```

**Après (données organisées) :**
```javascript
{
  dataByCountry: Map {
    "France" => [
      { entity: "France", year: 1985, electricity: 10 },
      { entity: "France", year: 1986, electricity: 12 }
    ],
    "Germany" => [
      { entity: "Germany", year: 1985, electricity: 8 },
      { entity: "Germany", year: 1986, electricity: 9 }
    ]
  },
  countries: ["France", "Germany"]
}
```

#### **Comment ça marche ?**

**Étape 1 - Groupement avec D3.js :**
```javascript
// d3.group() est comme un "GROUP BY" en SQL
const dataByCountry = d3.group(filteredData, d => d.entity);

// Résultat : Une Map JavaScript où :
// - Clé = nom du pays
// - Valeur = tableau de toutes les données de ce pays
```

**Étape 2 - Extraction des pays uniques :**
```javascript
const countries = Array.from(dataByCountry.keys());
// ["France", "Germany", "United States", "China"]
```

#### **L'optimisation avec useMemo :**

**Sans useMemo (❌ Problème) :**
```javascript
// À chaque re-render de React, on recalcule tout
// Même si les données n'ont pas changé !
function MyComponent() {
  const result = processChartData(data, countries); // Recalculé 10 fois par seconde
}
```

**Avec useMemo (✅ Solution) :**
```javascript
const result = useMemo(() => {
  return processChartData(data, countries);
}, [data, countries]); // Recalculé SEULEMENT si data ou countries changent
```

#### **Ce que vous dites au jury :**
> "useChartData résout un problème de performance. Quand React re-render mon composant, je ne veux pas recalculer le groupement des données à chaque fois. J'utilise useMemo pour mémoriser le résultat : tant que les données et les pays sélectionnés ne changent pas, je réutilise le calcul précédent. Cela évite des calculs inutiles, surtout avec 480 lignes de données à traiter."

---

### **Hook 3: useColorScale - Le Gestionnaire de Couleurs**

#### **Qu'est-ce que c'est ?**
Un hook qui attribue une couleur unique et cohérente à chaque pays.

#### **Le problème qu'il résout :**

**Sans useColorScale (❌ Problème) :**
```javascript
// À chaque re-render, les couleurs changent aléatoirement !
function LineChart() {
  const color = d3.scaleOrdinal(d3.schemeCategory10); // Nouvelle instance
  // France = bleu
  // [Re-render]
  // France = rouge ??? (incohérent)
}
```

**Avec useColorScale (✅ Solution) :**
```javascript
const colorScale = useMemo(() => {
  return d3.scaleOrdinal()
    .domain(["France", "Germany", "China"])
    .range(d3.schemeCategory10);
}, [countries]); // Stable tant que la liste des pays ne change pas

// France = toujours bleu
// Germany = toujours orange
// China = toujours vert
```

#### **Comment D3 attribue les couleurs :**

```javascript
// d3.schemeCategory10 = palette de 10 couleurs prédéfinies
const colors = [
  "#1f77b4", // bleu
  "#ff7f0e", // orange
  "#2ca02c", // vert
  "#d62728", // rouge
  // ... 6 autres couleurs
];

// Le scale fait le mapping automatiquement :
colorScale("France")  // → "#1f77b4" (bleu)
colorScale("Germany") // → "#ff7f0e" (orange)
```

#### **Ce que vous dites au jury :**
> "useColorScale garantit que chaque pays garde toujours la même couleur dans tous les graphiques. J'utilise d3.schemeCategory10 qui fournit 10 couleurs distinctes optimisées pour la lisibilité. Le hook est mémorisé avec useMemo pour éviter de recréer le scale à chaque render, ce qui assure la cohérence visuelle de l'interface."

---

### **Hook 4: useLineChart - Le Moteur de Visualisation**

#### **Qu'est-ce que c'est ?**
C'est le hook qui contient toute la logique D3.js pour dessiner le graphique en courbes.

#### **Pourquoi séparer la logique dans un hook ?**

**Architecture sans hook (❌ Problème) :**
```javascript
function LineChart({ data }) {
  useEffect(() => {
    // 200 lignes de code D3.js ici
    const svg = d3.select(svgRef.current);
    // ... tout le code de rendu ...
  }, [data]);
  
  return <svg ref={svgRef}></svg>;
}
// Composant illisible et difficile à tester
```

**Architecture avec hook (✅ Solution) :**
```javascript
// useLineChart.js - Logique isolée
export function useLineChart() {
  const renderChart = useCallback((svg, tooltip, data, countries) => {
    // 200 lignes de logique D3.js
  }, []);
  
  return { renderChart };
}

// LineChart.jsx - Composant simple
function LineChart({ data }) {
  const { renderChart } = useLineChart();
  
  useEffect(() => {
    renderChart(svgRef.current, tooltipRef.current, data, countries);
  }, [data, countries]);
  
  return <svg ref={svgRef}></svg>;
}
```

#### **Les étapes du rendu D3.js :**

**Étape 1 - Nettoyage :**
```javascript
const svg = d3.select(svgElement);
svg.selectAll("*").remove(); // Supprime tout l'ancien contenu
```

**Étape 2 - Configuration des dimensions :**
```javascript
const width = 800;
const height = 500;
const margin = { top: 60, right: 150, bottom: 50, left: 70 };

// Zone de dessin réelle (en enlevant les marges)
const innerWidth = 800 - 70 - 150 = 580px;
const innerHeight = 500 - 60 - 50 = 390px;
```

**Étape 3 - Création des échelles :**
```javascript
// Échelle X : Années (1985-2016) → Pixels (0-580)
const x = d3.scaleLinear()
  .domain([1985, 2016])  // Données d'entrée
  .range([0, 580]);      // Pixels de sortie

// Exemple : x(2000) = 290px (milieu du graphique)

// Échelle Y : Électricité (0-500 TWh) → Pixels (390-0)
const y = d3.scaleLinear()
  .domain([0, 500])
  .range([390, 0]); // Inversé car SVG commence en haut

// Exemple : y(250) = 195px (milieu vertical)
```

**Étape 4 - Dessin des lignes :**
```javascript
// Générateur de ligne D3
const lineGenerator = d3.line()
  .x(d => x(d.year))           // Position X de chaque point
  .y(d => y(d.electricity))    // Position Y de chaque point
  .curve(d3.curveMonotoneX);   // Courbe lissée

// Pour chaque pays
countries.forEach((country) => {
  const countryData = dataByCountry.get(country);
  
  // Dessiner la ligne
  svg.append("path")
    .datum(countryData)
    .attr("d", lineGenerator)  // Génère le chemin SVG
    .attr("stroke", colorScale(country))
    .attr("stroke-width", 2.5);
});
```

**Étape 5 - Animations :**
```javascript
// Animation d'entrée progressive
svg.append("path")
  .style("opacity", 0)           // Commence invisible
  .transition()                  // Démarre l'animation
  .duration(600)                 // 600ms
  .delay(countryIndex * 150)     // Décalage entre pays
  .style("opacity", 1);          // Devient visible
```

#### **Ce que vous dites au jury :**
> "useLineChart encapsule toute la logique D3.js dans un hook réutilisable. J'utilise useCallback pour mémoriser la fonction renderChart et éviter sa recréation à chaque render. Le hook gère la création des échelles, le dessin des lignes avec animations progressives, et l'interactivité avec les tooltips. Cette séparation rend mon code testable : je peux tester la logique D3 indépendamment du composant React."

---

## 2️⃣ INTÉGRATION REACT + D3.JS

### **Le Défi Principal**

#### **Le conflit React vs D3 :**

**React veut contrôler le DOM :**
```javascript
// React utilise le Virtual DOM
function MyComponent() {
  return <svg><circle r={5} /></svg>;
}
// React décide quand et comment modifier le DOM réel
```

**D3 veut aussi contrôler le DOM :**
```javascript
// D3 manipule directement le DOM
d3.select("svg").append("circle").attr("r", 5);
// D3 modifie le DOM sans passer par React
```

**Résultat : Conflit ! ❌**

### **Ma Solution : Approche Hybride**

#### **React gère la structure, D3 gère le contenu :**

```javascript
function LineChart({ data }) {
  const svgRef = useRef(null); // Référence au DOM
  
  useEffect(() => {
    // React a fini de créer le <svg>
    // Maintenant D3 peut prendre le contrôle
    const svg = d3.select(svgRef.current);
    
    // D3 dessine tout à l'intérieur
    svg.append("circle").attr("r", 5);
  }, [data]);
  
  return (
    <svg ref={svgRef}></svg>  {/* React crée le conteneur */}
  );
}
```

#### **Le cycle de vie complet :**

**1. Premier render :**
```
React crée <svg ref={svgRef}></svg>
    ↓
useEffect se déclenche
    ↓
D3 prend svgRef.current et dessine dedans
    ↓
Graphique affiché ✅
```

**2. Changement de données :**
```
data change (nouveau pays sélectionné)
    ↓
React re-render le composant
    ↓
useEffect se déclenche à nouveau
    ↓
D3 nettoie l'ancien contenu : svg.selectAll("*").remove()
    ↓
D3 redessine avec les nouvelles données
    ↓
Graphique mis à jour ✅
```

### **Pourquoi cette approche ?**

#### **Avantages :**

**1. Performance :**
```javascript
// D3 est optimisé pour manipuler des milliers d'éléments SVG
// 15 pays × 32 années = 480 points
// D3 gère ça sans problème

// React serait plus lent :
{data.map(point => <circle key={point.id} ... />)} // 480 composants React
```

**2. Animations fluides :**
```javascript
// D3 a un moteur d'animation natif très performant
circle.transition()
  .duration(300)
  .attr("r", 10); // Animation GPU-accelerated

// React nécessiterait une librairie externe (Framer Motion, etc.)
```

**3. Contrôle total :**
```javascript
// Avec D3, je contrôle chaque pixel
svg.append("line")
  .attr("x1", 100)
  .attr("y1", 200)
  .attr("stroke-dasharray", "5,5"); // Ligne pointillée personnalisée
```

#### **Ce que vous dites au jury :**
> "L'intégration React-D3 est un défi classique car les deux veulent contrôler le DOM. J'ai choisi une approche hybride : React gère la structure et le cycle de vie avec useRef et useEffect, tandis que D3 manipule directement le contenu SVG. À chaque changement de données, je nettoie complètement le SVG avec selectAll remove, puis je redessine. Cette approche me donne les avantages de React pour la gestion d'état et de D3 pour les performances de rendu et les animations."

---

## 3️⃣ GESTION D'ÉTAT

### **Pourquoi pas Redux ou Context API ?**

#### **Mon analyse :**

**Critères pour Redux/Context :**
- ✅ État partagé entre beaucoup de composants
- ✅ État profondément imbriqué (5+ niveaux)
- ✅ Logique métier complexe
- ✅ Besoin de middleware (logging, async)

**Mon projet :**
- ❌ État partagé entre 3-4 composants seulement
- ❌ Hiérarchie peu profonde (2 niveaux max)
- ❌ Logique simple (sélection de pays/source)
- ❌ Pas besoin de middleware

**Conclusion : useState suffit !**

### **Architecture de l'état :**

```javascript
// App.jsx - État centralisé
function App() {
  // 1. Source d'énergie sélectionnée
  const [source, setSource] = useState("renouvelable");
  
  // 2. Pays sélectionnés
  const [selectedCountries, setSelectedCountries] = useState([
    "France", "Germany", "United States", "China"
  ]);
  
  // 3. Type de graphique
  const [chartType, setChartType] = useState("line");
  
  // 4. État du sidebar mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
}
```

### **Flux de données unidirectionnel :**

```
App.jsx (État)
    ↓ Props
CountrySelector (Affichage)
    ↓ Callback
onCountriesChange(newSelection)
    ↓
App.jsx → setSelectedCountries(newSelection)
    ↓
Re-render avec nouvel état
```

### **Synchronisation des états :**

#### **Problème : Race Condition**

```javascript
// ❌ Mauvaise approche
function handleSourceChange(newSource) {
  setSource(newSource);
  // selectedCountries contient encore les pays de l'ancienne source !
  // Certains pays peuvent ne pas exister dans la nouvelle source
}
```

#### **Solution : Reset coordonné**

```javascript
// ✅ Bonne approche
function handleSourceChange(newSource) {
  setSource(newSource);
  // Reset immédiat avec des pays par défaut
  setSelectedCountries(["France", "Germany", "United States", "China"]);
  // Garantit la cohérence des données
}
```

#### **Ce que vous dites au jury :**
> "J'ai choisi useState plutôt que Redux car mon état est simple et peu profond. L'état est centralisé dans App.jsx et descend via props aux composants enfants. Pour éviter les incohérences, quand l'utilisateur change de source d'énergie, je reset automatiquement la sélection de pays avec des valeurs par défaut. Cette approche est plus simple à maintenir et suffit largement pour ce projet."

---

## 4️⃣ OPTIMISATIONS PERFORMANCE

### **1. Mémoïsation avec useMemo**

#### **Le problème :**

```javascript
function MyComponent({ data, countries }) {
  // ❌ Recalculé à CHAQUE render, même si data n'a pas changé
  const processed = processData(data, countries);
  
  return <Chart data={processed} />;
}

// Si le parent re-render 10 fois par seconde
// → processData() appelé 10 fois par seconde
// → Gaspillage de CPU
```

#### **La solution :**

```javascript
function MyComponent({ data, countries }) {
  // ✅ Recalculé SEULEMENT si data ou countries changent
  const processed = useMemo(() => {
    return processData(data, countries);
  }, [data, countries]);
  
  return <Chart data={processed} />;
}
```

#### **Exemple concret dans mon projet :**

```javascript
// useChartData.js
export function useChartData(data, selectedCountries) {
  return useMemo(() => {
    // Groupement avec D3 (opération coûteuse)
    const dataByCountry = d3.group(data, d => d.entity);
    return { dataByCountry, countries: Array.from(dataByCountry.keys()) };
  }, [data, selectedCountries]);
  // Mémorisé : évite de regrouper 480 lignes à chaque render
}
```

### **2. useCallback pour les fonctions**

#### **Le problème :**

```javascript
function Parent() {
  // ❌ Nouvelle fonction créée à chaque render
  const handleClick = () => {
    console.log("clicked");
  };
  
  // Child re-render même si rien n'a changé
  return <Child onClick={handleClick} />;
}
```

#### **La solution :**

```javascript
function Parent() {
  // ✅ Même fonction réutilisée entre les renders
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // Dépendances vides = fonction stable
  
  return <Child onClick={handleClick} />;
}
```

### **3. Build Optimisé avec Vite**

#### **Configuration :**

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'd3': ['d3'],  // D3 dans un fichier séparé
          'react': ['react', 'react-dom']  // React dans un autre
        }
      }
    }
  }
}
```

#### **Résultat :**

```
Avant optimisation:
- bundle.js: 250 KB

Après optimisation:
- react.js: 45 KB (chargé 1 fois, mis en cache)
- d3.js: 80 KB (chargé 1 fois, mis en cache)
- app.js: 35 KB (seul fichier qui change)
- Total gzippé: 67 KB ✅
```

#### **Ce que vous dites au jury :**
> "J'ai optimisé les performances avec trois techniques : useMemo pour éviter les recalculs coûteux comme le groupement D3, useCallback pour stabiliser les fonctions et éviter les re-renders inutiles, et le code-splitting Vite pour séparer React et D3 dans des chunks cachés par le navigateur. Le résultat final est un bundle de 67KB gzippé qui se charge en moins de 1.2 seconde."

---

## 5️⃣ DÉFIS TECHNIQUES RÉSOLUS

### **Défi 1 : Responsive SVG**

#### **Le problème :**

```javascript
// ❌ SVG avec dimensions fixes
<svg width="800" height="500">
  // Sur mobile (375px de large) → déborde et scroll horizontal
</svg>
```

#### **Ma solution :**

```javascript
// ✅ SVG responsive avec viewBox
svg
  .attr("viewBox", "0 0 800 500")  // Coordonnées internes fixes
  .attr("preserveAspectRatio", "xMidYMid meet")  // Garde les proportions
  .style("max-width", "100%")  // S'adapte au conteneur
  .style("height", "auto");    // Hauteur proportionnelle

// Résultat :
// Desktop (1920px) → SVG = 800px
// Tablet (768px) → SVG = 768px
// Mobile (375px) → SVG = 375px
// Mais les coordonnées internes restent 0-800 / 0-500
```

### **Défi 2 : Tooltip qui sort de l'écran**

#### **Le problème :**

```javascript
// ❌ Tooltip fixe à droite du curseur
tooltip.style("left", event.offsetX + 15 + "px");

// Sur mobile, si curseur à droite → tooltip sort de l'écran
```

#### **Solution actuelle :**

```javascript
// Limitation de largeur + word-wrap
.tooltip {
  max-width: 12rem;  // 192px max
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

#### **Solution future (amélioration) :**

```javascript
// Détection intelligente des bords
const tooltipWidth = tooltipElement.offsetWidth;
const screenWidth = window.innerWidth;

const left = (event.offsetX + tooltipWidth + 15 > screenWidth)
  ? event.offsetX - tooltipWidth - 15  // Afficher à gauche
  : event.offsetX + 15;                // Afficher à droite

tooltip.style("left", left + "px");
```

### **Défi 3 : Animations performantes**

#### **Le problème :**

```javascript
// 15 pays × 32 années = 480 cercles à animer
// Animation naïve → lag sur mobile

countries.forEach(country => {
  countryData.forEach(point => {
    circle.transition().duration(1000); // 480 animations de 1s
  });
});
```

#### **Ma solution :**

```javascript
// Stagger intelligent + durées courtes
countries.forEach((country, countryIndex) => {
  countryData.forEach((point, pointIndex) => {
    circle
      .transition()
      .duration(300)  // 300ms au lieu de 1000ms
      .delay(countryIndex * 100 + pointIndex * 20)  // Décalage progressif
      .attr("r", 4);
  });
});

// Résultat :
// Pays 1 : points apparaissent de 0ms à 640ms
// Pays 2 : points apparaissent de 100ms à 740ms
// Animation fluide et rapide ✅
```

#### **Ce que vous dites au jury :**
> "J'ai rencontré trois défis majeurs. Pour le responsive, j'utilise viewBox SVG qui garde des coordonnées internes fixes tout en s'adaptant à la taille de l'écran. Pour les tooltips, j'ai limité leur largeur et ajouté du word-wrap, avec une amélioration future prévue pour détecter les bords de l'écran. Pour les animations, j'ai optimisé avec des durées courtes et un stagger intelligent qui anime progressivement les 480 points sans ralentir l'interface."

---

## 🎯 PHRASES CLÉS POUR LE JURY

### **Sur l'architecture :**
> "J'ai structuré le projet en séparant clairement les responsabilités : les composants UI gèrent l'affichage, les hooks personnalisés encapsulent la logique métier, et D3.js s'occupe du rendu SVG. Cette architecture modulaire facilite la maintenance et les tests."

### **Sur React + D3 :**
> "L'intégration React-D3 utilise une approche hybride : React contrôle le cycle de vie avec useRef et useEffect, tandis que D3 manipule directement le DOM SVG pour des performances optimales. Je nettoie systématiquement le contenu avant chaque re-render pour éviter les conflits."

### **Sur les performances :**
> "J'ai optimisé avec useMemo pour éviter les recalculs coûteux, useCallback pour stabiliser les fonctions, et le code-splitting Vite pour réduire le bundle à 67KB gzippé. Le résultat est un temps de chargement inférieur à 1.2 seconde."

### **Sur la gestion d'état :**
> "J'ai choisi useState plutôt que Redux car l'état est simple et peu profond. L'état est centralisé dans App.jsx et descend via props. Pour garantir la cohérence, je reset automatiquement la sélection de pays lors du changement de source d'énergie."

### **Sur les hooks personnalisés :**
> "J'ai créé 4 hooks : useCSVData pour le chargement asynchrone, useChartData pour le traitement des données avec mémoïsation, useColorScale pour la cohérence visuelle, et useLineChart pour encapsuler la logique D3. Cela rend le code réutilisable et testable."

---

**Bonne chance pour votre entretien UM6P ! 🚀**
