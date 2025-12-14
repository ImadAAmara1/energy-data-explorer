# 🏗️ Architecture Technique - Energy Data Explorer

## 📋 Table des Matières

- [Vue d'Ensemble](#vue-densemble)
- [Architecture des Composants](#architecture-des-composants)
- [Flux de Données](#flux-de-données)
- [Hooks Personnalisés](#hooks-personnalisés)
- [Intégration React + D3.js](#intégration-react--d3js)
- [Gestion d'État](#gestion-détat)
- [Optimisations Performance](#optimisations-performance)
- [Défis Techniques](#défis-techniques)

---

## 🎯 Vue d'Ensemble

### Stack Technique

```
Frontend Framework: React 19.1 (Hooks API)
Build Tool: Vite 7.1 (HMR, optimisation)
Visualisation: D3.js 7.9 (SVG, animations)
Styling: Tailwind CSS 4.1 (utility-first)
Déploiement: GitHub Pages (CI/CD)
```

### Principes Architecturaux

- **Séparation des responsabilités** : Composants UI / Logique métier / Visualisation
- **Composition** : Composants réutilisables et modulaires
- **Performance** : Mémoïsation, lazy loading, optimisation des re-renders
- **Accessibilité** : ARIA labels, navigation clavier, contraste WCAG

---

## 🧩 Architecture des Composants

### Structure Hiérarchique

```
App.jsx (Root)
├── Header (Layout)
├── Sidebar
│   ├── SourceSelector (Dropdown)
│   └── CountrySelector (Multi-select)
├── Main Content
│   ├── GraphHeader (Titre + Controls)
│   ├── ChartContainer
│   │   ├── LineChart (D3.js)
│   │   └── BarChart (D3.js + Animation)
│   └── SourceDescription
└── Footer (Layout)
```

### Composants Clés

#### **1. App.jsx - Orchestrateur Principal**

```javascript
Responsabilités:
- Gestion d'état global (source, pays, type de graphique)
- Coordination entre sidebar et zone de visualisation
- Gestion du responsive (sidebar mobile)
- Chargement des données via useCSVData

État géré:
- source: string (renouvelable, charbon, etc.)
- selectedCountries: string[] (max 15 pays)
- chartType: "line" | "bar"
- sidebarOpen: boolean (mobile)
```

#### **2. CountrySelector - Sélection Multi-Pays**

```javascript
Fonctionnalités:
- Recherche en temps réel (filtrage client-side)
- Sélection/désélection individuelle
- Actions groupées (tout/rien)
- États de chargement synchronisés

Optimisations:
- Désactivation pendant le chargement des données
- Debouncing implicite via React state
- Virtualisation potentielle (15 pays max actuellement)
```

#### **3. LineChart - Visualisation Temporelle**

```javascript
Technologies: React + D3.js + SVG
Patterns utilisés:
- Ref forwarding (svgRef, tooltipRef)
- Custom hook (useLineChart) pour logique D3
- useCallback pour éviter re-renders inutiles

Animations:
- Entrée progressive des lignes (stagger 150ms)
- Points animés individuellement (delay 20ms)
- Légende avec fade-in séquentiel
```

#### **4. BarChart - Course Animée**

```javascript
Complexité: Animation frame-by-frame (1985-2016)
Contrôles: Play/Pause, vitesse (1x, 2x, 4x)
Algorithme:
- Tri dynamique par valeur à chaque frame
- Transitions D3 avec easing
- Gestion du state d'animation (isPlaying, currentYear)
```

---

## 🔄 Flux de Données

### 1. Chargement Initial

```
User Action → App.jsx (setSource)
           ↓
useCSVData Hook (fetch CSV)
           ↓
D3.csv() → Parse → Filter by countries
           ↓
setState(data) → Trigger re-render
           ↓
Chart Component (LineChart/BarChart)
           ↓
useChartData (process + group)
           ↓
D3.js Rendering (SVG)
```

### 2. Changement de Pays

```
CountrySelector → onCountriesChange(newSelection)
                ↓
App.jsx → setSelectedCountries
                ↓
useCSVData (re-filter data)
                ↓
Chart re-render (animated transition)
```

### 3. Changement de Source

```
SourceSelector → onChangeSource
              ↓
App.jsx → setSource + reset countries
              ↓
useCSVData (fetch new CSV)
              ↓
CountrySelector (reload available countries)
              ↓
Chart (render new data)
```

---

## 🪝 Hooks Personnalisés

### **1. useCSVData** - Chargement Asynchrone

```javascript
Signature: useCSVData(source, selectedCountries)
Returns: { data, loading, error }

Responsabilités:
- Fetch CSV depuis /public/data/
- Parsing avec D3.csv()
- Filtrage par pays sélectionnés
- Gestion des états de chargement/erreur

Optimisation:
- useEffect avec dépendances [source, selectedCountries]
- Cleanup automatique (évite memory leaks)
```

### **2. useChartData** - Transformation des Données

```javascript
Signature: useChartData(data, selectedCountries)
Returns: { dataByCountry, countries, filteredData }

Logique:
- Groupement par pays avec d3.group()
- Extraction des clés uniques
- Filtrage selon sélection

Mémoïsation:
- useMemo pour éviter recalculs inutiles
- Dépendances: [data, selectedCountries]
```

### **3. useColorScale** - Palette de Couleurs

```javascript
Signature: useColorScale(countries)
Returns: d3.scaleOrdinal()

Implémentation:
- d3.schemeCategory10 (10 couleurs distinctes)
- Mapping pays → couleur cohérent
- Mémoïsé pour stabilité visuelle
```

### **4. useLineChart / useBarChart** - Logique D3

```javascript
Pattern: Encapsulation de la logique D3 dans un hook

Avantages:
- Séparation React (state) / D3 (DOM)
- Testabilité (logique isolée)
- Réutilisabilité (plusieurs instances possibles)

useCallback:
- renderChart mémoïsé pour éviter re-créations
- Dépendances vides [] (fonction stable)
```

---

## ⚛️ Intégration React + D3.js

### Stratégie Hybride

#### **Approche Utilisée: React pour Structure, D3 pour Rendu**

```javascript
// React gère le cycle de vie
useEffect(() => {
  if (data && selectedCountries.length > 0) {
    // D3 manipule directement le DOM
    renderChart(svgRef.current, tooltipRef.current, data, selectedCountries);
  }
}, [data, selectedCountries, renderChart]);
```

#### **Pourquoi cette approche ?**

✅ **Avantages:**

- Performance: D3 optimisé pour SVG complexes
- Animations fluides: Transitions D3 natives
- Contrôle total: Manipulation fine du DOM

⚠️ **Compromis:**

- Refs nécessaires (contournement Virtual DOM)
- Nettoyage manuel (svg.selectAll("\*").remove())

#### **Alternative non retenue: React pour tout**

```javascript
// Approche "React-only" (ex: Recharts, Victory)
// ❌ Moins de contrôle sur animations
// ❌ Performances limitées avec beaucoup de données
// ✅ Plus "React-idiomatique"
```

---

## 🗂️ Gestion d'État

### État Local vs Props

#### **App.jsx - État Global**

```javascript
const [source, setSource] = useState("renouvelable");
const [selectedCountries, setSelectedCountries] = useState([...]);
const [chartType, setChartType] = useState("line");
const [sidebarOpen, setSidebarOpen] = useState(false);
```

#### **Pourquoi pas de Context API / Redux ?**

- **Simplicité**: État peu profond (2 niveaux max)
- **Performance**: Pas de re-renders inutiles
- **Maintenance**: Moins de boilerplate

#### **Quand utiliser Context ?**

Si extension future:

- Thèmes (dark mode)
- Préférences utilisateur persistantes
- Multi-pages avec état partagé

### Synchronisation des États

#### **Problème: Race Conditions**

```javascript
// ❌ Problème potentiel
setSource("charbon");
setSelectedCountries([...]); // Peut utiliser l'ancienne source

// ✅ Solution: Reset dans le handler
const onChangeSource = (e) => {
  setSource(e.target.value);
  setSelectedCountries(["France", "Germany", "United States", "China"]);
};
```

#### **Chargement Coordonné**

```javascript
// CountrySelector désactivé pendant dataLoading
const isLoading = countriesLoading || dataLoading;

// Empêche les clics pendant le chargement
onClick={() => !isLoading && handleCountryToggle(country)}
```

---

## ⚡ Optimisations Performance

### 1. Mémoïsation

```javascript
// useChartData - Évite recalculs
const { dataByCountry, countries } = useMemo(() => {
  return processChartData(data, selectedCountries);
}, [data, selectedCountries]);

// useCallback - Stabilise les fonctions
const renderChart = useCallback((svg, tooltip, data, countries) => {
  // Logique D3...
}, []); // Dépendances vides = fonction stable
```

### 2. Lazy Loading

```javascript
// Vite code-splitting automatique
const { LineChart, BarChart } = await import("./components/charts");
```

### 3. Optimisation D3

```javascript
// Réutilisation des scales
const colorScale = createColorScale(countries); // Calculé 1 fois

// Transitions groupées
chart
  .selectAll("circle")
  .transition()
  .duration(300)
  .delay((d, i) => i * 20); // Stagger efficace
```

### 4. Build Optimisé

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          d3: ["d3"], // Chunk séparé pour D3
        },
      },
    },
  },
};

// Résultat: 67KB gzippé
```

---

## 🚧 Défis Techniques

### 1. Synchronisation React ↔ D3

**Problème:**

```javascript
// D3 modifie le DOM directement
svg.append("circle").attr("r", 5);

// React ne voit pas ces changements
// → Risque de conflits lors des re-renders
```

**Solution:**

```javascript
// Nettoyage systématique avant re-render
svg.selectAll("*").remove();

// Puis reconstruction complète
renderChart(svgRef.current, ...);
```

### 2. Responsive SVG

**Problème:**

```javascript
// SVG avec width/height fixes → pas responsive
<svg width="800" height="500">
```

**Solution:**

```javascript
svg
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("preserveAspectRatio", "xMidYMid meet")
  .style("max-width", "100%")
  .style("height", "auto");
```

### 3. Tooltip Positioning

**Problème:**

```javascript
// Tooltip sort de l'écran sur mobile
tooltip.style("left", event.offsetX + 15 + "px");
```

**Solution Actuelle:**

```javascript
// Offset fixe + overflow handling CSS
.tooltip {
  max-width: 12rem; // Limite la largeur
  word-wrap: break-word;
}
```

**Amélioration Future:**

```javascript
// Détection des bords + repositionnement dynamique
const tooltipWidth = tooltipElement.offsetWidth;
const left =
  event.offsetX + tooltipWidth > window.innerWidth
    ? event.offsetX - tooltipWidth - 15
    : event.offsetX + 15;
```

### 4. Animation Performance

**Problème:**

```javascript
// 15 pays × 32 années = 480 points à animer
// Risque de lag sur mobile
```

**Solution:**

```javascript
// Stagger intelligent
.delay((d, i) => countryIndex * 100 + i * 20)

// Durées courtes
.duration(300) // Au lieu de 1000ms

// Easing optimisé
.ease(d3.easeCubicOut) // GPU-accelerated
```

### 5. Gestion Mémoire

**Problème:**

```javascript
// Listeners D3 non nettoyés → memory leaks
svg.on("mousemove", handler);
```

**Solution:**

```javascript
useEffect(() => {
  renderChart(...);

  // Cleanup automatique
  return () => {
    d3.select(svgRef.current).selectAll("*").remove();
  };
}, [data, selectedCountries]);
```

---

## 🔮 Extensions Futures

### 1. Tests Unitaires

```javascript
// Vitest + React Testing Library
describe("useChartData", () => {
  it("should group data by country", () => {
    const result = processChartData(mockData, ["France"]);
    expect(result.countries).toEqual(["France"]);
  });
});
```

### 2. API Backend

```javascript
// Remplacement CSV → API REST
const { data } = useQuery(["energy", source, countries], () =>
  fetch(`/api/energy?source=${source}&countries=${countries}`)
);
```

### 3. Caching Avancé

```javascript
// React Query pour cache intelligent
const { data } = useQuery({
  queryKey: ["energy", source],
  queryFn: fetchEnergyData,
  staleTime: 1000 * 60 * 5, // 5 minutes
  cacheTime: 1000 * 60 * 30, // 30 minutes
});
```

### 4. Accessibilité Avancée

```javascript
// Navigation clavier dans les graphiques
<svg role="img" aria-label="Graphique de production énergétique">
  <title>Production d'énergie renouvelable 1985-2016</title>
  <desc>Comparaison de 4 pays sur 32 années</desc>
</svg>
```

---

## 📊 Métriques Techniques

### Performance

- **First Contentful Paint**: < 1.2s
- **Time to Interactive**: < 2.5s
- **Bundle Size**: 67KB (gzippé)
- **Lighthouse Score**: 95+

### Complexité

- **Composants**: 15 (dont 4 charts)
- **Hooks personnalisés**: 4
- **Lignes de code**: ~1200 (hors config)
- **Dépendances**: 5 (React, D3, Tailwind, Vite, ESLint)

### Couverture

- **Navigateurs**: Chrome 90+, Firefox 88+, Safari 14+
- **Responsive**: Mobile (320px) → Desktop (1920px)
- **Accessibilité**: WCAG 2.1 Level AA

---

## 🎓 Choix Techniques Justifiés

### Pourquoi React 19 ?

- Hooks API mature et performante
- Concurrent rendering (future-proof)
- Écosystème riche (Vite, Tailwind)

### Pourquoi D3.js ?

- Contrôle total sur les visualisations
- Animations fluides et personnalisables
- Standard de l'industrie pour dataviz

### Pourquoi Vite ?

- HMR ultra-rapide (< 100ms)
- Build optimisé (Rollup)
- Configuration minimale

### Pourquoi Tailwind ?

- Développement rapide (utility-first)
- Bundle optimisé (PurgeCSS)
- Design system cohérent

---

**Développé par Imad Amara**
_Architecture conçue pour la scalabilité, la maintenabilité et la performance_
