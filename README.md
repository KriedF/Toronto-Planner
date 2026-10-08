# 🍁 Toronto Trip Planner

This started as something personal — a friend was visiting me in Toronto and I wanted to help her figure out her trip without overwhelming her with a giant list of recommendations. I built her a small custom planner and realised it could be useful for anyone coming to the city, so I cleaned it up and open-sourced it.

A drag-and-drop itinerary builder for anyone visiting Toronto. Pick your arrival date, drag activities onto the 7-day schedule, and the built-in logic keeps your plan realistic.

Deployed as a static site — no backend, no dependencies. Works in any modern browser.

---

## How the logic works

Each activity has a type that controls where and how it can be placed:

| Type | Behaviour | Examples |
|------|-----------|---------|
| **Full day** | Fills the entire day (morning + afternoon + evening). Nothing else can be added that day. | Canada's Wonderland, Niagara Falls, Toronto Zoo |
| **Half day** | Takes one slot — morning or afternoon. The other half of the day stays free. | ROM, Casa Loma, High Park, Scarborough Bluffs |
| **Any time** | Can go in morning, afternoon, or evening. | Ripley's Aquarium, Distillery District |
| **Evening** | Evening slot only. Pairs freely with any daytime activity. | Dinner Out, Theatre/Show, Sports Game |

Additional rules baked in:

- **Theatre / Show** and **Sports Game** open up to afternoon slots on weekends (Sat/Sun), since matinees are common.
- Dropping an activity into a taken slot or the wrong time of day shows a red highlight and a toast message explaining why.
- The schedule auto-saves to `localStorage` — refreshing the page keeps your plan intact.
- The date picker in the header sets your arrival day; the grid auto-fills the correct weekday names and dates for all 7 days.

---

## Adding more activities

The activity list lives at the top of `app.js` in the `ACTIVITIES` object. To add a new one, copy any existing entry and adjust the fields:

```js
your_activity_id: {
  id: 'your_activity_id',
  name: 'Activity Name',
  emoji: '🎯',
  color: '#HEXCODE',   // text + border colour (medium tone)
  bg: '#HEXCODE',      // card background (light/pastel)
  type: 'half-day',    // full-day-exclusive | half-day | any-time | evening
  allowedSlots: ['morning', 'afternoon'],  // which slots it can go in
  weekendSlots: ['afternoon', 'evening'],  // optional: override slots on Sat/Sun
  duration: '2 hrs',   // shown on the card as a hint
  rule: 'Short description shown in the Legend panel'
},
```

That's it — no other files need changing. The activity will appear automatically in the sidebar and legend.

---

## Deploying on Render

1. Push this folder to a GitHub repo.
2. In Render → **New → Static Site** → connect the repo.
3. Leave the build command blank; set the publish directory to `.`
4. The included `render.yaml` handles this automatically if you use **Blueprint** deployment.

---

Open source and free to fork, adapt, and extend.
