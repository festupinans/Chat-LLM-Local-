import './style.css';

let url = 'http://192.168.1.18:41343/v1/chat/completions';

// Variable para almacenar el historial de mensajes
let messageHistory: { role: string, content: string }[] = [
    { role: "system", content: "Tu eres un asistente de IA filosofo, el cual siempre respondera en español." }
];

// Funciones principales para enviar y recibir mensajes
async function sendMensajeIA(): Promise<void> {
    //   const message = (document.getElementById('messageInput') as HTMLInputElement)?.value || '';
    const message = (document.getElementById('transcript') as HTMLTextAreaElement)?.value || '';
    const loader = document.getElementById('loader');

    if (loader) {
        loader.style.display = 'block';
    }

    try {
        // Actualizar el historial de mensajes con el nuevo mensaje del usuario
        messageHistory.push({ role: 'user', content: message });

        // Enviar el mensaje usando POST
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'deepseek-r1-distill-qwen-7b', // Ajusta el modelo según sea necesario
                messages: messageHistory,
                temperature: 0.7,
                max_tokens: -1,
                stream: false
            }),
        });

        if (!response.ok) {
            throw new Error(`Error al enviar el mensaje: ${response.statusText}`);
        }

        // Obtener la respuesta
        const receivedMessage = await processResponse(response);

        // Actualizar el historial de mensajes con la respuesta de la IA
        messageHistory.push({ role: 'assistant', content: receivedMessage });

        // Muestra la respuesta en la etiqueta P
        const labelElement = document.getElementById('messageLabel');
        if (labelElement) {
            labelElement.textContent = receivedMessage;
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Ocultar el loader
        if (loader) {
            loader.style.display = 'none';
        }
    }
}

// Función para procesar la respuesta del servidor
async function processResponse(response: Response): Promise<string> {
    const lmStudioReceived = await response.json();

    // Aquí puedes implementar el procesamiento específico de la respuesta
    let content = lmStudioReceived.choices[0].message.content || "Respuesta no válida";

    // Eliminar etiquetas <think> y su contenido
    content = content.replace(/<think>[\s\S]*?<\/think>/g, '');

    // Eliminar cualquier otra etiqueta HTML no deseada
    content = content.replace(/<[^>]*>/g, '');

    return content;
}

// Agregar el controlador de eventos al botón
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('sendMessageButton');
    if (button) {
        button.addEventListener('click', sendMensajeIA);
    }
});

(window as any).sendMensajeIA = sendMensajeIA;