<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

if (!class_exists('AC_GenericSettingPage')) :
    /**
     * AC_AdminSettingPage helps to process generic plugin settings.
     */
    class AC_GenericSettingPage extends AC_Options
    {
        /**
         * @inheritdoc
         */
        protected $option_group = 'anycomment-generic-group';
        /**
         * @inheritdoc
         */
        protected $option_name = 'anycomment-generic';
        /**
         * @inheritdoc
         */
        protected $page_slug = 'anycomments-settings';


        const OPTION_GENERIC_THEME_TOGGLE = 'option_theme_toggle';

        /**
         * AnyCommentAdminPages constructor.
         */
        public function __construct()
        {
            parent::__construct();
            $this->init_hooks();
        }

        /**
         * Initiate hooks.
         */
        private function init_hooks()
        {
            add_action('admin_menu', [$this, 'add_menu']);
            add_action('admin_init', [$this, 'init_settings']);
        }

        /**
         * Init admin menu.
         */
        public function add_menu()
        {
            add_submenu_page(
                'anycomment-dashboard',
                __('Settings', "anycomment"),
                __('Settings', "anycomment"),
                'manage_options',
                $this->page_slug,
                [$this, 'page_html']
            );
        }

        /**
         * {@inheritdoc}
         */
        public function init_settings()
        {
            add_settings_section(
                'section_generic',
                __('Generic', "anycomment"),
                function () {
                    echo '<p>' . __('Generic settings.', "anycomment") . '</p>';
                },
                $this->page_slug
            );

            $this->render_fields(
                $this->page_slug,
                'section_vk',
                [
                    [
                        'id' => self::OPTION_GENERIC_THEME_TOGGLE,
                        'title' => __('Theme', "anycomment"),
                        'callback' => 'input_checkbox',
                        'description' => esc_html(__('Comments theme.', "anycomment"))
                    ],
                ]
            );
        }
    }
endif;

