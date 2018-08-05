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

// Input number of clean / dirty books & calculate

function addPoints(team) {
    event.preventDefault();

    var team = team.toString();
    var index = teams.findIndex(teams => teams.Name === team);
    var thisForm = document.forms[team + "-add"]
    teams[index].Points += ((thisForm.elements.clean.value)*CLEAN_BOOK) + ((thisForm.elements.dirty.value)*DIRTY_BOOK) + 
    ((thisForm.elements.cards.value)*10);
    document.getElementById(team+"-score").innerHTML = teams[index].Points;

    var thisFormInput = thisForm.getElementsByTagName("input");
    for (i=0; i < thisFormInput.length; i++) {
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
    teams[index].Points -= ((thisForm.elements.clean.value)*CLEAN_BOOK) + ((thisForm.elements.dirty.value)*DIRTY_BOOK) + 
    ((thisForm.elements.cards.value)*10);
    document.getElementById(team+"-score").innerHTML = teams[index].Points;

    var thisFormInput = thisForm.getElementsByTagName("input");
    for (i=0; i < thisFormInput.length; i++) {
        thisFormInput[i].value = 0;
    }
    var preview = document.getElementById(team + "-subtract-preview");
    preview.innerHTML = 0;
}

function previewPoints(value) {
    var preview = document.getElementById(value.name + "-preview");
    var previewPoints = 0;
    var thisFormInput = value.getElementsByTagName("input");
    for (i=0; i < thisFormInput.length; i++) {
        switch(thisFormInput[i].name) {
            case "clean":
                previewPoints += thisFormInput[i].value * CLEAN_BOOK;
                break;
            case "dirty":
                previewPoints += thisFormInput[i].value * DIRTY_BOOK;
                break;
            case "cards":
                previewPoints += thisFormInput[i].value * 10;
        }
        preview.innerHTML = previewPoints;
    }
}

// Reset teams
function resetScore() {
    event.preventDefault();

    var scoreBoard = document.getElementById("score-board");
    var scoreBoardArray = scoreBoard.querySelectorAll("p");
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