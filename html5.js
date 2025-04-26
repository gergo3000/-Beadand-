function saveToStorage() {
    const value = document.getElementById("storageInput").value;
    localStorage.setItem("myData", value);
}

function loadFromStorage() {
    const value = localStorage.getItem("myData");
    document.getElementById("storageOutput").innerText = value || "Nincs mentett adat.";
}

let worker;
function startWorker() {
    if (typeof(Worker) !== "undefined") {
        if (!worker) {
            worker = new Worker(URL.createObjectURL(new Blob([`
                self.onmessage = function() {
                    let sum = 0;
                    for (let i = 0; i < 1e8; i++) { sum += i; }
                    postMessage(sum);
                };
            `])));
        }
        worker.onmessage = function(event) {
            document.getElementById("workerOutput").innerText = "Összeg: " + event.data;
        };
        worker.postMessage("");
    } else {
        document.getElementById("workerOutput").innerText = "A böngésző nem támogatja a Web Workert.";
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            document.getElementById("geoOutput").innerText =
                `Szélesség: ${position.coords.latitude}, Hosszúság: ${position.coords.longitude}`;
        });
    } else {
        document.getElementById("geoOutput").innerText = "A böngésző nem támogatja a geolocation-t.";
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

window.onload = function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(10, 10, 150, 75);
};