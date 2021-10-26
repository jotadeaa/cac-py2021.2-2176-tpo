<?php
const ORIENTACIONES = [
	'alimentos'      => [
		'titulo' => 'Técnico en Tecnología de los Alimentos',
		'imagen' => './images/alimentaria.jpg',
	],
	'automotores'    => [
		'titulo' => 'Técnico en Automotor',
		'imagen' => './images/automotores.jpg',
	],
	'construcciones' => [
		'titulo' => 'Maestro Mayor de Obras',
		'imagen' => './images/construcciones.jpg',
	],
	'electricidad'   => [
		'titulo' => 'Técnico Electricista',
		'imagen' => './images/electricidad.jpg',
	],
	'electronica'    => [
		'titulo' => 'Técnico en Electrónica',
		'imagen' => './images/electronica.jpg',
	],
	'graficas'       => [
		'titulo' => 'Técnico en Diseño y Producción Gráfica',
		'imagen' => './images/graficas.jpg',
	],
	'indumentaria'   => [
		'titulo' => 'Industria de la Indumentaria',
		'imagen' => './images/indumentaria.jpg',
	],
	'mecanica'       => [
		'titulo' => 'Técnico Mecánico',
		'imagen' => './images/mecanica.jpg',
	],
	'muebles'        => [
		'titulo' => 'Técnico en la Industrialización de la Madera y el Mueble',
		'imagen' => './images/muebles.jpg',
	],
	'orfebreria'     => [
		'titulo' => 'Técnico en la Industria de la Orfebrería',
		'imagen' => './images/orfebreria.jpg',
	],
	'publicidad'     => [
		'titulo' => 'Técnico en Diseño y Comunicación Publicitaria',
		'imagen' => './images/publicidad.jpg',
	],
];
const INCUMBE_ORIENTA = 5;
$incumbencias = [
	'Mauris pretium tortor porta, fermentum tortor sit amet, elementum metus.',
	'Suspendisse maximus erat in libero malesuada mattis ut ac tempus.',
	'Fusce accumsan ligula odio, vitae gravida ipsum pulvinar at dolor.',
	'Nullam eu porttitor orci, pulvinar dictum justo dui eget.',
	'Pellentesque id tristique ex Etiam quis justo iaculis interdum.',
	'Nulla convallis nibh lorem, a semper risus efficitur ac.',
	'Aliquam at leo ac augue dignissim tempor et id erat.',
	'Aenean tristique quam vel feugiat ultrices vestibulum non facilisis ipsum.',
	'Inac maximus erat etiam et sapien eget orci sodales elementum.',
	'Morbi nisi dolor, accumsan a sollicitudin sed, ullamcorper a sapien.',
];
define('MAX_INCUMBE', count($incumbencias) - 1);
$jsonData = [];
foreach (ORIENTACIONES as $orientacion => $orientData) {
	shuffle($incumbencias);
	$orientData['incumbencias'] = array_slice($incumbencias, 0, INCUMBE_ORIENTA);
	$jsonData[$orientacion]     = $orientData;
}

$filename = __DIR__.DIRECTORY_SEPARATOR.'orientaciones.json';
file_put_contents($filename, json_encode($jsonData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
