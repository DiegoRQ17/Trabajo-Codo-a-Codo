const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos. para usar en el formulario de inicio de sesion
	correo: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	code_area: /^\d{2,4}$/, // 2 a 4 numeros.
	dni: /^\d{7,10}$/ // 7 a 10 numeros.
}

const campos = {
	nombre: false,
	apellido: false,
	code_area: false,
	email: false,
	tel: false,
	dni: false	
}
const validar_formulario = (e) => {
	switch (e.target.name) {
		case "nom_usu":
			validar(expresiones.nombre, e.target, "nombre");
			break;

		case "ape_usu":
			validar(expresiones.apellido, e.target, "apellido");
			break;

		case "nro_dni":
			validar(expresiones.dni, e.target, "dni");
			break;

		case "correo":
			validar(expresiones.correo, e.target, "email");
			break;

		case "codigo_area":
			validar(expresiones.code_area, e.target, "code_area");
			break;

		case "nro_tel":
			validar(expresiones.telefono, e.target, "tel");
			break;

	}
}

const validar = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo_${campo}`).classList.remove("grupo_formulario_incorrecto");
		document.getElementById(`grupo_${campo}`).classList.add("grupo_formulario_correcto");
		document.querySelector(`#grupo_${campo} .validacion_inputs_error`).classList.remove("validacion_inputs_error_activo");
		campos[campo] = true;
	}
	else {
		document.getElementById(`grupo_${campo}`).classList.add("grupo_formulario_incorrecto");
		document.getElementById(`grupo_${campo}`).classList.remove("grupo_formulario_correcto");
		document.querySelector(`#grupo_${campo} .validacion_inputs_error`).classList.add("validacion_inputs_error_activo");
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener("keyup", validar_formulario);
	input.addEventListener("blur", validar_formulario);
});

formulario.addEventListener("submit", (e) => {
	e.preventDefault();

	if (campos.nombre && campos.apellido && campos.code_area && campos.email && campos.tel && campos.dni) {
		formulario.reset();
		document.getElementById('formulario_mensaje_exito').classList.add('formulario_mensaje_exito_activo');
		setTimeout( () => {
			document.getElementById('formulario_mensaje_exito').classList.remove('formulario_mensaje_exito_activo');
		}, 5000);
	}
	else{
		document.getElementById('formulario_mensaje').classList.add('formulario_mensaje_activo');
		setTimeout( () => {
			document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje_activo');
		}, 5000);
	}
});

