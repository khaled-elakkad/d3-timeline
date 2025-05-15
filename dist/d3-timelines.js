(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-axis'), require('d3-array'), require('d3-time-format'), require('d3-time'), require('d3-scale'), require('d3-selection'), require('d3-zoom')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-axis', 'd3-array', 'd3-time-format', 'd3-time', 'd3-scale', 'd3-selection', 'd3-zoom'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
}(this, function (exports,d3Axis,d3Array,d3TimeFormat,d3Time,d3Scale,d3Selection,d3Zoom) { 'use strict';

	function colors(specifier) {
	  var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
	  while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
	  return colors;
	}

	var schemeCategory10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

	colors("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");

	colors("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");

	colors("4269d0efb118ff725c6cc5b03ca951ff8ab7a463f297bbf59c6b4e9498a0");

	colors("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");

	colors("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");

	colors("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");

	colors("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");

	colors("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");

	colors("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");

	colors("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");

	function define(constructor, factory, prototype) {
	  constructor.prototype = factory.prototype = prototype;
	  prototype.constructor = constructor;
	}

	function extend(parent, definition) {
	  var prototype = Object.create(parent.prototype);
	  for (var key in definition) prototype[key] = definition[key];
	  return prototype;
	}

	function Color() {}

	var darker = 0.7;
	var brighter = 1 / darker;

	var reI = "\\s*([+-]?\\d+)\\s*";
	var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
	var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
	var reHex = /^#([0-9a-f]{3,8})$/;
	var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
	var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
	var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
	var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
	var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
	var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
	var named = {
	  aliceblue: 0xf0f8ff,
	  antiquewhite: 0xfaebd7,
	  aqua: 0x00ffff,
	  aquamarine: 0x7fffd4,
	  azure: 0xf0ffff,
	  beige: 0xf5f5dc,
	  bisque: 0xffe4c4,
	  black: 0x000000,
	  blanchedalmond: 0xffebcd,
	  blue: 0x0000ff,
	  blueviolet: 0x8a2be2,
	  brown: 0xa52a2a,
	  burlywood: 0xdeb887,
	  cadetblue: 0x5f9ea0,
	  chartreuse: 0x7fff00,
	  chocolate: 0xd2691e,
	  coral: 0xff7f50,
	  cornflowerblue: 0x6495ed,
	  cornsilk: 0xfff8dc,
	  crimson: 0xdc143c,
	  cyan: 0x00ffff,
	  darkblue: 0x00008b,
	  darkcyan: 0x008b8b,
	  darkgoldenrod: 0xb8860b,
	  darkgray: 0xa9a9a9,
	  darkgreen: 0x006400,
	  darkgrey: 0xa9a9a9,
	  darkkhaki: 0xbdb76b,
	  darkmagenta: 0x8b008b,
	  darkolivegreen: 0x556b2f,
	  darkorange: 0xff8c00,
	  darkorchid: 0x9932cc,
	  darkred: 0x8b0000,
	  darksalmon: 0xe9967a,
	  darkseagreen: 0x8fbc8f,
	  darkslateblue: 0x483d8b,
	  darkslategray: 0x2f4f4f,
	  darkslategrey: 0x2f4f4f,
	  darkturquoise: 0x00ced1,
	  darkviolet: 0x9400d3,
	  deeppink: 0xff1493,
	  deepskyblue: 0x00bfff,
	  dimgray: 0x696969,
	  dimgrey: 0x696969,
	  dodgerblue: 0x1e90ff,
	  firebrick: 0xb22222,
	  floralwhite: 0xfffaf0,
	  forestgreen: 0x228b22,
	  fuchsia: 0xff00ff,
	  gainsboro: 0xdcdcdc,
	  ghostwhite: 0xf8f8ff,
	  gold: 0xffd700,
	  goldenrod: 0xdaa520,
	  gray: 0x808080,
	  green: 0x008000,
	  greenyellow: 0xadff2f,
	  grey: 0x808080,
	  honeydew: 0xf0fff0,
	  hotpink: 0xff69b4,
	  indianred: 0xcd5c5c,
	  indigo: 0x4b0082,
	  ivory: 0xfffff0,
	  khaki: 0xf0e68c,
	  lavender: 0xe6e6fa,
	  lavenderblush: 0xfff0f5,
	  lawngreen: 0x7cfc00,
	  lemonchiffon: 0xfffacd,
	  lightblue: 0xadd8e6,
	  lightcoral: 0xf08080,
	  lightcyan: 0xe0ffff,
	  lightgoldenrodyellow: 0xfafad2,
	  lightgray: 0xd3d3d3,
	  lightgreen: 0x90ee90,
	  lightgrey: 0xd3d3d3,
	  lightpink: 0xffb6c1,
	  lightsalmon: 0xffa07a,
	  lightseagreen: 0x20b2aa,
	  lightskyblue: 0x87cefa,
	  lightslategray: 0x778899,
	  lightslategrey: 0x778899,
	  lightsteelblue: 0xb0c4de,
	  lightyellow: 0xffffe0,
	  lime: 0x00ff00,
	  limegreen: 0x32cd32,
	  linen: 0xfaf0e6,
	  magenta: 0xff00ff,
	  maroon: 0x800000,
	  mediumaquamarine: 0x66cdaa,
	  mediumblue: 0x0000cd,
	  mediumorchid: 0xba55d3,
	  mediumpurple: 0x9370db,
	  mediumseagreen: 0x3cb371,
	  mediumslateblue: 0x7b68ee,
	  mediumspringgreen: 0x00fa9a,
	  mediumturquoise: 0x48d1cc,
	  mediumvioletred: 0xc71585,
	  midnightblue: 0x191970,
	  mintcream: 0xf5fffa,
	  mistyrose: 0xffe4e1,
	  moccasin: 0xffe4b5,
	  navajowhite: 0xffdead,
	  navy: 0x000080,
	  oldlace: 0xfdf5e6,
	  olive: 0x808000,
	  olivedrab: 0x6b8e23,
	  orange: 0xffa500,
	  orangered: 0xff4500,
	  orchid: 0xda70d6,
	  palegoldenrod: 0xeee8aa,
	  palegreen: 0x98fb98,
	  paleturquoise: 0xafeeee,
	  palevioletred: 0xdb7093,
	  papayawhip: 0xffefd5,
	  peachpuff: 0xffdab9,
	  peru: 0xcd853f,
	  pink: 0xffc0cb,
	  plum: 0xdda0dd,
	  powderblue: 0xb0e0e6,
	  purple: 0x800080,
	  rebeccapurple: 0x663399,
	  red: 0xff0000,
	  rosybrown: 0xbc8f8f,
	  royalblue: 0x4169e1,
	  saddlebrown: 0x8b4513,
	  salmon: 0xfa8072,
	  sandybrown: 0xf4a460,
	  seagreen: 0x2e8b57,
	  seashell: 0xfff5ee,
	  sienna: 0xa0522d,
	  silver: 0xc0c0c0,
	  skyblue: 0x87ceeb,
	  slateblue: 0x6a5acd,
	  slategray: 0x708090,
	  slategrey: 0x708090,
	  snow: 0xfffafa,
	  springgreen: 0x00ff7f,
	  steelblue: 0x4682b4,
	  tan: 0xd2b48c,
	  teal: 0x008080,
	  thistle: 0xd8bfd8,
	  tomato: 0xff6347,
	  turquoise: 0x40e0d0,
	  violet: 0xee82ee,
	  wheat: 0xf5deb3,
	  white: 0xffffff,
	  whitesmoke: 0xf5f5f5,
	  yellow: 0xffff00,
	  yellowgreen: 0x9acd32
	};

	define(Color, color, {
	  copy(channels) {
	    return Object.assign(new this.constructor, this, channels);
	  },
	  displayable() {
	    return this.rgb().displayable();
	  },
	  hex: color_formatHex, // Deprecated! Use color.formatHex.
	  formatHex: color_formatHex,
	  formatHex8: color_formatHex8,
	  formatHsl: color_formatHsl,
	  formatRgb: color_formatRgb,
	  toString: color_formatRgb
	});

	function color_formatHex() {
	  return this.rgb().formatHex();
	}

	function color_formatHex8() {
	  return this.rgb().formatHex8();
	}

	function color_formatHsl() {
	  return hslConvert(this).formatHsl();
	}

	function color_formatRgb() {
	  return this.rgb().formatRgb();
	}

	function color(format) {
	  var m, l;
	  format = (format + "").trim().toLowerCase();
	  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
	      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
	      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
	      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
	      : null) // invalid hex
	      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
	      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
	      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
	      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
	      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
	      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
	      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
	      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
	      : null;
	}

	function rgbn(n) {
	  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
	}

	function rgba(r, g, b, a) {
	  if (a <= 0) r = g = b = NaN;
	  return new Rgb(r, g, b, a);
	}

	function rgbConvert(o) {
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Rgb;
	  o = o.rgb();
	  return new Rgb(o.r, o.g, o.b, o.opacity);
	}

	function rgb(r, g, b, opacity) {
	  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
	}

	function Rgb(r, g, b, opacity) {
	  this.r = +r;
	  this.g = +g;
	  this.b = +b;
	  this.opacity = +opacity;
	}

	define(Rgb, rgb, extend(Color, {
	  brighter(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  darker(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
	  },
	  rgb() {
	    return this;
	  },
	  clamp() {
	    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
	  },
	  displayable() {
	    return (-0.5 <= this.r && this.r < 255.5)
	        && (-0.5 <= this.g && this.g < 255.5)
	        && (-0.5 <= this.b && this.b < 255.5)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
	  formatHex: rgb_formatHex,
	  formatHex8: rgb_formatHex8,
	  formatRgb: rgb_formatRgb,
	  toString: rgb_formatRgb
	}));

	function rgb_formatHex() {
	  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
	}

	function rgb_formatHex8() {
	  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
	}

	function rgb_formatRgb() {
	  const a = clampa(this.opacity);
	  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
	}

	function clampa(opacity) {
	  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
	}

	function clampi(value) {
	  return Math.max(0, Math.min(255, Math.round(value) || 0));
	}

	function hex(value) {
	  value = clampi(value);
	  return (value < 16 ? "0" : "") + value.toString(16);
	}

	function hsla(h, s, l, a) {
	  if (a <= 0) h = s = l = NaN;
	  else if (l <= 0 || l >= 1) h = s = NaN;
	  else if (s <= 0) h = NaN;
	  return new Hsl(h, s, l, a);
	}

	function hslConvert(o) {
	  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Hsl;
	  if (o instanceof Hsl) return o;
	  o = o.rgb();
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      h = NaN,
	      s = max - min,
	      l = (max + min) / 2;
	  if (s) {
	    if (r === max) h = (g - b) / s + (g < b) * 6;
	    else if (g === max) h = (b - r) / s + 2;
	    else h = (r - g) / s + 4;
	    s /= l < 0.5 ? max + min : 2 - max - min;
	    h *= 60;
	  } else {
	    s = l > 0 && l < 1 ? 0 : h;
	  }
	  return new Hsl(h, s, l, o.opacity);
	}

	function colorHsl(h, s, l, opacity) {
	  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
	}

	function Hsl(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}

	define(Hsl, colorHsl, extend(Color, {
	  brighter(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < 0.5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
	      this.opacity
	    );
	  },
	  clamp() {
	    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
	  },
	  displayable() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1)
	        && (0 <= this.opacity && this.opacity <= 1);
	  },
	  formatHsl() {
	    const a = clampa(this.opacity);
	    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
	  }
	}));

	function clamph(value) {
	  value = (value || 0) % 360;
	  return value < 0 ? value + 360 : value;
	}

	function clampt(value) {
	  return Math.max(0, Math.min(1, value || 0));
	}

	/* From FvD 13.37, CSS Color Module Level 3 */
	function hsl2rgb(h, m1, m2) {
	  return (h < 60 ? m1 + (m2 - m1) * h / 60
	      : h < 180 ? m2
	      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	      : m1) * 255;
	}

	const radians = Math.PI / 180;
	const degrees = 180 / Math.PI;

	const K = 18;
	const Xn = 0.96422;
	const Yn = 1;
	const Zn = 0.82521;
	const t0 = 4 / 29;
	const t1 = 6 / 29;
	const t2 = 3 * t1 * t1;
	const t3 = t1 * t1 * t1;
	function labConvert(o) {
	  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	  if (o instanceof Hcl) return hcl2lab(o);
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var r = rgb2lrgb(o.r),
	      g = rgb2lrgb(o.g),
	      b = rgb2lrgb(o.b),
	      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
	  if (r === g && g === b) x = z = y; else {
	    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
	    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
	  }
	  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
	}

	function lab(l, a, b, opacity) {
	  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
	}

	function Lab(l, a, b, opacity) {
	  this.l = +l;
	  this.a = +a;
	  this.b = +b;
	  this.opacity = +opacity;
	}

	define(Lab, lab, extend(Color, {
	  brighter(k) {
	    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  darker(k) {
	    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
	  },
	  rgb() {
	    var y = (this.l + 16) / 116,
	        x = isNaN(this.a) ? y : y + this.a / 500,
	        z = isNaN(this.b) ? y : y - this.b / 200;
	    x = Xn * lab2xyz(x);
	    y = Yn * lab2xyz(y);
	    z = Zn * lab2xyz(z);
	    return new Rgb(
	      lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
	      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
	      lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
	      this.opacity
	    );
	  }
	}));

	function xyz2lab(t) {
	  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
	}

	function lab2xyz(t) {
	  return t > t1 ? t * t * t : t2 * (t - t0);
	}

	function lrgb2rgb(x) {
	  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	}

	function rgb2lrgb(x) {
	  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
	}

	function hclConvert(o) {
	  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	  if (!(o instanceof Lab)) o = labConvert(o);
	  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
	  var h = Math.atan2(o.b, o.a) * degrees;
	  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
	}

	function colorHcl(h, c, l, opacity) {
	  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
	}

	function Hcl(h, c, l, opacity) {
	  this.h = +h;
	  this.c = +c;
	  this.l = +l;
	  this.opacity = +opacity;
	}

	function hcl2lab(o) {
	  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
	  var h = o.h * radians;
	  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
	}

	define(Hcl, colorHcl, extend(Color, {
	  brighter(k) {
	    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
	  },
	  darker(k) {
	    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
	  },
	  rgb() {
	    return hcl2lab(this).rgb();
	  }
	}));

	var A = -0.14861;
	var B = +1.78277;
	var C = -0.29227;
	var D = -0.90649;
	var E = +1.97294;
	var ED = E * D;
	var EB = E * B;
	var BC_DA = B * C - D * A;
	function cubehelixConvert(o) {
	  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
	  var r = o.r / 255,
	      g = o.g / 255,
	      b = o.b / 255,
	      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
	      bl = b - l,
	      k = (E * (g - l) - C * bl) / D,
	      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
	      h = s ? Math.atan2(k, bl) * degrees - 120 : NaN;
	  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
	}

	function cubehelix(h, s, l, opacity) {
	  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
	}

	function Cubehelix(h, s, l, opacity) {
	  this.h = +h;
	  this.s = +s;
	  this.l = +l;
	  this.opacity = +opacity;
	}

	define(Cubehelix, cubehelix, extend(Color, {
	  brighter(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  darker(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
	  },
	  rgb() {
	    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians,
	        l = +this.l,
	        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	        cosh = Math.cos(h),
	        sinh = Math.sin(h);
	    return new Rgb(
	      255 * (l + a * (A * cosh + B * sinh)),
	      255 * (l + a * (C * cosh + D * sinh)),
	      255 * (l + a * (E * cosh)),
	      this.opacity
	    );
	  }
	}));

	function basis(t1, v0, v1, v2, v3) {
	  var t2 = t1 * t1, t3 = t2 * t1;
	  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
	      + (4 - 6 * t2 + 3 * t3) * v1
	      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
	      + t3 * v3) / 6;
	}

	function basis$1(values) {
	  var n = values.length - 1;
	  return function(t) {
	    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
	        v1 = values[i],
	        v2 = values[i + 1],
	        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
	        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
	    return basis((t - i / n) * n, v0, v1, v2, v3);
	  };
	}

	var constant = x => () => x;

	function linear(a, d) {
	  return function(t) {
	    return a + t * d;
	  };
	}

	function exponential(a, b, y) {
	  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	    return Math.pow(a + t * b, y);
	  };
	}

	function hue(a, b) {
	  var d = b - a;
	  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
	}

	function gamma(y) {
	  return (y = +y) === 1 ? nogamma : function(a, b) {
	    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
	  };
	}

	function nogamma(a, b) {
	  var d = b - a;
	  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
	}

	(function rgbGamma(y) {
	  var color = gamma(y);

	  function rgb$$(start, end) {
	    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
	        g = color(start.g, end.g),
	        b = color(start.b, end.b),
	        opacity = nogamma(start.opacity, end.opacity);
	    return function(t) {
	      start.r = r(t);
	      start.g = g(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  rgb$$.gamma = rgbGamma;

	  return rgb$$;
	})(1);

	function rgbSpline(spline) {
	  return function(colors) {
	    var n = colors.length,
	        r = new Array(n),
	        g = new Array(n),
	        b = new Array(n),
	        i, color;
	    for (i = 0; i < n; ++i) {
	      color = rgb(colors[i]);
	      r[i] = color.r || 0;
	      g[i] = color.g || 0;
	      b[i] = color.b || 0;
	    }
	    r = spline(r);
	    g = spline(g);
	    b = spline(b);
	    color.opacity = 1;
	    return function(t) {
	      color.r = r(t);
	      color.g = g(t);
	      color.b = b(t);
	      return color + "";
	    };
	  };
	}

	var rgbBasis = rgbSpline(basis$1);

	var epsilon2 = 1e-12;

	function cosh(x) {
	  return ((x = Math.exp(x)) + 1 / x) / 2;
	}

	function sinh(x) {
	  return ((x = Math.exp(x)) - 1 / x) / 2;
	}

	function tanh(x) {
	  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
	}

	(function zoomRho(rho, rho2, rho4) {

	  // p0 = [ux0, uy0, w0]
	  // p1 = [ux1, uy1, w1]
	  function zoom(p0, p1) {
	    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
	        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
	        dx = ux1 - ux0,
	        dy = uy1 - uy0,
	        d2 = dx * dx + dy * dy,
	        i,
	        S;

	    // Special case for u0 ≅ u1.
	    if (d2 < epsilon2) {
	      S = Math.log(w1 / w0) / rho;
	      i = function(t) {
	        return [
	          ux0 + t * dx,
	          uy0 + t * dy,
	          w0 * Math.exp(rho * t * S)
	        ];
	      }
	    }

	    // General case.
	    else {
	      var d1 = Math.sqrt(d2),
	          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
	          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
	          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
	          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
	      S = (r1 - r0) / rho;
	      i = function(t) {
	        var s = t * S,
	            coshr0 = cosh(r0),
	            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
	        return [
	          ux0 + u * dx,
	          uy0 + u * dy,
	          w0 * coshr0 / cosh(rho * s + r0)
	        ];
	      }
	    }

	    i.duration = S * 1000 * rho / Math.SQRT2;

	    return i;
	  }

	  zoom.rho = function(_) {
	    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
	    return zoomRho(_1, _2, _4);
	  };

	  return zoom;
	})(Math.SQRT2, 2, 4);

	function cubehelix$1(hue) {
	  return (function cubehelixGamma(y) {
	    y = +y;

	    function cubehelix$$(start, end) {
	      var h = hue((start = cubehelix(start)).h, (end = cubehelix(end)).h),
	          s = nogamma(start.s, end.s),
	          l = nogamma(start.l, end.l),
	          opacity = nogamma(start.opacity, end.opacity);
	      return function(t) {
	        start.h = h(t);
	        start.s = s(t);
	        start.l = l(Math.pow(t, y));
	        start.opacity = opacity(t);
	        return start + "";
	      };
	    }

	    cubehelix$$.gamma = cubehelixGamma;

	    return cubehelix$$;
	  })(1);
	}

	cubehelix$1(hue);
	var interpolateCubehelixLong = cubehelix$1(nogamma);

	var ramp = scheme => rgbBasis(scheme[scheme.length - 1]);

	var scheme = new Array(3).concat(
	  "d8b365f5f5f55ab4ac",
	  "a6611adfc27d80cdc1018571",
	  "a6611adfc27df5f5f580cdc1018571",
	  "8c510ad8b365f6e8c3c7eae55ab4ac01665e",
	  "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
	  "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
	  "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
	  "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
	  "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30"
	).map(colors);

	ramp(scheme);

	var scheme$1 = new Array(3).concat(
	  "af8dc3f7f7f77fbf7b",
	  "7b3294c2a5cfa6dba0008837",
	  "7b3294c2a5cff7f7f7a6dba0008837",
	  "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
	  "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
	  "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
	  "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
	  "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
	  "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b"
	).map(colors);

	ramp(scheme$1);

	var scheme$2 = new Array(3).concat(
	  "e9a3c9f7f7f7a1d76a",
	  "d01c8bf1b6dab8e1864dac26",
	  "d01c8bf1b6daf7f7f7b8e1864dac26",
	  "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
	  "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
	  "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
	  "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
	  "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
	  "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419"
	).map(colors);

	ramp(scheme$2);

	var scheme$3 = new Array(3).concat(
	  "998ec3f7f7f7f1a340",
	  "5e3c99b2abd2fdb863e66101",
	  "5e3c99b2abd2f7f7f7fdb863e66101",
	  "542788998ec3d8daebfee0b6f1a340b35806",
	  "542788998ec3d8daebf7f7f7fee0b6f1a340b35806",
	  "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806",
	  "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806",
	  "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08",
	  "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08"
	).map(colors);

	ramp(scheme$3);

	var scheme$4 = new Array(3).concat(
	  "ef8a62f7f7f767a9cf",
	  "ca0020f4a58292c5de0571b0",
	  "ca0020f4a582f7f7f792c5de0571b0",
	  "b2182bef8a62fddbc7d1e5f067a9cf2166ac",
	  "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
	  "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
	  "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
	  "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
	  "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061"
	).map(colors);

	ramp(scheme$4);

	var scheme$5 = new Array(3).concat(
	  "ef8a62ffffff999999",
	  "ca0020f4a582bababa404040",
	  "ca0020f4a582ffffffbababa404040",
	  "b2182bef8a62fddbc7e0e0e09999994d4d4d",
	  "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
	  "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
	  "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
	  "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
	  "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a"
	).map(colors);

	ramp(scheme$5);

	var scheme$6 = new Array(3).concat(
	  "fc8d59ffffbf91bfdb",
	  "d7191cfdae61abd9e92c7bb6",
	  "d7191cfdae61ffffbfabd9e92c7bb6",
	  "d73027fc8d59fee090e0f3f891bfdb4575b4",
	  "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
	  "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
	  "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
	  "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
	  "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
	).map(colors);

	ramp(scheme$6);

	var scheme$7 = new Array(3).concat(
	  "fc8d59ffffbf91cf60",
	  "d7191cfdae61a6d96a1a9641",
	  "d7191cfdae61ffffbfa6d96a1a9641",
	  "d73027fc8d59fee08bd9ef8b91cf601a9850",
	  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
	  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
	  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
	  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
	  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
	).map(colors);

	ramp(scheme$7);

	var scheme$8 = new Array(3).concat(
	  "fc8d59ffffbf99d594",
	  "d7191cfdae61abdda42b83ba",
	  "d7191cfdae61ffffbfabdda42b83ba",
	  "d53e4ffc8d59fee08be6f59899d5943288bd",
	  "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
	  "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
	  "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
	  "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
	  "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
	).map(colors);

	ramp(scheme$8);

	var scheme$9 = new Array(3).concat(
	  "e5f5f999d8c92ca25f",
	  "edf8fbb2e2e266c2a4238b45",
	  "edf8fbb2e2e266c2a42ca25f006d2c",
	  "edf8fbccece699d8c966c2a42ca25f006d2c",
	  "edf8fbccece699d8c966c2a441ae76238b45005824",
	  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
	  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b"
	).map(colors);

	ramp(scheme$9);

	var scheme$10 = new Array(3).concat(
	  "e0ecf49ebcda8856a7",
	  "edf8fbb3cde38c96c688419d",
	  "edf8fbb3cde38c96c68856a7810f7c",
	  "edf8fbbfd3e69ebcda8c96c68856a7810f7c",
	  "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
	  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
	  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b"
	).map(colors);

	ramp(scheme$10);

	var scheme$11 = new Array(3).concat(
	  "e0f3dba8ddb543a2ca",
	  "f0f9e8bae4bc7bccc42b8cbe",
	  "f0f9e8bae4bc7bccc443a2ca0868ac",
	  "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
	  "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
	  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
	  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
	).map(colors);

	ramp(scheme$11);

	var scheme$12 = new Array(3).concat(
	  "fee8c8fdbb84e34a33",
	  "fef0d9fdcc8afc8d59d7301f",
	  "fef0d9fdcc8afc8d59e34a33b30000",
	  "fef0d9fdd49efdbb84fc8d59e34a33b30000",
	  "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
	  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
	  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000"
	).map(colors);

	ramp(scheme$12);

	var scheme$13 = new Array(3).concat(
	  "ece2f0a6bddb1c9099",
	  "f6eff7bdc9e167a9cf02818a",
	  "f6eff7bdc9e167a9cf1c9099016c59",
	  "f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
	  "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
	  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
	  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636"
	).map(colors);

	ramp(scheme$13);

	var scheme$14 = new Array(3).concat(
	  "ece7f2a6bddb2b8cbe",
	  "f1eef6bdc9e174a9cf0570b0",
	  "f1eef6bdc9e174a9cf2b8cbe045a8d",
	  "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
	  "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
	  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
	  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858"
	).map(colors);

	ramp(scheme$14);

	var scheme$15 = new Array(3).concat(
	  "e7e1efc994c7dd1c77",
	  "f1eef6d7b5d8df65b0ce1256",
	  "f1eef6d7b5d8df65b0dd1c77980043",
	  "f1eef6d4b9dac994c7df65b0dd1c77980043",
	  "f1eef6d4b9dac994c7df65b0e7298ace125691003f",
	  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
	  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f"
	).map(colors);

	ramp(scheme$15);

	var scheme$16 = new Array(3).concat(
	  "fde0ddfa9fb5c51b8a",
	  "feebe2fbb4b9f768a1ae017e",
	  "feebe2fbb4b9f768a1c51b8a7a0177",
	  "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
	  "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
	  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
	  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a"
	).map(colors);

	ramp(scheme$16);

	var scheme$17 = new Array(3).concat(
	  "edf8b17fcdbb2c7fb8",
	  "ffffcca1dab441b6c4225ea8",
	  "ffffcca1dab441b6c42c7fb8253494",
	  "ffffccc7e9b47fcdbb41b6c42c7fb8253494",
	  "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
	  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
	  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58"
	).map(colors);

	ramp(scheme$17);

	var scheme$18 = new Array(3).concat(
	  "f7fcb9addd8e31a354",
	  "ffffccc2e69978c679238443",
	  "ffffccc2e69978c67931a354006837",
	  "ffffccd9f0a3addd8e78c67931a354006837",
	  "ffffccd9f0a3addd8e78c67941ab5d238443005a32",
	  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
	  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529"
	).map(colors);

	ramp(scheme$18);

	var scheme$19 = new Array(3).concat(
	  "fff7bcfec44fd95f0e",
	  "ffffd4fed98efe9929cc4c02",
	  "ffffd4fed98efe9929d95f0e993404",
	  "ffffd4fee391fec44ffe9929d95f0e993404",
	  "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
	  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
	  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506"
	).map(colors);

	ramp(scheme$19);

	var scheme$20 = new Array(3).concat(
	  "ffeda0feb24cf03b20",
	  "ffffb2fecc5cfd8d3ce31a1c",
	  "ffffb2fecc5cfd8d3cf03b20bd0026",
	  "ffffb2fed976feb24cfd8d3cf03b20bd0026",
	  "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
	  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
	  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026"
	).map(colors);

	ramp(scheme$20);

	var scheme$21 = new Array(3).concat(
	  "deebf79ecae13182bd",
	  "eff3ffbdd7e76baed62171b5",
	  "eff3ffbdd7e76baed63182bd08519c",
	  "eff3ffc6dbef9ecae16baed63182bd08519c",
	  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
	  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
	  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
	).map(colors);

	ramp(scheme$21);

	var scheme$22 = new Array(3).concat(
	  "e5f5e0a1d99b31a354",
	  "edf8e9bae4b374c476238b45",
	  "edf8e9bae4b374c47631a354006d2c",
	  "edf8e9c7e9c0a1d99b74c47631a354006d2c",
	  "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
	  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
	  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
	).map(colors);

	ramp(scheme$22);

	var scheme$23 = new Array(3).concat(
	  "f0f0f0bdbdbd636363",
	  "f7f7f7cccccc969696525252",
	  "f7f7f7cccccc969696636363252525",
	  "f7f7f7d9d9d9bdbdbd969696636363252525",
	  "f7f7f7d9d9d9bdbdbd969696737373525252252525",
	  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
	  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
	).map(colors);

	ramp(scheme$23);

	var scheme$24 = new Array(3).concat(
	  "efedf5bcbddc756bb1",
	  "f2f0f7cbc9e29e9ac86a51a3",
	  "f2f0f7cbc9e29e9ac8756bb154278f",
	  "f2f0f7dadaebbcbddc9e9ac8756bb154278f",
	  "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
	  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
	  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d"
	).map(colors);

	ramp(scheme$24);

	var scheme$25 = new Array(3).concat(
	  "fee0d2fc9272de2d26",
	  "fee5d9fcae91fb6a4acb181d",
	  "fee5d9fcae91fb6a4ade2d26a50f15",
	  "fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
	  "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
	  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
	  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d"
	).map(colors);

	ramp(scheme$25);

	var scheme$26 = new Array(3).concat(
	  "fee6cefdae6be6550d",
	  "feeddefdbe85fd8d3cd94701",
	  "feeddefdbe85fd8d3ce6550da63603",
	  "feeddefdd0a2fdae6bfd8d3ce6550da63603",
	  "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
	  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
	  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
	).map(colors);

	ramp(scheme$26);

	interpolateCubehelixLong(cubehelix(300, 0.5, 0.0), cubehelix(-240, 0.5, 1.0));

	var warm = interpolateCubehelixLong(cubehelix(-100, 0.75, 0.35), cubehelix(80, 1.50, 0.8));

	var cool = interpolateCubehelixLong(cubehelix(260, 0.75, 0.35), cubehelix(80, 1.50, 0.8));

	var c = cubehelix();

	var c$1 = rgb();

	function ramp$1(range) {
	  var n = range.length;
	  return function(t) {
	    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
	  };
	}

	ramp$1(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));

	var magma = ramp$1(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));

	var inferno = ramp$1(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));

	var plasma = ramp$1(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

	var timelines = function() {
			var DISPLAY_TYPES = ["circle", "rect"];

			var hover = function () {},
					mouseover = function () {},
					mouseout = function () {},
					click = function () {},
					scroll = function () {},
					labelFunction = function(label) { return label; },
					labelFloat = 0,  // floats up this many pixels
					navigateLeft = function () {},
					navigateRight = function () {},
					orient = "bottom",
					width = null,
					height = null,
					rowSeparatorsColor = null,
					backgroundColor = null,
					tickFormat = {
						format: d3TimeFormat.timeFormat("%I %p"),
						tickTime: d3Time.timeHour,
						tickInterval: 1,
						tickSize: 6,
						tickValues: null
					},
					allowZoom = true,
					axisBgColor = "white",
					chartData = {},
					colorCycle = d3Scale.scaleOrdinal(schemeCategory10),
					colorPropertyName = null,
					display = "rect",
					beginning = 0,
					labelMargin = 0,
					ending = 0,
					margin = {left: 30, right:30, top: 30, bottom:30},
					maxZoom = 5,
					stacked = false,
					rotateTicks = false,
					timeIsRelative = false,
					timeIsLinear = false,
					fullLengthBackgrounds = false,
					itemHeight = 20,
					itemMargin = 5,
					navMargin = 60,
					showTimeAxis = true,
					showAxisTop = false,
					showTodayLine = false,
					timeAxisTick = false,
					timeAxisTickFormat = {stroke: "stroke-dasharray", spacing: "4 10"},
					showTodayFormat = {marginTop: 25, marginBottom: 0, width: 1, color: colorCycle},
					showBorderLine = false,
					showBorderFormat = {marginTop: 25, marginBottom: 0, width: 1, color: colorCycle},
					showBorderLineClass = "timeline-border-line",
					showAxisHeaderBackground = false,
					showAxisNav = false,
					showAxisCalendarYear = false,
					xAxisClass = 'timeline-xAxis',			
			    		xScale = null,
					xAxis = null
				;

			var appendTimeAxis = function(g, xAxis, yPosition) {

				if(showAxisHeaderBackground){ appendAxisHeaderBackground(g, 0, 0); }

				if(showAxisNav){ appendTimeAxisNav(g); }

				var axis = g.append("g")
					.attr("class", xAxisClass)
					.attr("transform", "translate(" + 0 + "," + yPosition + ")")
					.call(xAxis);

				return axis;
			};

			var appendTimeAxisCalendarYear = function (nav) {
				var calendarLabel = beginning.getFullYear();

				if (beginning.getFullYear() != ending.getFullYear()) {
					calendarLabel = beginning.getFullYear() + "-" + ending.getFullYear();
				}

				nav.append("text")
					.attr("transform", "translate(" + 20 + ", 0)")
					.attr("x", 0)
					.attr("y", 14)
					.attr("class", "calendarYear")
					.text(calendarLabel)
				;
			};

			var appendTimeAxisNav = function (g) {
				var timelineBlocks = 6;
				var leftNavMargin = (margin.left - navMargin);
				var incrementValue = (width - margin.left)/timelineBlocks;
				var rightNavMargin = (width - margin.right - incrementValue + navMargin);

				var nav = g.append('g')
						.attr("class", "axis")
						.attr("transform", "translate(0, 20)")
					;

				if(showAxisCalendarYear) { appendTimeAxisCalendarYear(nav); }

				nav.append("text")
					.attr("transform", "translate(" + leftNavMargin + ", 0)")
					.attr("x", 0)
					.attr("y", 14)
					.attr("class", "chevron")
					.text("<")
					.on("click", function () {
						return navigateLeft(beginning, chartData);
					})
				;

				nav.append("text")
					.attr("transform", "translate(" + rightNavMargin + ", 0)")
					.attr("x", 0)
					.attr("y", 14)
					.attr("class", "chevron")
					.text(">")
					.on("click", function () {
						return navigateRight(ending, chartData);
					})
				;
			};

			var appendAxisHeaderBackground = function (g, xAxis, yAxis) {
				g.insert("rect")
					.attr("class", "row-green-bar")
					.attr("x", xAxis)
					.attr("width", width)
					.attr("y", yAxis)
					.attr("height", itemHeight)
					.attr("fill", axisBgColor);
			};

			var appendTimeAxisTick = function(g, xAxis, maxStack) {
				g.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(" + 0 + "," + (margin.top + (itemHeight + itemMargin) * maxStack) + ")")
					.attr(timeAxisTickFormat.stroke, timeAxisTickFormat.spacing)
					.call(xAxis.tickFormat("").tickSize(-(margin.top + (itemHeight + itemMargin) * (maxStack - 1) + 3), 0, 0));
			};

			var appendBackgroundBar = function (yAxisMapping, index, g, data, datum) {
				var greenbarYAxis = ((itemHeight + itemMargin) * yAxisMapping[index]) + margin.top;
				g.selectAll("svg")
					.data(data).enter()
					.insert("rect", ":first-child")
					.attr("class", "row-green-bar")
					.attr("x", fullLengthBackgrounds ? 0 : margin.left)
					.attr("width", fullLengthBackgrounds ? width : (width - margin.right - margin.left))
					.attr("y", greenbarYAxis)
					.attr("height", itemHeight)
					.attr("fill", backgroundColor instanceof Function ? backgroundColor(datum, index) : backgroundColor)
				;
			};

			var appendLabel = function (gParent, yAxisMapping, index, hasLabel, datum) {
				var fullItemHeight    = itemHeight + itemMargin;
				var rowsDown          = margin.top + (fullItemHeight/2) + fullItemHeight * (yAxisMapping[index] || 1);

				gParent.append("text")
					.attr("class", "timeline-label")
					.attr("transform", "translate(" + labelMargin + "," + rowsDown + ")")
					.text(hasLabel ? labelFunction(datum.label) : datum.id)
					.on("click", function (d, i) {

						console.log("label click!");
						var point = d3Selection.mouse(this);
						gParent.append("rect")
							.attr("id", "clickpoint")
							.attr("x", point[0])
							.attr("width", 10)
							.attr("height", itemHeight);

						click(d, index, datum, point, xScale.invert(point[0]));
					});
			};

			/*###########################
			####    START timelines    ###
			#############################*/
			function timelines (gParent) {
				var gParentSize = gParent.node().getBoundingClientRect(); // the svg size
				var gParentItem = d3Selection.select(gParent.node()); // the svg

				var g = gParent.append("g").attr("class", "container");

				var yAxisMapping = {},
					maxStack = 1,
					minTime = 0,
					maxTime = 0;

				setWidth();

				// check if the user wants relative time
				// if so, substract the first timestamp from each subsequent timestamps
				if(timeIsRelative){
					g.each(function (d, i) {
						var originTime = 0;
						d.forEach(function (datum, index) {
							datum.times.forEach(function (time, j) {
								if(index === 0 && j === 0){
									originTime = time.starting_time;               //Store the timestamp that will serve as origin
									time.starting_time = 0;                        //Set tahe origin
									time.ending_time = time.ending_time - originTime;     //Store the relative time (millis)
								}else{
									time.starting_time = time.starting_time - originTime;
									time.ending_time = time.ending_time - originTime;
								}
							});
						});
					});

				}

				// check how many stacks we're gonna need
				// do this here so that we can draw the axis before the graph
				if (stacked || ending === 0 || beginning === 0) {
					g.each(function (d, i) {
						d.forEach(function (datum, index) {

							// create y mapping for stacked graph
							if (stacked && Object.keys(yAxisMapping).indexOf(index) == -1) {
								yAxisMapping[index] = maxStack;
								maxStack++;
							}

							// figure out beginning and ending times if they are unspecified
							datum.times.forEach(function (time, i) {
								if(beginning === 0)
									if (time.starting_time < minTime || (minTime === 0 && timeIsRelative === false))
										minTime = time.starting_time;
								if(ending === 0)
									if (time.ending_time > maxTime)
										maxTime = time.ending_time;
							});
						});
					});

					if (ending === 0) {
						ending = maxTime;
					}
					if (beginning === 0) {
						beginning = minTime;
					}
				}

				var scaleFactor = (1/(ending - beginning)) * (width - margin.left - margin.right);

				function formatDays(d) {
						var days = Math.floor(d / 86400),
								hours = Math.floor((d - (days * 86400)) / 3600),
								minutes = Math.floor((d - (days * 86400) - (hours * 3600)) / 60),
								seconds = d - (days * 86400) - (hours * 3600) - (minutes * 60);
						var output = '';
						if (seconds) {
							output = seconds + 's';
						}
						if (minutes) {
								output = minutes + 'm ' + output;
						}
						if (hours) {
								output = hours + 'h ' + output;
						}
						if (days) {
								output = days + 'd ' + output;
						}
						return output;
				};

				if (orient == "bottom") {
					xAxis = d3Axis.axisBottom();
				} else if (orient == "top") {
					xAxis = d3Axis.axisTop();
				}
				if (timeIsLinear) {
					xScale = d3Scale.scaleLinear()
						.domain([beginning, ending])
						.range([margin.left, width - margin.right]);

					xAxis.scale(xScale)
						.tickFormat(formatDays)
						.tickValues(d3Array.range(0, ending, 86400));
				} else {
						xScale = d3Scale.scaleTime()
							.domain([beginning, ending])
							.range([margin.left, width - margin.right]);

						xAxis.scale(xScale)
							.tickFormat(tickFormat.format)
							.tickSize(tickFormat.tickSize);
				}

				if (tickFormat.tickValues !== null) {
					xAxis.tickValues(tickFormat.tickValues);
				} else {
					xAxis.tickArguments(tickFormat.numTicks || [tickFormat.tickTime, tickFormat.tickInterval]);
				}

				// append a view for zoom/pan support
				var view = g.append("g")
					.attr("class", "view");

				// draw the chart
				g.each(function(d, i) {
					chartData = d;
					d.forEach( function(datum, index){
						var data = datum.times;
						data.forEach(function(d) { d.name = datum.name });

						var hasLabel = (typeof(datum.label) != "undefined");

						// issue warning about using id per data set. Ids should be individual to data elements
						if (typeof(datum.id) != "undefined") {
							console.warn("d3Timeline Warning: Ids per dataset is deprecated in favor of a 'class' key. Ids are now per data element.");
						}

						if (backgroundColor) { appendBackgroundBar(yAxisMapping, index, g, data, datum); }

						view.selectAll("svg")
							.data(data).enter()
							.append(function(d, i) {
										return document.createElementNS(d3Selection.namespaces.svg, "display" in d? d.display:display);
							})
							.attr("x", getXPos)
							.attr("y", getStackPosition)
							.attr("width", function (d, i) {
								return (d.ending_time - d.starting_time) * scaleFactor;
							})
							.attr("cy", function(d, i) {
									return getStackPosition(d, i) + itemHeight/2;
							})
							.attr("cx", getXPos)
							.attr("r", itemHeight / 2)
							.attr("height", itemHeight)
							.style("fill", function(d, i){
								var dColorPropName;
								if (d.color) return d.color;
								if( colorPropertyName ){
									dColorPropName = d[colorPropertyName];
									if ( dColorPropName ) {
										return colorCycle( dColorPropName );
									} else {
										return colorCycle( datum[colorPropertyName] );
									}
								}
								return colorCycle(index);
							})
							.on("mousemove", function (d, i) {
								hover(d, index, datum, i);
							})
							.on("mouseover", function (d, i) {
								mouseover(d, i, datum, i);
							})
							.on("mouseout", function (d, i) {
								mouseout(d, i, datum, i);
							})
							.on("click", function (d, i) {
								var point = d3Selection.mouse(this);
								var selectedRect = d3Selection.select(this).node();
								var selectorLabel = "text#" + selectedRect.id + '.textnumbers';
								var selectedLabel = d3Selection.select(selectorLabel).node();
								click(d, index, datum, selectedLabel, selectedRect, xScale.invert(point[0]));
							})
							.attr("class", function (d, i) {
								return datum.class ? "timelineSeries_"+datum.class : "timelineSeries_"+index;
							})
							.attr("id", function(d, i) {
								// use deprecated id field
								if (datum.id && !d.id) {
									return 'timelineItem_'+datum.id;
								}

								return d.id ? d.id : "timelineItem_"+index+"_"+i;
							})
						;

						// appends the labels to the boxes - DAY/HOUR LABEL
						view.selectAll("svg")
							.data(data).enter()
							.append("text")
							.attr("class", "textlabels")
							.attr("id", function(d) { return d.id })
							.attr("x", function(d, i) { return getXTextPos(d, i, d.label, '.textlabels')})
							.attr("y", (getStackTextPosition() - labelFloat))
							.text(function(d) {
								return d.label;
							})
							.on("click", function(d, i){
								// when clicking on the label, call the click for the rectangle with the same id
								var point = d3Selection.mouse(this);
								var id = this.id;
								var labelSelector = "text#" + id + ".textnumbers";
								var selectedLabel = d3Selection.select(labelSelector).node();
								var selector = "rect#" + id;
								var selectedRect = d3Selection.select(selector).node();
								click(d, index, datum, selectedLabel, selectedRect, xScale.invert(point[0]));
							})
						;

						// appends the NUMBER LABEL
						view.selectAll("svg").data(data).enter()
							.filter(function(d) { return d.labelNumber !== undefined; })
							.append("text")
							.attr("class", "textnumbers")
							.attr("id", function(d) { return d.id })
							.attr("x", function(d, i) { return getXTextPos(d, i, d.labelNumber, '.textnumbers')})
							.attr("y", getStackTextPosition)
							.text(function(d) {
								return d.labelNumber;
							})
							.on("click", function(d, i){
								// when clicking on the label, call the click for the rectangle with the same id
								var point = d3Selection.mouse(this);
								var id = this.id;
								var selectedLabel = d3Selection.select(this).node();
								var selector = "rect#" + id;
								var selectedRect = d3Selection.select(selector).node();
								click(d, index, datum, selectedLabel, selectedRect, xScale.invert(point[0]));
							})
						;

						if (rowSeparatorsColor) {
							var lineYAxis = ( itemHeight + itemMargin / 2 + margin.top + (itemHeight + itemMargin) * yAxisMapping[index]);
							gParent.append("svg:line")
								.attr("class", "row-separator")
								.attr("x1", 0 + margin.left)
								.attr("x2", width - margin.right)
								.attr("y1", lineYAxis)
								.attr("y2", lineYAxis)
								.attr("stroke-width", 1)
								.attr("stroke", rowSeparatorsColor);
						}

						// add the label
						if (hasLabel) { appendLabel(gParent, yAxisMapping, index, hasLabel, datum); }

						if (typeof(datum.icon) !== "undefined") {
							gParent.append("image")
								.attr("class", "timeline-label")
								.attr("transform", "translate("+ 0 +","+ (margin.top + (itemHeight + itemMargin) * yAxisMapping[index])+")")
								.attr("xlink:href", datum.icon)
								.attr("width", margin.left)
								.attr("height", itemHeight);
						}

						function getStackPosition(d, i) {
							if (stacked) {
								return margin.top + (itemHeight + itemMargin) * yAxisMapping[index];
							}
							return margin.top;
						}
						function getStackTextPosition(d, i) {
							if (stacked) {
								return margin.top + (itemHeight + itemMargin) * yAxisMapping[index] + itemHeight * 0.75;
							}
							return margin.top + itemHeight * 0.75;
						}
					});
				});

				var belowLastItem = (margin.top + (itemHeight + itemMargin) * maxStack);
				var aboveFirstItem = margin.top;
				var timeAxisYPosition = showAxisTop ? aboveFirstItem : belowLastItem;
				var gX;
				if (showTimeAxis) { gX = appendTimeAxis(g, xAxis, timeAxisYPosition); }
				if (timeAxisTick) { appendTimeAxisTick(g, xAxis, maxStack); }

				if (width > gParentSize.width) { // only if the scrolling should be allowed
					var move = function() {
						g.select(".view")
						.attr("transform", "translate(" + d3Selection.event.transform.x + ",0)"
															 + "scale(" + d3Selection.event.transform.k + " 1)");

						g.selectAll(".timeline-xAxis")
							.attr("transform", function(d) {
								 return "translate(" + d3Selection.event.transform.x + ", " + timeAxisYPosition + ")"
											+ "scale(" + d3Selection.event.transform.k + " 1)";
							});

						var new_xScale = d3Selection.event.transform.rescaleX(xScale);
						g.selectAll('.timeline-xAxis').call(function(d) { xAxis.scale(new_xScale); });

						var xpos = -d3Selection.event.transform.x;
						scroll(xpos, xScale);
					};
				};

				if (! allowZoom) {
					var zoom = d3Zoom.zoom()
						.scaleExtent([0, maxZoom]) // max zoom defaults to 5
						.translateExtent([[0, 0], [width, 0]]) // [x0, y0], [x1, y1] don't allow translating y-axis
						.on("zoom", move);

					gParent.classed("scrollable", true)
						.call(zoom);
					
					g.on("wheel", function() {
						d3Selection.event.preventDefault();
						d3Selection.event.stopImmediatePropagation();
					});
					g.on("dblclick.zoom", function() {
						d3Selection.event.preventDefault();
						d3Selection.event.stopImmediatePropagation();
					});
				}

				if (rotateTicks) {
					g.selectAll(".tick text")
						.attr("transform", function(d) {
							return "rotate(" + rotateTicks + ")translate("
															 + (this.getBBox().width / 2 + 10) + "," // TODO: change this 10
															 + this.getBBox().height / 2 + ")";
						});
				}

				// use the size of the elements added to the timeline to set the height
				//var gSize = g._groups[0][0].getBoundingClientRect();
				var gSize = g.node().getBoundingClientRect();
				setHeight();

				if (showBorderLine) {
					g.each(function (d, i) {
						d.forEach(function (datum) {
							var times = datum.times;
							times.forEach(function (time) {
								appendLine(xScale(time.starting_time), showBorderFormat, showBorderLineClass);
								appendLine(xScale(time.ending_time), showBorderFormat, showBorderLineClass);
							});
						});
					});
				}

				if (showTodayLine) {
					var todayLine = xScale(new Date());
					appendLine(todayLine, showTodayFormat);
				}

				function getXPos(d, i) {
					return margin.left + (d.starting_time - beginning) * scaleFactor;
				}

				function getTextWidth(text, font) {
						// re-use canvas object for better performance
						var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
						var context = canvas.getContext("2d");
						context.font = font;
						var metrics = context.measureText(text);
						return metrics.width;
				}

				function getXTextPos(d, i, text, style) {
					var width = 0;
					if (d.ending_time) {
						width = (((d.ending_time - d.starting_time) / 2) * scaleFactor);
					}
					if (text && style) {
						// get the style data for the class selector pass in
						var textl = getComputedStyle(document.querySelector(style));
						// create a fontsize fontfamily string - 12pt Graphik
						var fontInfo = textl.fontSize + ' ' + textl.fontFamily;
						// calculate the width of the text in that fontsize
						var tl = getTextWidth(text, fontInfo);
						// subtract half of the text length from the xPosition to keep the text centered
						var textLength = tl / 2;
						var xPosition = margin.left + ((d.starting_time - beginning) * scaleFactor) + width - textLength;
						return xPosition;
					} else {
						return margin.left + (d.starting_time - beginning) * scaleFactor + 5;
					}
				}

				function setHeight() {
					if (!height && !gParentSize.height) {
						if (itemHeight) {
							// set height based off of item height
							height = gSize.height + gSize.top - gParentSize.top;
							// set bounding rectangle height
							d3Selection.select(gParent).node().attr("height", height);
							//select(view).node().attr("height", height);
						} else {
							throw "height of the timeline is not set";
						}
					} else {
						if (!height) {
							height = gParentSize.height;
						} else {
							gParentItem.node().attr("height", height);
							//view.node().attr("height", height);
						}
					}
				}

				function setWidth() {
					if (!width && !gParentSize.width) {
						try {
							width = gParentItem.node().attr("width");
							if (!width) {
								throw "width of the timeline is not set. As of Firefox 27, timeline().with(x) needs to be explicitly set in order to render";
							}
						} catch (err) {
							console.log( err );
						}
					} else if (!width && gParentSize.width) {
						try {
							width = gParentSize.width;
						} catch (err) {
							console.log( err );
						}
					}
					// if both are set, do nothing
				}

				function appendLine(lineScale, lineFormat, lineClass) {
					lineClass = lineClass || "timeline-line";
					view.append("svg:line")
						.attr("x1", lineScale)
						.attr("y1", lineFormat.marginTop)
						.attr("x2", lineScale)
						.attr("y2", height - lineFormat.marginBottom)
						.attr("class", lineClass)
						.style("stroke", lineFormat.color)//"rgb(6,120,155)"
						.style("stroke-width", lineFormat.width);
				}

			}

			// SETTINGS

			timelines.margin = function (p) {
				if (!arguments.length) return margin;
				margin = p;
				return timelines;
			};

			timelines.orient = function (orientation) {
				if (!arguments.length) return orient;
				orient = orientation;
				return timelines;
			};

			timelines.itemHeight = function (h) {
				if (!arguments.length) return itemHeight;
				itemHeight = h;
				return timelines;
			};

			timelines.itemMargin = function (h) {
				if (!arguments.length) return itemMargin;
				itemMargin = h;
				return timelines;
			};

			timelines.navMargin = function (h) {
				if (!arguments.length) return navMargin;
				navMargin = h;
				return timelines;
			};

			timelines.height = function (h) {
				if (!arguments.length) return height;
				height = h;
				return timelines;
			};

			timelines.width = function (w) {
				if (!arguments.length) return width;
				width = w;
				return timelines;
			};

			timelines.display = function (displayType) {
				if (!arguments.length || (DISPLAY_TYPES.indexOf(displayType) == -1)) return display;
				display = displayType;
				return timelines;
			};

			timelines.labelFormat = function(f) {
				if (!arguments.length) return labelFunction;
				labelFunction = f;
				return timelines;
			};

			timelines.tickFormat = function (format) {
				if (!arguments.length) return tickFormat;
				tickFormat = format;
				return timelines;
			};

			timelines.allowZoom = function (zoomSetting) {
				if (!arguments.length) return allowZoom;
				allowZoom = zoomSetting;
				return timelines;
			};

			timelines.maxZoom = function (max) {
				if (!arguments.length) return maxZoom;
				maxZoom = max;
				return timelines;
			};

			timelines.hover = function (hoverFunc) {
				if (!arguments.length) return hover;
				hover = hoverFunc;
				return timelines;
			};

			timelines.mouseover = function (mouseoverFunc) {
				if (!arguments.length) return mouseover;
				mouseover = mouseoverFunc;
				return timelines;
			};

			timelines.mouseout = function (mouseoutFunc) {
				if (!arguments.length) return mouseout;
				mouseout = mouseoutFunc;
				return timelines;
			};

			timelines.click = function (clickFunc) {
				if (!arguments.length) return click;
				click = clickFunc;
				return timelines;
			};

			timelines.scroll = function (scrollFunc) {
				if (!arguments.length) return scroll;
				scroll = scrollFunc;
				return timelines;
			};

			timelines.colors = function (colorFormat) {
				if (!arguments.length) return colorCycle;
				colorCycle = colorFormat;
				return timelines;
			};

			timelines.beginning = function (b) {
				if (!arguments.length) return beginning;
				beginning = b;
				return timelines;
			};

			timelines.ending = function (e) {
				if (!arguments.length) return ending;
				ending = e;
				return timelines;
			};

			timelines.labelMargin = function (m) {
				if (!arguments.length) return labelMargin;
				labelMargin = m;
				return timelines;
			};

			timelines.labelFloat = function (f) {
				if (!arguments.length) return labelFloat;
				labelFloat = f;
				return timelines;
			};

			timelines.rotateTicks = function (degrees) {
				if (!arguments.length) return rotateTicks;
				rotateTicks = degrees;
				return timelines;
			};

			timelines.stack = function () {
				stacked = !stacked;
				return timelines;
			};

			timelines.relativeTime = function() {
				timeIsRelative = !timeIsRelative;
				return timelines;
			};

			timelines.linearTime = function() {
				timeIsLinear = !timeIsLinear;
				return timelines;
			};

			timelines.showBorderLine = function () {
				showBorderLine = !showBorderLine;
				return timelines;
			};

			timelines.showBorderFormat = function(borderFormat) {
				if (!arguments.length) return showBorderFormat;
				showBorderFormat = borderFormat;
				return timelines;
			};

			// CSS class for the lines added by showBorder
			timelines.showBorderLineClass = function(borderClass) {
				if (!arguments.length) return showBorderLineClass;
				showBorderLineClass = borderClass;
				return timelines;
			};

			timelines.showToday = function () {
				showTodayLine = !showTodayLine;
				return timelines;
			};

			timelines.showTodayFormat = function(todayFormat) {
				if (!arguments.length) return showTodayFormat;
				showTodayFormat = todayFormat;
				return timelines;
			};

			timelines.colorProperty = function(colorProp) {
				if (!arguments.length) return colorPropertyName;
				colorPropertyName = colorProp;
				return timelines;
			};

			timelines.rowSeparators = function (color) {
				if (!arguments.length) return rowSeparatorsColor;
				rowSeparatorsColor = color;
				return timelines;

			};

			timelines.background = function (color) {
				if (!arguments.length) return backgroundColor;
				backgroundColor = color;
				return timelines;
			};

			timelines.showTimeAxis = function () {
				showTimeAxis = !showTimeAxis;
				return timelines;
			};

			timelines.showAxisTop = function () {
				showAxisTop = !showAxisTop;
				return timelines;
			};

			timelines.showAxisCalendarYear = function () {
				showAxisCalendarYear = !showAxisCalendarYear;
				return timelines;
			};

			timelines.showTimeAxisTick = function () {
				timeAxisTick = !timeAxisTick;
				return timelines;
			};

			timelines.fullLengthBackgrounds = function () {
				fullLengthBackgrounds = !fullLengthBackgrounds;
				return timelines;
			};

			timelines.showTimeAxisTickFormat = function(format) {
				if (!arguments.length) return timeAxisTickFormat;
				timeAxisTickFormat = format;
				return timelines;
			};

			timelines.showAxisHeaderBackground = function(bgColor) {
				showAxisHeaderBackground = !showAxisHeaderBackground;
				if(bgColor) { (axisBgColor = bgColor); }
				return timelines;
			};

			// CSS class for the x-axis
			timelines.xAxisClass = function (axisClass) {
				if (!arguments.length) return xAxisClass;
				xAxisClass = axisClass;
				return timelines;
			};

			timelines.navigate = function (navigateBackwards, navigateForwards) {
				if (!arguments.length) return [navigateLeft, navigateRight];
				navigateLeft = navigateBackwards;
				navigateRight = navigateForwards;
				showAxisNav = !showAxisNav;
				return timelines;
			};

			timelines.version = function() {
				return "1.0.0";
			};

			return timelines;
	};

	exports.timelines = timelines;

	Object.defineProperty(exports, '__esModule', { value: true });

}));