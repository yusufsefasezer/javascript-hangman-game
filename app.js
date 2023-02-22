'use strict';

var resultElem = {},
    currentStatus = {},
    selectedWord = '',
    numberOfTries = 0,
    numberOfFound = 0,
    totalRights = 7;

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function check() {
    var currentValue = this.textContent,
        found = false;

    for (var index = 0, length = selectedWord.length; index < length; index++) {
        if (selectedWord[index] == currentValue) {
            document.getElementsByTagName('input')[index].value = currentValue;
            found = true;
            numberOfFound++;
        }
    }

    if (numberOfFound == selectedWord.length) {
        resultElem.textContent = 'Congratulations !!!';
        return disableButtons(document.getElementsByTagName('button'));
    }

    this.disabled = true;

    if (found === false) {
        numberOfTries++;
        currentStatus.src = 'img/status_' + numberOfTries + '.gif';

        var resultText = 'Tried ' + numberOfTries + ' times.'
        resultText += '<br />';
        resultText += 'You have ' + (totalRights - numberOfTries) + ' remaining.';
        resultElem.innerHTML = resultText;

        if (numberOfTries == totalRights) {
            disableButtons(document.getElementsByTagName('button'));
        }
    }
}

function disableButtons(buttons) {
    for (var index = 0, length = buttons.length; index < length; index++) {
        buttons[index].disabled = true;
    }
}

function initElement() {
    resultElem = document.getElementById('results');
    currentStatus = document.getElementById('current-status');

    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var words = ['yusuf', 'sefa', 'sezer', 'yusufsefa', 'yusufsezer', 'sefasezer', 'yusufsefasezer'];
    var position = randomNumber(0, words.length);
    selectedWord = words[position].toUpperCase();

    var inputFragment = document.createDocumentFragment();
    for (var index = 0, length = selectedWord.length; index < length; index++) {
        var newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.maxLength = 1;
        newInput.readOnly = true;
        inputFragment.appendChild(newInput);
    }
    document.getElementById('inputs').appendChild(inputFragment);

    var buttonFragment = document.createDocumentFragment();
    for (var index = 0; index < alphabet.length; index++) {
        var newButton = document.createElement('button');
        newButton.textContent = alphabet[index];
        newButton.addEventListener('click', check);
        buttonFragment.appendChild(newButton);
    }
    document.getElementById('buttons').appendChild(buttonFragment);
}

function init() {
    initElement();
}

window.addEventListener('DOMContentLoaded', init);
