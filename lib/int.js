var Int = function Int(vars) {
    // `vars` is a hash with the following keys:
    //
    // * (required) `default_locale`    - starting locale for site when no
    //                                    preference is saved in localStorage.
    //
    // * (required) `available_locales` - list of locales for which the page
    //                                    has support.
    //
    // * (default: false) `detect`      - when true Int attempts to toggle the user's preferred language on load.
    //
    // * (default: true) `strict`       - match exact locales on toggle, this can be changed to `false` if
    //                                    you would want `en` locale toggles to match any variant such as `en-US`,
    //                                    `en-CA` and so on.
    //
    this.available_locales = vars.available_locales;
    this.detect = vars.detect || false;
    if (vars.strict == undefined) { this.strict = true } else { this.strict = vars.strict };

    var preferred_locale = localStorage.getItem('int:locale');
    this.locale = preferred_locale || vars.default_locale;

    this.styles = document.createElement('style');
    this.styles.type = 'text/css';
    this.styles.id = 'int';

    this.styles.innerHTML = this.css_for(this.locale);

    var head = document.getElementsByTagName('head')[0];
    head.appendChild(this.styles);

    if (this.detect && !preferred_locale) { this.toggle(navigator.language); }
};

Int.prototype = {
    constructor: Int,

    css_for: function(activeLocale) {
        var noDisplayRule = function (locale) {
            return ':lang(' + locale + ') { display: none !important }';
        };

        var inactiveLocales = function (locale) {
            return locale != activeLocale;
        };

        return this.available_locales.filter(inactiveLocales).map(noDisplayRule).join('\n');
    },

    toggle: function(locale) {
        if (!this.strict) { locale = locale.substring(0, 2); }

        if (this.locale != locale && this.available_locales.includes(locale)) {
            this.locale = locale;
            localStorage.setItem('int:locale', this.locale);
            this.styles.innerHTML = this.css_for(this.locale);
        }
    }
};
