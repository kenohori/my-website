<?php

$baseurl = 'https://3d.bk.tudelft.nl/ken';
$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
if ($lang != 'es' and $lang != 'en') $lang = 'en';
$url = $baseurl.'/'.$lang.'/'

?>

<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Refresh" content="0; URL=<?php echo($url); ?>" />
		<script type="text/javascript">
            window.location.href = "<?php echo($url); ?>"
        </script>
		<title>Ken Arroyo Ohori</title>
	</head>
	<body>
        <!-- Note: don't tell people to `click` the link, just tell them that it is a link. -->
        <?php
        	if ($lang == 'es') echo('Si no eres redirigido autom&aacute;ticamente, haz clic <a href='.$url.'>aqu&iacute;</a> para ir a mi p&aacute;gina.');
        	else echo('If you are not redirected automatically, <a href='.$url.'>click here</a> to go to my homepage.');
        ?>
    </body>
</html>