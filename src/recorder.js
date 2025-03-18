let recognition = null;
let transcriptText = '';

// Función para iniciar el reconocimiento
function startRecognition() {
    recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'es-ES'; // Configura el idioma
    recognition.continuous = true; // Permite la transcripción continua
    recognition.interimResults = true; // Muestra resultados intermedios

    // Reiniciar el texto de la transcripción
    transcriptText = '';
    document.getElementById('transcript').value = '';

    recognition.onresult = event => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                transcriptText += event.results[i][0].transcript;
                document.getElementById('transcript').value = transcriptText;
            } else {
                document.getElementById('transcript').value = event.results[i][0].transcript;
            }
        }
    };

    recognition.onerror = event => {
        console.error('Error:', event);
    };

    recognition.onstart = () => {
        console.log('Reconocimiento iniciado');
    };

    recognition.onend = () => {
        console.log('Reconocimiento finalizado');
        document.getElementById('transcript').value = transcriptText;
        sendMensajeIA();
    };

    recognition.start();
}

// Función para detener el reconocimiento
function stopRecognition() {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
}

document.getElementById('startBtn').addEventListener('click', () => {
    startRecognition();
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
});

document.getElementById('stopBtn').addEventListener('click', () => {
    stopRecognition();
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
});
