function validate() {
  let formRejected = false; //variable que detecta si algun campo fue rechazado

  let ck_email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  let ck_name = /^[a-z ,.'-]+$/i;

  //En cada paso, se verifica que el campo esté rellenado correctamente.
  //De no ser así, rejected pasa a valer true, se muestra un mensaje de error, se pone rojo el borde y se hace focus
  if (document.form.message.value.length == 0) {
    document.form.message.style.borderColor = "red";
    document.getElementById("message-rejected").style.visibility = "visible";
    document.form.message.focus();
    formRejected = true;
  } else {
    document.form.message.style.border = "none";
    document.getElementById("message-rejected").style.visibility = "hidden";
  }

  if (!ck_email.test(document.form.email.value)) {
    document.form.email.style.borderColor = "red";
    document.getElementById("mail-rejected").style.visibility = "visible";
    document.form.email.focus();
    formRejected = true;
  } else {
    document.form.email.style.border = "none";
    document.getElementById("mail-rejected").style.visibility = "hidden";
  }

  if (!ck_name.test(document.form.surname.value)) {
    document.form.surname.style.borderColor = "red";
    document.getElementById("surname-rejected").style.visibility = "visible";
    document.form.surname.focus();
    formRejected = true;
  } else {
    document.form.surname.style.border = "none";
    document.getElementById("surname-rejected").style.visibility = "hidden";
  }

  if (!ck_name.test(document.form.name.value)) {
    document.form.name.style.borderColor = "red";
    document.getElementById("name-rejected").style.visibility = "visible";
    document.form.name.focus();
    formRejected = true;
  } else {
    document.form.name.style.border = "none";
    document.getElementById("name-rejected").style.visibility = "hidden";
  }

  if (!formRejected) {
   console.log('se validó')
   document.form.submit(); //Si todos los campos son correctos se envía
  }
}
