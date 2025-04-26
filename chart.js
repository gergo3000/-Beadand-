let chart;

function showChart(row) {
    const cells = row.querySelectorAll("td");
    const label = `Sor ${cells[0].innerText}`;
    const values = Array.from(cells).slice(1).map(td => Number(td.innerText));
    
    const ctx = document.getElementById("lineChart").getContext("2d");
    
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Érték 1", "Érték 2", "Érték 3", "Érték 4", "Érték 5"],
            datasets: [{
                label: label,
                data: values,
                borderColor: 'blue',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
