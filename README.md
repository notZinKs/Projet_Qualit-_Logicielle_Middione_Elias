# Projet_Qualit-_Logicielle_Middione_Elias
Projet qualité logicielle


Projet d'Automatisation de Tests - Futbin
Ce projet a pour but d'automatiser des scénarios de test sur le site Futbin en utilisant Playwright, Cucumber et le langage TypeScript.

Le projet respecte l'architecture Page Object Model (POM) pour une meilleure maintenabilité du code.

1. Le Site Choisi
Site web : https://www.futbin.com/

Description : Futbin est une plateforme de référence pour les joueurs de FIFA. Elle fournit une base de données complète des joueurs, les prix du marché en temps réel, et bien d'autres options. Le site a été choisi pour sa complexité (menus déroulants, bannières cookies, contenu dynamique), mais surtout car c'est un site que j'utilise au quotidien, alors j'ai trouvé intéressant de travailler dessus.

2. Scénarios Testés
Les scénarios suivants ont été implémentés et automatisés dans le fichier futbin.feature :

Recherche de joueur :
Recherche d'un joueur ("Mbappé") via la barre de recherche globale.
Validation des résultats.

Navigation via le menu principal :
Accès au menu "Players".
Vérification de l'URL et de la présence de filtres spécifiques.

Tentative de connexion (Test Négatif) :
Ouverture de la fenêtre modale de connexion (popup).
Saisie d'identifiants incorrects.
Vérification du message d'erreur "Please enter correct user details" (sans changement d'URL).

Changement de plateforme de jeu :
Ouverture du menu des plateformes (PlayStation/Xbox par défaut).
Sélection de la plateforme "PC".
Vérification que l'option PC est bien active en réouvrant le menu.

Navigation vers un objectif spécifique (Foundations) :
Accès à la page "Objectives".
Clic sur l'onglet spécifique "Foundations".
Sélection d'une carte d'objectif permanente ("Path to Pro Objectives Reward").

3. Installation et Exécution
Prérequis:
Node.js installé sur la machine.
Navigateurs installés via Playwright.

Installation
Cloner le dépôt, puis installer les dépendances :
git clone
git add .
git push
npm install (playwright, cucumber)

Pour lancer l'ensemble des scénarios automatisés :
npx cucumber-js

4. Difficultés Rencontrées
Au cours du développement, plusieurs défis techniques ont été surmontés :
Gestion des Cookies : La bannière de consentement s'affiche dès l'arrivée. Une méthode gererCookies() a été créée pour la fermer systématiquement avant chaque test.
Fenêtre Modale de Connexion : Le formulaire de login n'est pas une page séparée mais une popup. Il a fallu gérer les interactions dans celle-ci et valider l'erreur via le texte visible plutôt que via l'URL.
Menus déroulants : Lors du changement de plateforme, le menu se referme immédiatement après le clic, rendant l'élément "PC" invisible. La solution a été de coder une étape qui réouvre le menu pour vérifier l'état de l'option (seul endroit où l'on pouvait avoir un locator propre à la plateforme PC).
Sélecteurs Dynamiques (Objectifs) : Les cartes d'objectifs changent souvent (événements temporaires). Pour stabiliser le test, nous avons ciblé l'onglet "Foundations" et une carte spécifique qui ne change pas, plutôt que de prendre "le premier élément" au hasard.

5. Structure du Projet
L'architecture respecte le modèle MVC / POM :
features/ : Contient les fichiers .feature (Gherkin).
src/pages/ : Contient les classes (Page Objects) avec les sélecteurs et les méthodes.
src/steps/ : Contient la liaison entre Gherkin et le code TypeScript.
