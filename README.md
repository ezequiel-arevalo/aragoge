# Aragoge (marketplace)

Este proyecto fue desarrollado en conjunto con [Abraham Bartoloni](https://github.com/Bartoloni00) y será presentado como la entrega de la tesis para mi carrera de Diseño y Programación Web en [Da Vinci](https://davinci.edu.ar/).

## Estructura de Carpetas

- `index.html`: Archivo principal del sitio web.
- `vistas/`: Carpeta que contiene las vistas del sitio web.
- `docs/`: Carpeta donde se guarda el buildeo de la aplicación para ser subida a GitHub Pages.
- `dist/`: Carpeta donde se almacena el sitio después de ejecutar `npm run build`.
- `src/`: Carpeta principal que contiene todo el código fuente de la aplicación.
  - `adapters/`: Contiene adaptadores que manejan la interacción con diferentes servicios o APIs, facilitando la integración de datos externos.
  - `App.css`: Hoja de estilos principal para el componente raíz `App`.
  - `App.jsx`: Componente raíz de la aplicación que actúa como punto de inicio de la interfaz de usuario.
  - `assets/`: Carpeta destinada a almacenar recursos estáticos como imágenes, fuentes y otros activos utilizados en la aplicación.
  - `components/`: Incluye los componentes reutilizables de la interfaz de usuario que se utilizan en diferentes partes de la aplicación.
  - `contexts/`: Contiene los contextos de React para manejar el estado global y compartir datos entre componentes.
  - `hooks/`: Carpeta dedicada a hooks personalizados de React, que encapsulan lógica reutilizable y se utilizan en varios componentes.
  - `interceptors/`: Almacena interceptores para manejar peticiones HTTP, como autenticación y manejo de errores.
  - `main.jsx`: Archivo principal donde se inicializa la aplicación y se monta el componente raíz `App`.
  - `models/`: Contiene las definiciones de los modelos de datos utilizados en la aplicación (puede ser eliminada si no es necesaria).
  - `pages/`: Carpeta que contiene los componentes que representan las diferentes páginas de la aplicación, cada uno actuando como una ruta en React Router.
  - `redux/`: Carpeta que agrupa la configuración y archivos relacionados con Redux para el manejo del estado global de la aplicación.
  - `services/`: Contiene servicios que realizan peticiones HTTP y encapsulan la lógica de negocio.
  - `styled-components/`: Carpeta para componentes estilizados utilizando la librería `styled-components`, que permite escribir estilos en JavaScript.
  - `utilities/`: Incluye funciones auxiliares y utilidades reutilizables que son utilizadas en varias partes de la aplicación.

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clona el repositorio:**
    ```bash
    git clone https://github.com/ezequiel-arevalo/aragoge.git
    ```

2. **Accede a la carpeta del proyecto:**
    ```bash
    cd aragoge
    ```

3. **Instala las dependencias:**
    ```bash
    npm install
    ```

4. **Inicia el servidor de desarrollo con Vite:**
    ```bash
    npm run dev
    ```

## Consideraciones

> [!IMPORTANT]
> Recuerda tener todo instalado con:  `npm install`

## Recursos Utilizados

- Para los commits finales se estuvo empleando el uso de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Para prácticamente todo el proyecto se estuvo utilizando [React Documentation](https://es.react.dev/learn) | [Vite Documentation](https://es.vitejs.dev/guide/) .
- Para validar el HTML se utilizó [W3C VALIDATOR](https://validator.w3.org/#validate_by_input).
- Para validar el CSS se utilizó [W3C VALIDATOR](https://jigsaw.w3.org/css-validator/#validate_by_input).
- Para validar la estructura del sitio y sus headers se utilizó la extensión [HeadingsMap](https://chromewebstore.google.com/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi).
- Para los iconos se utilizo el uso de react-icons [React Icons](https://www.npmjs.com/package/react-icons).
