function styleerror() {
  //detecto los estilos del mensaje de error
  errorStyle = getComputedStyle(document.getElementById("error"));
  //Si está visible, significa que falta el archivo css, por lo tanto no
  //muestra el juego.
  if (errorStyle.display != "none") {
    document.getElementById("game_container").style.display = "none";
    document.getElementById("start_button").style.display = "none";
    console.log("faltan archivos");
  }
}
