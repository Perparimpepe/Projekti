//Varmistaa että HTLM on ladattu ennen kuin koodi suoritetaan
/*document.addEventListener("DOMContentLoaded", () => {
    const theaterSelect = document.getElementById("theaterSelect");
    const moviesContainer = document.getElementById("moviesContainer");

    // Fetch hakee teatterit
    fetch("https://www.finnkino.fi/xml/TheatreAreas/")
        .then(response => response.text()) // Hakee teatterit XML muodossa
        .then(data => {
            const parser = new DOMParser(); // Luo DOMParserin, joka muuntaa XML:n DOM:ksi
            const xml = parser.parseFromString(data, "application/xml");
            const theaters = xml.getElementsByTagName("TheatreArea");// Hakee teatterit XML:stä
            // Lisää teatterit valikkoon
            for (let theater of theaters) {
                const id = theater.getElementsByTagName("ID")[0].textContent;
                const name = theater.getElementsByTagName("Name")[0].textContent;

                const option = document.createElement("option");
                option.value = id;
                option.textContent = name;
                theaterSelect.appendChild(option);
            }
        });

    // Kun teatteri valitaan, lataa elokuvat
    theaterSelect.addEventListener("change", () => {
        const theaterId = theaterSelect.value;
        // Tyhjentää elokuvien säilön ennen uusien lataamista
        moviesContainer.innerHTML = ""; 
        // Hakee elokuvat valitusta teatterista
        fetch(`https://www.finnkino.fi/xml/Schedule/?area=${theaterId}`)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                const shows = xml.getElementsByTagName("Show");
                // Hakee elokuvien tiedot, jotka halutaan näyttää
                for (let show of shows) {
                    const title = show.getElementsByTagName("Title")[0].textContent;
                    const imageUrl = show.getElementsByTagName("EventSmallImagePortrait")[0].textContent;
                    const startTime = show.getElementsByTagName("dttmShowStart")[0].textContent;

                    const movieDiv = document.createElement("div");
                    movieDiv.classList.add("movie");

                    movieDiv.innerHTML = `
                        <img src="${imageUrl}" alt="${title}" />
                        <h3>${title}</h3>
                        <p>Showtime: ${new Date(startTime).toLocaleString()}</p>
                    `;

                    moviesContainer.appendChild(movieDiv);
                }
            });
    });
});*/
function getTheaterId() {
    var theaterSelect = document.getElementById("theaterSelect");
    var xhttp = new XMLHttpRequest();

    // Määritetään HTTP-pyyntö
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xml = parser.parseFromString(this.responseText, "application/xml");
            var theaters = xml.getElementsByTagName("TheatreArea");

            // Tyhjennetään valikko ennen uusien teattereiden lisäämistä
            theaterSelect.innerHTML = "";

            // Käydään läpi kaikki teatterit ja lisätään ne valikkoon
            for (var i = 0; i < theaters.length; i++) {
                var id = theaters[i].getElementsByTagName("ID")[0].textContent;
                var name = theaters[i].getElementsByTagName("Name")[0].textContent;

                var option = document.createElement("option");
                option.value = id;
                option.textContent = name;
                // Lisätään teatteri valikkoon
                theaterSelect.appendChild(option);
            }
        }
    };

    // Lähetetään HTTP GET -pyyntö FinnKinon API:lle
    xhttp.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);
    xhttp.send();
}
function goingMovies() {
    var moviesContainer = document.getElementById("moviesContainer");
    var xhttp = new XMLHttpRequest();
    // Tyhjennetään aiemmat elokuvat
    moviesContainer.innerHTML = "";
    // Määritetään HTTP-pyyntö
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xml = parser.parseFromString(this.responseText, "application/xml");
            var shows = xml.getElementsByTagName("Show");
            // Luodaan HTML-taulukko elokuvien näyttämistä varten
            var output = "<h2>On going movies:</h2></br><table>";
            // Käydään läpi kaikki näytökset
            for (var i = 0; i < shows.length; i++) {
                var title = shows[i].getElementsByTagName("Title")[0].textContent;
                var imageUrl = shows[i].getElementsByTagName("EventSmallImagePortrait")[0].textContent;
                //Näytetään vain elokuvia, joiden näyttöaika on menossa taulukossa
                output += `
                    <tr>
                        <td><img src="${imageUrl}" alt="${title}" style="width: 150px;"></td>
                        <td><h4>${title}</h4></td>
                    </tr>
                `;          
            }
            output += "</table>";
            // Näytetään elokuvat
            moviesContainer.innerHTML = output;
        }
    };
    // Lähetetään HTTP GET -pyyntö FinnKinon API:lle
    xhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xhttp.send();
}
document.addEventListener("DOMContentLoaded", getTheaterId);
