// ==UserScript==
// @name         Google Colab Fenix
// @namespace    https://github.com/MattyMroz
// @version      1.0
// @description  Automatyzacja sesji Google Colab: przedłużanie sesji, zamykanie programu, ponowne uruchamianie i automatyczne uruchamianie pierwszej komórki. Jak Feniks, Twoja sesja zawsze powstanie z popiołów.
// @author       Matty_Mroz
// @match        https://colab.research.google.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

/**
 * ! Function to click the "Run" button.
 * This function looks for the "Run" button on the page and clicks it.
 *
 * ! Funkcja do kliknięcia przycisku "Uruchom ponownie".
 * Ta funkcja szuka przycisku "Uruchom ponownie" na stronie i kliknięcie go.
 */
function clickRunButton() {
    console.log("Attempting to click the button..."); // Próba kliknięcia przycisku...

    let button = document.querySelector("colab-run-button");
    if (button && button.shadowRoot) {
        button.shadowRoot.querySelector("div").click();
        console.log("Button clicked"); // Przycisk został kliknięty
    } else {
        console.log("Button not found"); // Przycisk nie został znaleziony
    }
}

/**
 * ! Function to check for specific text and click the button.
 * This function checks if a specific text has appeared on the page,
 * and if so, it triggers the clickRunButton() function.
 *
 * ! Funkcja do sprawdzania tekstu i kliknięcia przycisku.
 * Ta funkcja sprawdza, czy na stronie pojawił się określony tekst,
 * a jeśli tak, to uruchamia funkcję clickRunButton().
 */
function checkTextAndClickButton() {
    console.log("Checking for text..."); // Sprawdzanie tekstu...

    if (document.body.innerText.includes("Wszystkie klucze API są wyczerpane. Zamykanie wszystkich procesów...")) {
        console.log("Text found. Attempting to click the button..."); // Znaleziono tekst. Próba kliknięcia przycisku...
        // clickRunButton();
        location.reload();
        var event = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            charCode: 13
        });
        document.dispatchEvent(event);
    } else {
        console.log("Text not found"); // Tekst nie został znaleziony
    }
}

/**
 * ! Function to click the "Connect" button.
 * This function looks for the "Connect" button on the page and clicks it.
 *
 * ! Funkcja do kliknięcia przycisku "Połącz".
 * Ta funkcja szuka przycisku "Połącz" na stronie i kliknięcie go.
 */
function clickConnectButton() {
    console.log("Attempting to click the connect button"); // Próba kliknięcia przycisku połączenia

    let colabConnectButton = document.querySelector("colab-connect-button");
    if (colabConnectButton && colabConnectButton.shadowRoot) {
        let actualButton = colabConnectButton.shadowRoot.querySelector("colab-toolbar-button#connect");
        if (actualButton) {
            actualButton.click();
            console.log("Connect button clicked"); // Kliknięto przycisk połączenia
        } else {
            console.log("Button not found"); // Nie znaleziono przycisku
        }
    } else {
        console.log("Button not found"); // Nie znaleziono przycisku
    }
}

// Run the clickRunButton() function immediately upon script execution
// Uruchom funkcję clickRunButton() od razu po uruchomieniu skryptu
setTimeout(clickRunButton, 10000);

// Set intervals for the functions
// The checkTextAndClickButton() function will be called every 10 seconds
// Ustaw interwały dla funkcji
// Funkcja checkTextAndClickButton() będzie uruchamiana co 10 sekund
setInterval(checkTextAndClickButton, 10000);

// The clickConnectButton() function will be called every 60 seconds
// Funkcja clickConnectButton() będzie uruchamiana co 60 sekund
setInterval(clickConnectButton, 60000);
window.onbeforeunload = null;