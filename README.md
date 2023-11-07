Tarea: API Rest

1) Formato de intercambio de datos: JSON

2) URLs de la API. :

Agregar Persona:
	Método HTTP: POST.
	URL: /api/agregarPersona
	Descripción: Este servicio permite agregar una nueva persona a la base de datos. Debes 	enviar los datos de la persona en el cuerpo de la solicitud. Verifica si la persona ya existe en 	la base de datos antes de agregarla.
	Respuesta exitosa: Devuelve un mensaje indicando que la persona se agregó con éxito.
	Respuesta de error: Devuelve un mensaje de error si la persona ya existe o si ocurre un error interno del servidor.

Agregar Domicilio:
	Método HTTP: POST.
	URL: /api/agregarDomicilio/:CI.
	Descripción: Este servicio permite agregar un domicilio a una persona específica. Se debe proporcionar la cédula de identidad (CI) de la persona a la que se le asociará el domicilio en la URL y los datos del domicilio en el cuerpo de la solicitud.
	Respuesta exitosa: Devuelve un mensaje indicando que el domicilio se agregó con éxito.
	Respuesta de error: Devuelve un mensaje de error si la persona no existe o si ocurre un error 	interno del servidor.

Consultar Domicilio:
	Método HTTP: GET.
	URL: /api/consultarDomicilio/:CI
	Descripción: Este servicio permite consultar los domicilios asociados a una persona 	específica. Debes proporcionar la cédula de identidad (CI) de la persona en la URL.
	Respuesta exitosa: Devuelve una lista de los domicilios asociados a la persona, incluyendo 	los detalles completos de la dirección.
	Respuesta de error: Devuelve un mensaje de error si la persona no existe o si ocurre un error 	interno del servidor.

Obtener Domicilios por Criterio:
	Método HTTP: GET.
	URL: /api/obtenerDomiciliosPorCriterio
	Descripción: Este servicio permite buscar domicilios que cumplan con ciertos criterios de búsqueda, como barrio, localidad y departamento. Los criterios de búsqueda se pasan como 	parámetros de consulta en la URL.
	Respuesta exitosa: Devuelve una lista de domicilios que cumplen con los criterios especificados, incluyendo los detalles completos de la dirección y la información de la 	persona asociada.
	Respuesta de error: Devuelve un mensaje de error si ocurre un error interno del servidor.

3) Instalación: Hay que tener instalado Git y NodeJs
	Para clonar el repositorio
	Crear una carpeta, posicionar la terminal ahí.
	ejecutar: git clone https://github.com/DieAndres/tarea.git
	ejecutar: cd tarea/src
	Hay que tener Node instalado, luego para instalar los paquetes:
	npm install
	Y para correr la aplicación:
	node app.js


4) Configuración

5) Plataformas, lenguajes y base de datos:                                                                                                                                                 
	Se usa Mongodb Atlas como base de datos en la nube. 
	Se usó JavaScript en Node.js para desarrollar la aplicación, pero no es necesario tener 	instalado Node.js  en el sistema porque está en la imagen de docker que se descarga al hacer 	docker build.
	Se puede usar en cualquier plataforma en la que se pueda instalar docker (Windows, Linux, 	Mac).
                   
6) Base de datos elegida y diseño de esquema.
 
La elección del uso de Mongodb Atlas se debe a que ya teníamos experiencia con esa base de datos en conjunto con NodeJs.
                                                               
Se definen tres esquemas de Mongose (librería de NodeJs): personaSchema, direccionSchema y domicilioSchema, que se deducen diréctamente de los requerimientos.
PersonaSchema define el esquema para la colección de personas. Esta colección tiene los siguiente campos:
CI: número de cédula de identidad de la persona, que es único y obligatorio.
Nombre: nombre de la persona.                                                                                                                                              
Apellido: apellido de la persona.
Edad: edad de la persona.

direccionSchema define el esquema para la colección de direcciones. Esta colección tiene los siguientes campos:
Departamento: departamento de la dirección.
Localidad: localidad de la dirección.
Calle: calle de la dirección.
Nro: número de la dirección.
Apartamento: apartamento de la dirección.
Padron: padrón de la dirección.
Ruta: ruta de la dirección.
Km: kilómetro de la dirección.
Letra: letra de la dirección.
Barrio: barrio de la dirección.

DomicilioSchema define el esquema para la colección de domicilios. Esta colección tiene los siguientes campos:
Datos_Persona: referencia al documento de la colección Persona.
Direccion: referencia al documento de la colección Direccion                                                                                                                                                                

Requerimientos Opcionales

Como requerimientos opcionales optamos por dockerizar la aplicación y Jmeter para las pruebas de testing.

	Para ejecutar el docker:
	a) Abrir un terminal dentro de la carpeta tarea
	b) Ejecutar el comando: " docker build -t tarea .", así se crea la imágen
	c) Para crear el contenedor: "docker run -p 3000:3000 -d --name tareaCont tarea"
	d) Para ejecutarlo: "docker start tareaCont"
	e) Para detenerlo "docker stop tareaCont"            

