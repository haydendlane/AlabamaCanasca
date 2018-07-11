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
    
    var confirmReset = confirm("Do you want to reset score?")
    if (confirmReset == true) {
        scoreBoard.innerHTML = "";
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
document.getElementById("calculate-points").addEventListener("click",function(event) {
    
    event.preventDefault();
    
    pointsToAdd = document.getElementById("clean-books").value * CLEAN_BOOK;
    teams[0].Points += pointsToAdd;
    document.getElementById(teams[0].Name).innerHTML = teams[0].Points;
    console.log(teams[0].Name, ":", teams[0].Points);
});