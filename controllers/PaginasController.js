import {Viaje} from '../models/Viaje.js';
import {Testimonial} from '../models/Testimonial.js';

const paginaInicio = async (request, response) => {
	const promiseDB = [];

	promiseDB.push(Viaje.findAll({limit: 3}));
	promiseDB.push(Testimonial.findAll({limit: 3}));

	try {
		// const viajes = await Viaje.findAll({limit: 3});
		// const testimoniales = await Testimonial.findAll({limit: 3});

		const resultado = await Promise.all(promiseDB);

		response.render('inicio', {
			pagina: 'Río de Janeiro',
			clase: 'home',
			viajes: resultado[0],
			testimoniales: resultado[1]
		});
	} catch(error) {
		console.log(error);
	}
}

const paginaNosotros =  (request, response) => {
	const viaje = 'Viaje a Japón ya'; 

	response.render('nosotros', {
		pagina: 'Nosotros',
		viaje
	});
}

const paginaViajes = async (request, response) => {
	try {
		// Consultar la Base de Datos
		const viajes = await Viaje.findAll();
		console.log(viajes);

		response.render('viajes', {
			pagina: 'Próximos Viajes',
			viajes
		});
	} catch(error) {
		console.log(error);
	}
}

const paginaDetalleViaje = async (request, response) => {
	// const {destino} = request.params;
	const {slug} = request.params;

	try {
		// const viaje = await Viaje.findOne({where: {slug: destino}});
		const viaje = await Viaje.findOne({where: {slug}});

		response.render('viaje', {
			pagina: 'Información Viaje',
			viaje
		});
	} catch(error) {
		console.log(error);
	}
}

const paginaTestimoniales = async (request, response) => {
	try {
		const testimoniales = await Testimonial.findAll();

		response.render('testimoniales', {
			pagina: 'Testimoniales',
			testimoniales
		});
	} catch(error) {
		console.log(error);
	}
}

export {
	paginaInicio,
	paginaNosotros,
	paginaViajes,
	paginaDetalleViaje,
	paginaTestimoniales
}

