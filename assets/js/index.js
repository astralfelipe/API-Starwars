class Persona {
    constructor(nombre, altura, peso) {
        this.nombre = nombre;
        this.altura = altura;
        this.peso = peso;
    }
}

const getPersonaje = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = "https://swapi.dev/api/people/" + id;
            let response = await fetch(url);
            let data = await response.json();
            let { name, height, mass } = data;
            let nuevoPersonaje = new Persona(name, height, mass);
            resolve(nuevoPersonaje);
        } catch (error) {
            reject();
        }
    });
};

function* generator1() {
    yield getPersonaje(1);
    yield getPersonaje(2);
    yield getPersonaje(3);
    yield getPersonaje(4);
    yield getPersonaje(5);
}

function* generator2() {
    yield getPersonaje(6);
    yield getPersonaje(7);
    yield getPersonaje(8);
    yield getPersonaje(9);
    yield getPersonaje(10);
}

function* generator3() {
    yield getPersonaje(11);
    yield getPersonaje(12);
    yield getPersonaje(13);
    yield getPersonaje(14);
    yield getPersonaje(15);
}

function populateCard(cardId, generator) {
    let cardResults = $(`#${cardId}Results`);
    cardResults.empty();

    function handleClick() {
        let resultado = generator.next();
        if (resultado.done) {
            console.log("El generador ha terminado");
        } else {
            resultado.value
                .then((personaje) => {
                    console.log(personaje);
                    let listItem = `<li class="list-group-item">
                                        <div class="circle ${getColorClass(cardId)}"></div>
                                        <div>${personaje.nombre} - Altura: ${personaje.altura}, Peso: ${personaje.peso}</div>
                                    </li>`;
                    cardResults.append(listItem);
                    handleClick();
                })
                .catch((error) => {
                    console.log("Error al consultar el personaje");
                });
        }
    }

    handleClick();
}

function getColorClass(cardId) {
    switch (cardId) {
        case 'card1':
            return 'red';
        case 'card2':
            return 'green';
        case 'card3':
            return 'blue';
        default:
            return '';
    }
}

$(document).ready(function () {
    populateCard('card1', generator1());
    populateCard('card2', generator2());
    populateCard('card3', generator3());
});
