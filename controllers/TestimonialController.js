import {Testimonial} from '../models/Testimonial.js';

const guardarTestimonial = async (request, response) => {
	console.log(request.body);

	const {nombre, email, mensaje} = request.body;
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const errores = [];

	if(nombre.trim() === '' || !isNaN(nombre) || email.trim() === '' || !regex.test(email) || mensaje.trim() === '' || !isNaN(mensaje)) {
		if(nombre === '' || email === ''|| mensaje === '') {
			errores.push({mensaje: 'Todos los campos son obligatorios'});
		} else {
			if(nombre !== '' && !isNaN(nombre)) {
				errores.push({mensaje: 'Nombre no válido'});
			}
			if(email !== '' && !regex.test(email)) {
				errores.push({mensaje: 'El Email no es válido'});
			}
			if(mensaje !== '' && !isNaN(mensaje)) {
				errores.push({mensaje: 'Mensaje no válido'});
			}
		}
	}

	if(errores.length > 0) {
		try {
			const testimoniales = await Testimonial.findAll();

			response.render('testimoniales', {
				pagina: 'Testimoniales',
				errores,
				nombre,
				email,
				mensaje,
				testimoniales
			});
		} catch(error) {
			console.log(error);
		}
	} else {
		try {
			await Testimonial.create({
				nombre,
				email,
				mensaje
			});

			response.redirect('/testimoniales');
		} catch(error) {
			console.log(error);
		}
	}
}

export {
	guardarTestimonial
}

