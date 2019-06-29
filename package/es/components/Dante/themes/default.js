var _theme;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dante_font_family_sans = "'jaf-bernino-sans', 'Open Sans', \"Lucida Grande\", \"Lucida Sans Unicode\", \"Lucida Sans\", Geneva, Verdana, sans_serif;";
var tooltip_size = '32px';
var dante_control_color = '#333333';
var dante_inversed_color = '#FFFFFF';
var dante_accent_color = '#5BD974';
var dante_text_color = '#4a4a4a';
var theme = (_theme = {
  dante_font_family_serif: "'freight-text-pro', 'Merriweather', Georgia, Cambria, \"Times New Roman\", Times, serif;",
  dante_font_family_sans: dante_font_family_sans,
  dante_font_family_mono: "Menlo, Monaco, Consolas, \"Courier New\", \"Courier\", monospace;",
  dante_font_family_base: dante_font_family_sans,
  // Editor
  dante_editor_font_size: '18px',
  dante_editor_line_height: '1.9',
  dante_font_family_sans_serif: 'comic-sans',
  dante_visual_debugger: 'false',
  dante_text_color: dante_text_color,
  dante_inversed_color: dante_inversed_color,
  dante_accent_color: dante_accent_color,
  dante_control_color: dante_control_color,
  dante_popover_color: dante_inversed_color,
  //dante_font_size_base:  '24px',
  //line_height_base:     '1.428571429', // 20/14
  tooltip_color: '#999',
  tooltip_background_color: 'transparent',
  tooltip_border_color: '#999',
  tooltip_color_opacity: '0.44',
  tooltip_color_opacity_hover: '0.9',
  tooltip_background_opacity: '0',
  tooltip_border_width: '1px',
  tooltip_border_radius: '999em',
  tooltip_caret_size: '12px',
  menu_tone: "#444",
  tooltip_size: '32px',
  tooltip_button_spacing: '9px',
  tooltip_menu_spacing: '22px',
  tooltip_items: 10,
  // Fix this and remove it
  tooltip_item_delay: 30
}, _defineProperty(_theme, "tooltip_size", tooltip_size), _defineProperty(_theme, "tooltip_line_height", tooltip_size), _defineProperty(_theme, "tooltip_default_transition", '100ms border-color, 100ms color'), _defineProperty(_theme, "tooltip_forward_transition", 'transform 100ms'), _defineProperty(_theme, "tooltip_backward_transition", 'transform 250ms'), _defineProperty(_theme, "dante_code_background", '#000'), _defineProperty(_theme, "dante_code_color", '#fff'), _defineProperty(_theme, "dante_menu_height", '42px'), _defineProperty(_theme, "dante_menu_background", dante_control_color), _defineProperty(_theme, "dante_menu_color", dante_inversed_color), _defineProperty(_theme, "dante_menu_border_radius", '4px'), _defineProperty(_theme, "dante_menu_box_shadow", '1px 1px 3px 0px #9e9393'), _defineProperty(_theme, "dante_menu_icon_size", '16px'), _defineProperty(_theme, "dante_menu_icon_color", dante_inversed_color), _defineProperty(_theme, "dante_menu_icon_accent", dante_accent_color), _defineProperty(_theme, "dante_menu_divider_color", '#3D3E49'), _defineProperty(_theme, "dante_menu_border_width", '0px'), _defineProperty(_theme, "dante_menu_border_color", 'none'), _defineProperty(_theme, "dante_menu_caret_size", '8px'), _theme);
export default theme;