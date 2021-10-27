const orientaciones = {},
	  orientTitulo  = document.getElementById('orientTitulo'),
	  orientImagen  = document.getElementById('orientImagen'),
	  orientIncumb  = document.getElementById('orientIncumb'),
	  incumbWrappr  = document.getElementById('incumbWrappr'),
	  incumbTitulo  = document.getElementById('incumbTitulo');
let timer = setInterval(() => {
		incumbTitulo.classList.remove('animate__bounce');

		// Hay que hacer una breve pausa antes de volver a disparar la animación.
		setTimeout(() => incumbTitulo.classList.add('animate__bounce'), 10);
	}, 4000),
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
}

/**
 * @param {HTMLAnchorElement} boton
 * @param {{titulo:string, imagen:string, incumbencias:string[]}} orientData
 */
function cambiarOrientacion(boton, orientData) {
	orientTitulo.textContent = orientData.titulo;
	orientImagen.src         = orientData.imagen;
	orientImagen.alt         = boton.textContent;
	orientIncumb.innerHTML   = orientData.incumbencias.reduce(
		(html, incumbencia) => html + `<li>${incumbencia}</li>`, ''
	);
	boton.classList.add('boton-active');
}

fetch('./orientaciones.json')
	.then(response => response.json())
	.then(data => {
		for (const orient in data) {
			orientaciones[orient] = data[orient];

			// Precargar imágenes.
			const img = new Image();
			img.src = data[orient].imagen;
		}
	});
for (const boton of document.querySelectorAll('.botonera .boton')) {
	boton.addEventListener('click', () => {
		const orientData = orientaciones[boton.dataset.orient];

		if (botonPrev) {
			botonPrev.classList.remove('boton-active');
		}
		else {
			timer = undefined;
			orientTitulo.parentElement.removeAttribute('style');
			orientIncumb.removeAttribute('style');
			incumbWrappr.classList.remove('incumb-wrapper');
			incumbTitulo.removeAttribute('class');
			incumbTitulo.textContent = 'Incumbencias:';
		}

		setTimeout(() => {
			cambiarOrientacion(boton, orientData);
			animarOrientacion(true);  // entrada
		}, 1100);
		animarOrientacion(false); // salida
		botonPrev = boton;
	});
}
