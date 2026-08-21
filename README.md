# 90 — THE RESET

A local, dependency-free website recreating the visual direction of the supplied reference screenshots.

## Run
Open `index.html` directly, or use:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Included pages
- Landing / sales-style page
- Daily "Eight things" experience
- 90-day overview
- Targets section
- "Lock it in. Then sleep." finalisation state
- Dashboard
- 90-day plan
- Progress
- Daily mood + reflection
- Local browser persistence

## Where to put your real plan
Edit `app.js`:
- `things` = your 8 daily actions
- `quotes` = your daily messages
- `phase()` and `plan()` = your phase content
- target section = your nutrition / goal numbers

The supplied screenshots were used as the visual reference; the implementation is original and does not copy the source site's text or code.
