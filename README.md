# Proyecto Frontend en Angular con Arquitectura Limpia

Este proyecto fue desarrollado utilizando **Angular 12** y **Angular Material 12** con una arquitectura limpia basada en el patrón **Hexagonal**. La estructura está organizada en tres capas bien definidas: **Dominio**, **Infraestructura** y **Presentación**. Además, se conecta de manera eficiente con la API Backend a través de puertos y adaptadores, siguiendo principios de modularidad y escalabilidad.

## Arquitectura

El proyecto sigue una **arquitectura limpia** utilizando el patrón **Hexagonal** (Ports and Adapters), con las siguientes capas:

- **Capa de Dominio**: Contiene las entidades de negocio y las interfaces de los casos de uso. Define la lógica principal sin depender de la infraestructura externa.
- **Capa de Presentación**: Encargada de la interfaz de usuario utilizando **Angular Material**. Aquí se gestionan los componentes y servicios para interactuar con el usuario.
- **Capa de Infraestructura**: Implementa las interacciones con el mundo exterior, como las llamadas HTTP al backend. Se comunica con la API a través de los puertos definidos en la capa de dominio.

## Patrones Implementados

- **Arquitectura Limpia**: Organiza el código en capas bien definidas que facilitan la mantenibilidad, extensibilidad y la capacidad de prueba.
- **Hexagonal (Ports and Adapters)**: La lógica de negocio está desacoplada de la infraestructura y la presentación, lo que facilita el reemplazo o modificación de componentes externos sin afectar la lógica central.
- **Adapter Pattern**: Utiliza adaptadores para conectar la aplicación con APIs externas o el backend.
- **Test Unitarios**: Se incluyen pruebas unitarias de ejemplo para asegurar la calidad del código.

## Instalación

### Requisitos

- **Node.js** (versión 16 o superior)
- **Angular CLI**
- **npm** (Gestor de paquetes de Node)

### Pasos para iniciar

1. Clona el repositorio:

   ```bash
   git clone <URL-del-repositorio>
   cd <nombre-del-proyecto>
   ```

2. Instala las dependencias:

   ```npm install
      ```
   
3. Inicia la aplicación en modo desarrollo:

   ```
      npm run start
   ```
   
La aplicación estará disponible en http://localhost:4200.
