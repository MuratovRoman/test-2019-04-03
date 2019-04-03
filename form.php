<?php
	/* Email address which will get the message */
	$to = "myratov.r@gmail.com";
	/* subject (message theme) */
	$subject = 'Запись на курс';
	/* form fields (getting by attr name) */
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	
	/* message */
	$body = '
		<html>
		<head>
		 <title>' . $subject . '</title>
		</head>
		<body>'
		   .' <p>Имя: <strong>' . $name . '</strong></p>'
		   .' <p>Телефон: <strong>' . $phone . '</strong></p>'
		.'</body>
		</html>';
	/* For sending HTML email you can set up headers Content-type. */
	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8\r\n";
	if (mail($to, $subject, $body, $headers)) {
		echo "<b>Message send!</b>";
	} else {
		echo "Send error!";
	}
?>