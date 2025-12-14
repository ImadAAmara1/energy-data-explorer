# 📝 CAPTIONS ET DESCRIPTIONS POUR DIAGRAMMES

---

## 1️⃣ STRUCTURE DU PROJET

### Phrase descriptive :
L'architecture du projet suit une organisation modulaire avec séparation claire des responsabilités : les données CSV sont stockées dans `public/data/`, les composants React sont organisés par fonction (charts, layout, ui), et les hooks personnalisés encapsulent la logique métier.

### Caption :
**Figure 1 : Architecture modulaire du projet Energy Data Explorer**  
*Organisation hiérarchique des dossiers et fichiers avec séparation des composants de visualisation (charts), de présentation (layout), d'interface (ui) et de logique métier (hooks).*

---

## 2️⃣ FLUX DE DONNÉES

### Phrase descriptive :
Le flux de données suit un cycle unidirectionnel : l'utilisateur interagit avec l'application, App.jsx orchestre les appels au hook useCSVData qui charge et parse les fichiers CSV via D3.js, puis les données transformées alimentent les composants LineChart ou BarChart pour le rendu SVG final.

### Caption :
**Figure 2 : Flux de données de bout en bout**  
*Cycle complet depuis l'interaction utilisateur jusqu'au rendu graphique, illustrant le chargement asynchrone des données CSV, leur transformation et leur visualisation via D3.js.*

---

## 3️⃣ ARCHITECTURE EN COUCHES

### Phrase descriptive :
L'application est structurée en 5 couches distinctes : App.jsx assure l'orchestration globale, les composants gèrent la présentation, les charts réalisent la visualisation D3.js, les hooks encapsulent la logique métier, et la couche data fournit les sources CSV.

### Caption :
**Figure 3 : Architecture en couches de l'application**  
*Séparation des responsabilités en 5 couches indépendantes garantissant maintenabilité, testabilité et scalabilité du code.*

---

## 4️⃣ CI/CD PIPELINE

### Phrase descriptive :
Le pipeline CI/CD automatise entièrement le déploiement : chaque push sur la branche main déclenche GitHub Actions qui installe les dépendances, build l'application avec Vite, et déploie automatiquement sur GitHub Pages, rendant le site immédiatement accessible.

### Caption :
**Figure 4 : Pipeline CI/CD automatisé**  
*Processus de déploiement continu depuis le commit Git jusqu'à la mise en ligne, garantissant une intégration et un déploiement automatiques sans intervention manuelle.*

---

## 📋 FORMAT POUR RAPPORT

### Template à utiliser dans votre rapport :

```markdown
### 2.2.1 Structure du Projet

L'architecture du projet suit une organisation modulaire avec séparation claire des responsabilités : les données CSV sont stockées dans `public/data/`, les composants React sont organisés par fonction (charts, layout, ui), et les hooks personnalisés encapsulent la logique métier.

![Structure du Projet](./images/structure-projet.png)

**Figure 1 : Architecture modulaire du projet Energy Data Explorer**  
*Organisation hiérarchique des dossiers et fichiers avec séparation des composants de visualisation (charts), de présentation (layout), d'interface (ui) et de logique métier (hooks).*
```

---

## 🎯 VERSIONS COURTES (Pour légendes d'images)

### Structure du Projet
> Architecture modulaire avec séparation des responsabilités (composants, hooks, données)

### Flux de Données
> Cycle unidirectionnel du chargement CSV au rendu SVG via D3.js

### Architecture en Couches
> 5 couches indépendantes : Orchestration → Présentation → Visualisation → Logique → Données

### CI/CD Pipeline
> Déploiement automatisé de Git à GitHub Pages via GitHub Actions

---

## 💡 CONSEILS D'UTILISATION

1. **Phrase descriptive** → Dans le corps du texte avant le diagramme
2. **Caption complète** → Sous le diagramme en italique
3. **Version courte** → Pour les présentations ou résumés

---

## ✨ EXEMPLE COMPLET DANS LE RAPPORT

```markdown
## 2.2 ARCHITECTURE DES COMPOSANTS

### Structure du Projet

L'architecture du projet suit une organisation modulaire avec séparation claire 
des responsabilités : les données CSV sont stockées dans `public/data/`, les 
composants React sont organisés par fonction (charts, layout, ui), et les hooks 
personnalisés encapsulent la logique métier.

Cette structure garantit :
- ✅ **Maintenabilité** - Code organisé et facile à modifier
- ✅ **Scalabilité** - Ajout de fonctionnalités sans refactoring
- ✅ **Testabilité** - Composants et hooks isolés

[INSÉRER DIAGRAMME ICI]

**Figure 1 : Architecture modulaire du projet Energy Data Explorer**  
*Organisation hiérarchique des dossiers et fichiers avec séparation des 
composants de visualisation (charts), de présentation (layout), d'interface 
(ui) et de logique métier (hooks).*

---

### Flux de Données

Le flux de données suit un cycle unidirectionnel : l'utilisateur interagit 
avec l'application, App.jsx orchestre les appels au hook useCSVData qui charge 
et parse les fichiers CSV via D3.js, puis les données transformées alimentent 
les composants LineChart ou BarChart pour le rendu SVG final.

[INSÉRER DIAGRAMME ICI]

**Figure 2 : Flux de données de bout en bout**  
*Cycle complet depuis l'interaction utilisateur jusqu'au rendu graphique, 
illustrant le chargement asynchrone des données CSV, leur transformation et 
leur visualisation via D3.js.*
```

---

**Utilisez ces captions pour un rapport professionnel et académique !**
