let continueCreate = false

do {
    let passName = prompt("Seleccione un nombre para su contraseña")
    const passNumber = Number(prompt("Ingrese el numero de caracteres que desee tener su contraseña"));

    let password = ""

    function letterAleatory() {
        const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";
        return password += letras.charAt(Math.floor(Math.random() * letras.length));
    }

    function numberAleatory() {
        return password += Math.floor(Math.random() * 9) + 1;
    }

    if (passNumber < 5 || passNumber > 20) {

        alert("La contraseña debe tener entre 5 y 20 carateres");

    } else if (isNaN(passNumber)) {

        alert("Seleciona un numero valido")
        
    } else {

        const passType = prompt("Desea caracteres, numeros o ambas?");
        console.log(passNumber)

        switch (passType) {
            case "caracteres":
                for (let i = 0; i < passNumber; i++) {
                    letterAleatory();
                }
                alert("Tu contrseña de " + passName + " es " + password)
                continueCreate = confirm("Desea crear alguna otra contraseña")
                break;

            case "numeros":
                for (let i = 0; i < passNumber; i++) {
                    numberAleatory();
                }
                alert("Tu contrseña de " + passName + " es " + password)
                continueCreate = confirm("Desea crear alguna otra contraseña")
                break;

            case "ambas":
                for (let i = 0; i < passNumber; i++) {
                    if (Math.random() > 0.50) {
                        letterAleatory();
                    } else {
                        numberAleatory();
                    }
                }
                alert("Tu contrseña de " + passName + " es " + password)
                continueCreate = confirm("Desea crear alguna otra contraseña")
                break;

            default:
                alert("Seleciona un tipo de contraseña valido")
                break;
        }
    }

} while (continueCreate)
