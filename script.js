let continueCreate = false;
let idCounter = 1;

class Password {
    constructor(name, pass) {
        this.name = name.toLowerCase();
        this.password = pass;
        this.id = idCounter++;
    }
}

let passwordContainer = [];

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
        const passType = prompt("Desea caracteres, numeros o ambas?");

        function letterAleatory() {
            const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";
            return (passwordGenerate += letras.charAt(
                Math.floor(Math.random() * letras.length)
            ));
        }

        function numberAleatory() {
            return (passwordGenerate += Math.floor(Math.random() * 9) + 1);
        }

        let passwordGenerate = "";

        switch (passType) {
            case "caracteres":
                for (let i = 0; i < passNumber; i++) {
                    letterAleatory();
                }
                passwordContainer.push(new Password(passName, passwordGenerate));
                alert("Tu contrseña de " + passName + " es " + passwordGenerate);
                continueCreate = confirm("Desea crear alguna otra contraseña");
                break;

            case "numeros":
                for (let i = 0; i < passNumber; i++) {
                    numberAleatory();
                }
                passwordContainer.push(new Password(passName, passwordGenerate));
                alert("Tu contrseña de " + passName + " es " + passwordGenerate);
                continueCreate = confirm("Desea crear alguna otra contraseña");
                break;

            case "ambas":
                for (let i = 0; i < passNumber; i++) {
                    if (Math.random() > 0.5) {
                        letterAleatory();
                    } else {
                        numberAleatory();
                    }
                }
                passwordContainer.push(new Password(passName, passwordGenerate));
                alert("Tu contrseña de " + passName + " es " + passwordGenerate);
                continueCreate = confirm("Desea crear alguna otra contraseña");
                break;

            default:
                alert("Seleciona un tipo de contraseña valido");
                break;
        }
    }
} while (continueCreate);

let continueDelete = false;

continueDelete = confirm("desea eliminar alguna contraseña");

do {
    const passwordList = passwordContainer.map((pass) => {
        return "PASS NAME: " + pass.name + " | PASS ID: " + pass.id;
    });

    let passwordToDelete = Number(
        prompt(
            "Que contrasñea desea eliminar (selecciona su id correspondiente)\n" +
            passwordList.join("\n")
        )
    );

    function deletePassContainer(deleteID) {
        const passIndex = passwordContainer.findIndex(
            (pass) => pass.id === deleteID
        );

        if (passIndex !== -1) {
            passwordContainer.forEach((pass, index) => {
                if (pass.id === deleteID) {
                    passwordContainer.splice(index, 1);
                }
            });
        } else {
            alert("Selecione un ID valido");
        }
    }

    if (isNaN(passwordToDelete)) {
        alert("Seleccione un ID valido");
    } else if (passwordToDelete === "") {
        alert("Debe completar el campo");
    } else {
        deletePassContainer(passwordToDelete);

        continueDelete = confirm("Desea seguir eliminando alguna contraseña mas?");
    }
} while (continueDelete);
