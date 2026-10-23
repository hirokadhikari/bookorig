# Bookorig

A PDF book reader for your phone. You get one page at a time, no scrolling, and the page curls over when you turn it.

It runs in the browser and installs like an app. Your books stay on your phone and never get uploaded anywhere.

Open it at https://hirokadhikari.github.io/bookorig/

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/shelf.png" width="200" alt="Bookshelf with four books"><br>The shelf</td>
    <td align="center"><img src="docs/screenshots/reader.png" width="200" alt="A reflowed page in sepia"><br>Reading</td>
    <td align="center"><img src="docs/screenshots/page-curl.png" width="200" alt="Page curling mid-turn"><br>Page curl</td>
    <td align="center"><img src="docs/screenshots/book-card.png" width="200" alt="Book card with read, rename and remove"><br>Book card</td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/line-guide.png" width="200" alt="Spotlight line guide in dark mode"><br>Spotlight line guide</td>
    <td align="center"><img src="docs/screenshots/tint-and-bold.png" width="200" alt="Line tint with bold word starts"><br>Line tint and bold starts</td>
    <td align="center"><img src="docs/screenshots/settings.png" width="200" alt="Display and focus settings"><br>Display &amp; focus</td>
    <td align="center"><img src="docs/screenshots/bookmarks.png" width="200" alt="Bookmarks list"><br>Bookmarks</td>
  </tr>
</table>

## Getting it on your phone

1. Open the link in Chrome on Android.
2. Tap Install on the shelf, or Chrome menu ⋮ > Add to Home screen.
3. Tap + Add PDF. Later you can also share a PDF to Bookorig straight from Files or WhatsApp.

Once it's installed it works offline.

## For eyes that wander off the line

If you lose your place mid-paragraph (ADHD or just a long day), these are the settings to try. They live under Display & focus, which you reach by tapping the middle of the page.

- Line guide puts a highlighted band on one line. Tap the band to move down a line. At the bottom of the page it turns the page for you and starts again at the top. Drag it to jump anywhere.
- Spotlight is the same band, but every other line fades back so only one line is really there.
- Line tint adds a faint stripe behind every other line, which makes it harder to drop onto the wrong one.
- Bold word starts bolds the first part of each word. Some people find it easier to follow and some can't stand it, so it's off by default.
- Line spacing has snug, normal and airy.
- There's no scrolling anywhere. A page fills the screen and stays put until you turn it.
- Bookmarks are one tap on the ribbon. They point at the passage rather than a page number, so they still land in the right spot after you change the font size.
- Every book reopens exactly where you stopped.

## Reading

Swipe, drag a corner, or tap the left or right edge to turn. Tap the middle for the menu and the page slider.

PDFs with real text get reflowed to fit your screen and font size. Scanned PDFs open as the original pages. For books that have text you can switch between the two whenever you like.

There are light, sepia and dark themes, serif or sans text, and a plain slide instead of the curl if your phone struggles with the animation.

## Things to know

Books are saved in Chrome's storage on that phone. They don't sync between devices, and clearing site data for this site deletes them, so keep the PDFs somewhere else as well.

Reflow is only as good as the text inside the PDF. Scans with rough OCR come out messy, especially contents and copyright pages. Switch that book to Original when it happens.

Sharing a PDF to Bookorig needs Android and the installed app.

## Running it yourself

It's plain static files with no build step.

```
python -m http.server 8000
```

Then open http://localhost:8000/. If you change anything, bump `VERSION` in `sw.js` so installed copies pick up the new files.

## Credits

PDF reading by [pdf.js](https://github.com/mozilla/pdf.js) and the page curl by [StPageFlip](https://github.com/Nodlik/StPageFlip). Fonts are Literata, Atkinson Hyperlegible, Caveat and Kalam. The sample book is the first chapter of Alice's Adventures in Wonderland (1865, public domain). Licenses are in `vendor/LICENSES.txt`.
