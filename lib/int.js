var Int = function Int(vars) {
    // `vars` is a hash with the following keys:
    //
    // * (required) `default_locale`    - starting locale for site when no
    //                                    preference is saved in localStorage.
    //
    // * (required) `available_locales` - list of locales for which the page
    //                                    has support.
    //
    this.available_locales = vars.available_locales;
    this.locale = localStorage.getItem('int:locale') || vars.default_locale;

    this.styles = document.createElement('style');
    this.styles.type = 'text/css';
    this.styles.id = 'int';

    this.styles.innerHTML = this.css_for(this.locale);

    var head = document.getElementsByTagName('head')[0];
    head.appendChild(this.styles);
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
        if (this.locale != locale) {
            this.locale = locale;
            localStorage.setItem('int:locale', this.locale);
            this.styles.innerHTML = this.css_for(this.locale);
        }
    }
};
