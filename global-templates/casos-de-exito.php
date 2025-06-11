<?php

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
$post_type = 'caso-de-exito';

$args = array(
	'post_type'			=> $post_type,
	'posts_per_page'	=> 3,
	'ignore_row'		=> true,
);

$q = new WP_Query($args);

if ( $q->have_posts() ) { ?>

	<div class="casos-de-exito-block" id="wrapper-casos-de-exito">

		<?php while ( $q->have_posts() ) { $q->the_post();

			get_template_part( 'loop-templates/content', $post_type . '-compacto', array( 'order' => $q->current_post + 1 ) );

		} ?>

	</div>

<?php }

wp_reset_postdata();
