let active_element = "none"; //variable que adquirirá como valor el div de la galería seleccionado

function gallery(element) {
  let covers = document.getElementsByClassName("gallery-item");
  let synopsis = document.getElementsByClassName("synopsis");

  //Si clickeo un elemento no seleccionado, se selecciona
  if (element != active_element) {
    //Se guarda como seleccionado
    active_element = element;
    for (let i = 0; i < covers.length; i++) {
      if (covers[i] == active_element) {
        //El elemento seleccionado se ve con toda su opacidad y más grande, y aparece la sinopsis correspondiente
        covers[i].classList.add("gallery-active-item");
        covers[i].style.opacity = 1;
        synopsis[i].style.display = "flex";
      } else {
        //Los no seleccionados pierden opacidad y su sinopsis se oculta
        covers[i].style.opacity = 0.5;
        synopsis[i].style.display = "none";
        covers[i].classList.remove("gallery-active-item");
      }
    }
  } else {
    //Si el elemento ya estaba seleccionado, se deseleccionan todos
    for (let i = 0; i < covers.length; i++) {
      covers[i].classList.remove("gallery-active-item");
      covers[i].style.opacity = 1;
      synopsis[i].style.display = "none";
    }
    active_element = "none";
  }
}
