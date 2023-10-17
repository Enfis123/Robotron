// Simulación de datos de temperatura aleatorios
function generateRandomTemperature() {
    return Math.floor(Math.random() * 100);
}

// Inicialización del gráfico
var ctx = document.getElementById("temperature-chart").getContext("2d");
var temperatureChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [],
        datasets: [
            {
                label: "Temperatura",
                borderColor: "rgb(75, 192, 192)",
                data: [],
                fill: true,
            },
        ],
    },
    options: {
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: "Tiempo",
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: "Temperatura (°C)",
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
    },
});

// Registro de temperaturas
var temperatureList = document.getElementById("temperature-list");
var alarmMessage = document.getElementById("alarm-message");
var temperatureData = [];
var timeLabels = [];
var alarmTriggered = false;

// Punto de ajuste de temperatura (puede ser modificado por el usuario)
var temperatureSetpoint = 60;

// Referencia al elemento de entrada para el punto de ajuste
var temperatureSetpointInput = document.getElementById("temperature-setpoint");
// Botón para aplicar el punto de ajuste
var setTemperatureSetpointButton = document.getElementById("set-temperature");

// Escuchar el clic en el botón para aplicar el punto de ajuste
setTemperatureSetpointButton.addEventListener("click", function () {
    var newSetpoint = parseInt(temperatureSetpointInput.value);

    // Asegurarse de que el valor del punto de ajuste sea válido (por ejemplo, entre 0 y 100)
    if (!isNaN(newSetpoint) && newSetpoint >= 0 && newSetpoint <= 100) {
        // Actualizar el valor del punto de ajuste en tiempo real
        temperatureSetpoint = newSetpoint;
    }
});

// Función para actualizar el gráfico y la lista de temperaturas
function updateChartAndList() {
    var temperature = generateRandomTemperature();
    var currentTime = new Date().toLocaleTimeString();

    // Agregar datos al gráfico
    temperatureData.push(temperature);
    timeLabels.push(currentTime);

    if (temperatureData.length > 10) {
        temperatureData.shift();
        timeLabels.shift();
    }

    temperatureChart.data.labels = timeLabels;
    temperatureChart.data.datasets[0].data = temperatureData;
    temperatureChart.update();

    // Agregar datos a la lista
    var listItem = document.createElement("li");
    listItem.textContent = `Temperatura a las ${currentTime}: ${temperature}°C`;

    if (temperatureList.children.length >= 20) {
        temperatureList.removeChild(temperatureList.firstElementChild);
    }

    temperatureList.appendChild(listItem);

    // Comprobar la alarma según el punto de ajuste
    if (temperature > temperatureSetpoint && !alarmTriggered) {
        alarmTriggered = true;
        alarmMessage.textContent = `¡Alarma de temperatura! La temperatura está por encima de ${temperatureSetpoint} grados.`;
        alarmMessage.style.color = "red";
    } else if (temperature <= temperatureSetpoint && alarmTriggered) {
        alarmTriggered = false;
        alarmMessage.textContent = `La temperatura está dentro del rango normal (<= ${temperatureSetpoint} grados).`;
        alarmMessage.style.color = "black";
    }
}

// Actualizar cada 5 segundos
setInterval(updateChartAndList, 2000);

