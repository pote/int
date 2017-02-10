Int = function Int(vars) {
    // `vars` is a hash with the following keys:
    //
    // `locale` starting locale for site.
    //
    // `available_locales` (required) list of locales for which the page
    // has support.
    //
    this.available_locales = vars.available_locales;
    this.locale = vars.locale;

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
          text = text + ":lang(" + this.available_locales[i] + ") { display: none !important}\n";
        }
      }

      return text;
    },

    toggle: function(locale) {
      if (this.locale != locale) {
        this.locale = locale;
        this.styles.innerHTML = this.css_for(this.locale);
      }
    }
}
