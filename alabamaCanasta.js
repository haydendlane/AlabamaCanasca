'use strict';

var teams = [
    {'Name': "team1", 'Points': 0},
    {'Name': "team2", 'Points': 0},
    {'Name': "team3", 'Points': 0},
    {'Name': "team4", 'Points': 0},
    {'Name': "team5", 'Points': 0}
];
var counter = 0;

const CLEAN_BOOK = 200;
const DIRTY_BOOK = 100;
const CARDS_DICT = {
    numbered: 5,
    face: 10,
    wild: 30,
    joker: 50,
    redThree: 300
};

// Input number of clean / dirty books & calculate

function addPoints(team) {
    event.preventDefault();

    var team = team.toString();
    var index = teams.findIndex(teams => teams.Name === team);
    var thisForm = document.forms[team + "-add"]
    teams[index].Points += ((thisForm.elements.clean.value)*CLEAN_BOOK) + ((thisForm.elements.dirty.value)*DIRTY_BOOK) + 
    ((thisForm.elements['cards-numbered'].value)*CARDS_DICT.numbered) + ((thisForm.elements['cards-face'].value)*CARDS_DICT.face) +
    ((thisForm.elements['cards-wild'].value)*CARDS_DICT.wild) + ((thisForm.elements['cards-joker'].value)*CARDS_DICT.joker);
    document.getElementById(team+"-score").innerHTML = teams[index].Points;

    var thisFormInput = thisForm.getElementsByTagName("input");
    for (let i=0; i < thisFormInput.length; i++) {
        thisFormInput[i].value = 0;
    }
    var preview = document.getElementById(team + "-add-preview");
    preview.innerHTML = 0;
}

function subtractPoints(team) {
    event.preventDefault();

    var team = team.toString();
    var index = teams.findIndex(teams => teams.Name === team);
    var thisForm = document.forms[team + "-subtract"]
    teams[index].Points -= ((thisForm.elements['cards-numbered'].value)*CARDS_DICT.numbered) + ((thisForm.elements['cards-face'].value)*CARDS_DICT.face) +
    ((thisForm.elements['cards-wild'].value)*CARDS_DICT.wild) + ((thisForm.elements['cards-joker'].value)*CARDS_DICT.joker) +
    ((thisForm.elements['cards-red-three'].value)*CARDS_DICT.redThree);
    document.getElementById(team+"-score").innerHTML = teams[index].Points;

    var thisFormInput = thisForm.getElementsByTagName("input");
    for (let i=0; i < thisFormInput.length; i++) {
        thisFormInput[i].value = 0;
    }
    var preview = document.getElementById(team + "-subtract-preview");
    preview.innerHTML = 0;
}

function previewPoints(value) {
    var preview = document.getElementById(value.name + "-preview");
    var previewPoints = 0;
    var thisFormInput = value.getElementsByTagName("input");
    for (let i=0; i < thisFormInput.length; i++) {
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
        }
        preview.innerHTML = previewPoints;
    }
}

// Reset teams
function resetScore() {
    event.preventDefault();

    var scoreBoard = document.getElementById("score-board");
    var scoreBoardArray = scoreBoard.querySelectorAll("span");
    var confirmReset = confirm("Do you want to reset score?");
    if (confirmReset == true) {
        scoreBoardArray.forEach(function(score) {
            score.innerHTML = "0";
        });
        teams = [
            {'Name': "team1", 'Points': 0},
            {'Name': "team2", 'Points': 0},
            {'Name': "team3", 'Points': 0},
            {'Name': "team4", 'Points': 0},
            {'Name': "team5", 'Points': 0}
        ];
    }
}