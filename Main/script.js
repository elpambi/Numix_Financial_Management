document.getElementById("agregar").addEventListener("click", function() {
    // Obtener los valores de los campos
    const ingresos = parseFloat(document.getElementById("ingresos").value) || 0;
    const gastos = parseFloat(document.getElementById("gastos").value) || 0;
    const categoria = document.getElementById("categoria").value;
    const fecha = document.getElementById("fecha").value;

    // Verificar que los campos no estén vacíos
    if (!ingresos && !gastos) {
        alert("Por favor, ingrese al menos un monto de ingresos o gastos.");
        return;
    }

    // Crear el objeto de transacción
    const transaccion = {
        ingresos: ingresos,
        gastos: gastos,
        categoria: categoria,
        fecha: fecha
    };

    // Obtener las transacciones previas desde localStorage
    let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

    // Agregar la nueva transacción
    transacciones.push(transaccion);

    // Guardar las transacciones actualizadas en localStorage
    localStorage.setItem("transacciones", JSON.stringify(transacciones));

    // Actualizar las estadísticas
    actualizarEstadisticas();
});

document.getElementById("guardar").addEventListener("click", function() {
    alert("Datos guardados correctamente.");
});

// Función para actualizar las estadísticas
function actualizarEstadisticas() {
    let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

    // Calcular el total de ingresos, gastos y balance
    let totalIngresos = 0;
    let totalGastos = 0;

    transacciones.forEach(t => {
        totalIngresos += t.ingresos;
        totalGastos += t.gastos;
    });

    let balance = totalIngresos - totalGastos;
    let proporcion = ((totalGastos / totalIngresos) * 100).toFixed(2) || 0;

    // Mostrar el balance
    document.getElementById("balance").textContent = balance.toFixed(2);

    // Mostrar la proporción de gasto
    document.getElementById("proporcion").textContent = `${proporcion}% de los ingresos se destinan a gastos.`;

    // Mostrar conclusiones
    let conclusion = balance >= 0 ? "¡Tienes ganancias!" : "¡Estás en déficit!";
    document.getElementById("conclusion").textContent = conclusion;

    // Actualizar el gráfico
    actualizarGrafico(totalIngresos, totalGastos);
}

// Función para actualizar el gráfico
function actualizarGrafico(ingresos, gastos) {
    const ctx = document.getElementById("graficoEstadisticas").getContext("2d");

    // Si ya existe un gráfico, lo destruimos para crear uno nuevo
    if (window.grafico) {
        window.grafico.destroy();
    }

    // Crear un nuevo gráfico
    window.grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ingresos', 'Gastos'],
            datasets: [{
                label: '€',
                data: [ingresos, gastos],
                backgroundColor: ['#4CAF50', '#f44336'],
                borderColor: ['#388E3C', '#F44336'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const botonesMeses = document.querySelectorAll('.btn-categoria, .btn-fecha'); // Seleccionamos todos los botones de categorías y fechas

    botonesMeses.forEach(boton => {
        boton.addEventListener('click', function() {
            // Quitamos la clase 'active' de todos los botones
            botonesMeses.forEach(b => b.classList.remove('active'));
            
            // Añadimos la clase 'active' al botón clickeado
            this.classList.add('active');
        });
    });
});
