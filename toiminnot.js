document.addEventListener("DOMContentLoaded", () => {
    const theaterSelect = document.getElementById("theaterSelect");
    const moviesContainer = document.getElementById("moviesContainer");

    // Fetch theater list and populate dropdown
    fetch("https://www.finnkino.fi/xml/TheatreAreas/")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const theaters = xml.getElementsByTagName("TheatreArea");

            for (let theater of theaters) {
                const id = theater.getElementsByTagName("ID")[0].textContent;
                const name = theater.getElementsByTagName("Name")[0].textContent;

                const option = document.createElement("option");
                option.value = id;
                option.textContent = name;
                theaterSelect.appendChild(option);
            }
        });

    // Fetch movies for the selected theater
    theaterSelect.addEventListener("change", () => {
        const theaterId = theaterSelect.value;
        moviesContainer.innerHTML = ""; // Clear previous movies

        fetch(`https://www.finnkino.fi/xml/Schedule/?area=${theaterId}`)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                const shows = xml.getElementsByTagName("Show");

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
});
