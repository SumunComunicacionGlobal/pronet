<?php
/**
 * Theme basic setup.
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Set the content width based on the theme's design and stylesheet.
if ( ! isset( $content_width ) ) {
	$content_width = 1280; /* pixels */
}

// Dequeue WordPress emoji scripts and styles
add_action( 'init', function() {
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
});

add_action( 'after_setup_theme', 'smn_setup', 20 );
function smn_setup() {

	register_nav_menus( array(
        'legal' => __( 'Páginas legales', 'smn-admin' ),
	) );

    add_theme_support( 'appearance-tools' );

}

function understrap_all_excerpts_get_more_link( $post_excerpt ) {
    
	if ( ! is_admin() ) {
        global $post;
        if ( !$post->post_excerpt ) {
            $post_excerpt = $post_excerpt . ' [...]';
        }

        if ( is_search() ) return $post_excerpt;

        $r = '<div class="excerpt-row d-flex flex-column flex-lg-row gap-3 justify-content-between align-items-end">';
            $r .= '<div class="excerpt-text flex-grow-1">';
            $r .= $post_excerpt;
            $r .= '</div>';
            $r .= '<div class="excerpt-link flex-shrink-0">';
            $r .= '<a class="btn btn-outline-primary" href="' . esc_url( get_permalink( get_the_ID() ) ) . '">';
                $r .= __( 'Ver más', 'smn' ) . ' ↘';
            $r .= '</a>';
            $r .= '</div>';
        $r .= '</div>';

        return $r;
    }

}

add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );
function custom_excerpt_length( $length ) {
     return 12;
}

add_filter( 'get_the_archive_title', 'prefix_category_title' );
function prefix_category_title( $title ) {
    if ( is_tax() || is_category() || is_tag() ) {
        $title = single_term_title( '', false );
    } elseif ( is_post_type_archive() ) {
        $title = post_type_archive_title( '', false );
    }
    return $title;
}

add_action( 'pre_get_posts', 'smn_pre_get_posts' );
function smn_pre_get_posts($query) {
    if (!$query->is_main_query() || is_admin() ) return;

    if (is_search()) {
        $query->set('posts_per_page', 24);
    }
}