import { html } from '../template.js';

export const transparent = html`
<style>
    .btn.transparent,
    .btn.transparent:hover {
        background: transparent;
    }
    .btn.transparent.outline,
    .btn.transparent.outline:hover {
        border-color: transparent;
    }
    .btn.transparent.primary {
        color: var(--color-kano-orange);
    }
    .btn.transparent.primary:hover,
    .btn.transparent.primary:focus {
        color: var(--color-flame);
    }
    .btn.transparent.secondary {
        color: var(--color-grassland);
    }
    .btn.transparent.secondary:hover,
    .btn.transparent.secondary:focus {
        color: var(--color-apple);
    }
    .btn.transparent.tertiary {
        color: var(--color-grey);
    }
    .btn.transparent.tertiary:hover,
    .btn.transparent.tertiary:focus {
        color: var(--color-chateau);
    }
    .btn.transparent.warning {
        color: var(--color-cinnabar);
    }
    .btn.transparent.warning:hover,
    .btn.transparent.warning:focus {
        color: var(--color-flamingo);
    }
    .btn.transparent.white {
        color: rgba(255, 255, 255, 1);
    }
    .btn.transparent.white:hover,
    .btn.transparent.white:focus {
        color: rgba(255, 255, 255, 0.8);
    }
    .btn.transparent.black {
        color: var(--color-black);
    }
    .btn.transparent.black:hover,
    .btn.transparent.black:focus {
        color: var(--color-abbey);
    }
</style>
`;
