const dante_font_family_sans =
  "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";
const dante_font_family_sans_serif =
  "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";

// const dante_font_family_sans = `'jaf-bernino-sans', 'Playfair Display', 'Open Sans', "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans_serif;`;
// const dante_font_family_sans_serif = `'freight-text-pro', 'Merriweather', Georgia, Cambria, "Times New Roman", Times, serif;`;
// const dante_font_family_sans_serif = `'freight-text-pro','Playfair Display', 'Merriweather', Georgia, Cambria, "Times New Roman", Times, serif;`;

const tooltip_size = "32px";
const dante_control_color = "#333333";
const dante_inversed_color = "#000";
const dante_accent_color = "#5BD974";
const dante_text_color = "#fefefe";

const theme = {
  dante_font_family_serif: dante_font_family_sans_serif,
  dante_font_family_sans: dante_font_family_sans,
  dante_font_family_mono: `Menlo, Monaco, Consolas, "Courier New", "Courier", monospace;`,
  dante_font_family_base: dante_font_family_sans,

  // Editor
  dante_editor_font_size: "1.4rem",
  dante_editor_line_height: "1.9",
  dante_font_family_sans_serif: dante_font_family_sans_serif,
  dante_visual_debugger: "false",
  dante_text_color: dante_text_color,
  dante_inversed_color: dante_inversed_color,
  dante_accent_color: dante_accent_color,
  dante_control_color: dante_control_color,
  dante_popover_color: dante_inversed_color,

  //dante_font_size_base:  '24px',
  //line_height_base:     '1.428571429', // 20/14

  tooltip_color: "#fff",
  tooltip_background_color: "#000",
  tooltip_border_color: "#fff",
  tooltip_background_opacity: "0",
  tooltip_border_width: "1px",
  tooltip_border_radius: "999em",

  tooltip_caret_size: "12px",
  menu_tone: "#444",

  tooltip_button_spacing: "9px",
  tooltip_menu_spacing: "22px",

  tooltip_items: 10, // Fix this and remove it
  tooltip_item_delay: 30,
  tooltip_size: tooltip_size,
  tooltip_line_height: tooltip_size,

  tooltip_default_transition: "100ms border-color, 100ms color",
  tooltip_forward_transition: "transform 100ms",
  tooltip_backward_transition: "transform 250ms",

  dante_code_background: "#444",
  dante_code_color: "#fff",

  // Menu

  //background: #2A2B32;

  dante_menu_height: "42px",
  dante_menu_background: "#fff",
  dante_menu_color: "#0f0",
  dante_menu_border_radius: "4px",
  dante_menu_box_shadow: `1px 1px 3px 0px ${dante_control_color}`,
  dante_menu_icon_size: "16px",
  dante_menu_icon_color: "#000",
  dante_menu_icon_accent: dante_accent_color,
  dante_menu_divider_color: dante_control_color,
  dante_menu_border_width: "0px",
  dante_menu_border_color: "none",
  dante_menu_caret_size: "8px",
  dante_bg_color: "black",

  // highlight theme
  // highlight theme
  // find other themes at https://highlightjs.org/static/demo/
  // https://github.com/highlightjs/highlight.js/tree/main/src/styles
  hljs_color: "#aaaaaa",
  hljs_background: "#000000",
  hljs_emphasis_color: "#a8a8a2",
  hljs_literal_color: "#ff55ff",
  hljs_selector_class_color: "#aaaaff",
  hljs_name_color: "#ffff55",
  hljs_title_color: "#aaaaaa",
  hljs_variable_color: "#ff5555",
  hljs_class_title_color: "#8888ff",
  hljs_link_color: "#ff55ff",
  hljs_deletion_color: "#55ffff",
};
export default theme;
