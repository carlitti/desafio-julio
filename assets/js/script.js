let totalResultado = document.querySelector('#total-resultado');
let totalRealizadas = document.querySelector('#total-realizadas');
let botonAgregar = document.querySelector('#buttonAgregar');
let tablaTotales = document.querySelector('#tablaTotales');
let tablaRealizadas = document.querySelector('#tablaRealizadas');
let tablaVaciaTareas = document.querySelector('#mensaje-vacio-tareas');
let tablaVaciaRealizadas = document.querySelector('#mensaje-vacio-realizadas');

let contadorTotalTareas = 0;

// Inicializar el próximo ID disponible con 4 ya que las tres primeras tareas están definidas
let nextTaskId = 5;

let tareasIniciales = [
    { id: 1, nombre: 'Hacer las compras de la semana' },
    { id: 2, nombre: 'Enviar desafío semanal' },
    { id: 3, nombre: 'Sacar a pasear al perro' }
];

let tareasRealizadas = [
    { id: 4, nombre: 'Enviar desafío semanal' }
];

botonAgregar.addEventListener("click", function () {
    let valorInput = document.querySelector('#textCajaAgregar');

    if (valorInput.value == "") {
        alert("Debe escribir una tarea nueva para usar el botón 'Agregar'");
    } else {
        let tareaNueva = {
            id: nextTaskId++, // Incrementar el ID después de asignarlo
            nombre: valorInput.value
        };

        tareasIniciales.push(tareaNueva);
        refrescar();
        valorInput.value = "";
    }
});

function refrescar() {
    refrescarTareas();
    refrescarRealizadas();
};

function conteoTareasRealizadas(checkbox, id) {
    const index = tareasIniciales.findIndex((ele) => ele.id == id);
    if (index !== -1) {
        const tareaRealizada = tareasIniciales.splice(index, 1)[0];
        tareasRealizadas.push(tareaRealizada);
        refrescar();
    }
};

function restaurarTarea(checkbox, id) {
    const index = tareasRealizadas.findIndex((ele) => ele.id == id);
    if (index !== -1) {
        const tareaRestaurada = tareasRealizadas.splice(index, 1)[0];
        tareasIniciales.push(tareaRestaurada);
        refrescar();
    }
};

function eliminarTarea(id) {
    const index = tareasIniciales.findIndex((ele) => ele.id == id);
    tareasIniciales.splice(index, 1);
    refrescarTareas();
    if (tareasIniciales.length === 0) {
        tablaVaciaTareas.style.display = "block";
    }
};

function eliminarRealizada(id) {
    const index = tareasRealizadas.findIndex((ele) => ele.id == id);
    tareasRealizadas.splice(index, 1);
    refrescarRealizadas();
    if (tareasRealizadas.length === 0) {
        tablaVaciaRealizadas.style.display = "block";
    }
};

function refrescarTareas() {
    tablaTotales.innerHTML = "";

    let filaInicial = document.createElement('tr');
    let celda1Inicial = document.createElement('th');
    let celda2Inicial = document.createElement('th');

    celda1Inicial.innerHTML = "ID";
    celda2Inicial.innerHTML = "Tarea";

    tablaTotales.appendChild(filaInicial);
    filaInicial.appendChild(celda1Inicial);
    filaInicial.appendChild(celda2Inicial);

    for (let x of tareasIniciales) {
        let fila = document.createElement('tr');
        let celda1 = document.createElement('td');
        let celda2 = document.createElement('td');

        let check = document.createElement('input');
        check.setAttribute("type", "checkbox");
        check.setAttribute("onchange", `conteoTareasRealizadas(this, ${x.id})`);

        let cruz = document.createElement('button');
        cruz.innerHTML = "&#10060;";
        cruz.setAttribute("onclick", `eliminarTarea(${x.id})`);
        cruz.setAttribute("class", "btn btn-without-border");

        celda1.innerHTML = x.id;
        celda2.innerHTML = x.nombre;

        tablaTotales.appendChild(fila);
        fila.appendChild(celda1);
        fila.appendChild(celda2);
        fila.appendChild(check);
        fila.appendChild(cruz);
    }

    totalResultado.innerHTML = "Total: " + tareasIniciales.length;
};

function refrescarRealizadas() {
    tablaRealizadas.innerHTML = '';

    let filaRealizadas = document.createElement('tr');
    let celda1Realizadas = document.createElement('th');
    let celda2Realizadas = document.createElement('th');

    celda1Realizadas.innerHTML = "ID";
    celda2Realizadas.innerHTML = "Tarea";

    tablaRealizadas.appendChild(filaRealizadas);
    filaRealizadas.appendChild(celda1Realizadas);
    filaRealizadas.appendChild(celda2Realizadas);

    for (let x of tareasRealizadas) {
        let fila = document.createElement('tr');
        let celda1 = document.createElement('td');
        celda1.setAttribute("class", "text-decoration-line-through");
        let celda2 = document.createElement('td');
        celda2.setAttribute("class", "text-decoration-line-through");

        let ticket = document.createElement('button');
        ticket.innerHTML = "&#8634;";
        ticket.setAttribute("onclick", `restaurarTarea(this, ${x.id})`);
        ticket.setAttribute("class", "btn btn-without-border");

        let cruz = document.createElement('button');
        cruz.innerHTML = "&#10060;";
        cruz.setAttribute("onclick", `eliminarRealizada(${x.id})`);
        cruz.setAttribute("class", "btn btn-without-border");

        celda1.innerHTML = x.id;
        celda2.innerHTML = x.nombre;

        tablaRealizadas.appendChild(fila);
        fila.appendChild(celda1);
        fila.appendChild(celda2);
        fila.appendChild(ticket);
        fila.appendChild(cruz);
    }

    totalRealizadas.innerHTML = "Realizadas: " + tareasRealizadas.length;
};

window.addEventListener("load", function () {
    refrescar();
});
