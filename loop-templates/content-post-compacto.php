<?php
/**
 * Post rendering content according to caller of get_template_part
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<div class="wp-block-media-text position-relative is-stacked-on-mobile is-vertically-aligned-top is-image-fill-element has-primary-background-color has-background text-white">

		<figure class="wp-block-media-text__media">
			<?php echo get_the_post_thumbnail( $post->ID, 'large' ); ?>
		</figure><!-- .wp-block-media-text__media -->

		<div class="wp-block-media-text__content">

			<header class="entry-header">

				<?php if ( 'post' === get_post_type() ) : ?>

					<div class="entry-meta">
						<?php understrap_posted_on(); ?>
					</div><!-- .entry-meta -->

				<?php endif; ?>

				<?php
				the_title(
					sprintf( '<h3 class="h4 entry-title"><a class="stretched-link" href="%s" rel="bookmark">', esc_url( get_permalink() ) ),
					'</a></h3>'
				);
				?>

				<a class="stretched-link" href="<?php echo esc_url( get_permalink() ); ?>" rel="bookmark">
					<?php esc_html_e( 'Leer', 'understrap' ); ?> ↘
				</a>

			</header><!-- .entry-header -->

			<footer class="entry-footer">

				<?php understrap_entry_footer(); ?>

			</footer><!-- .entry-footer -->

		</div><!-- .wp-block-media-text__content -->

	</div><!-- .wp-block-media-text -->

</article><!-- #post-## -->
