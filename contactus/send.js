function enviarForm(){
	let formRechazado = false  //variable que detecta si algun campo fue rechazado

	let ck_email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ 
	let ck_name = /^[a-z ,.'-]+$/i


	if(document.formulario.mensaje.value.length == 0){
		document.formulario.mensaje.style.borderColor = 'red'
		document.getElementById('mensaje-rechazado').style.visibility = 'visible';
		document.formulario.mensaje.focus()
		formRechazado = true
	} else {
		document.formulario.mensaje.style.border = 'none'
		document.getElementById('mensaje-rechazado').style.visibility = 'hidden';
	}

	if(!ck_email.test(document.formulario.email.value)){
		document.formulario.email.style.borderColor = 'red'
		document.getElementById('mail-rechazado').style.visibility = 'visible';
		document.formulario.email.focus()
		formRechazado = true
	} else {
		document.formulario.email.style.border = 'none'
		document.getElementById('mail-rechazado').style.visibility = 'hidden';
	}

	if(!ck_name.test(document.formulario.apellido.value)){
		document.formulario.apellido.style.borderColor = 'red'
		document.getElementById('apellido-rechazado').style.visibility = 'visible';
		document.formulario.apellido.focus()
		formRechazado = true
	} else {
		document.formulario.nombre.style.border = 'none'
		document.getElementById('apellido-rechazado').style.visibility = 'hidden';
	}


	if(!ck_name.test(document.formulario.nombre.value)){
		document.formulario.nombre.style.borderColor = 'red'
		document.getElementById('nombre-rechazado').style.visibility = 'visible';
		document.formulario.nombre.focus()
		formRechazado = true
	} else {
		document.formulario.nombre.style.border = 'none'
		document.getElementById('nombre-rechazado').style.visibility = 'hidden';
	}

	if(!formRechazado){
		document.formulario.submit()  //Si todos los campos son correctos se envía
	}

}