document.getElementById("t1Title").textContent = localStorage.getItem("team1");
document.getElementById("t2Title").textContent = localStorage.getItem("team2");

// Point management
function changePoint(teamId, input) {
    pointDisplay = parseInt(document.getElementById(`t${teamId}PointDisplay`).textContent) + parseInt(input);
    pointDisplay >= 0 ? document.getElementById(`t${teamId}PointDisplay`).textContent = pointDisplay : "" ;
}

// Time management
let timerInterval;

let firstHalf = true;
let totalTime = localStorage.getItem("halftime") * 60;
let matchTime = 0;
let overtime = 0;

let startButton = document.getElementById("startMatchButton");
let stopButton = document.getElementById("stopMatchButton");
let overtimeButton = document.getElementById("overtimeButton");
let timeDisplay = document.getElementById("timeDisplay");
let overtimeDisplay = document.getElementById("overtimeDisplay");

function updateTimeDisplay() {
    const minutes = Math.floor(matchTime / 60).toString().padStart(2, '0');
    const seconds = (matchTime % 60).toString().padStart(2, '0');
    timeDisplay.textContent = `${minutes}:${seconds}`;
}
updateTimeDisplay();

let cards = [];
function startMatch() {
    startButton.disabled = true;
    stopButton.disabled = false;
    timerInterval = setInterval(() => {
        for (let i = 0; i < cards.length; i++) {
            cards[i].time--;
            if (cards[i].time < 0) {
                cards.splice(i, 1);
                i = 0;
            }
        }
        updateCardList();
        if (matchTime < totalTime) {
            matchTime++;
            updateTimeDisplay();
        } else if (overtime > 0) {
            overtime--;
            updateOvertimeDisplay();
        } else {
            clearInterval(timerInterval);
            if (firstHalf) {
                firstHalf = false;
                matchTime = 0;
                alert("Véget ért az első félidő!");
                document.getElementById("halfTimeDisplay").textContent = "2. félidő"
                startButton.disabled = false;
                stopButton.disabled = true;
                overtimeButton.disabled = false;
                updateTimeDisplay();
            } else {
                point1 = parseInt(document.getElementById("t1PointDisplay").textContent);
                point2 = parseInt(document.getElementById("t2PointDisplay").textContent);
                if (point1 == point2) alert("Véget ért a mérkőzés, az állás döntetlen!")
                else if (point1 > point2) alert(`Véget ért a mérkőzés, a nyertes csapat a(z) ${localStorage.getItem("team1")}`)
                else alert(`Véget ért a mérkőzés, a nyertes csapat a(z) ${localStorage.getItem("team2")}`)
                
                stopButton.disabled = true;
                overtimeButton.disabled = true;
            }
    
        }
    }, 1000);
}

function stopMatch() {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(timerInterval);
}

function updateOvertimeDisplay() {
    const minutes = Math.floor(overtime / 60).toString().padStart(2, '0');
    const seconds = (overtime % 60).toString().padStart(2, '0');
    overtimeDisplay.textContent = `${minutes}:${seconds}`;
}
function addOvertime() {
    overtimeInput = parseInt(document.getElementById("overtimeInput").value);
    if (overtimeInput > 0 && overtimeInput <= 99) {
        overtimeButton.disabled = true;
        overtime = overtimeInput * 60;
        updateOvertimeDisplay();
    }
}

let id = 0;
function addCard(teamnumber) {
    let name = document.getElementById(`t${teamnumber}CardName`);
    if (name.value.trim()) {
        cards.push({name: name.value, team: teamnumber, time: 120});
        name.value = "";
        updateCardList();
        }
}

function updateCardList() {
    document.getElementById(`t1CardList`).innerHTML = "";
    document.getElementById(`t2CardList`).innerHTML = "";
    cards.forEach(element => {
        document.getElementById(`t${element.team}CardList`).innerHTML += `<li><span class="card">${Math.floor(element.time / 60).toString().padStart(2, '0')}:${(element.time % 60).toString().padStart(2, '0')} ${element.name}</span></li>`;
    })
}