const code = "NEPTUNKOD: BT80Y0"; 

function readData() {
    fetch("http://gamf.nhely.hu/ajax2/", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=read&code=${code}`
    })
    .then(res => res.json())
    .then(data => {
        let output = "";
        let heights = [];
        data.list.forEach(item => {
            output += `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}<br>`;
            heights.push(parseInt(item.height));
        });
        document.getElementById("dataList").innerHTML = output;

        const sum = heights.reduce((a, b) => a + b, 0);
        const avg = (sum / heights.length).toFixed(2);
        const max = Math.max(...heights);

        document.getElementById("stats").innerHTML =
            `Összeg: ${sum}, Átlag: ${avg}, Legnagyobb: ${max}`;
    });
}

function createData() {
    const name = document.getElementById("name").value.trim();
    const height = document.getElementById("height").value.trim();
    const weight = document.getElementById("weight").value.trim();

    if (!name || !height || !weight || name.length > 30) {
        return alert("Hibás mező!");
    }

    fetch("http://gamf.nhely.hu/ajax2/", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`
    }).then(res => res.text())
      .then(data => {
          document.getElementById("feedback").innerText = "Sikeres létrehozás!";
          readData();
      });
}

function getDataForId() {
    const id = document.getElementById("updateId").value.trim();
    fetch("http://gamf.nhely.hu/ajax2/", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=read&code=${code}`
    })
    .then(res => res.json())
    .then(data => {
        const item = data.list.find(row => row.id === id);
        if (item) {
            document.getElementById("u_name").value = item.name;
            document.getElementById("u_height").value = item.height;
            document.getElementById("u_weight").value = item.weight;
        }
    });
}

function updateData() {
    const id = document.getElementById("updateId").value.trim();
    const name = document.getElementById("u_name").value.trim();
    const height = document.getElementById("u_height").value.trim();
    const weight = document.getElementById("u_weight").value.trim();

    if (!name || !height || !weight || name.length > 30) {
        return alert("Hibás adat!");
    }

    fetch("http://gamf.nhely.hu/ajax2/", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${code}`
    }).then(res => res.text())
      .then(data => {
          document.getElementById("feedback").innerText = "Sikeres frissítés!";
          readData();
      });
}

function deleteData() {
    const id = document.getElementById("deleteId").value.trim();
    fetch("http://gamf.nhely.hu/ajax2/", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=delete&id=${id}&code=${code}`
    }).then(res => res.text())
      .then(data => {
          document.getElementById("feedback").innerText = "Sikeres törlés!";
          readData();
      });
}
