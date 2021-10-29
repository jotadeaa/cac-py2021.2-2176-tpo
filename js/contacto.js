const email     = document.getElementById('email'),
	  nombre    = document.getElementById('nombre'),
	  asunto    = document.getElementById('asunto'),
	  mensaje   = document.getElementById('mensaje'),
	  btnSubmit = document.getElementById('btnSubmit'),
	  reMail    = /^[^@]+@[^.]+\..+$/;

/**
 * @param {string} value
 * @param {string} description
 * @return {boolean}
 */
function validarNoVacio(value, description) {
	if (value === "") {
		window.alert(`Por favor ingrese ${description}.`);
		return false;
	}

	return true;
}

/**
 * @param {string} value
 * @param {number} minLength
 * @param {string} description
 * @return {boolean}
 */
function validarLongitudMinima(value, minLength, description) {
	if (value.length < minLength) {
		description = description.charAt(0).toUpperCase() + description.slice(1);
		window.alert(`${description} debe tener al menos ${minLength} caracteres.`);
		return false;
	}

	return true;
}

/**
 * @return {boolean}
 */
function validarEmail() {
	const emailVal = email.value.trim();

	if (!validarNoVacio(emailVal, 'el correo electrónico')) {
		email.focus();
		return false;
	}

	if (!reMail.test(emailVal)) {
		window.alert('El correo electrónico ingresado no es válido.');
		email.focus();
		return false;
	}

	return true;
}

/**
 * @return {boolean}
 */
function validarNombre() {
	const nombreVal   = nombre.value.trim(),
		  description = 'el nombre';

	if (!validarNoVacio(nombreVal, description)) {
		nombre.focus();
		return false;
	}

	if (!validarLongitudMinima(nombreVal, nombre.minLength, description)) {
		nombre.focus();
		return false;
	}

	return true;
}

/**
 * @return {boolean}
 */
function validarAsunto() {
	const asuntoVal   = asunto.value.trim(),
		  description = 'el asunto';

	if (!validarNoVacio(asuntoVal, description)) {
		asunto.focus();
		return false;
	}

	if (!validarLongitudMinima(asuntoVal, asunto.minLength, description)) {
		asunto.focus();
		return false;
	}

	return true;
}

/**
 * @return {boolean}
 */
function validarMensaje() {
	const mensajeVal   = mensaje.value.trim(),
		  description = 'el mensaje';

	if (!validarNoVacio(mensajeVal, description)) {
		mensaje.focus();
		return false;
	}

	if (!validarLongitudMinima(mensajeVal, mensaje.minLength, description)) {
		mensaje.focus();
		return false;
	}

	return true;
}

btnSubmit.addEventListener('click', e => {
	e.preventDefault();
	if (validarEmail() && validarNombre() && validarAsunto()) {
		btnSubmit.form.submit();
		btnSubmit.form.reset();
	}

	return false;
});
