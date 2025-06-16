
function formatGold(value) {
    return value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calculate() {
    const timberPrice = parseFloat(document.getElementById('timberPrice').value) || 0;
    const tenderPrice = parseFloat(document.getElementById('tenderPrice').value) || 0;
    const abidosTimberPrice = parseFloat(document.getElementById('abidosTimberPrice').value) || 0;
    const abidosFusionPrice = parseFloat(document.getElementById('abidosFusionPrice').value) || 0;
    const manufacturingCost = parseFloat(document.getElementById('manufacturingCost').value) || 0;

    const timberValue = timberPrice * (86 / 100);
    const tenderValue = tenderPrice * (45 / 100);
    const abidosValue = abidosTimberPrice * (33 / 100);
    const materialBrutto = timberValue + tenderValue + abidosValue;
    const materialNetto = materialBrutto * 0.95;

    const fusionBrutto = abidosFusionPrice * 10;
    const fusionNetto = fusionBrutto * 0.95;
    const fusionErtrag = fusionNetto - manufacturingCost;

    const resultBox = document.getElementById("results");
    resultBox.innerHTML = `
        <h3>➡️ Abidos Fusion Herstellung:</h3>
        Verkaufspreis je Stück: ${formatGold(abidosFusionPrice)} Gold<br>
        Bruttoerlös (10 Stück): ${formatGold(fusionBrutto)} Gold<br>
        – 5 % Gebühr: ${formatGold(fusionBrutto * 0.05)} Gold<br>
        Nettoverkauf: ${formatGold(fusionNetto)} Gold<br>
        Herstellungskosten: ${formatGold(manufacturingCost)} Gold<br>
        <strong>Nettoertrag: ${formatGold(fusionErtrag)} Gold</strong><br><br>

        <h3>➡️ Rohstoffverkauf (für gleiche Menge):</h3>
        Timber (86): ${formatGold(timberValue)} Gold<br>
        Tender Timber (45): ${formatGold(tenderValue)} Gold<br>
        Abidos Timber (33): ${formatGold(abidosValue)} Gold<br>
        Bruttoerlös: ${formatGold(materialBrutto)} Gold<br>
        – 5 % Gebühr: ${formatGold(materialBrutto * 0.05)} Gold<br>
        <strong>Nettoverkauf: ${formatGold(materialNetto)} Gold</strong><br><br>

        <h3>💡 Ergebnis:</h3>
        ${fusionErtrag > materialNetto ? 
            `✅ Herstellung ist lukrativer (+${formatGold(fusionErtrag - materialNetto)} Gold)` :
            `❌ Rohstoffverkauf ist lukrativer (+${formatGold(materialNetto - fusionErtrag)} Gold)`}
    `;
}
