<?php

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://www.random.org/integers/?num='.$_GET['num'].'&min='.$_GET['min'].'&max='.$_GET['max'].'&col=1&base=10&format=plain&rnd=new');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$ret = curl_exec($ch);
curl_close($ch);
echo $ret;

?>
