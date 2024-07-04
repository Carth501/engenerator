
export function writeShopText(shop) {
    let text = "";
    text += "Name: " + shop.name + "\n";
    if (shop.owner) { text += "Owner: " + shop.owner + "\n"; }
    text += "Number of Active Years: " + shop.age + "\n";
    text += "Hours: Dawn to Dusk\n";
    text += "Employees: " + Math.round(shop.employees.count) + "\n";
    if (shop.stock) { text += writeStockList(shop.stock); }
    return text;
}

function writeStockList(stockList) {
    let text = "Stock:\t";
    const items = Object.keys(stockList);
    const itemCount = items.length;
    for (var i = 0; i < itemCount; i++) {
        let line = "";
        if (i > 0) {
            line += "\t\t";
        }
        const number = stockList[items[i]].stock;
        line += number + " ";
        if (number === 1) {
            line += stockList[items[i]].singular;
        }
        else {
            line += stockList[items[i]].plural;
        }
        const adjust = stockList[items[i]].priceAdjustment;
        const price = stockList[items[i]].price * adjust;
        line += " @ " + price.toFixed(3);
        const percent = (stockList[items[i]].priceAdjustment - 1) * 100;
        line += " (" + (percent).toFixed(1) + "%)";
        line += "\n";
        text += line;
    }
    return text;
}