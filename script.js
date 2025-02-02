function addAppliance() {
    let container = document.getElementById("applianceList");
    let div = document.createElement("div");
    div.classList.add("appliance");
    div.innerHTML = `
        <input type="text" name="appliance[]" placeholder="Ej: Televisor" required>
        <input type="number" name="power[]" placeholder="Potencia (W)" required>
        <input type="number" name="hours[]" placeholder="Horas/día" required>
        <input type="number" name="quantity[]" placeholder="Cantidad" min="1" value="1" required>
    `;
    container.appendChild(div);
}

function calculateSolar() {
    let appliances = document.getElementsByName("appliance[]");
    let power = document.getElementsByName("power[]");
    let hours = document.getElementsByName("hours[]");
    let quantity = document.getElementsByName("quantity[]");

    let totalConsumption = 0;

    for (let i = 0; i < appliances.length; i++) {
        if (appliances[i].value && power[i].value && hours[i].value && quantity[i].value) {
            totalConsumption += power[i].value * hours[i].value * quantity[i].value;
        }
    }

    let panelCapacity = 400;
    let batteryCapacity = 2000;
    let inverterCapacity = 3000;

    let panelsNeeded = Math.ceil(totalConsumption / panelCapacity);
    let batteriesNeeded = Math.ceil(totalConsumption / batteryCapacity);
    let inverterNeeded = totalConsumption > inverterCapacity ? "Inversor superior a 3kW requerido" : "Inversor de 3kW suficiente";

    document.getElementById("result").innerHTML = `
        <p>🔋 <strong>Consumo total diario:</strong> ${totalConsumption} Wh</p>
        <p>🔆 <strong>Paneles solares necesarios:</strong> ${panelsNeeded}</p>
        <p>🔋 <strong>Baterías recomendadas:</strong> ${batteriesNeeded}</p>
        <p>⚡ <strong>Inversor recomendado:</strong> ${inverterNeeded}</p>
    `;

    document.getElementById("shareWhatsApp").style.display = "block";
}

function shareResults() {
    let resultText = document.getElementById("result").innerText;
    let whatsappLink = "https://wa.me/TU_NUMERO?text=" + encodeURIComponent(resultText);
    window.open(whatsappLink, "_blank");
}
