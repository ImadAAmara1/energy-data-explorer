# 📊 DIAGRAMME STRUCTURE DU PROJET

## Version Simple (Fonctionne partout)

```mermaid
graph TD
    A[energy-data-explorer] --> B[public/data]
    A --> C[src]
    A --> D[.github]
    A --> E[config]
    
    B --> B1[10 fichiers CSV]
    
    C --> C1[components]
    C --> C2[hooks]
    C --> C3[constants]
    C --> C4[App.jsx]
    
    C1 --> C1A[charts]
    C1 --> C1B[layout]
    C1 --> C1C[ui]
    
    C1A --> C1A1[LineChart]
    C1A --> C1A2[BarChart]
    
    C2 --> C2A[useCSVData.js]
    C2 --> C2B[useLineChart.js]
    C2 --> C2C[useBarChart.js]
    
    style A fill:#4CAF50,color:#fff
    style C fill:#2196F3,color:#fff
    style C1 fill:#FF9800,color:#fff
    style C1A fill:#E91E63,color:#fff
    style C2 fill:#9C27B0,color:#fff
```

## Flux de Données

```mermaid
graph LR
    A[Utilisateur] --> B[App.jsx]
    B --> C[useCSVData]
    C --> D[D3.csv]
    D --> E[Données CSV]
    E --> F[LineChart/BarChart]
    F --> G[SVG Rendu]
    G --> A
    
    style B fill:#4CAF50,color:#fff
    style C fill:#2196F3,color:#fff
    style F fill:#FF9800,color:#fff
```

## Architecture en Couches

```mermaid
graph TB
    A[App.jsx - Orchestration]
    B[Components - Presentation]
    C[Charts - Visualisation]
    D[Hooks - Logique]
    E[Data - CSV Files]
    
    A --> B
    A --> C
    A --> D
    C --> D
    D --> E
    
    style A fill:#4CAF50,color:#fff
    style B fill:#2196F3,color:#fff
    style C fill:#FF9800,color:#fff
    style D fill:#9C27B0,color:#fff
    style E fill:#607D8B,color:#fff
```

## CI/CD Pipeline

```mermaid
graph LR
    A[git push] --> B[GitHub Actions]
    B --> C[npm install]
    C --> D[npm build]
    D --> E[Deploy]
    E --> F[GitHub Pages]
    F --> G[Live Site]
    
    style A fill:#4CAF50,color:#fff
    style B fill:#2196F3,color:#fff
    style D fill:#FF9800,color:#fff
    style G fill:#E91E63,color:#fff
```

---

## 🎯 ALTERNATIVE : Diagramme ASCII (Toujours compatible)

```
energy-data-explorer/
│
├── public/
│   └── data/
│       ├── renouvelable.csv
│       ├── solaire.csv
│       └── ... (8 autres)
│
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── LineChart/
│   │   │   │   ├── LineChart.jsx
│   │   │   │   └── useLineChart.js
│   │   │   └── BarChart/
│   │   │       ├── BarChart.jsx
│   │   │       └── useBarChart.js
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── GraphHeader.jsx
│   │   └── ui/
│   │       ├── ChartContainer.jsx
│   │       └── LoadingSpinner.jsx
│   │
│   ├── hooks/
│   │   ├── useCSVData.js
│   │   └── useChartData.js
│   │
│   ├── constants/
│   │   └── sourceData.js
│   │
│   └── App.jsx
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
└── Config Files
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

---

## 📊 FLUX DE DONNÉES (ASCII)

```
┌─────────────┐
│ Utilisateur │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   App.jsx   │ ◄── État global (source, countries)
└──────┬──────┘
       │
       ├──► useCSVData(source, countries)
       │         │
       │         ▼
       │    ┌──────────┐
       │    │ D3.csv() │
       │    └────┬─────┘
       │         │
       │         ▼
       │    ┌─────────────────┐
       │    │ public/data/*.csv│
       │    └────┬────────────┘
       │         │
       │         ▼
       │    ┌──────────────┐
       │    │ Transformation│
       │    └────┬─────────┘
       │         │
       │         ▼
       │    { data, loading, error }
       │         │
       ▼         ▼
┌──────────────────────┐
│ LineChart / BarChart │
└──────────┬───────────┘
           │
           ▼
    ┌─────────────┐
    │ useLineChart│
    │ useBarChart │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │  D3.js SVG  │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │  Affichage  │
    └─────────────┘
```

---

## 🎨 POUR CRÉER UNE IMAGE PROFESSIONNELLE

### Utilisez Excalidraw (Recommandé)

1. Allez sur **https://excalidraw.com**
2. Créez votre diagramme manuellement
3. Exportez en PNG haute résolution
4. Placez dans `docs/images/architecture.png`

### Ou utilisez ce template ASCII ci-dessus

Il est déjà professionnel et fonctionne partout (Markdown, PDF, GitHub) !

---

**Les 4 diagrammes Mermaid simples ci-dessus fonctionnent à 100% !**

Testez-les sur https://mermaid.live en copiant TOUT le bloc (y compris la ligne `graph TD`)
