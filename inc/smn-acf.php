<?php

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if( function_exists('acf_add_local_field_group') ):

    acf_add_local_field_group(array(
        'key' => 'group_629dfb4e7fd46',
        'title' => 'Campos para Categorías',
        'fields' => array(
            array(
                'key' => 'field_629dfb572084c',
                'label' => 'Imagen principal de la categoría',
                'name' => 'thumbnail_id',
                'type' => 'image',
                'instructions' => 'Se muestra en la cabecera.',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '50',
                    'class' => '',
                    'id' => '',
                ),
                'return_format' => 'id',
                'preview_size' => 'medium',
                'library' => 'all',
                'min_width' => '',
                'min_height' => '',
                'min_size' => '',
                'max_width' => '',
                'max_height' => '',
                'max_size' => '',
                'mime_types' => '',
            ),
            array(
                'key' => 'field_62bec55ca8713',
                'label' => 'Contenido bajo la cabecera',
                'name' => 'secondary_description',
                'type' => 'wysiwyg',
                'instructions' => 'Aparece bajo la cabecera de página.',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'default_value' => '',
                'tabs' => 'all',
                'toolbar' => 'full',
                'media_upload' => 1,
                'delay' => 0,
            ),
            array(
                'key' => 'field_62bf00ec539dc',
                'label' => 'Fragmentos de contenido en la parte superior',
                'name' => 'top_fragments',
                'type' => 'post_object',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'post_type' => array(
                    0 => 'content_fragment',
                ),
                'taxonomy' => '',
                'allow_null' => 1,
                'multiple' => 1,
                'return_format' => 'id',
                'ui' => 1,
            ),
            array(
                'key' => 'field_62bf0111539dd',
                'label' => 'Fragmentos de contenido en la parte inferior',
                'name' => 'bottom_fragments',
                'type' => 'post_object',
                'instructions' => '',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'post_type' => array(
                    0 => 'content_fragment',
                ),
                'taxonomy' => '',
                'allow_null' => 1,
                'multiple' => 1,
                'return_format' => 'id',
                'ui' => 1,
            ),
            array(
                'key' => 'field_62beea3792dd3',
                'label' => 'Contenido al pie',
                'name' => 'terciary_description',
                'type' => 'wysiwyg',
                'instructions' => 'Aparece al final de la página.',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'default_value' => '',
                'tabs' => 'all',
                'toolbar' => 'full',
                'media_upload' => 1,
                'delay' => 0,
            ),
            array(
                'key' => 'field_62bef184cd1f5',
                'label' => 'Entradas relacionadas',
                'name' => 'related_posts',
                'type' => 'post_object',
                'instructions' => 'Entradas de blog relacionadas',
                'required' => 0,
                'conditional_logic' => 0,
                'wrapper' => array(
                    'width' => '',
                    'class' => '',
                    'id' => '',
                ),
                'post_type' => array(
                    0 => 'post',
                ),
                'taxonomy' => '',
                'allow_null' => 1,
                'multiple' => 1,
                'return_format' => 'id',
                'ui' => 1,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'taxonomy',
                    'operator' => '==',
                    'value' => 'product_cat',
                ),
            ),
            array(
                array(
                    'param' => 'taxonomy',
                    'operator' => '==',
                    'value' => 'category',
                ),
            ),
            array(
                array(
                    'param' => 'taxonomy',
                    'operator' => '==',
                    'value' => 'product_tag',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'hide_on_screen' => '',
        'active' => true,
        'description' => '',
        'show_in_rest' => 0,
    ));
    
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