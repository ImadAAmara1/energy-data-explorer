# 🔧 Points Techniques Avancés

## 1. Gestion d'État Optimisée

### État Local vs État Partagé

```javascript
// App.jsx - État global de l'application
const [source, setSource] = useState("renouvelable");
const [selectedCountries, setSelectedCountries] = useState([...]);
const [chartType, setChartType] = useState("line");

// Propagation intelligente aux composants enfants
<CountrySelector
  selectedCountries={selectedCountries}
  onCountriesChange={setSelectedCountries}
  dataLoading={loading} // Désactive les interactions pendant le chargement
/>
```

### Éviter les Re-renders Inutiles

```javascript
// Utilisation de useRef pour les animations
const animationRef = useRef(null);
const svgRef = useRef(null);
const tooltipRef = useRef(null);

// Pas de re-render quand ces valeurs changent
```

---

## 2. Custom Hooks Réutilisables

### useCSVData Hook

```javascript
export function useCSVData(source, selectedCountries) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Chargement asynchrone
    // Gestion d'erreurs
    // Nettoyage
  }, [source, selectedCountries]);

  return { data, loading, error };
}
```

**Avantages :**

- Logique réutilisable
- Séparation des responsabilités
- Tests unitaires facilités
- Code plus lisible

---

## 3. Visualisations D3.js Avancées

### Intégration React + D3

```javascript
useEffect(() => {
  if (data && selectedCountries.length > 0) {
    renderChart(
      svgRef.current, // Référence DOM
      tooltipRef.current, // Tooltip
      data, // Données
      selectedCountries, // Configuration
      currentYear // État
    );
  }
}, [data, selectedCountries, currentYear]);
```

### Animations Fluides

```javascript
// Transition D3 pour animations
bars
  .transition()
  .duration(750)
  .attr("width", (d) => xScale(d.value))
  .attr("fill", (d) => colorScale(d.country));

// Animation de course avec requestAnimationFrame
function animate() {
  setCurrentYear((year) => year + 1);
  animationRef.current = requestAnimationFrame(animate);
}
```

---

## 4. Performance et Optimisation

### Chargement Asynchrone

```javascript
// Chargement non-bloquant des données
const data = await d3.csv(`./data/generated-from-${source}.csv`);

// Parsing optimisé
const parsedData = data.map((row) => ({
  year: +row.Year,
  value: +row[column],
  country: row.Entity,
}));
```

### Debouncing de la Recherche

```javascript
// Dans CountrySelector - recherche instantanée mais optimisée
const filteredCountries = availableCountries.filter((country) =>
  country.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### Lazy Loading Potentiel

```javascript
// Prêt pour code-splitting
const BarChart = lazy(() => import("./components/charts/BarChart"));
const LineChart = lazy(() => import("./components/charts/LineChart"));
```

---

## 5. Gestion d'Erreurs Robuste

### Try-Catch Complet

```javascript
try {
  const data = await d3.csv(`./data/generated-from-${source}.csv`);
  setData(processData(data));
} catch (error) {
  console.error("Erreur chargement:", error);
  setError(error);
} finally {
  setLoading(false);
}
```

### UI d'Erreur Informative

```javascript
if (error) {
  return (
    <div className="error-state">
      <ErrorIcon />
      <p>Erreur de chargement</p>
      <p>{error.message}</p>
    </div>
  );
}
```

---

## 6. Accessibilité (A11y)

### Sémantique HTML

```jsx
<header role="banner">
<main role="main">
<footer role="contentinfo">
<button aria-label="Lancer l'animation">
```

### États Visuels Clairs

```jsx
// Focus states
focus:outline-none focus:ring-2 focus:ring-green-500

// Disabled states
disabled={loading}
className={loading ? "cursor-not-allowed opacity-50" : ""}

// Loading indicators
{loading && <LoadingSpinner />}
```

### Contraste et Lisibilité

- Ratio de contraste > 4.5:1
- Tailles de police lisibles (text-sm, text-base)
- Espacement généreux

---

## 7. Architecture Modulaire

### Séparation des Responsabilités

```
components/
├── charts/          # Logique de visualisation pure
│   ├── BarChart/
│   │   ├── BarChart.jsx      # Composant React
│   │   └── useBarChart.js    # Logique D3
│   └── LineChart/
│       ├── LineChart.jsx
│       └── useLineChart.js
├── layout/          # Structure de page
├── ui/              # Composants réutilisables
└── CountrySelector.jsx
```

### Composants Découplés

```javascript
// ChartContainer - wrapper générique
export function ChartContainer({ children, className }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// Utilisable partout
<ChartContainer>
  <LineChart data={data} />
</ChartContainer>;
```

---

## 8. Configuration Centralisée

### Constants Pattern

```javascript
// constants/sourceData.js
export const SOURCE_DATA = {
  renouvelable: {
    title: "Énergies Renouvelables",
    description: "...",
    fullDescription: "...",
  },
  // ... autres sources
};

// Utilisation
{
  Object.entries(SOURCE_DATA).map(([key, { title }]) => (
    <option key={key} value={key}>
      {title}
    </option>
  ));
}
```

**Avantages :**

- Modification facile du contenu
- Pas de duplication
- Type-safe (avec TypeScript)
- Internationalization-ready

---

## 9. Responsive Design

### Mobile-First Approach

```jsx
// Tailwind breakpoints
<div className="grid grid-cols-1 md:grid-cols-4 gap-10">
<div className="flex flex-col md:flex-row">

// Panneau latéral adaptatif
<div className="w-full md:w-72">
```

### Touch-Friendly

```jsx
// Zones de clic généreuses
className = "px-4 py-2"; // Minimum 44x44px

// Hover states conditionnels
hover: bg - gray - 50; // Seulement sur desktop
```

---

## 10. Bonnes Pratiques React

### Nommage Cohérent

```javascript
// Composants en PascalCase
export function CountrySelector() {}

// Hooks en camelCase avec 'use'
export function useCSVData() {}

// Constantes en UPPER_SNAKE_CASE
export const SOURCE_DATA = {};
```

### Props Destructuring

```javascript
export function GraphHeader({
  title,
  subtitle,
  chartType,
  onChartTypeChange,
  dataLoading,
}) {
  // Code plus lisible
}
```

### Conditional Rendering Propre

```javascript
{
  loading && <LoadingSpinner />;
}
{
  error && <ErrorMessage error={error} />;
}
{
  data && <Chart data={data} />;
}
```

---

## 11. Styling Moderne

### Tailwind Utility Classes

```jsx
// Composition de styles
className="flex items-center gap-3 px-4 py-2 rounded-lg
           bg-green-600 hover:bg-green-700
           text-white font-medium text-sm
           transition-all shadow-md hover:shadow-lg"
```

### Design Tokens Cohérents

- Couleurs : green-600, emerald-600, gray-900
- Espacements : gap-2, gap-3, px-4, py-2
- Bordures : rounded-lg, rounded-md
- Ombres : shadow-sm, shadow-md

---

## 12. Build et Déploiement

### Vite Configuration

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "terser",
  },
});
```

### Production-Ready

- Tree-shaking automatique
- Code splitting
- Asset optimization
- Source maps pour debugging

---

## 🎯 Points à Mentionner en Entretien

1. **Performance** : Vite, lazy loading, optimisations D3
2. **Maintenabilité** : Architecture modulaire, custom hooks
3. **UX** : États de chargement, gestion d'erreurs, animations
4. **Accessibilité** : Sémantique, contraste, keyboard navigation
5. **Scalabilité** : Configuration centralisée, composants réutilisables
6. **Best Practices** : React patterns, clean code, documentation

---

**Ces points techniques démontrent une maîtrise avancée du développement frontend moderne ! 💪**
