# PROYECTO INFORMÁTICO - GRUPO SCOUTS CENTINELAS 113

## IMPORTANTE! Leer este documento, y la [wiki](https://github.com/CookLoco/proyecto-informatico-scouts/wiki) del proyecto

## METODOLOGÍA DE TRABAJO

Cada módulo se trabajará en ramas (**branch**) en donde se publicará el trabajo desarrollado por su responsable:

- **Equipo 1:** Gestión de recursos humanos (registro y suguimiento de la comunidad scout)
- **Equipo 2:** Gestión de procesos logisticos (eventos e inventarios)

A la hora de hacer cambios y publicar commits:

- **No modificar la rama master**
- Es importante **hacer commit constantemente**
- **Evitar publicar cambios incompletos que puedan romper la funcionalidad de la aplicación.**
- **Informar al equipo** que cambios se van a hacer y preferiblemente sobre que archivos se va a trabajar.
  - Así evitaremos colisión de código que nos generará proceso adicional a la hora de hacer el push.
- El nombre del **commit debe ser claro y descriptivo**, para que cada miembro sepa que se hizo anteriormente.
- **Evitar dejar cambios locales** en archivos que puedan ser requeridos por otros compañeros.

## ARQUITECTURA DEL PROYECTO

### BACKEND

Para el backend haremos uso de **Nest.js** como framework de Node.js, debido a que nos permite generar un proyecto muy bien estructurado gracias a las buenas prácticas y patrones con las que está construido (tales como decorador, inyección de dependencias y MVC), de tal forma que podremos identificar claramente que corresponde a las entidades o modelos, los controladores, módulos, base de datos, facilitando la corrección de bugs y haciendo el código más legible y entendible.

### FRONTEND

Para el frontend haremos uso de **Next.js** como framework de React, ya que de forma similar a Nest.js, permite generar código más limpio y entendible debido a la forma en cómo se organiza el proyecto, es consistente al igual que Nest.js con el uso TypeScript, incluye webpack y babel configurados para llevar el proyecto a producción e implementa directamente **SSG** (Static Site Generation) y **SSR** (Server Side Render), siendo ambas un poco complejas de implementar en un proyecto desde cero.

#### ¿Por qué SSG y SSR en este proyecto?

>Next.js nos permite decidir de una forma muy fácil que vistas van a ser renderizadas al momento de llevar a cabo el proyecto a un entorno de producción (SSG) o que vistas van a ser renderizadas por el servicio cada que se haga la petición de la vista (SSR), siendo la primera (SSG) útil cuando no se requiere que la vista sea dinámica en el sentido de que no va a ser alimentada por la base de datos ante cada solicitud (pero si puedo alimentarse de datos únicamente al momento del build), es decir, que no va a cambiar su información una vez desplegada a producción, mientras que la segunda (SSR) útil cuando se trabaja con alimentación de datos constantemente, es decir, que la información puede cambiar según que usuario requiera la vista, o cuando tiene información susceptible al cambio.
