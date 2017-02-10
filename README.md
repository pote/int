# int - tiny internationalization.

This is a minimal in-browser internationalization solution: if you are doing a static page this might be what you need to support multiple languages, if you simply dislike yaml files and more complicated solutions feel free to try it, but keep in mind this is a 40~ LOC solution.


## Usage


### Require and initialization

Since it will govern what text to display it's a good idea to require `int` as soon as possible, I recommend doing it in your `<head>` element.

```html
<script type="text/javascript" src="js/int.js"></script>
```

Right after that, you'll want to initialize it:

```html
<script>
  int = new Int({
    locale: 'en',
    available_locales: ['en', 'es', 'it', 'de']
  });
</script>
```

### Markup

You'll need to use the `lang` attribute in all elements you want to internationalize, like so:

```html
<p lang="en">
  A long time ago in a galaxy far, far away...
</p>

<p lang="en">
  Hace mucho tiempo en una galaxia muy, muy lejana...
</p>
```

In the above markup, only the element with the `lang` attribute matching the current `int.locale` will be displayed.

### Switching languages

You can toggle available locales easily:

```javascript
int.toggle('es');
```

