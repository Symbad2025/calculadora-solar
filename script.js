function addRow() {
    const table = document.getElementById("applianceTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    const columns = ["appliance", "power", "quantity", "hours"];

    columns.forEach((col) => {
        const cell = newRow.insertCell();
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = col === "appliance" ? "Nombre" : "0";
        cell.appendChild(input);
    });

    const actionCell = newRow.insertCell();
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = function () {
        table.deleteRow(newRow.rowIndex - 1);
    };
    actionCell.appendChild(deleteButton);
}

function calculate() {
    const rows = document.querySelectorAll("#applianceTable tbody tr");
    let totalEnergy = 0;

    rows.forEach((row) => {
        const power = parseFloat(row.cells[1].querySelector("input").value) || 0;
        const quantity = parseFloat(row.cells[2].querySelector("input").value) || 0;
        const hours = parseFloat(row.cells[3].querySelector("input").value) || 0;

        totalEnergy += power * quantity * hours;
    });

    // Mostrar resultados
    document.getElementById("totalEnergy").textContent = totalEnergy;

    // Calcular paneles solares (asumiendo paneles de 300W y 5 horas de sol al día)
    const panels = Math.ceil(totalEnergy / (300 * 5));
    document.getElementById("panels").textContent = panels;

    // Calcular inversor (asumiendo un 20% más de la potencia máxima)
    const inverter = Math.ceil(totalEnergy / 24 * 1.2);
    document.getElementById("inverter").textContent = inverter;

    // Calcular baterías (asumiendo baterías de 12V y 100Ah)
    const batteries = Math.ceil(totalEnergy / (12 * 100));
    document.getElementById("batteries").textContent = batteries;
}