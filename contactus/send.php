<?
	$sendto = 'raarambarri@gmail.com';
	$subject = "Yasumi Ghibli formulario";

	$corps = "Nombre: ".$_REQUEST['name']."\n".
	"Apellido: ".$_REQUEST['surname']."\n".
	"Email: ".$_REQUEST['email']."\n".
	"Mensaje: "$_REQUEST['message']."\n"."\n";

	$Form = "Form: ".$_REQUEST['name']." ".$_REQUEST['surname']." <".$_REQUEST['email'].">\n";

	$Form .= "Replay-To: ".$_REQUEST['name']." ".$_REQUEST['surname']." <".$_REQUEST['email'].">\n";

	@mail($sendto,$subject,$corps,$Form);
	header(location:index.html);
?>