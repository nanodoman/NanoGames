<style>
  :root {
    --color-primary: turquoise;
    --color-secondary: hotpink;
    --color-accent: blueviolet;
    --color-background: steelblue;
    --cell: 64px;
    --spread: 10px;

    --aspect: 1.1547; /* top-flat hex */
    --gap: calc(var(--cell) * 0.5 + var(--spread));
    --margin: calc(var(--cell) * -0.5 / var(--aspect) + var(--spread) / 2 / var(--aspect));
    --shadow-spread: calc(var(--cell) / 2);
  }

  h1, h2, h3 {
    color: cyan;
  }

  .cell {
    background-image: linear-gradient(to bottom right, var(--color-primary), var(--color-accent));
    aspect-ratio: var(--aspect);
    flex: 0 0 var(--cell);
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    pointer-events: all;
    /* scale: 0.9; */

    &:hover {
      --color-primary: var(--color-secondary);
    }
  }

  .bounding-box {
    outline: 1px dashed orange;
    /* z-index: 10; */

    &+&:nth-of-type(even) {
      outline-color: crimson;
    }
  }

  pros::before { color: limegreen; content: 'pros:'; }
  cons::before { color: crimson; content: 'cons:'; }
</style>

# Hex-grids

**Examining fev options to layout flat-top hexagonal tiles in a grid**

|            - | -   | -   | -   | -   |
| -----------: | --- | --- | --- | --- |
|    flex-rows | -   | -   | -   | -   |
| flex-columns | -   | -   | -   | -   |
|         grid | -   | -   | -   | -   |

## Flex

Elastic and forgiving.

<div style="display:flex;gap:1em;">
  <section style="flex:1 50%;">

### Flex-rows

> <pros>
>
> -

> <cons>
>
> - cant have empty spaces, only hidden tiles

<style>
  .flex-row {
    margin: auto;
    width: min-content;
    transform-origin: center;
    /* rotate: 90deg; */
    justify-items: center;

    &:hover .cell {
      filter: opacity(0.5);
    }
  }

  .row {
    gap: 0 var(--gap);
    display: flex;

    & ~ & {
      margin-top: var(--margin);
    }
  }
</style>

<div class="flex-row">
  <div class="row bounding-box">
    <div class="cell"></div>
  </div>
  <div class="row bounding-box">
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <div class="row bounding-box">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <div class="row bounding-box">
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <div class="row bounding-box">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <div class="row bounding-box">
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <div class="row bounding-box">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <div class="row bounding-box">
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <div class="row bounding-box">
    <div class="cell"></div>
  </div>
</div>

  </section><section style="flex:1 50%;">

### Flex-columns

> <pros>
>
> -

> <cons>
>
> -

<style>
  .flex-column {
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover .cell {
      filter: opacity(0.5);
    }
  }

  .column {
    display: flex;
    flex-direction: column;
    flex: 0 0 calc(var(--cell) * var(--aspect));
    pointer-events: none;

    & ~ & {
      margin-left: calc(var(--cell) * var(--aspect) / -4);
    }
  }
</style>

<div class="flex-column">
  <div class="column bounding-box">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <div class="column bounding-box">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <div class="column bounding-box">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <div class="column bounding-box">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
  <div class="column bounding-box">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
</div>

  </section>
</div>

## Grid

**Precise, can have elastic bounding box**

<div style="display:flex;gap:1em;">
  <section style="flex:1 50%;">

### Grid-template

<style>
  .legit-grid {
    --grid-size: 5;
    display: grid;
    width: min-content;
    margin: auto;
    grid-template-rows: repeat(calc(var(--grid-size) * 2), calc(var(--cell) / 2));
    grid-template-columns: repeat(calc(var(--grid-size) * 4), calc(var(--cell) * var(--aspect) / 4));

    .cell {
      grid-row-end: span 2;
      grid-column-end: span 4;
    }
  }
</style>

> <pros>
>
> -

> <cons>
>
> - static bounding box
> - strict calculations

<div class="legit-grid bounding-box">
  <div class="cell" style="grid-row-start:3;grid-column-start:3;"></div>
  <div class="cell" style="grid-row-start:5;grid-column-start:3;"></div>
  <div class="cell" style="grid-row-start:7;grid-column-start:3;"></div>
  <div class="cell" style="grid-row-start:2;grid-column-start:6;"></div>
  <div class="cell" style="grid-row-start:4;grid-column-start:6;"></div>
  <div class="cell" style="grid-row-start:6;grid-column-start:6;"></div>
  <div class="cell" style="grid-row-start:8;grid-column-start:6;"></div>
  <div class="cell" style="grid-row-start:1;grid-column-start:9;"></div>
  <div class="cell" style="grid-row-start:3;grid-column-start:9;"></div>
  <div class="cell" style="grid-row-start:5;grid-column-start:9;"></div>
  <div class="cell" style="grid-row-start:7;grid-column-start:9;"></div>
  <div class="cell" style="grid-row-start:9;grid-column-start:9;"></div>
  <div class="cell" style="grid-row-start:2;grid-column-start:12;"></div>
  <div class="cell" style="grid-row-start:4;grid-column-start:12;"></div>
  <div class="cell" style="grid-row-start:6;grid-column-start:12;"></div>
  <div class="cell" style="grid-row-start:8;grid-column-start:12;"></div>
  <div class="cell" style="grid-row-start:3;grid-column-start:15;"></div>
  <div class="cell" style="grid-row-start:5;grid-column-start:15;"></div>
  <div class="cell" style="grid-row-start:7;grid-column-start:15;"></div>
</div>

  </section><section style="flex:1 50%;">

### Grid auto

<style>
  .legit-grid-auto {
    display: grid;

    .cell {
      grid-row-end: span 2;
      grid-column-end: span 4;
    }
  }
</style>

> <pros>
>
> - tiles can be absent without breaking the grid

> <cons>
>
> -

<div class="legit-grid-auto bounding-box">
  <div class="cell" style="grid-row-start:3;grid-column-start:1;"></div>
  <div class="cell" style="grid-row-start:5;grid-column-start:1;"></div>
  <div class="cell" style="grid-row-start:7;grid-column-start:1;"></div>
  <div class="cell" style="grid-row-start:2;grid-column-start:4;"></div>
  <div class="cell" style="grid-row-start:4;grid-column-start:4;"></div>
  <div class="cell" style="grid-row-start:6;grid-column-start:4;"></div>
  <div class="cell" style="grid-row-start:8;grid-column-start:4;"></div>
  <div class="cell" style="grid-row-start:1;grid-column-start:7;"></div>
  <div class="cell" style="grid-row-start:3;grid-column-start:7;"></div>
  <div class="cell" style="grid-row-start:5;grid-column-start:7;"></div>
  <div class="cell" style="grid-row-start:7;grid-column-start:7;"></div>
  <div class="cell" style="grid-row-start:9;grid-column-start:7;"></div>
  <div class="cell" style="grid-row-start:2;grid-column-start:10;"></div>
  <div class="cell" style="grid-row-start:4;grid-column-start:10;"></div>
  <div class="cell" style="grid-row-start:6;grid-column-start:10;"></div>
  <div class="cell" style="grid-row-start:8;grid-column-start:10;"></div>
  <div class="cell" style="grid-row-start:3;grid-column-start:13;"></div>
  <div class="cell" style="grid-row-start:5;grid-column-start:13;"></div>
  <div class="cell" style="grid-row-start:7;grid-column-start:13;"></div>
</div>

  </section>
</div>
