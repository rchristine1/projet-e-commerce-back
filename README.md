
# Introduction 
Cette application est une application Web de site e-commerce.
Ce module est la partie backend de l'application.
L'application permet 
    d'afficher les produits, 
    d'ajouter un produit ( disponible uniquement pour l'administrateur),
    de modifier un produit ( disponible uniquement pour l'administrateur),
    de supprimer un produit ( disponible uniquement pour l'administrateur),
    de voir le détail d'un produit,
    d'ajouter un produit au panier en choisissant sa quantité
    de modifier la quantité du produit,
    de supprimer le produit du panier,
    d'afficher le montant du panier et le nombre d'articles,
    d'afficher le produit et la quantité dans le panier,
    de se logguer avec un identifiant ( l'email),
Les produits sont stockés en base de données.
Les users ne sont pas persistants sauf le user administrateur(monnom@domaine.fr)

Les routes disponibles sont 
    la page d'accueil /
    la récupération de tous les produits 
    la récupération d'un produit 
    l'ajout d'un produit
    la modification d'un produit
    la suppression d'un produit
    l'ajout d'un produit au panier
    la modification de la quantité dans le panier
    la suppression d'un article dans le panier
## BACKEND
### Les pre-requis

Vérifier que nodejs est installé
    node -v
    npm -v
Sinon installer nodejs
Installer une base de données
Installer express
Installer session
Installer cors
Installer my-sql
Installer jest

### Installation

Installer tous les composants dans un répertoire 

### Base de données

Créer une database mysql ecommerce.
Un script de création de la table est disponible dans le répertoire bdd :
ecommerce-create.sql
Un script d'insertion de quelques produits est disponible dans le répertoire bdd:
ecommerce-insertion.sql

### Configuration

Le port d'écoute par défaut est le 3004, il est modifiable dans le fichier : app.js
Le nom de la base de données ainsi que le user de connection à la base et son mot de passe sont configurables dans le fichier

/backend/src/db_utils.js


### Utilisation

Dans le répertoire racine de l'application,démarrer le serveur en lançant:

node api.js

### Tester unitairement
Pour lancer les tests unitaires, lancer la commande npm test

## FRONTEND
### Installation des composants frontend
L'application front est une application react

### Pre-requis
Installer Bootstrap
Installer react-bootstrap-icons

### Démarrer le serveur de développement pour tester l'application
npm start
le port par défaut est le port 3000

### Tester unitairement
Pour lancer les tests unitaires, lancer la commande npm test

