
# Google Speech API y Natural language API codelab

Codelab para pronar las apis de Google Speech y Natural language. Lo que vamos a hacer:
* Consumir Google Speech API desde Node.
* Consumir Google Natural Language API desde Node.
* Integrar Google Cloud Storage.
* Generar web app consumiendo las APIs.
* Mejorar nuestra web app.
* Agregar más funcionalidades todavía.


## Requisitos
* [git][git]
* [Node.js][Node] 

[git]: https://git-scm.com/
[Node]: https://nodejs.org/

## Pasos 
### Inicio
Clonar el repo ```git clone git@github.com:leopittelli/speech-natural-apis-codelab.git```

Instalar dependencias ```npm install```

Crear proyecto en google cloud https://console.cloud.google.com/

Activar APIs.

Crear credenciales de servicio y descargar el json.


### Paso 01
Recorrido por el módulo de Speech API y prueba de las capacidades.


### Paso 02
Recorrido por los módulos de node de google cloud https://github.com/GoogleCloudPlatform/google-cloud-node

Agregar dependencia para Natural Language ```npm install --save @google-cloud/language```

Recorrido por el módulo y prueba de las capacidades.


### Paso 03
Agregar dependencia para Cloud Storage ```npm install --save @google-cloud/storage```

Implementar métodos desde archivo.

Probar con un texto online.


### Paso 04
Agregar dependencias para la web app
```
npm install --save express
npm install --save hbs
npm install --save multer
npm install --save body-parser
```

Implementar app.js, index.hbs, modulos de analyze y recognize con config aparte.


### Paso 05
Agregar MDL, routear estáticos y mejorar index.


### Paso 06
Agregar paquete de vision API ```npm install --save @google-cloud/vision```

Activar API en la consola de google.

Armar nuevo formulario para reconocer el texto en la imagen y detectar el sentimiento.