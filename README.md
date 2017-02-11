# int - (some) internationalization.

This is a minimal in-browser internationalization solution: if you are doing a static page this might be what you need to support multiple languages, if you simply dislike yaml files and more complicated solutions feel free to try it, but keep in mind this is a 40~ LOC, immature solution.


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
    available_locales: ['en', 'es']
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

So you can create a language picker of your choice just as easily:

```html
<a href="#" onclick="int.toggle('en')">English</a>
<a href="#" onclick="int.toggle('es')">Español</a>
```

## That's it.

Int is a toy project, while I intend to use and older versions of it are in production in a few sites you must keep in mind that the targeted usecase is simple static sites hosted in places like github pages.

It might not be your cup-of-tea, it might not solve your use case, that's okay: `Int` won't attempt to solve internationalization for everyone, instead it will attempt to solve it elegantly for some people, there are plenty of other solutions out there already :).
