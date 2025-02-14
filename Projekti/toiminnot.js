function painallus() {
    alert("Tämä on JavaScript-toiminto!");
}
function handleSubmit(event) {
    event.preventDefault(); // Estää lomakkeen oletusarvoisen lähettämisen

    // Hakee lomakkeen kenttien arvot
    var category = document.getElementById('category').value;
    var hours = document.getElementById('hours').value;
    var extra = document.getElementById('extra').value;

    // Luo uuden rivin taulukkoon
    var table = document.getElementById('data').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    // Luo uudet solut ja lisää arvot
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    cell1.innerHTML = category;
    cell2.innerHTML = hours;
    cell3.innerHTML = extra;

    // Tyhjentää lomakkeen kentät
    document.getElementById('category').value = '';
    document.getElementById('hours').value = '';
    document.getElementById('extra').value = '';
}

// Lisää tapahtumankuuntelija lomakkeelle
document.querySelector('form').addEventListener('submit', handleSubmit);

