let continueCreate = false;
let idCounter = 1;

class Password {
    constructor(name, pass) {
        this.name = name.toLowerCase();
        this.password = pass;
        this.id = idCounter++;
    }

    passwordStrong (){
        const passwordLength = this.password.length

        if(passwordLength < 9){
            return "Debil"
        } else if (passwordLength >= 9 && passwordLength < 14){
            return "Moderada"
        } else{
            return "Fuerte"
        }
    }
}

let passwordContainer = [];

function letterAleatory() {
    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";
    return  letras.charAt(Math.floor(Math.random() * letras.length))
}

function numberAleatory() {
    return Math.floor(Math.random() * 9) + 1;
}

function passwordCreate (passwordName, passwordNumber){
    let passwordGenerate = ""; 

    const passType = prompt("Desea caracteres, numeros o ambas?");

        switch (passType) {
            case "caracteres":
                for (let i = 0; i < passwordNumber; i++) {
                    passwordGenerate += letterAleatory();
                }
                passwordContainer.push(new Password(passwordName, passwordGenerate));
                alert("Tu contrseña de " + passwordName + " es " + passwordGenerate);
                continueCreate = confirm("Desea crear alguna otra contraseña");
                break;

            case "numeros":
                for (let i = 0; i < passwordNumber; i++) {
                    passwordGenerate +=  numberAleatory();
                }
                passwordContainer.push(new Password(passwordName, passwordGenerate));
                alert("Tu contrseña de " + passwordName + " es " + passwordGenerate);
                continueCreate = confirm("Desea crear alguna otra contraseña");
                break;

            case "ambas":
                for (let i = 0; i < passwordNumber; i++) {
                    if (Math.random() > 0.5) {
                        passwordGenerate +=  letterAleatory();
                    } else {
                        passwordGenerate +=  numberAleatory();
                    }
                }
                passwordContainer.push(new Password(passwordName, passwordGenerate));
                alert("Tu contrseña de " + passwordName + " es " + passwordGenerate);
                continueCreate = confirm("Desea crear alguna otra contraseña");
                break;

            default:
                alert("Seleciona un tipo de contraseña valido");
                break;
        }
}

do {
    let passName = prompt("Seleccione un nombre para su contraseña");
    const passNumber = Number(
        prompt("Ingrese el numero de caracteres que desee tener su contraseña")
    );

    let passNameRepeat = passwordContainer.find((pass) => pass.name === passName);

    if (passNumber < 5 || passNumber > 20) {
        alert("La contraseña debe tener entre 5 y 20 carateres");
    } else if (isNaN(passNumber)) {
        alert("Seleciona un numero valido");
    } else if (passNameRepeat) {
        alert("El nombre creado ya esta siendo utilizado");
    } else if (passName === "") {
        alert("Ingresa algun nombre");
    } else {
        passwordCreate(passName,passNumber)
    }
} while (continueCreate);

let continueDelete = false;

function deletePassContainer(deleteID) {
    const passIndex = passwordContainer.findIndex(
        (pass) => pass.id === deleteID
    );

    if (passIndex !== -1) {
                passwordContainer.splice(passIndex, 1);
                alert("Contraseña eliminada correctamente")
    } else {
        alert("Selecione un ID valido");
    }
}

do {

    continueDelete = confirm("desea eliminar alguna contraseña");

    if(!continueDelete) break;

    const passwordList = passwordContainer.map((pass) => {
        return "PASS NAME: " + pass.name + " | PASS ID: " + pass.id;
    });

    let passwordToDelete = Number(
        prompt(
            "Que contrasñea desea eliminar (selecciona su id correspondiente)\n" +
            passwordList.join("\n")
        )
    );

    if (isNaN(passwordToDelete) || passwordToDelete === "") {
        alert("Seleccione un ID valido");
    }else {

        deletePassContainer(passwordToDelete);

    }
    
} while (continueDelete);
