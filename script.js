// Simulación de datos de temperatura
function generateRandomTemperature() {
    return Math.floor(Math.random() * 100);
}

// Crear un gráfico de temperatura utilizando Chart.js
var ctx = document.getElementById('temperature-chart').getContext('2d');
var maxDataPoints = 20;

var temperatureData = {
    labels: [],
    datasets: [{
        label: 'Temperatura',
        data: [],
        borderColor: 'blue',
        fill: true,
    }]
};

var temperatureChart = new Chart(ctx, {
    type: 'line',
    data: temperatureData,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// Variables y elementos HTML
var dataCounter = 0;
var alarmActive = false;
var alarmMessage = document.getElementById('alarm-message');
var temperatureList = document.getElementById('temperature-list');

// Agregar registro a la lista
function addTemperatureRecord(time, temperature) {
    var li = document.createElement('li');
    li.textContent = `Tiempo: ${time}, Temperatura: ${temperature} grados`;
    temperatureList.appendChild(li);
}

// Actualizar el gráfico y procesar datos
setInterval(function () {
    var temperatureValue = generateRandomTemperature();
    var currentTime = new Date().toLocaleTimeString();

    temperatureData.labels.push(currentTime);
    temperatureData.datasets[0].data.push(temperatureValue);

    if (dataCounter > maxDataPoints) {
        temperatureData.labels.shift();
        temperatureData.datasets[0].data.shift();
    } else {
        dataCounter++;
    }

    if (temperatureValue > 60 && !alarmActive) {
        alarmActive = true;
        alarmMessage.textContent = '¡Alarma de temperatura! La temperatura está por encima de 60 grados.';
        alarmMessage.style.color = 'red';

        addTemperatureRecord(currentTime, temperatureValue);
    } else if (temperatureValue <= 60 && alarmActive) {
        alarmActive = false;
        alarmMessage.textContent = 'La temperatura está dentro del rango normal.';
        alarmMessage.style.color = 'black';
    }

    temperatureChart.update();
}, 1000);
