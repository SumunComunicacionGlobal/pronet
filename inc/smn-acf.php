<?php

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if( function_exists('acf_add_local_field_group') ):
    
    acf_add_local_field_group(array(
        'key' => 'group_62b9b353de7b6',
        'title' => 'Configuración de cabecera y footer',
        'fields' => array(
            array(
                'key' => 'field_62c210963a1e9',
                'label' => 'Ocultar Prefooter',
                'name' => 'ocultar_prefooter',
                'type' => 'true_false',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'message' => '',
                'default_value' => 0,
                'ui' => 1,
                'ui_on_text' => '',
                'ui_off_text' => '',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'page',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'side',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => true,
        'description' => '',
        'show_in_rest' => 0,
    ));
    
endif;		

if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
        'page_title'    => 'Configuración web',
        'menu_title'    => 'Configuración web',
        'menu_slug'     => 'configuracion-web',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));
}

add_action('acf/init', function() {
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    $cpts = array_filter(
        get_post_types(array('_builtin' => false), 'objects'),
        function($cpt) {
            return !empty($cpt->has_archive);
        }
    );
    $fields = array();

    foreach ($cpts as $cpt) {
        $fields[] = array(
            'key' => 'field_header_img_' . $cpt->name,
            'label' => 'Imagen de cabecera para ' . $cpt->labels->singular_name,
            'name' => 'header_img_' . $cpt->name,
            'type' => 'image',
            'return_format' => 'id',
            'preview_size' => 'medium',
            'library' => 'all',
            'instructions' => '',
            'required' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
        );
        $fields[] = array(
            'key' => 'field_header_video_' . $cpt->name,
            'label' => 'Vídeo de cabecera para ' . $cpt->labels->singular_name,
            'name' => 'header_video_' . $cpt->name,
            'type' => 'file',
            'return_format' => 'id',
            'library' => 'all',
            'instructions' => 'Si se establece, se mostrará en lugar de la imagen de cabecera.',
            'required' => 0,
            'mime_types' => 'mp4,webm,ogg',
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
        );
    }

    if (!empty($fields)) {
        acf_add_local_field_group(array(
            'key' => 'group_header_imgs_cpts',
            'title' => 'Imágenes de cabecera por CPT',
            'fields' => $fields,
            'location' => array(
                array(
                    array(
                        'param' => 'options_page',
                        'operator' => '==',
                        'value' => 'configuracion-web',
                    ),
                ),
            ),
        ));
    }
});