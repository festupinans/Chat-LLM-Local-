import './style.css';
import { readText } from './speak.ts';


let url = 'http://192.168.1.18:41343/v1/chat/completions';

// Variable para almacenar el historial de mensajes
let messageHistory: { role: string, content: string }[] = [
    { role: "system", content: "Tu eres un asistente de IA filosofo, el cual siempre respondera en español." }
];

// Funciones principales para enviar y recibir mensajes
async function sendMensajeIA(): Promise<void> {
    const message = (document.getElementById('transcript') as HTMLTextAreaElement)?.value || '';
    const loader = document.getElementById('loader');
    const razonamiento = document.getElementById('Razonamiento');

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
                max_tokens: 4096,
                stream: true // Habilitar streaming
            }),
        });

        if (!response.ok) {
            throw new Error(`Error al enviar el mensaje: ${response.statusText}`);
        }

        // Procesar la respuesta en streaming
        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let receivedMessage = '';
        let receivedRazonamiento = '';
        const labelElement = document.getElementById('messageLabel');
        let pensando = true;

        while (reader) {
            const { done, value } = await reader.read();
            if (done) break;

            // Decodificar el fragmento recibido
            const chunk = decoder.decode(value, { stream: true });

            // Procesar cada línea del stream como JSON
            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
                if (line.startsWith('data:')) {
                    const jsonString = line.replace('data:', '').trim();
                    if (jsonString !== '[DONE]') {
                        try {
                            const parsed = JSON.parse(jsonString);
                            const content = parsed.choices[0]?.delta?.content || '';
                            
                            // Mostrar el mensaje progresivamente
                            if (labelElement && !pensando) {
                                receivedMessage += content;
                                labelElement.textContent = receivedMessage;
                            }

                            if(content === '</think>' || !pensando) {
                                pensando = false;
                            }
                            
                            if(pensando && razonamiento && content !== '<think>') {
                                receivedRazonamiento += content;
                                razonamiento.textContent = receivedRazonamiento;
                            }
                        } catch (error) {
                            console.error('Error al parsear JSON:', error);
                        }
                    }
                }
            }
        }
        readText(receivedMessage); // Llamada a la función importada
        pensando = true;

        // Actualizar el historial de mensajes con la respuesta completa de la IA
        messageHistory.push({ role: 'assistant', content: receivedMessage });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Ocultar el loader
        if (loader) {
            loader.style.display = 'none';
        }
    }
}


(window as any).sendMensajeIA = sendMensajeIA;