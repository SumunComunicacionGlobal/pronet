<?php
/**
 * Hero setup
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$post_type = 'slide';

$args = array(
	'post_type'			=> $post_type,
	'posts_per_page'	=> -1,
	'orderby'			=> 'menu_order',
	'order'				=> 'ASC',
);

$q = new WP_Query($args);

$tabs = '';

if ( $q->have_posts() ) { ?>

	<div class="slider-home-wrapper bg-dark position-relative">

		<div class="slick-slider-default slider-home">

			<?php while ( $q->have_posts() ) { $q->the_post();

				// $tabs .= '<li class="nav-item hero-tab">';
				// 	$tabs .= '<a href="#" class="nav-link" data-slide="' . $q->current_post . '">' . get_the_title() . '</a>';
				// $tabs .= '</li>';

				get_template_part( 'loop-templates/content', $post_type );

			} ?>

		</div>

		<?php if ( $tabs ) { ?>
			<div class="hero-tabs-wrapper d-none d-sm-flex navbar navbar-expand navbar-dark">
				<ul class="hero-tabs navbar-nav mx-auto">
					<?php echo $tabs; ?>
				</ul>
			</div>
		<?php } ?>

	</div>

<?php }

wp_reset_postdata();
