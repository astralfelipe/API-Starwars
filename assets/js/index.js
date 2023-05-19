//Función constructora
class Persona {
  constructor(nombre, altura, peso) {
    this.nombre = nombre;
    this.altura = altura;
    this.peso = peso;
  }
}

//Función generadora con método fetch para invocar a la API
async function* generator(desde, hasta) {
  let i = desde;
  while (i <= hasta) {
    let url = "https://swapi.dev/api/people/" + i;
    let response = await fetch(url);
    let data = await response.json();
    let { name, height, mass } = data;
    let nuevoPersonaje = new Persona(name, height, mass);
    yield nuevoPersonaje;
    i++;
  }
}

//Invocación a los generadores
const firstGenerator = generator(1, 5);
const secondGenerator = generator(6, 11);
const thirdGenerator = generator(12, 16);

//Método Switch para obtener los resultados
async function typeGenerator(id) {
  switch (id) {
    case "first":
      const first = await firstGenerator.next();
      return first;
    case "second":
      const second = await secondGenerator.next();
      return second;
    case "third":
      const third = await thirdGenerator.next();
      return third;
  }
}

//Función populateCard para generar la card con los datos de los personajes
async function populateCard(id) {
  const {value,done} = await typeGenerator(id)
  let div = document.getElementById(id);
  console.log(div);
  if (!done) {
    let html = div.innerHTML;
    html += `
    <div class="card shadow-lg p-3 mb-5 bg-body rounded">
    <span class="circle" data-range="1-5"></span>
    <div class="d-flex">
        <span class="${id}-circle"></span>
        <h5>Altura: ${value.altura}</h5>
        <h5>Nombre: ${value.nombre}</h5>
        <h5>Peso: ${value.peso}</h5>
  </div>
    `;
    div.innerHTML = html;
  }
}

//Evento onclick para que cada vez que se haga click arroje los datos de la API solicitados
let first = document.getElementById("first");
let second = document.getElementById("second");
let third = document.getElementById("third");
first.addEventListener("click", (e) => {
  populateCard(first.id);
});

second.addEventListener("click", (e) => {
  populateCard(second.id);
});

third.addEventListener("click", (e) => {
  populateCard(third.id);
});
