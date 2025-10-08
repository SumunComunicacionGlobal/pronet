<?php
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

?>

<div <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<?php the_content(); ?>

	<?php understrap_edit_post_link(); ?>

</div><!-- #post-## -->