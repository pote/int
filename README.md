# int - (some) internationalization.

This is a minimal in-browser internationalization solution: if you are doing a static page this might be what you need to support multiple languages, although it can easily be used in more complex setups.


# Usage

## Require and initialization

Since it will govern what text to display it's a good idea to require `int` as soon as possible, I recommend doing it in your `<head>` element.

```html
<script type="text/javascript" src="js/int.js"></script>
```

Right after that, you'll want to initialize it:

```html
<script>
  int = new Int({
    default_locale: 'en',
    available_locales: ['en', 'es']
  });
</script>
```

## Markup

You'll need to use the `lang` attribute in all elements you want to internationalize, like so:

```html
<p lang="en">
  A long time ago in a galaxy far, far away...
</p>

<p lang="es">
  Hace mucho tiempo en una galaxia muy, muy lejana...
</p>
```

In the above markup, only the element with the `lang` attribute matching the current `int.locale` will be displayed.

## Switching languages

You can toggle available locales easily:

```javascript
int.toggle('es');
```

`#toggle` saves the locale you're selecting to `localStorage`, so the appropriate language will be loaded on page reloads.


If you want to, you can attempt to load the user's desired language as well.

```JavaScript
int.toggle(navigator.language);
```

`#toggle` will simply ignore locales not present in `available_locales`.


## Language Picker

So you can create a language picker of your choice just as easily:

```html
<a href="#" onclick="int.toggle('en')">English</a>
<a href="#" onclick="int.toggle('es')">Español</a>
```

## Detect user's language

The `detect` option is set to `false` by default, but if enabled, it will attempt to toggle the user's browser `navigator.language` automatically on load, unless that user has explicitly toggled a preferred language before.

```html
<script>
  int = new Int({
    default_locale: 'en',
    available_locales: ['en', 'es'],
    detect: true
  });
</script>
```

## Strict mode vs lax matching

When using `detect: true` you might not want to make a difference between, say, `en-US` and `en-UK`, as that would mean writing a ton of repetitive language elements.

However, if you set the `strict` option to `false` in the constructor then Int will only pay attention to the first two characters of the user's preferred language, so any `en-*` in `navigator.language` will match your `en` elements.

```html
<script>
  int = new Int({
    default_locale: 'en',
    available_locales: ['en', 'es'],
    detect: true,
    strict: false
  });
</script>
```

## Styling, right-to-left text, etc.

Int is a very tiny solution and doesn't include custom language display styles, however, by using the standard html `lang` property it gives you the ability to style individual languages easily. For example: if you want Arabic to be displayed with its proper right-to-left style, simply add this to your CSS:

```css
:lang(ar) {
  direction: rtl;
}
```

## That's it.

Int is (for now) an immature project, it is running in production in a few sites but you must keep in mind that the main usecase is simple static sites hosted in places like github pages:

It might not be your cup-of-tea, it might not solve your use case, that's okay: `Int` won't attempt to solve internationalization for everyone, instead it will attempt to solve it elegantly for some people, there are plenty of other solutions out there already :).
