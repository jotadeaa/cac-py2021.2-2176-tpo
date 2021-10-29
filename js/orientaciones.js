const orientaciones = {},
	  botonera      = document.getElementById('botonera'),
	  orientTitulo  = document.getElementById('orientTitulo'),
	  orientImagen  = document.getElementById('orientImagen'),
	  orientIncumb  = document.getElementById('orientIncumb'),
	  incumbWrappr  = document.getElementById('incumbWrappr'),
	  incumbTitulo  = document.getElementById('incumbTitulo'),
	  tituloSpan    = orientTitulo.querySelector('span'),
	  animDuration  = 2000; // debe coincidir con la duración en CSS
let timer = setInterval(() => {
		incumbTitulo.classList.remove('animate__bounce');

		// Hay que hacer una breve pausa antes de volver a disparar la animación.
		setTimeout(() => incumbTitulo.classList.add('animate__bounce'), 10);
	}, animDuration * 2),
	inicial  = true,
	animando = false,
	botonPrev;

/**
 * @param {boolean} inOut
 */
function animarOrientacion(inOut) {
	orientTitulo.classList.toggle('animate__fadeOutLeft',  !inOut);
	orientTitulo.classList.toggle('animate__fadeInLeft',    inOut);
	incumbWrappr.classList.toggle('animate__fadeOutRight', !inOut);
	incumbWrappr.classList.toggle('animate__fadeInRight',   inOut);
	orientImagen.classList.toggle('animate__zoomOut',      !inOut);
	orientImagen.classList.toggle('animate__zoomIn',        inOut);
	if (inOut) {
		setTimeout(() => {
			animando = false;
			botonera.classList.remove('animando');
		}, animDuration);
	}
}

/**
 * @param {HTMLAnchorElement} boton
 * @param {{titulo:string, imagen:string, incumbencias:string}} orientData
 */
function cambiarOrientacion(boton, orientData) {
	tituloSpan.textContent = orientData.titulo;
	orientImagen.src       = orientData.imagen;
	orientImagen.alt       = boton.textContent;
	orientIncumb.innerHTML = orientData.incumbencias;
	if (inicial) {
		inicial = false;
		orientTitulo.parentElement.removeAttribute('style');
		orientIncumb.removeAttribute('style');
		incumbWrappr.classList.remove('incumb-wrapper');
		incumbTitulo.textContent = 'Incumbencias:';
	}
}

fetch('./orientaciones.json')
	.then(response => response.json())
	.then(data => {
		for (const orient in data) {
			const orientData = orientaciones[orient] = data[orient];

			// Precargar imágenes.
			const img = new Image();
			img.src = orientData.imagen;

			// Generar el HTML para las incumbencias.
			orientData.incumbencias = orientData.incumbencias.reduce(
				(html, incumbencia) => html + `<li>${incumbencia}</li>`,
				''
			);
		}
	});
for (const boton of document.querySelectorAll('.botonera .boton')) {
	boton.addEventListener('click', () => {
		if (animando || boton == botonPrev) {
			return;
		}

		animando = true;
		botonera.classList.add('animando');
		const orientData = orientaciones[boton.dataset.orient];

		if (botonPrev) {
			botonPrev.classList.remove('boton-active');
		}
		else {
			timer = undefined;
			incumbTitulo.removeAttribute('class');
		}

		boton.classList.add('boton-active');
		botonPrev = boton;
		setTimeout(() => {
			cambiarOrientacion(boton, orientData);
			animarOrientacion(true);  // entrada
		}, animDuration);
		animarOrientacion(false); // salida
	});
}
