var alphabet = [],
    words = [],
    selectedWord = "",
    numberOfTries = 0,
    countOfFound = 0,
    totalRights = 7,
    results = null,
    statusArea = null;

function initialize() {
    results = document.getElementById("results");
    statusArea = document.getElementById("current-status");
    alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    words = ["yusuf", "sefa", "sezer", "yusufsefa", "yusufsezer", "sefasezer", "yusufsefasezer"];

    var position = randomNumber(0, words.length);
    selectedWord = words[position].toUpperCase();

    for (var i = 0; i < selectedWord.length; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.readOnly = true;
        document.getElementById("inputs").appendChild(input);
    }

    for (var i = 0; i < alphabet.length; i++) {
        var btn = document.createElement("button");
        btn.innerHTML = alphabet[i];
        btn.onclick = checkIt;
        document.getElementById("buttons").appendChild(btn);
    }
}

function checkIt() {
    var currentValue = this.innerHTML,
        foundIt = true;

    for (var i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] == currentValue) {
            document.getElementsByTagName("input")[i].value = currentValue;
            foundIt = false;
            countOfFound++;
        }
    }

    if (countOfFound == selectedWord.length) {
        results.innerHTML = "Congratulations !!!";
        return;
    }

    this.disabled = true;

    if (foundIt) {
        numberOfTries++;
        statusArea.src = "img/status_" + numberOfTries + ".gif";

        results.innerHTML = "Try it " + numberOfTries + " times.";
        results.innerHTML += "<br />";
        results.innerHTML += "You have " + (totalRights - numberOfTries) + " remaining.";

        if (numberOfTries == totalRights) {
            var btns = document.getElementsByTagName("button");

            for (var i = 0; i < btns.length; i++) {
                btns[i].disabled = true;
            }
        }

    }

}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

window.onload = initialize;