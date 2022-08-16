function formPrint() {
	const mainSections = document.querySelectorAll('form > fieldset[id^="main"]');
    let scoreArray = [0, 0, 0, 0, 0, 0];
    let sections = new Array(mainSections.length);
    
    const mainElements = document.querySelectorAll('fieldset[id^="main"], .main, body > *:not(form)');
    mainElements.forEach(element => element.classList.add("printHidden"));
    
    mainSections.forEach(sectionIterate);
    sections.forEach(myFunction);
    
    function sectionIterate(section, i, arr) {
        let questions = section.querySelectorAll('fieldset.main');
        sections[i] = new Array(questions.length);
        questions.forEach(questionIterate, i);
        
        function questionIterate(question, j, arr) {
            const radios = question.querySelectorAll('input[type="radio"]');
            sections[i][j] = radios;
        }
    }
    
    function myFunction(section, i, arr) {
        section.forEach(otherFunction);
        
        function otherFunction(radioList, j, arr) {
            radioList.forEach(thatFunction);
            
            function thatFunction(radio, k, arr) {
                if (radio.checked) {
                    scoreArray[radio.value]++;
                    if (1 <= radio.value && radio.value <= 4) {
                        radio.parentNode.classList.remove('printHidden');
                        radio.parentNode.parentNode.classList.remove('printHidden');
                        radio.parentNode.parentNode.parentNode.classList.remove('printHidden');
                    }
                }
            }
        }
    }
    
    let scoreInputs = document.querySelectorAll('.score input:not([name$="t"])');
    
    scoreInputs.forEach(setScore);
    setTotal(scoreArray);
    
    function setScore(scoreInput, i, arr) {
        const name = scoreInput.getAttribute('name');
        const endIndex = name.length - 1;
        const scoreValue = name.substring(endIndex);
        if (0 < scoreValue && scoreValue < 4) {
            const scoreAmount = scoreArray[scoreValue];
            scoreInput.setAttribute("value", scoreAmount);
        }
    }
    
    window.print();
}

function formCSV() {
    const mainSections = document.querySelectorAll('form > fieldset[id^="main"]');
    let scoreArray = [0, 0, 0, 0, 0, 0];
    let sections = new Array(mainSections.length);
    
    const mainElements = document.querySelectorAll('fieldset[id^="main"], .main, body > *:not(form)');
    mainElements.forEach(element => element.classList.add("printHidden"));
    
    mainSections.forEach(sectionIterate);
    sections.forEach(myFunction);
    
    function sectionIterate(section, i, arr) {
        let questions = section.querySelectorAll('fieldset.main');
        sections[i] = new Array(questions.length);
        questions.forEach(questionIterate, i);
        
        function questionIterate(question, j, arr) {
            const radios = question.querySelectorAll('input[type="radio"]');
            sections[i][j] = radios;
        }
    }
    
    function myFunction(section, i, arr) {
        section.forEach(otherFunction);
        
        function otherFunction(radioList, j, arr) {
            radioList.forEach(thatFunction);
            
            function thatFunction(radio, k, arr) {
                if (radio.checked) {
                    scoreArray[radio.value]++;
                    if (1 <= radio.value && radio.value <= 4) {
                        radio.parentNode.classList.remove('printHidden');
                        radio.parentNode.parentNode.classList.remove('printHidden');
                        radio.parentNode.parentNode.parentNode.classList.remove('printHidden');
                    }
                }
            }
        }
    }
    
    let scoreInputs = document.querySelectorAll('.score input:not([name$="t"])');
    
    scoreInputs.forEach(setScore);
    
    function setScore(scoreInput, i, arr) {
        const name = scoreInput.getAttribute('name');
        const endIndex = name.length - 1;
        const scoreValue = name.substring(endIndex);
        if (0 < scoreValue && scoreValue < 4) {
            const scoreAmount = scoreArray[scoreValue];
            scoreInput.setAttribute("value", scoreAmount);
        }
    }
    
    const finalScores = setTotal(scoreArray);
    
    /* note: get actual CSV generation working
     * from HTML forms, hopefully */
}

function setTotal(scoreArray) {
    const score1 = scoreArray[1];
    const score2 = scoreArray[2];
    const score3 = scoreArray[3];

    const weight1 = 1;
    const weight2 = 2;
    const weight3 = 3;

    const scoreTotal = (score1 * weight1) + (score2 * weight2) + (score3 * weight3);

    let totInput = document.querySelectorAll('.score input[name$="t"]');
    totInput.forEach(total);

    function total(tot, i, arr) {
        tot.setAttribute("value", scoreTotal);
    }
    
    const finalArray = new Array(4);
    finalArray[0] = score1;
    finalArray[1] = score2;
    finalArray[2] = score3;
    finalArray[3] = scoreTotal;
    return finalArray;
    
    console.log(finalArray);
}