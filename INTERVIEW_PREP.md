# 🎯 Guide de Préparation - Entretien UM6P Student Affairs

## 📌 Informations Clés

**Poste:** Développeur Frontend
**Entreprise:** UM6P Student Affairs - Mohammed VI Polytechnic University
**Projet à présenter:** Energy Data Explorer
**Lien démo:** [ImadAAmara1.github.io/energy-data-explorer](https://ImadAAmara1.github.io/energy-data-explorer)

---

## 🎤 Pitch du Projet (30 secondes)

> "Energy Data Explorer est une plateforme interactive de visualisation de données énergétiques mondiales que j'ai développée avec React 19 et D3.js. Elle permet d'analyser et comparer la production d'électricité de 15 pays à travers 10 sources d'énergie sur 32 ans. J'ai implémenté deux visualisations D3.js interactives - des courbes temporelles et une Bar Race animée - avec une architecture modulaire basée sur 4 hooks React personnalisés. Le projet est déployé sur GitHub Pages et démontre ma maîtrise de React, D3.js, et des bonnes pratiques de développement frontend."

---

## 💡 Points Forts à Mettre en Avant

### 1. Alignement avec les Besoins UM6P

| Compétence Demandée | Votre Expérience |
|---------------------|------------------|
| **React** | React 19 avec Hooks API moderne (useState, useEffect, useMemo, useCallback) |
| **Interfaces modernes et responsives** | Design Tailwind CSS responsive (mobile 320px → desktop 1920px) |
| **Code propre et réutilisable** | 4 hooks personnalisés, 15 composants modulaires, architecture claire |
| **Collaboration** | Structure de projet professionnelle, documentation technique complète |
| **API REST** | Chargement asynchrone de données CSV avec gestion d'erreurs |
| **Git** | Projet versionné sur GitHub avec déploiement CI/CD |

### 2. Compétences Techniques Démontrées

✅ **Frontend avancé:**
- Gestion d'état complexe (multi-pays, sources d'énergie, types de graphiques)
- Optimisations performance (mémoïsation, lazy loading)
- Intégration React + D3.js (manipulation DOM hybride)

✅ **UX/UI:**
- Design responsive avec sidebar mobile
- Animations fluides et transitions
- Tooltips intelligents et feedback utilisateur

✅ **Architecture:**
- Séparation des responsabilités (UI / Logique / Visualisation)
- Hooks personnalisés réutilisables
- Build optimisé (67KB gzippé)

---

## 🔥 Questions Techniques Probables + Réponses

### **Q1: Pourquoi avez-vous choisi React + D3.js au lieu d'une bibliothèque comme Recharts ou Chart.js ?**

**Réponse:**
> "J'ai choisi React + D3.js pour avoir un contrôle total sur les visualisations et les animations. D3.js est le standard de l'industrie pour la dataviz et offre une flexibilité incomparable pour créer des animations personnalisées comme la Bar Race. Les bibliothèques comme Recharts sont plus simples mais limitent les possibilités de customisation. J'ai utilisé une approche hybride : React gère le cycle de vie et l'état, tandis que D3 manipule directement le DOM SVG pour les performances."

**Code à montrer:**
```javascript
// Approche hybride dans LineChart
useEffect(() => {
  if (data && selectedCountries.length > 0) {
    // React gère le cycle de vie
    renderChart(svgRef.current, tooltipRef.current, data, selectedCountries);
  }

  // Cleanup pour éviter les memory leaks
  return () => {
    d3.select(svgRef.current).selectAll("*").remove();
  };
}, [data, selectedCountries, renderChart]);
```

---

### **Q2: Comment gérez-vous les optimisations de performance dans votre application ?**

**Réponse:**
> "J'ai appliqué plusieurs techniques d'optimisation. D'abord, j'utilise useMemo pour éviter les recalculs inutiles dans useChartData - le groupement des données par pays n'est recalculé que si les données ou la sélection changent. Ensuite, useCallback stabilise la fonction renderChart pour éviter les re-créations. Pour les animations D3, j'utilise des durées courtes (300ms) et un stagger intelligent pour animer 480 points sans lag. Enfin, Vite optimise le build avec code-splitting automatique - le bundle final fait seulement 67KB gzippé."

**Code à montrer:**
```javascript
// useChartData.js - Mémoïsation
export function useChartData(data, selectedCountries) {
  return useMemo(() => {
    return processChartData(data, selectedCountries);
  }, [data, selectedCountries]); // Recalcul uniquement si ces deps changent
}

// Animations D3 optimisées
chart.selectAll("circle")
  .transition()
  .duration(300) // Court pour fluidité
  .delay((d, i) => i * 20) // Stagger efficace
  .ease(d3.easeCubicOut); // GPU-accelerated
```

---

### **Q3: Comment gérez-vous l'état asynchrone et le chargement des données ?**

**Réponse:**
> "J'ai créé un hook personnalisé useCSVData qui encapsule toute la logique de chargement. Il retourne trois états : data, loading, et error. Dans App.jsx, j'utilise ces états pour afficher un spinner pendant le chargement, un message d'erreur si nécessaire, ou le graphique une fois les données chargées. J'ai aussi synchronisé les états pour désactiver le CountrySelector pendant le chargement et éviter les race conditions."

**Code à montrer:**
```javascript
// useCSVData.js - Hook personnalisé
export function useCSVData(source, selectedCountries = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const rows = await d3.csv(`./data/generated-from-${source}.csv`);
        const processed = rows.map((row) => ({
          entity: row.Entity,
          year: +row.Year,
          electricity: +row.Electricity,
        }));

        const filteredData = selectedCountries.length > 0
          ? processed.filter((row) => selectedCountries.includes(row.entity))
          : processed;

        setData(filteredData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [source, selectedCountries]);

  return { data, loading, error };
}

// App.jsx - Utilisation
const { data, loading, error } = useCSVData(source, selectedCountries);

const renderChartContent = () => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return <LineChart data={data} selectedCountries={selectedCountries} />;
};
```

---

### **Q4: Comment assurez-vous que votre code est maintenable et réutilisable ?**

**Réponse:**
> "J'applique plusieurs principes. D'abord, la séparation des responsabilités : les composants UI sont séparés de la logique métier (hooks) et de la visualisation (D3). Ensuite, j'ai créé des hooks personnalisés réutilisables - useCSVData peut être utilisé pour n'importe quelle source de données CSV, useChartData pour n'importe quel type de graphique. J'utilise aussi des constantes centralisées dans sourceData.js pour éviter la duplication. Enfin, j'ai documenté l'architecture dans ARCHITECTURE.md pour faciliter la compréhension du projet."

**Structure à montrer:**
```
src/
├── components/
│   ├── charts/          # Visualisations D3.js
│   ├── layout/          # Header, Footer, GraphHeader
│   └── ui/              # Composants réutilisables
├── hooks/               # Logique métier isolée
│   ├── useCSVData.js    # Chargement données
│   └── useChartData.js  # Transformation données
├── constants/           # Configuration centralisée
│   └── sourceData.js    # 10 sources d'énergie
└── App.jsx              # Orchestrateur principal
```

---

### **Q5: Avez-vous rencontré des défis techniques ? Comment les avez-vous résolus ?**

**Réponse:**
> "Oui, plusieurs défis. Le plus important était la synchronisation entre React et D3. D3 manipule directement le DOM, ce qui peut créer des conflits avec le Virtual DOM de React. J'ai résolu ça en utilisant des refs pour donner à D3 un accès direct au SVG, et en nettoyant systématiquement le DOM avant chaque re-render avec svg.selectAll('*').remove(). Un autre défi était les race conditions lors du changement de source - j'ai résolu ça en réinitialisant la sélection de pays dans le même handler. Enfin, pour le responsive, j'ai utilisé viewBox et preserveAspectRatio pour que les SVG s'adaptent automatiquement."

**Code à montrer:**
```javascript
// Problème: Race conditions
// ❌ Mauvais
setSource("charbon");
setSelectedCountries([...]); // Peut utiliser l'ancienne source

// ✅ Solution
const onChangeSource = (e) => {
  setSource(e.target.value);
  setSelectedCountries(["France", "Germany", "United States", "China"]);
};

// Problème: Conflits React ↔ D3
// ✅ Solution: Cleanup systématique
useEffect(() => {
  renderChart(svgRef.current, tooltipRef.current, data, selectedCountries);

  return () => {
    d3.select(svgRef.current).selectAll("*").remove(); // Nettoyage
  };
}, [data, selectedCountries, renderChart]);

// Problème: SVG non responsive
// ✅ Solution: viewBox
svg
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("preserveAspectRatio", "xMidYMid meet")
  .style("max-width", "100%")
  .style("height", "auto");
```

---

### **Q6: Comment testeriez-vous cette application ?**

**Réponse:**
> "Je mettrais en place plusieurs niveaux de tests. Pour les hooks, j'utiliserais Vitest avec React Testing Library pour tester useChartData et useCSVData de manière isolée. Pour les composants, je testerais les interactions utilisateur comme la sélection de pays et le changement de source. Pour les visualisations D3, je testerais que les éléments SVG sont bien créés avec les bonnes propriétés. Enfin, j'ajouterais des tests E2E avec Playwright pour vérifier les scénarios complets comme 'sélectionner un pays → voir le graphique se mettre à jour'."

**Exemple de test:**
```javascript
// useChartData.test.js
import { describe, it, expect } from 'vitest';
import { processChartData } from './useChartData';

describe('useChartData', () => {
  it('should group data by country', () => {
    const mockData = [
      { entity: 'France', year: 2000, electricity: 100 },
      { entity: 'France', year: 2001, electricity: 110 },
      { entity: 'Germany', year: 2000, electricity: 90 },
    ];

    const result = processChartData(mockData, ['France', 'Germany']);

    expect(result.countries).toEqual(['France', 'Germany']);
    expect(result.dataByCountry.get('France')).toHaveLength(2);
  });

  it('should filter by selected countries', () => {
    const mockData = [
      { entity: 'France', year: 2000, electricity: 100 },
      { entity: 'Germany', year: 2000, electricity: 90 },
    ];

    const result = processChartData(mockData, ['France']);

    expect(result.countries).toEqual(['France']);
    expect(result.filteredData).toHaveLength(1);
  });
});
```

---

### **Q7: Comment collaboreriez-vous avec une équipe backend et des designers ?**

**Réponse:**
> "Pour le backend, je définirais d'abord un contrat d'API clair - par exemple, un endpoint GET /api/energy?source=renouvelable&countries=France,Germany qui retourne du JSON. Je créerais des mocks pour développer en parallèle. Pour les designers, je travaillerais avec des design systems et des composants réutilisables - par exemple, tous mes boutons utilisent les mêmes classes Tailwind. J'utiliserais Git avec des branches feature, des pull requests pour la revue de code, et des commits descriptifs. Je documenterais aussi les composants pour faciliter la collaboration."

**Exemple d'intégration API:**
```javascript
// Actuellement: CSV statiques
const rows = await d3.csv(`./data/generated-from-${source}.csv`);

// Avec API backend
const response = await fetch(
  `/api/energy?source=${source}&countries=${selectedCountries.join(',')}`
);
const data = await response.json();

// Avec React Query pour cache intelligent
const { data, isLoading, error } = useQuery({
  queryKey: ['energy', source, selectedCountries],
  queryFn: () => fetchEnergyData(source, selectedCountries),
  staleTime: 1000 * 60 * 5, // Cache 5 minutes
});
```

---

## 🐛 Scénarios de Debugging

### **Scénario 1: Le graphique ne s'affiche pas**

**Approche de debugging:**
1. ✅ Vérifier la console pour les erreurs
2. ✅ Vérifier que les données sont chargées: `console.log(data)`
3. ✅ Vérifier que selectedCountries n'est pas vide
4. ✅ Vérifier que le SVG est bien monté: `console.log(svgRef.current)`
5. ✅ Vérifier les dimensions du SVG (width/height > 0)
6. ✅ Inspecter le DOM pour voir si les éléments SVG sont créés

**Solution typique:**
```javascript
// Ajouter des guards
useEffect(() => {
  if (!data || data.length === 0) {
    console.warn('No data available');
    return;
  }

  if (!selectedCountries || selectedCountries.length === 0) {
    console.warn('No countries selected');
    return;
  }

  if (!svgRef.current) {
    console.error('SVG ref not mounted');
    return;
  }

  renderChart(svgRef.current, tooltipRef.current, data, selectedCountries);
}, [data, selectedCountries, renderChart]);
```

---

### **Scénario 2: Performance lente sur mobile**

**Approche de debugging:**
1. ✅ Ouvrir Chrome DevTools → Performance tab
2. ✅ Enregistrer une session pendant l'animation
3. ✅ Identifier les frames > 16ms (60fps)
4. ✅ Vérifier les re-renders inutiles avec React DevTools Profiler
5. ✅ Tester avec moins de pays pour isoler le problème

**Solutions appliquées:**
```javascript
// 1. Réduire la durée des animations
.duration(300) // Au lieu de 1000ms

// 2. Utiliser des easings GPU-accelerated
.ease(d3.easeCubicOut)

// 3. Mémoïser les fonctions coûteuses
const colorScale = useMemo(() =>
  createColorScale(countries),
  [countries]
);

// 4. Limiter le nombre de pays (max 15)
if (selectedCountries.length >= 15) {
  alert('Maximum 15 pays');
  return;
}
```

---

### **Scénario 3: Les tooltips sortent de l'écran**

**Problème actuel:**
```javascript
// Tooltip avec position fixe
tooltip
  .style("left", event.offsetX + 15 + "px")
  .style("top", event.offsetY - 28 + "px");
```

**Solution améliorée:**
```javascript
// Détection des bords + repositionnement
const tooltipWidth = tooltipElement.offsetWidth;
const tooltipHeight = tooltipElement.offsetHeight;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const left = event.offsetX + tooltipWidth + 15 > windowWidth
  ? event.offsetX - tooltipWidth - 15
  : event.offsetX + 15;

const top = event.offsetY + tooltipHeight + 28 > windowHeight
  ? event.offsetY - tooltipHeight - 28
  : event.offsetY - 28;

tooltip
  .style("left", left + "px")
  .style("top", top + "px");
```

---

## 🎯 Extraits de Code Clés à Connaître

### **1. Hook useCSVData (Chargement asynchrone)**

```javascript
export function useCSVData(source, selectedCountries = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const rows = await d3.csv(`./data/generated-from-${source}.csv`);
        const processed = rows.map((row) => ({
          entity: row.Entity,
          year: +row.Year,
          electricity: +row.Electricity,
        }));

        const filteredData = selectedCountries.length > 0
          ? processed.filter((row) => selectedCountries.includes(row.entity))
          : processed;

        setData(filteredData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [source, selectedCountries]);

  return { data, loading, error };
}
```

**Points clés:**
- ✅ Gestion des 3 états (data, loading, error)
- ✅ Parsing avec D3.csv
- ✅ Filtrage par pays sélectionnés
- ✅ Cleanup automatique via useEffect

---

### **2. Hook useChartData (Transformation)**

```javascript
export function useChartData(data, selectedCountries) {
  return useMemo(() => {
    if (!data || data.length === 0) {
      return { dataByCountry: new Map(), countries: [], filteredData: [] };
    }

    const filteredData = selectedCountries.length > 0
      ? data.filter((row) => selectedCountries.includes(row.entity))
      : data;

    const dataByCountry = d3.group(filteredData, (d) => d.entity);
    const countries = Array.from(dataByCountry.keys());

    return { dataByCountry, countries, filteredData };
  }, [data, selectedCountries]);
}
```

**Points clés:**
- ✅ Mémoïsation avec useMemo
- ✅ Groupement avec d3.group()
- ✅ Extraction des clés uniques
- ✅ Guard pour données vides

---

### **3. Gestion d'État dans App.jsx**

```javascript
function App() {
  const [source, setSource] = useState("renouvelable");
  const [selectedCountries, setSelectedCountries] = useState([
    "Morocco", "France", "Germany", "United States", "China"
  ]);
  const [chartType, setChartType] = useState("line");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data, loading, error } = useCSVData(source, selectedCountries);

  const onChangeSource = (e) => {
    setSource(e.target.value);
    setSelectedCountries(["France", "Germany", "United States", "China"]);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Rendu conditionnel basé sur l'état
  const renderChartContent = () => {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage error={error} />;

    switch (chartType) {
      case "line":
        return <LineChart data={data} selectedCountries={selectedCountries} />;
      case "bar":
        return <BarChart data={data} selectedCountries={selectedCountries} />;
      default:
        return <LineChart data={data} selectedCountries={selectedCountries} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex relative">
        <Sidebar />
        <MainContent>{renderChartContent()}</MainContent>
      </div>
      <Footer />
    </div>
  );
}
```

**Points clés:**
- ✅ État centralisé dans App.jsx
- ✅ Pas de Context API (simplicité)
- ✅ Synchronisation des états (reset pays lors du changement de source)
- ✅ Rendu conditionnel basé sur loading/error

---

## 🚀 Extensions Futures à Mentionner

### **1. Tests Automatisés**
```javascript
// Vitest + React Testing Library
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### **2. API Backend**
```javascript
// Remplacement CSV → REST API
GET /api/energy?source=renouvelable&countries=France,Germany&years=2000-2016
```

### **3. Authentification**
```javascript
// Ajout de comptes utilisateurs pour sauvegarder les préférences
- Favoris de pays
- Graphiques personnalisés
- Export de données
```

### **4. Accessibilité Avancée**
```javascript
// Navigation clavier complète
- Tab pour naviguer entre les éléments
- Enter/Space pour sélectionner
- Escape pour fermer les modales
- ARIA labels sur tous les éléments interactifs
```

### **5. Internationalisation**
```javascript
// Support multilingue avec i18next
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<h1>{t('dashboard.title')}</h1>
```

---

## 💼 Questions à Poser au Recruteur

### **Sur le Poste:**
1. Quelle est la stack technique utilisée chez UM6P Student Affairs ?
2. Quels types de projets seraient mes premières missions ?
3. Comment est organisée l'équipe de développement ?
4. Utilisez-vous une méthodologie Agile/Scrum ?

### **Sur les Technologies:**
1. Quels frameworks frontend utilisez-vous (React, Vue, Angular) ?
2. Avez-vous une API backend existante ou faut-il la créer ?
3. Utilisez-vous TypeScript ou JavaScript ?
4. Quels outils de CI/CD sont en place ?

### **Sur la Collaboration:**
1. Comment se passe la collaboration entre frontend et backend ?
2. Y a-t-il des designers dans l'équipe ?
3. Utilisez-vous un design system ou une bibliothèque de composants ?
4. Quel est le process de revue de code ?

### **Sur l'Évolution:**
1. Quelles opportunités de formation et de montée en compétences ?
2. Y a-t-il des projets innovants en cours (IA, data viz, etc.) ?
3. Comment mesurez-vous la performance et la qualité du code ?

---

## 📊 Métriques à Mentionner

### **Performance:**
- ⚡ First Contentful Paint: < 1.2s
- ⚡ Time to Interactive: < 2.5s
- ⚡ Bundle Size: 67KB gzippé
- ⚡ Lighthouse Score: 95+

### **Complexité:**
- 📦 15 composants React
- 🪝 4 hooks personnalisés
- 📄 ~1200 lignes de code
- 📚 5 dépendances principales

### **Couverture:**
- 🌐 Chrome 90+, Firefox 88+, Safari 14+
- 📱 Responsive: 320px → 1920px
- ♿ Accessibilité: WCAG 2.1 Level AA

---

## 🎓 Soft Skills à Démontrer

### **1. Autonomie**
> "J'ai conçu et développé ce projet de A à Z - de l'architecture à la documentation en passant par le déploiement. J'ai pris des décisions techniques justifiées et documenté mes choix."

### **2. Sens du Détail**
> "J'ai porté attention aux détails UX comme les animations fluides, les tooltips intelligents, et le feedback visuel pendant le chargement. J'ai aussi optimisé le bundle pour la performance."

### **3. Communication**
> "J'ai créé une documentation technique complète (ARCHITECTURE.md) pour faciliter la compréhension du projet. Je peux expliquer mes choix techniques de manière claire."

### **4. Respect des Délais**
> "J'ai structuré le développement en phases : MVP avec LineChart, puis ajout du BarChart animé, puis optimisations. Cette approche itérative permet de livrer rapidement."

### **5. Capacité d'Apprentissage**
> "J'ai appris D3.js spécifiquement pour ce projet. J'ai étudié la documentation, testé différentes approches, et résolu les défis d'intégration avec React."

---

## ✅ Checklist Avant l'Entretien

### **Préparation Technique:**
- [ ] Relire ARCHITECTURE.md
- [ ] Tester la démo live sur mobile et desktop
- [ ] Préparer des exemples de code à montrer
- [ ] Réviser les concepts React (hooks, lifecycle, performance)
- [ ] Réviser les concepts D3.js (scales, transitions, selections)

### **Préparation Projet:**
- [ ] Pouvoir expliquer chaque choix technique
- [ ] Connaître les métriques de performance
- [ ] Avoir des exemples de bugs résolus
- [ ] Préparer des questions sur UM6P

### **Matériel:**
- [ ] Laptop chargé avec démo locale fonctionnelle
- [ ] Connexion internet stable pour la démo live
- [ ] Code source ouvert dans l'IDE
- [ ] Documentation accessible (ARCHITECTURE.md, README.md)

### **Mental:**
- [ ] Être confiant sur vos compétences
- [ ] Être honnête sur ce que vous ne savez pas
- [ ] Montrer votre enthousiasme pour le poste
- [ ] Être prêt à apprendre et à collaborer

---

## 🎯 Phrase de Conclusion

> "Ce projet démontre ma capacité à créer des interfaces modernes et performantes avec React, à intégrer des visualisations complexes avec D3.js, et à structurer du code maintenable. Je suis enthousiaste à l'idée d'apporter ces compétences à UM6P Student Affairs et de contribuer à améliorer l'expérience des étudiants et partenaires à travers des plateformes digitales innovantes."

---

**Bonne chance pour votre entretien ! 🚀**

*Développé par Imad Amara - Préparation pour UM6P Student Affairs*
