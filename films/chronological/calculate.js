function calculate() {
	let filmCheck = document.getElementsByClassName('film-check');
	let total = 0;
	for(i = 0; i < filmCheck.length; i ++){
		if(filmCheck[i].checked){
			total += 1;
		}
	}

	let percentage = 100*total/filmCheck.length
	document.getElementById('result').innerHTML = `Has visto ${total} películas, de ${filmCheck.length}. Eso es un ${percentage.toFixed(1)}%`;
}