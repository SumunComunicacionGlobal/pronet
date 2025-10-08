<?php
/**
 * Post rendering content according to caller of get_template_part
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$post_type = get_post_type();

$current_post_order = isset($args['order']) ? intval($args['order']) : '';
$current_post_order = (string) str_pad($current_post_order, 2, '0', STR_PAD_LEFT);

$read_more_text = __( 'Léelo', 'smn' );
if ( 'caso-de-exito' == $post_type ) {
	$read_more_text = __( 'Ver servicio relacionado', 'smn' );
}
?>

<article <?php post_class( 'position-relative' ); ?> id="post-<?php the_ID(); ?>">

	<div class="wp-block-cover loop-header-cover alignfull">

		<span aria-hidden="true" class="wp-block-cover__background has-background-dim has-background-dim-30"></span>

		<?php echo get_the_post_thumbnail( $post->ID, 'large', array( 'class' => 'wp-block-cover__image-background' ) ); ?>

		<div class="wp-block-cover__inner-container">

			<header class="entry-header">

				<?php if ( 'post' == $post_type ) { ?>

					<div class="entry-meta">

						<?php understrap_posted_on(); ?>

					</div><!-- .entry-meta -->

				<?php } else {
					// Display the post order for 'caso-de-exito' post type.
					if ( 'caso-de-exito' == $post_type ) { ?>
						<p class="is-style-numeracion"><?php echo $current_post_order; ?></p>
					<?php }
				} ?>

				<h2 class="entry-title h3 mb-0">↘ <?php the_title(); ?></h2>

			</header><!-- .entry-header -->

		</div><!-- .wp-block-cover__inner-container -->

	</div>

	<div class="entry-content">

		<div class="row mb-3">

			<div class="col-md-6 col-xl-4">

				<?php
				if ( $post->post_excerpt ) {
					echo '<div class="h3">';
						echo wpautop( $post->post_excerpt );
					echo '</div>';
				}
				?>

			</div>

			<div class="col-md-6 col-xl-4 offset-xl-2">

				<?php
				$content = apply_filters( 'the_content', get_the_content() );
				$paragraphs = preg_split( '/<\/p>\s*/', $content );
				$first_paragraph = isset($paragraphs[0]) ? $paragraphs[0] . '</p>' : '';
				echo $first_paragraph;
				?>

				<footer class="entry-footer">

					<?php understrap_entry_footer(); ?>

				</footer><!-- .entry-footer -->

			</div><!-- .col-md-6 -->

		</div><!-- .row -->

		<?php
		$gallery_ids = get_field('gallery');
		if ($gallery_ids && is_array($gallery_ids)) : 
			// get first 2 items if more than 2
			if (count($gallery_ids) > 2) {
				$gallery_ids = array_slice($gallery_ids, 0, 2);
			}
			?>
			<div class="acf-gallery mb-5">
				<?php foreach ($gallery_ids as $image_id) : ?>
					<?php echo wp_get_attachment_image($image_id, 'medium_large', false, [
						'class' => 'img-fluid rounded'
					]); ?>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

		<p class="text-end mb-5">
			<a href="<?php echo esc_url( get_permalink() ); ?>" class="btn btn-lg btn-outline-dark stretched-link"><?php echo $read_more_text; ?></a>
		</p>

	</div><!-- .entry-content -->

</article><!-- #post-## -->
