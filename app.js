'use strict';

if (!localStorage['team1']) {
    localStorage.setItem('team1','0');
    localStorage.setItem('team2','0');
    localStorage.setItem('team3','0');
    localStorage.setItem('team4','0');
    localStorage.setItem('team5','0');
}

var counter = 0;

const CLEAN_BOOK = 500;
const DIRTY_BOOK = 300;
const CARDS_DICT = {
    numbered: 5,
    face: 10,
    wild: 20,
    joker: 50,
    redThree: 300
};

var scoreBoard = document.getElementById("score-board");
var scoreBoardArray = scoreBoard.querySelectorAll("span");
(function () {
    for (var i=0; i < localStorage.length; i++) {
        var re = /team*/;
        if (localStorage.key(i) == localStorage.key(i).match(re).input) {
            document.getElementById(localStorage.key(i)+"-score").innerHTML = localStorage.getItem(localStorage.key(i));
        }
    }
})();

// Input number of clean / dirty books & calculate

function addPoints(team) {
    event.preventDefault();

    var team = team.toString();
    var score = Number(localStorage.getItem(team));
    var thisForm = document.forms[team + "-add"]
    score += ((thisForm.elements.clean.value)*CLEAN_BOOK) + ((thisForm.elements.dirty.value)*DIRTY_BOOK) + 
    ((thisForm.elements['cards-numbered'].value)*CARDS_DICT.numbered) + ((thisForm.elements['cards-face'].value)*CARDS_DICT.face) +
    ((thisForm.elements['cards-wild'].value)*CARDS_DICT.wild) + ((thisForm.elements['cards-joker'].value)*CARDS_DICT.joker) + 
    ((thisForm.elements['extra-points'].value) * 1);
    
    localStorage.setItem(team, score);
    
    document.getElementById(team+"-score").innerHTML = score;

    var thisFormInput = thisForm.getElementsByTagName("input");
    for (var i=0; i < thisFormInput.length; i++) {
        thisFormInput[i].value = 0;
    }
    var preview = document.getElementById(team + "-add-preview");
    preview.innerHTML = 0;

    var collapseForm = document.getElementById(team + "-add-collapse");
    collapseForm.className = "collapse";

    highlightHighScore();
}

function subtractPoints(team) {
    event.preventDefault();

    var team = team.toString();
    var score = Number(localStorage.getItem(team));
    var thisForm = document.forms[team + "-subtract"]
    score -= ((thisForm.elements['cards-numbered'].value)*CARDS_DICT.numbered) + ((thisForm.elements['cards-face'].value)*CARDS_DICT.face) +
    ((thisForm.elements['cards-wild'].value)*CARDS_DICT.wild) + ((thisForm.elements['cards-joker'].value)*CARDS_DICT.joker) +
    ((thisForm.elements['cards-red-three'].value)*CARDS_DICT.redThree);
    
    localStorage.setItem(team, score);
    
    document.getElementById(team+"-score").innerHTML = score;

    var thisFormInput = thisForm.getElementsByTagName("input");
    for (var i=0; i < thisFormInput.length; i++) {
        thisFormInput[i].value = 0;
    }
    var preview = document.getElementById(team + "-subtract-preview");
    preview.innerHTML = 0;

    var collapseForm = document.getElementById(team + "-subtract-collapse");
    collapseForm.className = "collapse";

    highlightHighScore();
}

function previewPoints(value) {
    var preview = document.getElementById(value.name + "-preview");
    var previewPoints = 0;
    var thisFormInput = value.getElementsByTagName("input");
    for (var i=0; i < thisFormInput.length; i++) {
        switch(thisFormInput[i].name) {
            case "clean":
                previewPoints += thisFormInput[i].value * CLEAN_BOOK;
                break;
            case "dirty":
                previewPoints += thisFormInput[i].value * DIRTY_BOOK;
                break;
            case "cards-numbered":
                previewPoints += thisFormInput[i].value * CARDS_DICT.numbered;
                break;
            case "cards-face":
                previewPoints += thisFormInput[i].value * CARDS_DICT.face;
                break;
            case "cards-wild":
                previewPoints += thisFormInput[i].value * CARDS_DICT.wild;
                break;
            case "cards-joker":
                previewPoints += thisFormInput[i].value * CARDS_DICT.joker;
                break;
            case "cards-red-three":
                previewPoints += thisFormInput[i].value * CARDS_DICT.redThree;
                break;
            case "extra-points":
                previewPoints += thisFormInput[i].value * 1;
        }
        preview.innerHTML = previewPoints;
    }
}

function highlightHighScore() {
    var re = /team*/;
    var scoreArray = [];
    var highScore = -1000000;
    var scoreBoardParaArray = document.getElementById("score-board").querySelectorAll("p");
    scoreBoardParaArray.forEach(function(score) {
        score.classList.remove("winning");
    });
    for (var i=0; i < localStorage.length; i++) {
        if (localStorage.key(i) == localStorage.key(i).match(re).input) {
            if (Number(localStorage.getItem(localStorage.key(i))) > highScore) {
                scoreArray.push(localStorage.key(i));
                console.log(localStorage.getItem(localStorage.key(i)));
                console.log(highScore, "before");
                highScore = localStorage.getItem(localStorage.key(i));
                console.log(localStorage.key(i));
                console.log(highScore, "after");
            }
        }
    }
    console.log(scoreArray);
    document.getElementById(scoreArray[scoreArray.length-1]+"-p-score").className = "winning";
}

// Reset teams
function resetScore() {
    event.preventDefault();

    var confirmReset = confirm("Do you want to reset score?");
    if (confirmReset == true) {
        scoreBoardArray.forEach(function(score) {
            score.innerHTML = "0";
        });
        for (var i=0; i < localStorage.length; i++) {
            var re = /team*/;
            if (localStorage.key(i) == localStorage.key(i).match(re).input) {
                localStorage.setItem(localStorage.key(i), '0');
            }
        }
    }
    var scoreBoardParaArray = document.getElementById("score-board").querySelectorAll("p");
    scoreBoardParaArray.forEach(function(score) {
        score.classList.remove("winning");
    });
}