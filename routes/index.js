import express from 'express';

import {
	paginaInicio,
	paginaNosotros,
	paginaViajes,
	paginaDetalleViaje,
	paginaTestimoniales
} from '../controllers/PaginasController.js';

import {guardarTestimonial} from '../controllers/TestimonialController.js';

// const router = express();
const router = express.Router();

router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);
// router.get('/viajes/:destino', paginaDetalleViaje)
router.get('/viajes/:slug', paginaDetalleViaje)

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);

router.get('/contacto', (request, response) => {
	response.send('Contacto');
});

export default router;

