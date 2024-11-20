document.getElementById("t1Title").textContent = localStorage.getItem("team1");
document.getElementById("t2Title").textContent = localStorage.getItem("team2");
let halftime = localStorage.getItem("halftime");
let totalTime = halftime * 60;

// Point management
function addPoint(id) {
    point =  parseInt(document.getElementById(id).textContent) + 1;
    document.getElementById(id).textContent = point;
}
function removePoint(id) {
    point =  parseInt(document.getElementById(id).textContent) - 1;
    if (point >= 0) {
        document.getElementById(id).textContent = point;
    }
}

// Time management
let isOvertime = false;
let firstHalf = true;
let startButton = document.getElementById("startMatchButton");
let stopButton = document.getElementById("stopMatchButton");
let overtimeButton = document.getElementById("overtimeButton");
let timeDisplay = document.getElementById("timeDisplay");

function updateTimeDisplay() {
    const minutes = Math.floor(totalTime / 60).toString().padStart(2, '0');
    const seconds = (totalTime % 60).toString().padStart(2, '0');
    timeDisplay.textContent = `${minutes}:${seconds}`;
}
updateTimeDisplay();

let timerInterval;
function startMatch() {
    startButton.disabled = true;
    stopButton.disabled = false;
    timerInterval = setInterval(() => {
        if (totalTime > 0) {
            totalTime--;
            updateTimeDisplay();
            if (totalTime < 300 && !isOvertime) {
                overtimeButton.disabled = false;
            } 
        } else {
            clearInterval(timerInterval);
            if (firstHalf) {
                firstHalf = false;
                totalTime = halftime;
                alert("Véget ért az első félidő!");
                document.getElementById("halfTimeDisplay").textContent = "2. félidő"
                startButton.disabled = false;
                stopButton.disabled = true;
                isOvertime = false;
                updateTimeDisplay();
            } else {
                alert("Véget ért a mérkőzés!")
                stopButton.disabled = true;
            }
    
        }
    }, 1000);
}

function stopMatch() {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(timerInterval);
}

function addOvertime() {
    overtimeInput = parseInt(document.getElementById("overtimeInput").value);
    if (overtimeInput > 0 && overtimeInput < halftime) {
        isOvertime = true;
        overtimeButton.disabled = true;
        totalTime = totalTime + overtimeInput * 60;
        overtimeInput = "";
        updateTimeDisplay();
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