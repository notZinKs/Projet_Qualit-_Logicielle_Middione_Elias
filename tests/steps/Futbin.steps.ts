import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Page, expect } from '@playwright/test';
import { FutbinHomePage } from '../pages/FutbinHomePage';
import { FutbinPlayerPage } from '../pages/FutbinPlayerPage';
import { FutbinLoginPage } from '../pages/FutbinLoginPage';

setDefaultTimeout(60 * 1000);

let page: Page;
let futbinHomePage: FutbinHomePage;
let futbinPlayerPage: FutbinPlayerPage;
let futbinLoginPage: FutbinLoginPage;

Given('je suis sur la page d\'accueil de Futbin', async function () {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
  });
  page = await context.newPage();
  
  futbinHomePage = new FutbinHomePage(page);
  await futbinHomePage.ouvrir();
});

When('je recherche {string} dans la barre de recherche', async function (terme: string) {
  await futbinHomePage.rechercher(terme);
});

When('je lance la recherche', async function () {
  await futbinHomePage.validerRecherche();
});

Then('le titre de la page joueur doit contenir {string}', async function (terme: string) {
  futbinPlayerPage = new FutbinPlayerPage(page);
  await futbinPlayerPage.verifierTitreJoueur(terme);
});

When('je navigue vers le menu {string}', async function (menu: string) {
  await futbinHomePage.naviguerVersMenu(menu);
});

Then('l\'URL doit contenir {string}', async function (partieUrl: string) {
  await expect(page).toHaveURL(new RegExp(partieUrl));
});

Then('je devrais voir le filtre nommé {string}', async function (filtre: string) {
  futbinPlayerPage = new FutbinPlayerPage(page);
  await futbinPlayerPage.verifierFiltreVisible(filtre);
});

When('je clique sur {string}', async function (action: string) {
  if (action === "Login") {
    await futbinHomePage.allerVersPageLogin();
  }
});

When('je remplis le formulaire avec {string} et {string}', async function (user: string, pass: string) {
  futbinLoginPage = new FutbinLoginPage(page);
  await futbinLoginPage.login(user, pass);
});

When('je valide la connexion', async function () {
  await futbinLoginPage.clickLoginButton();
});

Then('je dois voir un message d\'erreur ou rester sur la page de login', async function () {
  await expect(page.getByText('Please enter correct user details.')).toBeVisible();
});

When('je clique sur le bouton des plateformes', async function () {
  await futbinHomePage.ouvrirMenuPlateforme();
});

When('je clique sur l\'option PC', async function () {
  await futbinHomePage.choisirPC();
});

Then('l\'option PC doit être active dans le menu déroulant', async function () {
  await futbinHomePage.verifierOptionPCActive();
});

When('je clique sur la section Objectives', async function () {
  await futbinHomePage.cliquerObjectives();
});

When('je clique sur l\'onglet Foundations', async function () {
  await futbinHomePage.cliquerFoundations();
});

When('je clique sur l\'objectif spécifique', async function () {
  await futbinHomePage.ouvrirObjectifSpecifique();
});