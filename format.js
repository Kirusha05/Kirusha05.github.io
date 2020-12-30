function formatEquation(equation) {

  // Apa sub forma de H20 sau H-OH, subst simple, oxizi, baze, acizi, saruri, baze cu paranteze si fara paranteze
  const substanteRegex = /(H-OH)|([A-Z][a-z]?\d*\(([A-Z][a-z]?\d*){2}\)\d+)|(([A-Z][a-z]?\d*)+↑?)/g;

  let equationAllElements = equation.split(' ');

  let finalFormatted = equationAllElements.map(substance => {
    if ((substance === '+') || (substance === '➞')) return substance;

    // Curat substantele, fara coeficient
    let substanceNoCoefficient = substance.match(substanteRegex);

    // Indexul subst propriu-zise, fara coeficient 
    let substanceIndex = substance.indexOf(substanceNoCoefficient);

    // De la inceput pana la subst. propriu-zisa
    let coefficient = substance.substring(0, substanceIndex);

    // Pentru planuri de viitor
    if (coefficient === '') coefficient = '1';

    // COLORARE -------------------------------------
    let formattedSubstance = ``;
    // Daca coeficientul nu este 1, care se subintelege
    if (coefficient !== '1') {
      formattedSubstance += `<span class="coefficient">${coefficient}</span>`;
    }
    // $1 este grupul din parantezele regex
    formattedSubstance += `<span class="substance">${substanceNoCoefficient[0].replace(/(\d)/g, "<sub>$1</sub>")}</span>`;

    return formattedSubstance;
  })

  return finalFormatted.join(' ');
}

export default formatEquation;