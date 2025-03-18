# Proyecto Local LLM con Vite y TypeScript

Este proyecto está desarrollado con [Vite](https://vitejs.dev/) y [TypeScript](https://www.typescriptlang.org/), y está diseñado para funcionar en un entorno local. Se conecta a un servidor local de IA (LLM) que se ejecuta mediante [LM Studio](https://lmstudio.ai/).

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [LM Studio](https://lmstudio.ai/) (para ejecutar el modelo de lenguaje localmente)
- Un modelo de lenguaje compatible con LM Studio (descargado y configurado en LM Studio)

## Configuración del Proyecto

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/festupinans/Chat-LLM-Local-.git
   cd Chat-LLM-Local-
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura LM Studio:**
   - Abre LM Studio y carga el modelo de lenguaje que deseas utilizar.
   - Asegúrate de que el servidor local de LM Studio esté en ejecución. Por defecto, LM Studio expone un servidor en `http://localhost:1234`.

4. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

   ```env
   VITE_API_URL=http://localhost:1234
   ```

   Esto asegura que tu aplicación se conecte al servidor local de LM Studio.

5. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

   Esto iniciará la aplicación en modo de desarrollo. Abre tu navegador y visita `http://localhost:5173` para ver la aplicación en acción.

## Estructura del Proyecto

```
📂 node_modules/        # Dependencias del proyecto
📂 public/              # Archivos estáticos como imágenes o fuentes
📂 src/                 # Código fuente de la aplicación
 ├── 📄 main.ts         # Punto de entrada de la aplicación
 ├── 📄 peticiones_False-Stream.ts  # Peticiones con flujo falso
 ├── 📄 peticiones_True-Stream.ts   # Peticiones con flujo verdadero
 ├── 📄 recorder.js     # Manejo de grabaciones
 ├── 📄 speak.ts        # Funciones de síntesis de voz
 ├── 📄 style.css       # Estilos de la aplicación
 ├── 📄 vite-env.d.ts   # Tipado para Vite
📄 typescript.svg       # Logo de TypeScript
📄 .gitignore           # Archivos y carpetas ignorados por Git
📄 index.html           # Archivo principal HTML
📄 package-lock.json    # Bloqueo de dependencias
📄 package.json         # Configuración del proyecto y dependencias
📄 tsconfig.json        # Configuración de TypeScript
```

## Uso

Una vez que el servidor de desarrollo esté en funcionamiento, puedes interactuar con la interfaz de usuario para enviar solicitudes al modelo de lenguaje local. Asegúrate de que LM Studio esté ejecutándose y que el servidor local esté activo.

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realiza tus cambios y haz commit:

   ```bash
   git commit -am 'Añade nueva funcionalidad'
   ```

4. Haz push a la rama:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

- **Nombre:** Francisco Estpiñan
- **Email:** [es.francisco26@gmail.com](mailto:es.francisco26@gmail.com)
- **GitHub:** [festupinans](https://github.com/festupinans)


