# Témák

## `basic-idea.css` — a korábbi (sötét, screenshot-alapú) design

Ez a launcher **előző** kinézete, változtatás nélkül elmentve: sötét fém panelek,
vörös perem, keskeny hero, kép-alapú háttér (`assets/bg.png`, ha van).

## Aktív téma

A launcher jelenleg a **workshop** témát használja: `styles.css` a gyökérben
(rusztikus műhelyasztal, fa és rozsdás fém, sablonfestett feliratok).

## Visszaváltás a basic designra

Az `index.html`-ben cseréld ki ezt a sort:

```html
<link rel="stylesheet" href="styles.css" />
```

erre:

```html
<link rel="stylesheet" href="themes/basic-idea.css" />
```

A `basic-idea.css` önálló (nem importál semmit), a HTML szerkezet ugyanaz,
ezért a JS működése nem változik.
