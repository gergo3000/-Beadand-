let tableData = [];

document.getElementById("dataForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const kor = document.getElementById("kor").value.trim();
    const varos = document.getElementById("varos").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !kor || !varos || !email) return alert("Minden mező kötelező!");

    tableData.push({ name, kor, varos, email });
    updateTable();
    this.reset();
});

function updateTable() {
    const tbody = document.getElementById("dataTable").querySelector("tbody");
    tbody.innerHTML = "";
    tableData.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.kor}</td>
            <td>${row.varos}</td>
            <td>${row.email}</td>
            <td>
                <button onclick="editRow(${index})">Szerkeszt</button>
                <button onclick="deleteRow(${index})">Törlés</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteRow(index) {
    if (confirm("Biztosan törlöd?")) {
        tableData.splice(index, 1);
        updateTable();
    }
}

function editRow(index) {
    const row = tableData[index];
    document.getElementById("name").value = row.name;
    document.getElementById("kor").value = row.kor;
    document.getElementById("varos").value = row.varos;
    document.getElementById("email").value = row.email;
    deleteRow(index);
}

document.getElementById("search").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const rows = document.querySelectorAll("#dataTable tbody tr");
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(keyword) ? "" : "none";
    });
});

function sortTable(columnIndex) {
    tableData.sort((a, b) => {
        const keys = ["name", "kor", "varos", "email"];
        const key = keys[columnIndex];
        return a[key].toString().localeCompare(b[key].toString(), undefined, { numeric: true });
    });
    updateTable();
}