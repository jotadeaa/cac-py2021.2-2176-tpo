const orientaciones = {},
	  orientTitulo  = document.getElementById('orientTitulo'),
	  orientImagen  = document.getElementById('orientImagen'),
	  orientIncumb  = document.getElementById('orientIncumb');
let botonPrev;

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
			orientTitulo.parentElement.style.display = 'initial';
			orientIncumb.removeAttribute('style');
			orientIncumb.previousElementSibling.textContent = 'Incumbencias:';
		}

		orientTitulo.textContent = orientData.titulo;
		orientImagen.src         = orientData.imagen;
		orientImagen.alt         = boton.textContent;
		orientIncumb.innerHTML   = orientData.incumbencias.reduce(
			(html, incumbencia) => html + `<li>${incumbencia}</li>`, ''
		);
		boton.classList.add('boton-active');
		botonPrev = boton;
	});
}
