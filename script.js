let team1Name;
let team2Name;
let halftime;

function startValidation() {
    team1Name = document.getElementById("team1Input").value;
    team2Name = document.getElementById("team2Input").value;
    halftime = parseInt(document.getElementById("halftimeInput").value);
    if (team1Name == "" || team2Name == "" || !(halftime > 4 && halftime < 100)) {
       document.getElementById("openMatch").disabled = true; 
    } else {
        document.getElementById("openMatch").disabled = false; 
    }
    
}

function openMatch() {
    team1Name = document.getElementById("team1Input").value;
    team2Name = document.getElementById("team2Input").value;
    halftime = parseInt(document.getElementById("halftimeInput").value);
    localStorage.setItem("team1", team1Name);
    localStorage.setItem("team2", team2Name);
    localStorage.setItem("halftime", halftime);
    window.open("./kijelzo.html", "_self");
}