const cumpleaños = [
    { nombre: "Matias", fecha: "01/26" },
    { nombre: "Sebastian", fecha: "11/01" },
    { nombre: "Paula", fecha: "04/18" },
    { nombre: "Candela", fecha: "09/06" },
    { nombre: "Martina", fecha: "05/10" },
];

// Ordenar cumpleaños por fecha (MM/DD)
const cumpleañosOrdenados = cumpleaños.sort((a, b) => {
    const [mesA, diaA] = a.fecha.split('/').map(Number);
    const [mesB, diaB] = b.fecha.split('/').map(Number);
    return mesA === mesB ? diaA - diaB : mesA - mesB;
});

let paginaActual = 1;
const itemsPorPagina = 6;

const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function mostrarCumpleaños() {
    const container = document.getElementById("cardContainer");
    container.innerHTML = "";

    const inicio = (paginaActual - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const itemsPagina = cumpleañosOrdenados.slice(inicio, fin);

    // Obtener fecha actual (DD/MM)
    const hoy = new Date();
    const diaHoy = String(hoy.getDate()).padStart(2, '0');
    const mesHoy = String(hoy.getMonth() + 1).padStart(2, '0');
    const fechaHoy = `${diaHoy}/${mesHoy}`;

    itemsPagina.forEach(persona => {
        const [mes, dia] = persona.fecha.split('/');
        const nombreMes = meses[Number(mes) - 1];
        const fechaFormateada = `${parseInt(dia)} de ${nombreMes}`;

        const card = document.createElement("div");
        card.classList.add("card");

        // Comparar con la fecha de hoy (en formato DD/MM)
        if (`${dia.padStart(2, '0')}/${mes.padStart(2, '0')}` === fechaHoy) {
            card.classList.add("hoy"); // clase para resaltar
        }

        card.innerHTML = `
            <h3>${persona.nombre}</h3>
            <p>🎂 Fecha: ${fechaFormateada}</p>
        `;

        container.appendChild(card);
    });

    // Actualizar info de paginación
    const totalPaginas = Math.ceil(cumpleañosOrdenados.length / itemsPorPagina);
    document.getElementById("pageInfo").textContent = `Página ${paginaActual} de ${totalPaginas}`;

    // Desactivar botones cuando sea necesario
    document.getElementById("prevPage").disabled = paginaActual === 1;
    document.getElementById("nextPage").disabled = paginaActual === totalPaginas;
}


// Eventos de paginación
document.getElementById("prevPage").addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarCumpleaños();
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    const totalPaginas = Math.ceil(cumpleañosOrdenados.length / itemsPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarCumpleaños();
    }
});

// Mostrar la primera página
mostrarCumpleaños();

