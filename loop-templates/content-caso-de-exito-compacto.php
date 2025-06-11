<?php
/**
 * Post rendering content according to caller of get_template_part
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$current_post_order = isset($args['order']) ? intval($args['order']) : '';
$current_post_order = (string) str_pad($current_post_order, 2, '0', STR_PAD_LEFT);
?>

<article <?php post_class( 'caso-de-exito-compacto stretch-linked-block' ); ?> id="post-<?php the_ID(); ?>">

	<div class="row">
		
		<div class="col-lg-2 align-self-center">
			<span class="h6 caso-de-exito-compacto-order">
				<?php echo sprintf( __( 'Caso - %s', 'smn' ), $current_post_order ); ?>
			</span>
		</div><!-- .col-lg-2 -->

		<div class="col-md-4 col-lg-3">
			<div class="wp-block-image caso-de-exito-compacto-image">
				<?php echo get_the_post_thumbnail( $post->ID, 'large' ); ?>
			</div><!-- .wp-block-image -->
		</div><!-- .col-lg-2 -->

		<div class="col-md-8 col-lg-7">

			<div class="caso-de-exito-compacto-text">

				<header class="entry-header">

					<?php
					the_title(
						sprintf( '<h2 class="h3 entry-title"><a class="stretched-link" href="%s" rel="bookmark">↘ ', esc_url( get_permalink() ) ),
						'</a></h2>'
					);
					?>

				</header><!-- .entry-header -->

				<div class="entry-content">

					<?php
					the_excerpt();
					understrap_link_pages();
					?>

				</div><!-- .entry-content -->

				<footer class="entry-footer">

					<?php understrap_entry_footer(); ?>

				</footer><!-- .entry-footer -->

			

		</div><!-- .col-lg-8 -->

	</div><!-- .row -->

</article><!-- #post-## -->
