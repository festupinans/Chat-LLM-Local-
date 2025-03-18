import './style.css';

async function fetchModels() {
  try {
    const response = await fetch('http://192.168.1.18:41343/v1/models');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Response:', data.data[0]);
  } catch (error) {
    console.error('Error fetching models:', error);
  }
}

fetchModels();
