// const express = require('express'); // sintaxis de commonjs

import express from 'express'; // sintaxis actual
import router from './routes/index.js';
import db from './config/db.js';
// import dotenv from 'dotenv';
// dotenv.config();
import dotenv from 'dotenv/config';

console.log(process.env.DB_HOST);

const app = express();

// Conexión a la Base de Datos
db.authenticate()
	.then(() => console.log('Conexión a la Base de Datos'))
	.catch(error => console.log(error))

// Definir puerto
const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`El Servidor está funcionando en el puerto ${port}`);
});

// Habilitar PUG
app.set('view engine', 'pug'); // ('engine_default', 'extension')

// Crear variables
app.use((request, response, next) => { // elemento de Middleware
	// console.log(response);

	const date = new Date();
	console.log(date);

	response.locals.year = date.getFullYear();

	response.locals.siteName = 'Agencia de Viajes';

	console.log(response.locals);

	// return next();
	next();
});

// Agregar Body Parser
app.use(express.urlencoded({extended: true}));

//Definir carpeta Public
app.use('/', express.static('public'));
app.use('/viajes', express.static('public'));

// Agregar Router
app.use('/', router);

// app.get('/', (request, response) => { // request, petición del usuario; response, respuesta de express
// 	// response.send('Hola Universo');
// 	response.json({
// 		id: 1,
// 		nombre: 'David'
// 	});
// });

