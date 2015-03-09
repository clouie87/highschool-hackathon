/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2014 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A collection of methods useful for manipulating and comparing colors.
*
* @class Phaser.Color
*/
Phaser.Color = {

    /**
    * Given an alpha and 3 color values this will return an integer representation of it.
    *
    * @method Phaser.Color.getColor32
    * @static
    * @param {number} alpha - The Alpha value (between 0 and 255).
    * @param {number} red - The Red channel value (between 0 and 255).
    * @param {number} green - The Green channel value (between 0 and 255).
    * @param {number} blue - The Blue channel value (between 0 and 255).
    * @returns {number} A native color value integer (format: 0xAARRGGBB).
    */
    getColor32: function (alpha, red, green, blue) {
        return alpha << 24 | red << 16 | green << 8 | blue;
    },

    /**
    * Given 3 color values this will return an integer representation of it.
    *
    * @method Phaser.Color.getColor
    * @static
    * @param {number} red - The Red channel value (between 0 and 255).
    * @param {number} green - The Green channel value (between 0 and 255).
    * @param {number} blue - The Blue channel value (between 0 and 255).
    * @returns {number} A native color value integer (format: 0xRRGGBB).
    */
    getColor: function (red, green, blue) {
        return red << 16 | green << 8 | blue;
    },

    /**
    * Converts the given hex string into an integer color value.
    *
    * @method Phaser.Color.hexToRGB
    * @static
    * @param {string} h - The string hex color to convert.
    * @returns {number} The rgb color value.
    */
    hexToRGB: function (h) {

        var hex16 = (h.charAt(0) == "#") ? h.substring(1, 7) : h;

        if (hex16.length==3)
        {
            hex16 = hex16.charAt(0) + hex16.charAt(0) + hex16.charAt(1) + hex16.charAt(1) + hex16.charAt(2) + hex16.charAt(2);
        }

        var red = parseInt(hex16.substring(0, 2), 16);
        var green = parseInt(hex16.substring(2, 4), 16);
        var blue = parseInt(hex16.substring(4, 6), 16);

        return red << 16 | green << 8 | blue;
        
    },

    /**
    * Returns a string containing handy information about the given color including string hex value,
    * RGB format information and HSL information. Each section starts on a newline, 3 lines in total.
    *
    * @method Phaser.Color.getColorInfo
    * @static
    * @param {number} color - A color value in the format 0xAARRGGBB.
    * @returns {string} String containing the 3 lines of information.
    */
    getColorInfo: function (color) {

        var argb = Phaser.Color.getRGB(color);
        var hsl = Phaser.Color.RGBtoHSV(color);
        
        //  Hex format
        var result = Phaser.Color.RGBtoHexstring(color) + "\n";
        
        //  RGB format
        result = result.concat("Alpha: " + argb.alpha + " Red: " + argb.red + " Green: " + argb.green + " Blue: " + argb.blue) + "\n";
        
        //  HSL info
        result = result.concat("Hue: " + hsl.hue + " Saturation: " + hsl.saturation + " Lightnes: " + hsl.lightness);

        return result;

    },

    /**
    * Return a string representation of the color in the format 0xAARRGGBB.
    *
    * @method Phaser.Color.RGBtoHexstring
    * @static
    * @param {number} color - The color to get the string representation for
    * @returns {string} A string of length 10 characters in the format 0xAARRGGBB
    */
    RGBtoHexstring: function (color) {

        var argb = Phaser.Color.getRGB(color);

        return "0x" + Phaser.Color.colorToHexstring(argb.alpha) + Phaser.Color.colorToHexstring(argb.red) + Phaser.Color.colorToHexstring(argb.green) + Phaser.Color.colorToHexstring(argb.blue);

    },

    /**
    * Return a string representation of the color in the format #RRGGBB.
    *
    * @method Phaser.Color.RGBtoWebstring
    * @static
    * @param {number} color - The color to get the string representation for.
    * @returns {string} A string of length 10 characters in the format 0xAARRGGBB.
    */
    RGBtoWebstring: function (color) {

        var argb = Phaser.Color.getRGB(color);

        return "#" + Phaser.Color.colorToHexstring(argb.red) + Phaser.Color.colorToHexstring(argb.green) + Phaser.Color.colorToHexstring(argb.blue);

    },

    /**
    * Return a string containing a hex representation of the given color.
    *
    * @method Phaser.Color.colorToHexstring
    * @static
    * @param {number} color - The color channel to get the hex value for, must be a value between 0 and 255).
    * @returns {string} A string of length 2 characters, i.e. 255 = FF, 0 = 00.
    */
    colorToHexstring: function (color) {

        var digits = "0123456789ABCDEF";
        var lsd = color % 16;
        var msd = (color - lsd) / 16;
        var hexified = digits.charAt(msd) + digits.charAt(lsd);
        return hexified;

    },

    /**
    * Interpolates the two given colours based on the supplied step and currentStep properties.
    * @method Phaser.Color.interpolateColor
    * @static
    * @param {number} color1 - The first color value.
    * @param {number} color2 - The second color value.
    * @param {number} steps - The number of steps to run the interpolation over.
    * @param {number} currentStep - The currentStep value. If the interpolation will take 100 steps, a currentStep value of 50 would be half-way between the two.
    * @param {number} alpha - The alpha of the returned color.
    * @returns {number} The interpolated color value.
    */
    interpolateColor: function (color1, color2, steps, currentStep, alpha) {

        if (typeof alpha === "undefined") { alpha = 255; }

        var src1 = Phaser.Color.getRGB(color1);
        var src2 = Phaser.Color.getRGB(color2);
        var r = (((src2.red - src1.red) * currentStep) / steps) + src1.red;
        var g = (((src2.green - src1.green) * currentStep) / steps) + src1.green;
        var b = (((src2.blue - src1.blue) * currentStep) / steps) + src1.blue;

        return Phaser.Color.getColor32(alpha, r, g, b);

    },

    /**
    * Interpolates the two given colours based on the supplied step and currentStep properties.
    * @method Phaser.Color.interpolateColorWithRGB
    * @static
    * @param {number} color - The first color value.
    * @param {number} r - The red color value, between 0 and 0xFF (255).
    * @param {number} g - The green color value, between 0 and 0xFF (255).
    * @param {number} b - The blue color value, between 0 and 0xFF (255).
    * @param {number} steps - The number of steps to run the interpolation over.
    * @param {number} currentStep - The currentStep value. If the interpolation will take 100 steps, a currentStep value of 50 would be half-way between the two.
    * @returns {number} The interpolated color value.
    */
    interpolateColorWithRGB: function (color, r, g, b, steps, currentStep) {

        var src = Phaser.Color.getRGB(color);
        var or = (((r - src.red) * currentStep) / steps) + src.red;
        var og = (((g - src.green) * currentStep) / steps) + src.green;
        var ob = (((b - src.blue) * currentStep) / steps) + src.blue;

        return Phaser.Color.getColor(or, og, ob);

    },

    /**
    * Interpolates the two given colours based on the supplied step and currentStep properties.
    * @method Phaser.Color.interpolateRGB
    * @static
    * @param {number} r1 - The red color value, between 0 and 0xFF (255).
    * @param {number} g1 - The green color value, between 0 and 0xFF (255).
    * @param {number} b1 - The blue color value, between 0 and 0xFF (255).
    * @param {number} r2 - The red color value, between 0 and 0xFF (255).
    * @param {number} g2 - The green color value, between 0 and 0xFF (255).
    * @param {number} b2 - The blue color value, between 0 and 0xFF (255).
    * @param {number} steps - The number of steps to run the interpolation over.
    * @param {number} currentStep - The currentStep value. If the interpolation will take 100 steps, a currentStep value of 50 would be half-way between the two.
    * @returns {number} The interpolated color value.
    */
    interpolateRGB: function (r1, g1, b1, r2, g2, b2, steps, currentStep) {

        var r = (((r2 - r1) * currentStep) / steps) + r1;
        var g = (((g2 - g1) * currentStep) / steps) + g1;
        var b = (((b2 - b1) * currentStep) / steps) + b1;

        return Phaser.Color.getColor(r, g, b);

    },

    /**
    * Returns a random color value between black and white
    * Set the min value to start each channel from the given offset.
    * Set the max value to restrict the maximum color used per channel.
    *
    * @method Phaser.Color.getRandomColor
    * @static
    * @param {number} min - The lowest value to use for the color.
    * @param {number} max - The highest value to use for the color.
    * @param {number} alpha - The alpha value of the returning color (default 255 = fully opaque).
    * @returns {number} 32-bit color value with alpha.
    */
    getRandomColor: function (min, max, alpha) {

        if (typeof min === "undefined") { min = 0; }
        if (typeof max === "undefined") { max = 255; }
        if (typeof alpha === "undefined") { alpha = 255; }

        //  Sanity checks
        if (max > 255) {
            return Phaser.Color.getColor(255, 255, 255);
        }

        if (min > max) {
            return Phaser.Color.getColor(255, 255, 255);
        }

        var red = min + Math.round(Math.random() * (max - min));
        var green = min + Math.round(Math.random() * (max - min));
        var blue = min + Math.round(Math.random() * (max - min));

        return Phaser.Color.getColor32(alpha, red, green, blue);

    },

    /**
    * Return the component parts of a color as an Object with the properties alpha, red, green, blue
    *
    * Alpha will only be set if it exist in the given color (0xAARRGGBB)
    *
    * @method Phaser.Color.getRGB
    * @static
    * @param {number} color - Color in RGB (0xRRGGBB) or ARGB format (0xAARRGGBB).
    * @returns {object} An Object with properties: alpha, red, green, blue.
    */
    getRGB: function (color) {

        return {
            alpha: color >>> 24,
            red: color >> 16 & 0xFF,
            green: color >> 8 & 0xFF,
            blue: color & 0xFF
        };

    },

    /**
    * Returns a CSS friendly string value from the given color.
    * @method Phaser.Color.getWebRGB
    * @static
    * @param {number} color
    * @returns {string}A string in the format: 'rgba(r,g,b,a)'
    */
    getWebRGB: function (color) {

        var alpha = (color >>> 24) / 255;
        var red = color >> 16 & 0xFF;
        var green = color >> 8 & 0xFF;
        var blue = color & 0xFF;

        return 'rgba(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ',' + alpha.toString() + ')';
        
    },

    /**
    * Given a native color value (in the format 0xAARRGGBB) this will return the Alpha component, as a value between 0 and 255.
    *
    * @method Phaser.Color.getAlpha
    * @static
    * @param {number} color - In the format 0xAARRGGBB.
    * @returns {number} The Alpha component of the color, will be between 0 and 1 (0 being no Alpha (opaque), 1 full Alpha (transparent)).
    */
    getAlpha: function (color) {
        return color >>> 24;
    },

    /**
    * Given a native color value (in the format 0xAARRGGBB) this will return the Alpha component as a value between 0 and 1.
    *
    * @method Phaser.Color.getAlphaFloat
    * @static
    * @param {number} color - In the format 0xAARRGGBB.
    * @returns {number} The Alpha component of the color, will be between 0 and 1 (0 being no Alpha (opaque), 1 full Alpha (transparent)).
    */
    getAlphaFloat: function (color) {
        return (color >>> 24) / 255;
    },

    /**
    * Given a native color value (in the format 0xAARRGGBB) this will return the Red component, as a value between 0 and 255.
    *
    * @method Phaser.Color.getRed
    * @static
    * @param {number} color In the format 0xAARRGGBB.
    * @returns {number} The Red component of the color, will be between 0 and 255 (0 being no color, 255 full Red).
    */
    getRed: function (color) {
        return color >> 16 & 0xFF;
    },

    /**
    * Given a native color value (in the format 0xAARRGGBB) this will return the Green component, as a value between 0 and 255.
    *
    * @method Phaser.Color.getGreen
    * @static
    * @param {number} color - In the format 0xAARRGGBB.
    * @returns {number} The Green component of the color, will be between 0 and 255 (0 being no color, 255 full Green).
    */
    getGreen: function (color) {
        return color >> 8 & 0xFF;
    },

    /**
    * Given a native color value (in the format 0xAARRGGBB) this will return the Blue component, as a value between 0 and 255.
    *
    * @method Phaser.Color.getBlue
    * @static
    * @param {number} color - In the format 0xAARRGGBB.
    * @returns {number} The Blue component of the color, will be between 0 and 255 (0 being no color, 255 full Blue).
    */
    getBlue: function (color) {
        return color & 0xFF;
    }
    
};
