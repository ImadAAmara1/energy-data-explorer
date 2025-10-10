# 🚀 Guide de Publication sur GitHub

## 📋 Checklist Avant Publication

### 1. Vérifications Finales
- [ ] Tester `npm run dev` fonctionne
- [ ] Tester `npm run build` sans erreurs
- [ ] Vérifier qu'il n'y a pas d'erreurs console
- [ ] Tester toutes les fonctionnalités
- [ ] Vérifier le responsive design

### 2. Fichiers à Personnaliser

#### package.json
```json
"author": "Votre Nom",
"repository": {
  "url": "https://github.com/VOTRE_USERNAME/energy-data-explorer.git"
}
```

#### README.md
Remplacer :
- `yourusername` par votre username GitHub
- `your.email@example.com` par votre email
- `@yourtwitter` par votre Twitter (optionnel)

#### LICENSE
Remplacer `[Your Name]` par votre nom

#### vite.config.js
Remplacer `'/energy-data-explorer/'` par `'/VOTRE_REPO_NAME/'`

---

## 🎯 Étapes de Publication

### Étape 1: Créer le Repository GitHub

1. Aller sur [GitHub](https://github.com)
2. Cliquer sur "New repository"
3. Nom: `energy-data-explorer`
4. Description: "Interactive platform for visualizing global electricity production data"
5. Public
6. Ne pas initialiser avec README (on a déjà le nôtre)
7. Cliquer "Create repository"

### Étape 2: Initialiser Git Localement

```bash
# Dans le dossier du projet
cd Energy-Data-Explorer

# Initialiser git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Energy Data Explorer v1.0.0"

# Ajouter le remote
git remote add origin https://github.com/VOTRE_USERNAME/energy-data-explorer.git

# Pousser vers GitHub
git branch -M main
git push -u origin main
```

### Étape 3: Configurer GitHub Pages

1. Aller dans Settings > Pages
2. Source: "GitHub Actions"
3. Le workflow `.github/workflows/deploy.yml` se lancera automatiquement
4. Attendre 2-3 minutes
5. Votre site sera disponible à: `https://VOTRE_USERNAME.github.io/energy-data-explorer/`

### Étape 4: Ajouter des Topics

Dans votre repo GitHub:
1. Cliquer sur ⚙️ à côté de "About"
2. Ajouter ces topics:
   - `react`
   - `d3js`
   - `data-visualization`
   - `energy`
   - `dashboard`
   - `vite`
   - `tailwindcss`
   - `charts`
   - `renewable-energy`

### Étape 5: Créer une Release

```bash
# Créer un tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Pousser le tag
git push origin v1.0.0
```

Puis sur GitHub:
1. Aller dans "Releases"
2. "Create a new release"
3. Choisir le tag v1.0.0
4. Titre: "Energy Data Explorer v1.0.0"
5. Description: Copier depuis CHANGELOG.md
6. "Publish release"

---

## 📸 Ajouter des Screenshots

### Créer le dossier docs
```bash
mkdir docs
```

### Prendre des screenshots
1. Ouvrir l'application
2. Prendre des captures d'écran de qualité
3. Les sauvegarder dans `docs/`
   - `screenshot-main.png` (dashboard principal)
   - `screenshot-charts.png` (graphiques)
   - `screenshot-animation.png` (animation)

### Optimiser les images
- Utiliser un outil comme TinyPNG
- Taille recommandée: 1200-1600px de largeur
- Format: PNG ou JPG

---

## 🎨 Personnaliser le README

### Ajouter un Logo
```markdown
<div align="center">
  <img src="docs/logo.png" alt="Logo" width="200"/>
</div>
```

### Ajouter des GIFs
Pour montrer les animations:
```markdown
![Animation Demo](docs/demo.gif)
```

Créer des GIFs avec:
- [ScreenToGif](https://www.screentogif.com/)
- [LICEcap](https://www.cockos.com/licecap/)

---

## 🔧 Configuration Avancée

### Activer GitHub Discussions
Settings > Features > Discussions ✓

### Ajouter des Labels
Issues > Labels > New label
- `bug` (rouge)
- `enhancement` (bleu)
- `documentation` (vert)
- `good first issue` (violet)
- `help wanted` (jaune)

### Protéger la branche main
Settings > Branches > Add rule
- Branch name pattern: `main`
- ✓ Require pull request reviews
- ✓ Require status checks to pass

---

## 📊 Ajouter des Badges Supplémentaires

```markdown
![GitHub stars](https://img.shields.io/github/stars/VOTRE_USERNAME/energy-data-explorer?style=social)
![GitHub forks](https://img.shields.io/github/forks/VOTRE_USERNAME/energy-data-explorer?style=social)
![GitHub issues](https://img.shields.io/github/issues/VOTRE_USERNAME/energy-data-explorer)
![GitHub pull requests](https://img.shields.io/github/issues-pr/VOTRE_USERNAME/energy-data-explorer)
![GitHub last commit](https://img.shields.io/github/last-commit/VOTRE_USERNAME/energy-data-explorer)
```

---

## 🌐 Promouvoir Votre Projet

### Sur GitHub
- Ajouter à vos repositories épinglés
- Partager dans GitHub Discussions
- Soumettre à [Awesome Lists](https://github.com/topics/awesome)

### Sur les Réseaux Sociaux
- LinkedIn avec screenshots
- Twitter avec #ReactJS #DataViz #D3js
- Dev.to avec un article détaillé
- Reddit r/reactjs, r/dataisbeautiful

### Portfolio
- Ajouter le lien dans votre CV
- Créer une page dédiée sur votre site
- Mentionner dans votre profil GitHub

---

## ✅ Checklist Finale

- [ ] Repository créé sur GitHub
- [ ] Code poussé sur main
- [ ] GitHub Pages configuré et fonctionnel
- [ ] README personnalisé avec votre username
- [ ] LICENSE avec votre nom
- [ ] Screenshots ajoutés
- [ ] Topics configurés
- [ ] Release v1.0.0 créée
- [ ] Repository épinglé sur votre profil
- [ ] Lien ajouté à votre CV/Portfolio

---

## 🎉 Félicitations !

Votre projet est maintenant public et professionnel sur GitHub ! 🚀

**URL de votre projet:**
`https://github.com/VOTRE_USERNAME/energy-data-explorer`

**URL de la démo live:**
`https://VOTRE_USERNAME.github.io/energy-data-explorer/`

---

## 📝 Commandes Git Utiles

```bash
# Vérifier le statut
git status

# Ajouter des modifications
git add .
git commit -m "Description des changements"
git push

# Créer une nouvelle branche
git checkout -b feature/nouvelle-fonctionnalite

# Fusionner une branche
git checkout main
git merge feature/nouvelle-fonctionnalite

# Voir l'historique
git log --oneline --graph

# Annuler le dernier commit (garder les changements)
git reset --soft HEAD~1
```

---

**Bon courage pour votre publication ! 🌟**
