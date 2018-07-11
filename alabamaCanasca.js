var teams = [
    {'Name': "team1", 'Points': 0},
    {'Name': "team2", 'Points': 0},
    {'Name': "team3", 'Points': 0},
    {'Name': "team4", 'Points': 0},
    {'Name': "team5", 'Points': 0}
];
var scoreBoard = document.getElementById("score-board");
var counter = 0;

const CLEAN_BOOK = 200;
const DIRTY_BOOK = 100;

// Reset teams
document.getElementById("reset-score").addEventListener("click", function(event) {

    event.preventDefault();
    
    var confirmReset = confirm("Do you want to reset score?");
    if (confirmReset == true) {
        scoreBoard.querySelectorAll("p").innerHTML = "";
        var teams = [
            {'Name': "team1", 'Points': 0},
            {'Name': "team2", 'Points': 0},
            {'Name': "team3", 'Points': 0},
            {'Name': "team4", 'Points': 0},
            {'Name': "team5", 'Points': 0}
        ];
    }
});

// Input number of clean / dirty books & calculate
document.getElementById("plus-one").addEventListener("click",function(event) {
    
    event.preventDefault();

    counter += 1;
    document.getElementById("clean-books").value = counter;
});
document.getElementById("minus-one").addEventListener("click",function(event) {
    
    event.preventDefault();
    
    if (counter <= 0){
        counter = 0;
        document.getElementById("clean-books").value = counter;
    } else {
        counter -= 1;
        document.getElementById("clean-books").value = counter;
    }
});

function calculatePoints() {
    document.getElementById("calculate-points").addEventListener("click",function(event) {
        
        event.preventDefault();
        
        pointsToAdd = document.getElementById("clean-1-add").value * CLEAN_BOOK;
        teams[0].Points += pointsToAdd;
        document.getElementById(teams[0].Name + "-score").innerHTML = teams[0].Points;
        console.log(teams[0].Name, ":", teams[0].Points);
    });
}

function addPoints(team) {
                event.preventDefault();
                team = team.toString();
                var index = teams.findIndex(teams => teams.Name === team);
                var thisForm = document.forms[team]
                teams[index].Points += ((thisForm.elements.clean.value)*300) + ((thisForm.elements.dirty.value)*100);
                console.log(teams[index].Points);
                document.getElementById(team+"-preview").innerHTML = teams[index].Points;
}
function previewPoints(value) {
                var preview = document.getElementById(value.name+"-preview");
                var previewPoints = 0;
                var thisFormInput = value.getElementsByTagName("input");
                console.log(thisFormInput);
                for (i=0; i < thisFormInput.length; i++) {
                                if (thisFormInput[i].value >= 1) {
                                                switch(thisFormInput[i].name) {
                                                                case "clean":
                                                                                previewPoints += thisFormInput[i].value * 300;
                                                                                break;
                                                                case "dirty":
                                                                                previewPoints += thisFormInput[i].value * 100;
                                                                                break;
                                                                case "cards":
                                                                                previewPoints += thisFormInput[i].value * 50;
                                                }
                                } else {
                                                continue
                                }
                                preview.innerHTML = previewPoints;
                }
}
