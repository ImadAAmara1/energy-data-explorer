# ⚡ Quick Start Guide

## 🎯 Pour Publier sur GitHub en 5 Minutes

### 1️⃣ Personnaliser les Fichiers (2 min)

**package.json** - Ligne 5-6:

```json
"author": "VOTRE_NOM",
```

**package.json** - Ligne 17-19:

```json
"repository": {
  "url": "https://github.com/VOTRE_USERNAME/energy-data-explorer.git"
}
```

**LICENSE** - Ligne 3:

```
Copyright (c) 2025 VOTRE_NOM
```

**vite.config.js** - Ligne 7:

```javascript
base: process.env.NODE_ENV === 'production' ? '/energy-data-explorer/' : '/',
```

**README.md** - Remplacer tous les `yourusername` par votre username GitHub

### 2️⃣ Créer le Repository GitHub (1 min)

1. Aller sur https://github.com/new
2. Nom: `energy-data-explorer`
3. Description: "Interactive platform for visualizing global electricity production data"
4. Public ✓
5. Créer

### 3️⃣ Pousser le Code (2 min)

```bash
cd Energy-Data-Explorer

git init
git add .
git commit -m "Initial commit: Energy Data Explorer v1.0.0"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/energy-data-explorer.git
git push -u origin main
```

### 4️⃣ Activer GitHub Pages (30 sec)

1. Settings > Pages
2. Source: "GitHub Actions"
3. Attendre 2-3 minutes
4. ✅ Site live à: `https://VOTRE_USERNAME.github.io/energy-data-explorer/`

---

## 🎨 Optionnel: Ajouter des Screenshots

```bash
# Créer le dossier docs (déjà fait)
# Ajouter vos screenshots dans docs/
# Nommer: screenshot-main.png, screenshot-charts.png, etc.

git add docs/
git commit -m "Add screenshots"
git push
```

---

## 🏷️ Créer une Release

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

Puis sur GitHub: Releases > Create a new release > v1.0.0

---

## ✅ Checklist Finale

- [ ] `package.json` personnalisé
- [ ] `LICENSE` avec votre nom
- [ ] `vite.config.js` avec votre repo name
- [ ] `README.md` avec votre username
- [ ] Repository créé sur GitHub
- [ ] Code poussé
- [ ] GitHub Pages activé
- [ ] Site fonctionnel
- [ ] Screenshots ajoutés (optionnel)
- [ ] Release créée (optionnel)

---

## 🚀 Votre Projet est Live !

**Repository:** `https://github.com/VOTRE_USERNAME/energy-data-explorer`

**Demo:** `https://VOTRE_USERNAME.github.io/energy-data-explorer/`

---

## 📚 Documentation Complète

Pour plus de détails, voir:

- [GITHUB_SETUP.md](GITHUB_SETUP.md) - Guide complet
- [DEPLOYMENT.md](DEPLOYMENT.md) - Options de déploiement
- [CONTRIBUTING.md](CONTRIBUTING.md) - Guide de contribution

---

**Félicitations ! Votre projet est maintenant sur GitHub ! 🎉**
