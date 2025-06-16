
window.addEventListener('load', () => {
    const fields = [
        'timberPrice', 'tenderTimberPrice', 'abidosTimberPrice', 'abidosFusionPrice',
        'timberStock', 'tenderTimberStock', 'abidosTimberStock', 'abidosFusionStock',
        'craftingCost'
    ];
    fields.forEach(id => {
        const input = document.getElementById(id);
        if (localStorage.getItem(id)) {
            input.value = localStorage.getItem(id);
        }
        input.addEventListener('input', () => {
            localStorage.setItem(id, input.value);
        });
    });
});


function calculate() {
    const timberPrice = parseFloat(document.getElementById('timberPrice').value.replace(',', '.'));
    const tenderTimberPrice = parseFloat(document.getElementById('tenderTimberPrice').value.replace(',', '.'));
    const abidosTimberPrice = parseFloat(document.getElementById('abidosTimberPrice').value.replace(',', '.'));
    const abidosFusionPrice = parseFloat(document.getElementById('abidosFusionPrice').value.replace(',', '.'));
    const timberStock = parseFloat(document.getElementById('timberStock').value.replace(',', '.'));
    const tenderTimberStock = parseFloat(document.getElementById('tenderTimberStock').value.replace(',', '.'));
    const abidosTimberStock = parseFloat(document.getElementById('abidosTimberStock').value.replace(',', '.'));
    const abidosFusionStock = parseFloat(document.getElementById('abidosFusionStock').value.replace(',', '.'));
    const craftingCost = parseFloat(document.getElementById('craftingCost').value.replace(',', '.'));

    let output = "";

    // Vergleichsrechnung: Herstellung vs. Rohstoffverkauf
    const timberNeeded = 86;
    const tenderTimberNeeded = 45;
    const abidosTimberNeeded = 33;

    const timberPerUnitCost = (timberPrice / 100) * timberNeeded;
    const tenderTimberPerUnitCost = (tenderTimberPrice / 100) * tenderTimberNeeded;
    const abidosTimberPerUnitCost = (abidosTimberPrice / 100) * abidosTimberNeeded;

    const totalCostToCraft = timberPerUnitCost + tenderTimberPerUnitCost + abidosTimberPerUnitCost + craftingCost;
    const fusionRevenue = abidosFusionPrice * 10;
    const fusionNet = fusionRevenue * 0.95;
    const rawMaterialRevenue = ((timberPrice / 100 * timberNeeded) +
                                (tenderTimberPrice / 100 * tenderTimberNeeded) +
                                (abidosTimberPrice / 100 * abidosTimberNeeded)) * 0.95;

    output += "<h3>Vergleichsrechnung: Herstellung vs. Verkauf Rohstoffe</h3>";
    output += `<p>Herstellungskosten je 10er Charge Fusion: (${timberNeeded} * ${timberPrice}/100) + (${tenderTimberNeeded} * ${tenderTimberPrice}/100) + (${abidosTimberNeeded} * ${abidosTimberPrice}/100) + ${craftingCost} = <strong>${totalCostToCraft.toFixed(2).replace('.', ',')}</strong> Gold</p>`;
    output += `<p>Verkaufserlös für 10 Fusion: ${abidosFusionPrice} * 10 * 0,95 = <strong>${fusionNet.toFixed(2).replace('.', ',')}</strong> Gold</p>`;
    output += `<p>Verkaufserlös für Rohstoffe (netto): <strong>${rawMaterialRevenue.toFixed(2).replace('.', ',')}</strong> Gold</p>`;
    output += `<p><strong>Lukrativer ist: ${fusionNet > rawMaterialRevenue ? "Herstellung & Verkauf" : "Rohstoffverkauf"}</strong></p>`;

    // Lagerverkaufsrechnung
    const timberGross = timberStock / 100 * timberPrice;
    const tenderGross = tenderTimberStock / 100 * tenderTimberPrice;
    const abidosGross = abidosTimberStock / 100 * abidosTimberPrice;
    const fusionGross = abidosFusionStock * abidosFusionPrice;

    const timberNet = timberGross * 0.95;
    const tenderNet = tenderGross * 0.95;
    const abidosNet = abidosGross * 0.95;
    const fusionNetStock = fusionGross * 0.95;

    const totalGross = timberGross + tenderGross + abidosGross + fusionGross;
    const totalNet = timberNet + tenderNet + abidosNet + fusionNetStock;

    output += "<h3>Verkauf Lagerbestände</h3>";
    output += `<p>Timber: ${timberStock} / 100 * ${timberPrice} = ${timberGross.toFixed(2).replace('.', ',')} → Netto: ${timberNet.toFixed(2).replace('.', ',')}</p>`;
    output += `<p>Tender Timber: ${tenderTimberStock} / 100 * ${tenderTimberPrice} = ${tenderGross.toFixed(2).replace('.', ',')} → Netto: ${tenderNet.toFixed(2).replace('.', ',')}</p>`;
    output += `<p>Abidos Timber: ${abidosTimberStock} / 100 * ${abidosTimberPrice} = ${abidosGross.toFixed(2).replace('.', ',')} → Netto: ${abidosNet.toFixed(2).replace('.', ',')}</p>`;
    output += `<p>Abidos Fusion: ${abidosFusionStock} * ${abidosFusionPrice} = ${fusionGross.toFixed(2).replace('.', ',')} → Netto: ${fusionNetStock.toFixed(2).replace('.', ',')}</p>`;
    output += `<p><strong>Brutto Gesamt: ${totalGross.toFixed(2).replace('.', ',')} Gold</strong></p>`;
    output += `<p><strong>Netto Gesamt: ${totalNet.toFixed(2).replace('.', ',')} Gold</strong></p>`;

    document.getElementById("output").innerHTML = output;
}
