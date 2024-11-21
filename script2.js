document.getElementById("t1Title").textContent = localStorage.getItem("team1");
document.getElementById("t2Title").textContent = localStorage.getItem("team2");
let halftime = localStorage.getItem("halftime");
let totalTime = halftime * 60;
let matchTime = 0;
let overtime = 0;

// Point management
function changePoint(teamId, input) {
    pointDisplay = parseInt(document.getElementById(`t${teamId}PointDisplay`).textContent) + parseInt(input);
    if (pointDisplay >= 0) {
        document.getElementById(`t${teamId}PointDisplay`).textContent = pointDisplay;
    }
    
}

// Time management
let firstHalf = true;
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


let timerInterval;
function startMatch() {
    startButton.disabled = true;
    stopButton.disabled = false;
    timerInterval = setInterval(() => {
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
    if (overtimeInput > 0 && overtimeInput <= halftime) {
        overtimeButton.disabled = true;
        overtime = overtimeInput * 60;
        updateOvertimeDisplay();
    }
}



function cycleCard(teamnumber) {
    cardselect =document.getElementById(`t${teamnumber}CardSelect`);
    if (cardselect.classList.contains("red")) {
        cardselect.classList.remove("red")
        cardselect.innerHTML = `<img src="./img/yellowCard.png" alt="">`
    } else {
        cardselect.classList.add("red")
        cardselect.innerHTML = `<img src="./img/redCard.png" alt="">`
    }
}

let id = 0;
function addCard(teamnumber) {
    let cardselect = document.getElementById(`t${teamnumber}CardSelect`)
    let name = document.getElementById(`t${teamnumber}CardName`);
    let cardlist = document.getElementById(`t${teamnumber}CardList`);
    if (name.value != "") {
        if (cardselect.classList.contains("red")) {
            let li = document.createElement('li');
            li.setAttribute("id", `card${id}`)
            console.log(`Piroslap ${name.value}`)
            li.innerHTML = `<li id="card${id}"><span class="card redCard">${name.value}</span><button type="button" onclick="removeCard(${id})">-</button></li>`;
            li.classList.add("redCard");
            cardlist.append(li);
            name.value = "";
            id++;
        } else {
            let li = document.createElement('li');
            li.setAttribute("id", `card${id}`)
            console.log(`Sárgalap ${name.value}`)
            li.innerHTML = `<li id="card${id}"><span class="card yellowCard">${name.value}</span><button type="button" onclick="removeCard(${id})">-</button></li>`;
            li.classList.add("yellowCard");
            cardlist.append(li);
            name.value = "";
            id++;
        }
    }
}

function removeCard(id) {
    document.getElementById(`card${id}`).remove();
}