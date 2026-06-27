// ==========================================
// 1. CLASS: PASSWORD GENERATOR LOGIC
// ==========================================
class PasswordGenerator {
    constructor() {
        //Definice sad znaků 
        this.LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
        this.UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.NUMBERS = "0123456789";
        this.SYMBOLS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    }

    generate(length, includeUpper, includeNumbers, includeSymbols) {
        let charPool = this.LOWERCASE; //Malá písmena jsou vždy základ

        if (includeUpper) charPool += this.UPPERCASE;
        if (includeNumbers) charPool += this.NUMBERS;
        if (includeSymbols) charPool += this.SYMBOLS;

        //Ošetření chyby (Edge case): Pokud je pool prázdný (nemělo by nastat díky UI)
        if (charPool.length === 0) return "";

        let generatedPassword = "";
        
        //Generování náhodných znaků z poolu
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charPool.length);
            generatedPassword += charPool[randomIndex];
        }

        return generatedPassword;
    }
}

// ==========================================
// 2. CLASS: USER INTERFACE (UI)
// ==========================================
class UserInterface {
    constructor() {
        //Načtení DOM elementů
        this.resultInput = document.getElementById("passwordResult");
        this.lengthSlider = document.getElementById("length");
        this.lengthValue = document.getElementById("lengthValue");
        this.uppercaseCb = document.getElementById("uppercase");
        this.numbersCb = document.getElementById("numbers");
        this.symbolsCb = document.getElementById("symbols");
        this.generateBtn = document.getElementById("generateBtn");
        this.copyBtn = document.getElementById("copyBtn"); 
    }

    init(generator) {
        //Synchronizace slideru s textem délky
        this.lengthSlider.addEventListener("input", () => {
            this.lengthValue.innerText = this.lengthSlider.value;
        });

        //Event listener na tlačítko pro generování
        this.generateBtn.addEventListener("click", () => {
            const length = parseInt(this.lengthSlider.value);
            const useUpper = this.uppercaseCb.checked;
            const useNumbers = this.numbersCb.checked;
            const useSymbols = this.symbolsCb.checked;

            if (!useUpper && !useNumbers && !useSymbols) {
                this.displayError("Select at least one option!");
                return;
            }

            const password = generator.generate(length, useUpper, useNumbers, useSymbols);
            this.displayPassword(password);
        });

        //Event listener na tlačítko pro kopírování
        this.copyBtn.addEventListener("click", () => {
            const password = this.resultInput.value;

            //Pokud je pole prázdné nebo obsahuje chybovou hlášku, nekopírujeme
            if (!password || password.startsWith("❌")) {
                return;
            }

            //Asynchronní zkopírování do schránky
            navigator.clipboard.writeText(password)
                .then(() => {
                    this.animateCopyButton();
                })
                .catch(err => {
                    console.error("Could not copy text: ", err);
                });
        });
    }

    animateCopyButton() {
        //Vizuální odezva po úspěšném zkopírování
        const originalText = this.copyBtn.innerText;

        this.copyBtn.innerText = "Copied!";
        this.copyBtn.style.backgroundColor = "#00ff00"; //Zelená barva pro úspěch
        this.copyBtn.style.borderColor = "#00ff00";
        this.copyBtn.style.color = "#121212";

        //Po 2 vteřinách vrátíme tlačítko do původního stavu
        setTimeout(() => {
            this.copyBtn.innerText = originalText;
            this.copyBtn.style.backgroundColor = ""; //Vrátí se k CSS stylům
            this.copyBtn.style.borderColor = "";
            this.copyBtn.style.color = "";
        }, 2000);
    }

    displayPassword(password) {
        this.resultInput.value = password;
        this.resultInput.style.borderColor = "#00ff00";
        this.resultInput.style.color = "#00ff00";
    }

    displayError(message) {
        this.resultInput.value = `❌ ${message}`;
        this.resultInput.style.borderColor = "#ff0000";
        this.resultInput.style.color = "#ff0000";
    }
}

// ==========================================
// 3. MAIN APPLICATION ENTRY POINT
// ==========================================
//Inicializace a propojení objektů po načtení stránky
document.addEventListener("DOMContentLoaded", () => {
    const generator = new PasswordGenerator();
    const ui = new UserInterface();
    
    ui.init(generator);
});