const cumpleaños = [
    { nombre: "Matias", fecha: "26/01" },
    { nombre: "Sebastian", fecha: "01/11" },
    { nombre: "Paula", fecha: "18/04" },
    { nombre: "Candela", fecha: "06/09" },
    { nombre: "Martina", fecha: "10/05" },
    { nombre: "Mauricio", fecha: "03/10" },
    { nombre: "Aline", fecha: "09/08" },
    { nombre: "Ana Luisa", fecha: "06/01" },
    { nombre: "Davi", fecha: "12/12" },
    { nombre: "Marta", fecha: "16/09" },
    { nombre: "Greg", fecha: "02/03" },
    { nombre: "Céia", fecha: "30/12" },
    { nombre: "Joba", fecha: "29/01" },
    { nombre: "Eduardo", fecha: "30/07" },
    { nombre: "Carle", fecha: "06/12" },
    { nombre: "Jade", fecha: "26/11" },
    { nombre: "Lucca", fecha: "20/08" },
    { nombre: "Rafael", fecha: "22/05" },
    { nombre: "Rafinha", fecha: "03/08" },
    { nombre: "Nani", fecha: "19/08" },
    { nombre: "Julinho", fecha: "04/03" },
];


const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];


// Ordenar cumpleaños por fecha (DD/MM)
const cumpleañosOrdenados = cumpleaños.sort((a, b) => {
    const [diaA, mesA] = a.fecha.split('/').map(Number);
    const [diaB, mesB] = b.fecha.split('/').map(Number);
    return mesA === mesB ? diaA - diaB : mesA - mesB;
});

let paginaActual = 1;
const itemsPorPagina = 6;

function mostrarCumpleaños() {
    const container = document.getElementById("cardContainer");
    container.innerHTML = "";

    const inicio = (paginaActual - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const itemsPagina = cumpleañosOrdenados.slice(inicio, fin);

    // Obtener fecha actual en formato DD/MM
    const hoy = new Date();
    const diaHoy = String(hoy.getDate()).padStart(2, '0');
    const mesHoy = String(hoy.getMonth() + 1).padStart(2, '0');
    const fechaHoy = `${diaHoy}/${mesHoy}`;

    itemsPagina.forEach(persona => {
        const [dia, mes] = persona.fecha.split('/'); // aquí dia primero porque es DD/MM
        const nombreMes = meses[Number(mes) - 1];
        const fechaFormateada = `${parseInt(dia)} de ${nombreMes}`;

        const card = document.createElement("div");
        card.classList.add("card");

        // Resaltar si es cumpleaños hoy
        if (`${dia.padStart(2, '0')}/${mes.padStart(2, '0')}` === fechaHoy) {
            card.classList.add("hoy");
        }

        card.innerHTML = `
            <h3>${persona.nombre}</h3>
            <p>🎂 Data: ${fechaFormateada}</p>
        `;

        container.appendChild(card);
    });

    // Actualizar info de paginación
    const totalPaginas = Math.ceil(cumpleañosOrdenados.length / itemsPorPagina);
    document.getElementById("pageInfo").textContent = `Página ${paginaActual} de ${totalPaginas}`;

    // Desactivar botones si es necesario
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

// Mostrar la primera página al cargar
mostrarCumpleaños();
