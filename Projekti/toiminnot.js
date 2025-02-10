function painallus() {
    alert("Tämä on JavaScript-toiminto!");
}
//Taulukon Funktio
function insertRows(){
    //Etsii taulukon id:n perusteella
    var table = document.getElementById("data");
    //Hakee käyttäjän syöttämät arvot
    var category = document.getElementById('textfield').value;
    var hour  = document.getElementById('textfield2').value;
    var extra = document.getElementById('textfield3').value;
    //Tarkistaa onko kategoria ja tuntimäärä tyhjä
    if (category == "") {
        alert("Kategoria puuttuu!");
        return false;
    } else if (hour == "") {
        alert("Tuntimäärä puuttuu!");
        return false;
    }
    //Luo uuden rivin taulukkoon
    var row = table.insertRow();
    //Luo uudet solut
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //Asettaa soluihin käyttäjän syöttämät arvot
    cell1.innerHTML = category;
    cell2.innerHTML = hour + " h";
    cell3.innerHTML = extra;
    //Tyhjentää tekstikentät
    document.getElementById('textfield').value = "";
    document.getElementById('textfield2').value = "";
    document.getElementById('textfield3').value = "";
}