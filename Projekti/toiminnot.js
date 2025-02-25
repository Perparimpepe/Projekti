function handleSubmit(event) {
    event.preventDefault(); // Estää lomakkeen oletusarvoisen lähettämisen

    // Hakee lomakkeen kenttien arvot
    var category = document.getElementById('category').value;
    var hours = document.getElementById('hours').value;
    var extra = document.getElementById('extra').value;

    // Tarkistaa, että category ja hours kentät eivät ole tyhjiä
    if (category === '' || hours === '') {
        alert("Täytä kaikki kentät!");
        return;
    }

    // Hakee tallennetut tiedot
    var data = JSON.parse(localStorage.getItem('tableData')) || [];
    var existingItem = data.find(item => item.category === category);

    if (existingItem) {
        // Päivittää olemassa olevan rivin
        existingItem.hours = parseInt(existingItem.hours) + parseInt(hours);
        existingItem.extra = existingItem.extra + ' ' + extra;
    } else {
        // Luo uuden rivin taulukkoon
        data.push({ category, hours, extra });
    }

    // Tallenna tiedot localStorageen
    localStorage.setItem('tableData', JSON.stringify(data));

    // Päivittää taulukon
    loadTableData();

    // Tyhjentää lomakkeen kentät
    document.getElementById('category').value = '';
    document.getElementById('hours').value = '';
    document.getElementById('extra').value = '';
}

function loadTableData() {
    var data = JSON.parse(localStorage.getItem('tableData')) || [];
    var table = document.getElementById('data').getElementsByTagName('tbody')[0];
    
    // Tyhjentää taulukon ennen lataamista
    table.innerHTML = '';

    data.forEach(function(item) {
        var newRow = table.insertRow();
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        cell1.innerHTML = item.category;
        cell2.innerHTML = item.hours;
        cell3.innerHTML = item.extra;
    });
}

// Lataa tallennetut tiedot sivun latautuessa
window.onload = loadTableData;

// Lisää tapahtumankuuntelija lomakkeelle
document.querySelector('form').addEventListener('submit', handleSubmit);

function summary() {
    var data = JSON.parse(localStorage.getItem('tableData')) || [];
    var totalHours = 0;
    var extra = '';

    data.forEach(function(item) {
        totalHours += parseInt(item.hours) || 0;
        extra += item.extra + ' ';
    });

    var summaryText = 'Summary: ' + totalHours + ' hours and ' + extra.trim() + ' extra information';
    document.getElementById('summaryText').value = summaryText;
}
    function clearData() {
    // Poistaa tiedot localStoragesta
    localStorage.removeItem('tableData');

    // Päivittää taulukon
    loadTableData();

    // Tyhjentää yhteenvedon tekstin
    document.getElementById('summaryText').value = '';
}

// Lisää tapahtumankuuntelija tyhjennyspainikkeelle
document.getElementById('clearButton').addEventListener('click', clearData);
