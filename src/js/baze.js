const clasificareEl = document.getElementById('clasificare');
const propChimiceEl = document.getElementById('proprietati-chimice');
const navElement = document.getElementById('navbar_sections');

import formatEquation from './format.js';
import basesJSON from '../../data/baze_info.js';

let sectionsDistanceFromTopArray = [];

function init() {
  createClasificationSection(basesJSON);
  createRulesSection(basesJSON);
  createNav();
}

// Fast, but import syntax is faster
/* fetch('../data/metale.json')
  .then(res => res.json())
  .then(data => {
    createSETM(data);
    createClasificationSection(data);
    createRulesSection(data);
    formatSetmKeyword();
  }) */

// Clasificarea bazelor
function createClasificationSection(JSON) {
  let clasificareHTML = ``;
  clasificareHTML += `<ul>`;

  JSON["clasificare"].forEach(tipulBaz => {
    clasificareHTML += `<li><span class="important">• ${tipulBaz}</span></li>`
  })

  clasificareHTML += `</ul>`;

  clasificareHTML += `<p>Bazele alcaline sunt bazele metalelor alcaline sau alcalino-pământoase (grupa I și II, subgrupa principală).</p>`

  // Adauga lista in DOM
  clasificareEl.insertAdjacentHTML('beforeend', clasificareHTML);
}

// Proprietati chimice
function createRulesSection(JSON) {
  let reguliHTML = ``;
  // Apa, nemetale etc.
  let substancesThatInteract = JSON["proprietati_chimice"];
  // Substanta
  for (let subst in substancesThatInteract) {
    reguliHTML += `<div id="${subst}" class="sub-sectiune">`; // wrapper div start

    reguliHTML += `<h3 class="deosebit sub-sectiune_titlu">${subst}:</h3>`;

    // Regulile
    reguliHTML += `<ul>`

    substancesThatInteract[subst]['reguli'].forEach((rule, index) => {
      reguliHTML += `<li><span class="list-num">${index + 1}.</span> ${rule}.</li>`;
    })

    reguliHTML += `</ul>`;

    // Exemplele
    let examplesHTML = `<div class="ecuatii_exemplu">`;
    substancesThatInteract[subst]['reactii_exemplu'].forEach(equationExample => {
      examplesHTML += `<p>${formatEquation(equationExample)}</p>`
    });
    examplesHTML += `</div>`

    reguliHTML += examplesHTML;
    reguliHTML += `</div>` // wrapper div end
  }

  // Adauga regulile in DOM
  propChimiceEl.insertAdjacentHTML('beforeend', reguliHTML);
}

function createNav() {
  let navHTML = ``;
  let sections = document.querySelectorAll('.sectiune');

  sections.forEach(section => {
    let sectionID = section.id;
    let sectionName = section.querySelector('.sectiune_titlu').innerText;

    navHTML += `<li class="nav_section">
    <a href="#${sectionID}" class="nav_section-name">${sectionName}</a>
                  <ul class="navbar_sub-sections">`

    let subSections = section.querySelectorAll('.sub-sectiune');

    subSections.forEach(subSection => {

      sectionsDistanceFromTopArray.push([subSection, window.pageYOffset + subSection.getBoundingClientRect().top]);

      let subSectionID = subSection.id;

      navHTML += `<li class="nav_sub-section">
                    <a href="#${subSectionID}" class="nav_sub-section-name">${subSectionID}</a>
                    <li>`
    })

    navHTML += `</ul></li>`
  })

  navElement.innerHTML = navHTML;
}

window.addEventListener('DOMContentLoaded', navHighlighterOnScroll);
window.addEventListener('scroll', navHighlighterOnScroll);

function navHighlighterOnScroll() {
  let offsetFromViewportTop = 130; // offset when to color the section in the navbar
  for (let i = 0; i < sectionsDistanceFromTopArray.length; i++) {
    // if the top of the page is above the section; the top distance is less than the distance + section's height; section is 130px y-axis off from the top of viewport 
    if (window.pageYOffset + offsetFromViewportTop > sectionsDistanceFromTopArray[i][1] && window.pageYOffset + offsetFromViewportTop < sectionsDistanceFromTopArray[i][1] + sectionsDistanceFromTopArray[i][0].getBoundingClientRect().height) {
      navElement.querySelector(`[href="#${sectionsDistanceFromTopArray[i][0].id}"]`).classList.add('nav-section-visible');
    } else {
      navElement.querySelector(`[href="#${sectionsDistanceFromTopArray[i][0].id}"]`).classList.remove('nav-section-visible');
    }
  }
}

init();