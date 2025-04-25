function getTheaterId() {
    const theaterSelect = document.getElementById("theaterSelect");
    const xhttp = new XMLHttpRequest();
    // Tallennetan käyttäjän valinta
    const selectedTheater = theaterSelect.value;
    // Tyhjennetään datan
    theaterSelect.innerHTML = "";

    xhttp.onload = function () {
        const parser = new DOMParser();
        const xml = parser.parseFromString(this.responseText, "application/xml");
        const theaters = xml.getElementsByTagName("TheatreArea");

        // Käy läpi teatterit,luo option sarakkeen,lisää ne sinne
        let output = "<option value=''>Select a theater</option>"; // Lisää oletusvalinta
        for (let i = 0; i < theaters.length; i++) {
            const id = theaters[i].getElementsByTagName("ID")[0].textContent;
            const name = theaters[i].getElementsByTagName("Name")[0].textContent;
            output += `<option value="${id}">${name}</option>`; // Se mikä tulee ulos
        }
        // Päivitetään teatterivalikko
        theaterSelect.innerHTML = output;
        // Palautetaan käyttäjän aiempi valinta, jos se on olemassa
        if (selectedTheater) {
            theaterSelect.value = selectedTheater;
        }
    };
    // Lähetetään HTTP GET -pyyntö FinnKinon API:lle
    xhttp.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);
    xhttp.send();
}

function goingMovies() {
    const moviesContainer = document.getElementById("moviesContainer");
    const xhttp = new XMLHttpRequest();
    const uniqueMovies = new Set(); // Tallennetaan uniikit elokuvien nimet, ettei toistu

    // Tyhjennetään datan
    moviesContainer.innerHTML = "";

    xhttp.onload = function () {
        const parser = new DOMParser();
        const xml = parser.parseFromString(this.responseText, "application/xml");
        const shows = xml.getElementsByTagName("Show");

        let output = "<h2>On going movies:</h2></br><table>";

        // Käydään läpi kaikki näytökset
        for (let i = 0; i < shows.length; i++) {
            const title = shows[i].getElementsByTagName("Title")[0].textContent;
            const imageUrl = shows[i].getElementsByTagName("EventSmallImagePortrait")[0].textContent;
            // Tarkistetaan, onko elokuva jo lisätty
            if (!uniqueMovies.has(title)) { //Jos on lisätty, ei lisää uudestaan
                uniqueMovies.add(title); // Jos ei ole lisätty, lisää se
                output += `
                    <tr>
                        <td><img src="${imageUrl}" alt="${title}" style="width: 150px;"></td>
                        <td><h4>${title}</h4></td>
                    </tr>
                `;
            }
        }
        output += "</table>";
        moviesContainer.innerHTML = output;
    };
    xhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xhttp.send();
}

function showMovies() {
    const theaterSelect = document.getElementById("theaterSelect");
    const selectedTheater = theaterSelect.value; // Käyttäjän valitsema teatteri
    const datePicker = document.getElementById("datePicker");
    const selectedDate = datePicker.value; // Käyttäjän valitsema päivämäärä
    console.log("Selected Theater:", selectedTheater);
    console.log("Selected Date:", selectedDate);
    const moviesContainer = document.getElementById("moviesContainer");
    //Tarkistaa, että teatteri ja päivämäärä on valittu
    if (!selectedTheater) {
        alert("Please select a theater!");
        return;
    }
    if (!selectedDate) {
        alert("Please select a date!");
        return;
    }
    const dateValue = selectedDate; 
    const xhttp = new XMLHttpRequest();
    // Tyhjennetään datan
    moviesContainer.innerHTML = "";

    xhttp.onload = function () {
        const parser = new DOMParser();
        const xml = parser.parseFromString(this.responseText, "application/xml");
        const shows = xml.getElementsByTagName("Show");

        let output = "<h2>Movies in selected theater:</h2></br><table>";
        // Käydään läpi kaikki näytökset
        for (let i = 0; i < shows.length; i++) {
            const title = shows[i].getElementsByTagName("Title")[0].textContent;
            const imageUrl = shows[i].getElementsByTagName("EventSmallImagePortrait")[0].textContent;
            const startTime = shows[i].getElementsByTagName("dttmShowStart")[0].textContent;
            output += `
                <tr>
                    <td><img src="${imageUrl}" alt="${title}" style="width: 150px;"></td>
                    <td><h4>${title}</h4></td>
                    <td><h4>${new Date(startTime).toLocaleString()}</h4></td>
                </tr>
            `;
        }
        output += "</table>";
        // Näytetään elokuvat
        moviesContainer.innerHTML = output;
    };
    xhttp.open("GET", `https://www.finnkino.fi/xml/Schedule/?area=${selectedTheater}&dt=${dateValue}`, true);
    xhttp.send();
}

/*function dateOptions() {
    const today = new Date();
    const dateOptions = [
        { id: "date-1001", label: "Today", daysToAdd: 0 },
        { id: "date-1002", label: "Tomorrow", daysToAdd: 1 },
        { id: "date-1003", label: "Day After Tomorrow", daysToAdd: 2 }
    ];

    dateOptions.forEach(option => {
        const date = new Date(today);
        date.setDate(today.getDate() + option.daysToAdd); // Lisätään päivät
        const formattedDate = date.toISOString().split("T")[0]; // Muoto YYYY-MM-DD

        // Päivitetään radio-painikkeen value
        const radioButton = document.getElementById(option.id);
        if (radioButton) {
            radioButton.value = formattedDate;
        }

        // Päivitetään labelin teksti
        const label = document.querySelector(`label[for="${option.id}"]`);
        if (label) {
            label.textContent = `${option.label} (${formattedDate})`;
        }
    });
}*/
// Kutsutaan funktiota, kun sivu ladataan
//document.addEventListener("DOMContentLoaded", dateOptions);
document.addEventListener("DOMContentLoaded", getTheaterId);