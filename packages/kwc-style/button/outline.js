import { html } from '../template.js';

export const outline = html`
<style>
    .btn.outline,
    .btn.outline:hover,
    .btn.outline:focus {
        background-color: transparent;
        border-style: solid;
        border-width: 1px;
    }
    .btn.outline.primary {
        border-color: var(--color-kano-orange);
        color: var(--color-kano-orange);
    }
    .btn.outline.primary:hover,
    .btn.outline.primary:focus {
        border-color: var(--color-flame);
        color: var(--color-flame);
    }
    .btn.outline.secondary {
        border-color: var(--color-grassland);
        color: var(--color-grassland);
    }
    .btn.outline.secondary:hover,
    .btn.outline.secondary:focus {
        border-color: var(--color-apple);
        color: var(--color-apple);
    }
    .btn.outline.tertiary {
        border-color: var(--color-grey);
        color: var(--color-grey);
    }
    .btn.outline.tertiary:hover,
    .btn.outline.tertiary:focus {
        border-color: var(--color-chateau);
        color: var(--color-chateau);
    }
    .btn.outline.warning {
        border-color: var(--color-cinnabar);
        color: var(--color-cinnabar);
    }
    .btn.outline.warning:hover,
    .btn.outline.warning:focus {
        border-color: var(--color-flamingo);
        color: var(--color-flamingo);
    }
    .btn.outline.white {
        border-color: rgba(255, 255, 255, 1);
        color: rgba(255, 255, 255, 1);
    }
    .btn.outline.white:hover,
    .btn.outline.white:focus {
        border-color: rgba(255, 255, 255, 0.8);
        color: rgba(255, 255, 255, 0.8);
    }
    .btn.outline.black {
        border-color: var(--color-black);
        color: var(--color-black);
    }
    .btn.outline.black:hover,
    .btn.outline.black:focus {
        border-color: var(--color-abbey);
        color: var(--color-abbey);
    }
</style>
`;
