<?php

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// check if woocommerce is active
if ( class_exists( 'WooCommerce' ) ) {
	if ( is_woocommerce() ) {
		return false;
	}
}

$image_id = false;
$title = '';

if ( is_singular() ) {
	$image_id = get_post_thumbnail_id( get_the_ID() );
	$title = get_the_title();
} elseif ( is_archive() ) {
	$image_id = get_term_meta( get_queried_object_id(), 'thumbnail_id', true );
	$title = get_the_archive_title();
	$title_class = 'display-1';
} elseif ( is_home() ) {
	$page_for_posts = get_option( 'page_for_posts' );
	if ( $page_for_posts ) {
		$image_id = get_post_thumbnail_id( $page_for_posts );
		$title = get_the_title( $page_for_posts );
	} else {
		$image_id = get_theme_mod( 'blog_header_image' );
		$title = get_bloginfo( 'name' );
	}
}
?>

<header class="wp-block-cover alignfull is-style-image-header">

	<span aria-hidden="true" class="wp-block-cover__background has-background-dim"></span>

	<?php if ( $image_id ) echo wp_get_attachment_image( $image_id, 'large', false, array('class' => 'wp-block-cover__image-background') ); ?>

	<div class="wp-block-cover__inner-container container">

		<?php if ( is_singular( 'post' ) ) { ?>

			<div class="entry-meta text-white">

				<?php understrap_posted_on(); ?>

			</div><!-- .entry-meta -->

		<?php } ?>

		<h1 class="entry-title <?php echo $title_class; ?>">↘ <?php echo $title; ?></h1>

	</div>

</header>

<?php smn_breadcrumb(); ?>

