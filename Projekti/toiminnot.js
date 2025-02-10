function painallus() {
    alert("Tämä on JavaScript-toiminto!");
}
function insertRows(){
    var table = document.getElementById("data");

    var category = document.getElementById('textfield').value;
    var hour  = document.getElementById('textfield2').value;
    var extra = document.getElementById('textfield3').value;
    
    if (category == "") {
        alert("Kategoria puuttuu!");
        return false;
    } else if (hour == "") {
        alert("Tuntimäärä puuttuu!");
        return false;
    }
    var row = table.insertRow();
    
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = category;
    cell2.innerHTML = hour + " h";
    cell3.innerHTML = extra;
    
    document.getElementById('textfield').value = "";
    document.getElementById('textfield2').value = "";
    document.getElementById('textfield3').value = "";
}