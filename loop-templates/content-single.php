<?php
/**
 * Single post partial template
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<div class="entry-content">

		<?php

		if ( 'caso-de-exito' == get_post_type() ) {
			$excerpt = $post->post_excerpt;
			if ( $excerpt ) {
				echo '<div class="has-large-font-size mb-4">';
					echo wpautop( $excerpt );
				echo '</div>';
			}
		}

		the_content();
		understrap_link_pages();
		?>

		<?php 
		$gallery_ids = get_field('gallery');
		if ($gallery_ids) { ?>

			<div class="acf-gallery my-5">
				<?php foreach ($gallery_ids as $image_id) : ?>
					<?php echo wp_get_attachment_image($image_id, 'medium_large', false, [
						'class' => 'img-fluid rounded'
					]); ?>
				<?php endforeach; ?>
			</div>

		<?php }
		?>

	</div><!-- .entry-content -->

	<footer class="entry-footer">

		<?php understrap_entry_footer(); ?>

	</footer><!-- .entry-footer -->

</article><!-- #post-## -->
