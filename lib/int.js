Int = function Int(vars) {
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
}

Int.prototype = {
    constructor: Int,

    css_for: function(locale) {
        var text = "";

        for (i in this.available_locales) {
            if (this.available_locales[i] != locale) {
              text = text
                + ":lang("
                + this.available_locales[i]
                + ") { display: none !important}\n";
            }
        }

        return text;
    },

    toggle: function(locale) {
      if (this.locale != locale) {
        this.locale = locale;
        localStorage.setItem('int:locale' this.locale);
        this.styles.innerHTML = this.css_for(this.locale);
      }
    }
}
