import '@emotion/react'

// This is the prescribed method for using custom themes with emotion and typescript
// @see https://emotion.sh/docs/typescript
declare module '@emotion/react' {
  export interface Theme {
    dante_font_family_serif: string
    dante_font_family_sans: string
    dante_font_family_mono: string
    dante_font_family_base: string

    // Editor
    dante_editor_font_size: string
    dante_editor_line_height: string

    //dante_font_family_sans_serif: "comic-sans",
    dante_visual_debugger: string
    dante_text_color: string
    dante_inversed_color: string
    dante_accent_color: string
    dante_control_color: string
    dante_popover_color: string

    //dante_font_size_base:  '24px',
    //line_height_base:     '1.428571429', // 20/14

    tooltip_color: string
    tooltip_background_color: string
    tooltip_border_color: string
    tooltip_color_opacity: string
    tooltip_color_opacity_hover: string
    tooltip_background_opacity: string
    tooltip_border_width: string
    tooltip_border_radius: string

    tooltip_caret_size: string
    menu_tone: string

    tooltip_button_spacing: string
    tooltip_menu_spacing: string

    tooltip_items: number // Fix this and remove it
    tooltip_item_delay: number
    tooltip_size: string
    tooltip_line_height: string

    tooltip_default_transition: string
    tooltip_forward_transition: string
    tooltip_backward_transition: string

    dante_code_background: string
    dante_code_color: string

    // Menu

    //background: #2A2B32;

    dante_menu_height: string
    dante_menu_background: string
    dante_menu_color: string
    dante_menu_border_radius: string
    dante_menu_box_shadow: string
    dante_menu_icon_size: string
    dante_menu_icon_color: string
    dante_menu_icon_accent: string
    dante_menu_divider_color: string
    dante_menu_border_width: string
    dante_menu_border_color: string
    dante_menu_caret_size: string
    dante_bg_color: string

    // highlight theme
    // highlight theme
    // find other themes at https://highlightjs.org/static/demo/
    // https://github.com/highlightjs/highlight.js/tree/main/src/styles
    hljs_color: string
    hljs_background: string
    hljs_emphasis_color: string
    hljs_literal_color: string
    hljs_selector_class_color: string
    hljs_name_color: string
    hljs_title_color: string
    hljs_variable_color: string
    hljs_class_title_color: string
    hljs_link_color: string
    hljs_deletion_color: string
  }
}
