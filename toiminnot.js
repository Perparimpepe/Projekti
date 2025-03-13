function handleSubmit(event) {
    event.preventDefault(); // Estää lomakkeen oletusarvoisen lähettämisen

    // Hakee lomakkeen kenttien arvot
    var category = document.getElementById('category').value;
    var hours = document.getElementById('hours').value;
    var extra = document.getElementById('extra').value;

    // Tarkistaa, että category ja hours kentät eivät ole tyhjiä tao negatiivisia
    if (category === '' || hours === '' || parseInt(hours) < 0) {
        alert("Fill all areas properly!");
        if (category === '') {
            document.getElementById('category').style.border = '2px solid red';
        } else {
            document.getElementById('category').style.border = '';
        }
        if (hours === '' || parseInt(hours) < 0) {
            document.getElementById('hours').style.border = '2px solid red';
        } else {
            document.getElementById('hours').style.border = '';
        }
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
    resetForm();
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

function resetForm() {
    document.getElementById('category').value = '';
    document.getElementById('hours').value = '';
    document.getElementById('extra').value = '';
    document.getElementById('category').style.border = '';
    document.getElementById('hours').style.border = '';
}

function summary() {
    var data = JSON.parse(localStorage.getItem('tableData')) || [];
    var totalHours = 0;
    var categoryHours = {};

    data.forEach(function(item) {
        totalHours += parseInt(item.hours) || 0;
        if (!categoryHours[item.category]) {
            categoryHours[item.category] = 0;
        }
        categoryHours[item.category] += parseInt(item.hours) || 0;
    });

    var summaryText = 'Total Hours: ' + totalHours + '\n';
    for (var category in categoryHours) {
        var percentage = ((categoryHours[category] / totalHours) * 100).toFixed(2);
        summaryText += category + ': ' + categoryHours[category] + ' hours (' + percentage + '%)\n';
    }
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
    function clearText() {
        document.getElementById('summaryText').value = '';
}
// Lisää tapahtumankuuntelija tyhjennyspainikkeelle
document.getElementById('clearButton').addEventListener('click', clearData);
