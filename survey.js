let votes = {
    Ja: 0,
    Nein: 0,
    Andere: 0
};

let names = {
    Ja: [],
    Nein: [],
    Andere: []
};

let chart = null;

function updateTitle() {
    const titleSelect = document.getElementById('title-select');
    const surveyTitle = document.getElementById('survey-title');
    surveyTitle.textContent = titleSelect.value;
}

function vote() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim();
    const responseSelect = document.getElementById('response-select');
    const response = responseSelect.value;
    const dateInput = document.getElementById('date-input');
    const date = dateInput.value; // Gewähltes Datum

    if (name === "" || date === "") {
        alert("Bitte gib deinen Namen und ein Datum ein.");
        return;
    }

    if (response === "Ja") {
        votes["Ja"] += 1;
        names["Ja"].push(`${name} (${date})`);

        // Konfetti-Effekt für Ja
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
    } else if (response === "Nein") {
        votes["Nein"] += 1;
        names["Nein"].push(`${name} (${date})`);

        // Video-Effekt für Nein
        showEffect('no-effect');
    } else {
        votes["Andere"] += 1;
        names["Andere"].push(`${name} (${response} - ${date})`);
    }

    nameInput.value = ""; // Eingabefeld leeren
    dateInput.value = ""; // Datum leeren
    updateResults();
}

function updateResults() {
    const yesCount = votes["Ja"];
    const noCount = votes["Nein"];
    const otherCount = votes["Andere"];
    const totalCount = yesCount + noCount + otherCount;

    const yesBar = document.getElementById('yes-bar');
    const noBar = document.getElementById('no-bar');
    const otherBar = document.getElementById('other-bar');

    yesBar.style.width = (totalCount ? (yesCount / totalCount) * 100 : 0) + '%';
    noBar.style.width = (totalCount ? (noCount / totalCount) * 100 : 0) + '%';
    otherBar.style.width = (totalCount ? (otherCount / totalCount) * 100 : 0) + '%';

    document.getElementById('yes-count').textContent = yesCount;
    document.getElementById('no-count').textContent = noCount;
    document.getElementById('other-count').textContent = otherCount;

    updateModalNames();
}

function updateModalNames() {
    const yesTable = document.getElementById('yes-names');
    const noTable = document.getElementById('no-names');
    const otherTable = document.getElementById('other-names');

    // Ja-Tabelle
    yesTable.innerHTML = names["Ja"].map(name => {
        const [nameText, date] = name.split(' (');
        return `<tr><td>${nameText}</td><td>${date.replace(')', '')}</td></tr>`;
    }).join('');

    // Nein-Tabelle
    noTable.innerHTML = names["Nein"].map(name => {
        const [nameText, date] = name.split(' (');
        return `<tr><td>${nameText}</td><td>${date.replace(')', '')}</td></tr>`;
    }).join('');

    // Andere-Tabelle
    otherTable.innerHTML = names["Andere"].map(name => {
        const [nameText, reasonAndDate] = name.split(' - ');
        return `<tr><td>${nameText}</td><td>${reasonAndDate.replace(')', '')}</td></tr>`;
    }).join('');
}

function showChart() {
    document.getElementById('survey-container').style.display = 'none';
    document.getElementById('chart-container').style.display = 'block';
    document.getElementById('chart-title').textContent = document.getElementById('survey-title').textContent;

    const ctx = document.getElementById('results-chart').getContext('2d');
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Ja', 'Nein', 'Andere'],
            datasets: [{
                data: [votes['Ja'], votes['Nein'], votes['Andere']],
                backgroundColor: ['#28a745', '#dc3545', '#ffc107']
            }]
        },
        options: {
            responsive: true
        }
    });
}

function backToSurvey() {
    document.getElementById('survey-container').style.display = 'block';
    document.getElementById('chart-container').style.display = 'none';
}

function showEffect(effectId) {
    const effect = document.getElementById(effectId);
    effect.style.display = 'block';
    setTimeout(() => {
        effect.style.display = 'none';
    }, 1000); // Zeit in Millisekunden, wie lange der Effekt sichtbar ist
}

// Initiales Setup zum Aktualisieren der Balken mit den Anfangswerten
updateResults();
