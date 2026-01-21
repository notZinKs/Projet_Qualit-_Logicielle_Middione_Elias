Feature: Recherche et Navigation sur Futbin

  Background:
    Given je suis sur la page d'accueil de Futbin

  Scenario: Recherche d'un joueur existant
    When je recherche "Mbappé" dans la barre de recherche
    And je lance la recherche
    Then le titre de la page joueur doit contenir "Mbappé"

  Scenario: Navigation via le menu
    When je navigue vers le menu "Players"
    Then l'URL doit contenir "/players"
    And je devrais voir le filtre nommé "Version"

  Scenario: Tentative de connexion (Test d'erreur)
    When je clique sur "Login"
    And je remplis le formulaire avec "elias@blabla.com" et "MdpElias"
    And je valide la connexion
    Then je dois voir un message d'erreur ou rester sur la page de login

  Scenario: Changement de plateforme de jeu
    When je clique sur le bouton des plateformes
    And je clique sur l'option PC
    Then l'option PC doit être active dans le menu déroulant
  
  Scenario: Navigation vers les objectifs
    When je clique sur la section Objectives
    Then l'URL doit contenir "/objectives"

  Scenario: Navigation vers un objectif Foundation spécifique
    When je clique sur la section Objectives
    And je clique sur l'onglet Foundations
    And je clique sur l'objectif spécifique
    Then l'URL doit contenir "/objectives/77/0/249/path-to-pro"