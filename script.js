let idCounter = parseInt(localStorage.getItem("idCounter")) || 0;

async function catFact () {
    try{
        const response = await fetch("https://catfact.ninja/fact")
        const data = await response.json()
    
        const h1 = document.createElement("h1");
        h1.innerHTML = data.fact
    
        document.body.appendChild(h1);
    } catch(error){
        console.error("error :", error)
    }
} 

catFact()

class Password {
    constructor(name, pass) {
        this.name = name.toLowerCase();
        this.password = pass;
        this.id = idCounter++;
        this.strength = this.passwordStrong();
        localStorage.setItem("idCounter", idCounter);
    }

    passwordStrong() {
        const passwordLength = this.password.length;

        if (passwordLength < 9) {
            return "Debil";
        } else if (passwordLength >= 9 && passwordLength < 14) {
            return "Moderada";
        } else {
            return "Fuerte";
        }
    }
}

function letterAleatory() {
    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";
    return letras.charAt(Math.floor(Math.random() * letras.length));
}

function numberAleatory() {
    return Math.floor(Math.random() * 9) + 1;
}

function passwordCreate(passwordNumber, passType) {
    let passwordGenerate = "";

    switch (passType) {
        case "caracteres":
            for (let i = 0; i < passwordNumber; i++) {
                passwordGenerate += letterAleatory();
            }
            return passwordGenerate;

        case "numeros":
            for (let i = 0; i < passwordNumber; i++) {
                passwordGenerate += numberAleatory();
            }
            return passwordGenerate;

        case "ambas":
            for (let i = 0; i < passwordNumber; i++) {
                if (Math.random() > 0.5) {
                    passwordGenerate += letterAleatory();
                } else {
                    passwordGenerate += numberAleatory();
                }
            }
            return passwordGenerate;

        default:
            alert("Seleciona un tipo de contraseña valido");
            break;
    }
}

function savePassLocal(passwordSave) {
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
    passwords = [...passwords, passwordSave];
    localStorage.setItem("passwords", JSON.stringify(passwords));
}

function PassSaved (){
    const passwordStorage = JSON.parse(localStorage.getItem("passwords"))
    return passwordStorage
}

function getPassSaved (){
    if(localStorage.getItem("passwords")){
        const passwordStoraged = PassSaved()

        passwordStoraged.forEach(pass => {
            paintPass(pass)
        });
    }
}

function deletePassword(id) {
    let storedPasswords = JSON.parse(localStorage.getItem("passwords")) || []; 
    storedPasswords = storedPasswords.filter(password => password.id !== id);
    localStorage.setItem("passwords", JSON.stringify(storedPasswords)); 
    location.reload(); 
}

function addDeleteListeners() {
    document.querySelectorAll(".buttonDelete").forEach(button => {
        button.addEventListener("click", function() {
            const passwordId = parseInt(this.id);
            deletePassword(passwordId)
        });
    });
}

function paintPass(password) {
    const passContainer = document.getElementById("passContainer");

    const div = document.createElement("div");

    div.className = "passBox"

    div.innerHTML += `

        <h1>${password.name}</h1>
        <div class="passAtribute">
        <p><strong>Fuerza</strong>: ${password.strength}</p>
        </div>
        <div class="passAtribute">
        <p><strong>Contraseña</strong>: ${password.password}</p>
        </div>
        <button href="#" class="buttonDelete" id="${password.id}" name="delete">Delete</button>
  `;

    passContainer.appendChild(div)

    addDeleteListeners();
}

document
    .getElementById("passwordForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("passName").value;
        const pass = document.getElementById("passType").value;
        const length = document.getElementById("passLength").value;

        const generatedPassword = passwordCreate(length, pass);

        const newPassword = new Password(name, generatedPassword);

        savePassLocal(newPassword);

        paintPass(newPassword)

        console.log("Contraseña Generada:", newPassword.password);
        console.log("Fuerza de la contraseña:", newPassword.passwordStrong());
    });

document.addEventListener("DOMContentLoaded", getPassSaved);