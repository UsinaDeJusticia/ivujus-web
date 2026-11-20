<?php
/**
 * Plugin Name: IVUJUS — Avisar al sitio nuevo
 * Description: Cuando se publica, edita, despublica o borra una entrada, avisa a ivujus.org.ar para que actualice las novedades en el acto.
 * Version: 1.0.0
 *
 * Instalación (mu-plugin, se activa solo y no se puede desactivar por error):
 *   copiar este archivo a wp-content/mu-plugins/ivujus-avisar-sitio.php
 *
 * Requiere en wp-config.php (encima de "That's all, stop editing!"):
 *   define( 'IVUJUS_REVALIDATE_SECRET', '...la misma clave que WP_REVALIDATE_SECRET en Vercel...' );
 *
 * Opcional (por defecto https://ivujus.org.ar):
 *   define( 'IVUJUS_SITE_URL', 'https://ivujus.org.ar' );
 *
 * Fuente versionada: repo ivujus-web, docs/wordpress/ivujus-avisar-sitio.php.
 * El receptor está en src/app/api/revalidate/route.ts.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Envía el aviso una sola vez por petición, al final, aunque se hayan
 * disparado varios hooks (por ejemplo, guardar + cambiar de estado).
 */
function ivujus_avisar_sitio_programar() {
	static $programado = false;
	if ( $programado ) {
		return;
	}
	$programado = true;
	add_action( 'shutdown', 'ivujus_avisar_sitio_enviar' );
}

function ivujus_avisar_sitio_enviar() {
	if ( ! defined( 'IVUJUS_REVALIDATE_SECRET' ) || strlen( IVUJUS_REVALIDATE_SECRET ) < 32 ) {
		error_log( '[ivujus-avisar-sitio] Falta IVUJUS_REVALIDATE_SECRET en wp-config.php; no se avisó al sitio.' );
		return;
	}
	$sitio = defined( 'IVUJUS_SITE_URL' ) ? IVUJUS_SITE_URL : 'https://ivujus.org.ar';

	$respuesta = wp_remote_post(
		untrailingslashit( $sitio ) . '/api/revalidate',
		array(
			'timeout'  => 5,
			'blocking' => true,
			'headers'  => array(
				'x-ivujus-secret' => IVUJUS_REVALIDATE_SECRET,
				'content-type'    => 'application/json',
			),
			'body'     => '{}',
		)
	);

	if ( is_wp_error( $respuesta ) ) {
		error_log( '[ivujus-avisar-sitio] Error al avisar: ' . $respuesta->get_error_message() );
		return;
	}
	$codigo = wp_remote_retrieve_response_code( $respuesta );
	if ( 200 !== $codigo ) {
		error_log( '[ivujus-avisar-sitio] El sitio respondió ' . $codigo . ': ' . wp_remote_retrieve_body( $respuesta ) );
	}
}

/**
 * Solo entradas (post) que estaban o quedan publicadas: publicar, editar
 * algo publicado, pasar a borrador/privado o mandar a la papelera.
 * Ignora borradores que siguen siendo borradores, revisiones y autoguardados.
 */
add_action(
	'transition_post_status',
	function ( $nuevo, $anterior, $post ) {
		if ( 'post' !== $post->post_type ) {
			return;
		}
		if ( wp_is_post_revision( $post ) || wp_is_post_autosave( $post ) ) {
			return;
		}
		if ( 'publish' !== $nuevo && 'publish' !== $anterior ) {
			return;
		}
		ivujus_avisar_sitio_programar();
	},
	10,
	3
);

// Borrado definitivo de una entrada publicada sin pasar por la papelera.
add_action(
	'before_delete_post',
	function ( $post_id ) {
		$post = get_post( $post_id );
		if ( $post && 'post' === $post->post_type && 'publish' === $post->post_status ) {
			ivujus_avisar_sitio_programar();
		}
	}
);
