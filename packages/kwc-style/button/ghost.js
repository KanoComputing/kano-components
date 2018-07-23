import { html } from '../template.js';

export const ghost = html`
<style>
    .btn.ghost.primary:not(.outline) {
        background-color: rgba(255, 105, 0, 0.4);
    }
    .btn.ghost.primary:not(.outline):hover,
    .btn.ghost.primary:not(.outline):focus {
        background-color: rgba(255, 105, 0, 0.8);
    }
    .btn.ghost.primary.outline {
        border-color: rgba(255, 105, 0, 0.4);
        color: rgba(255, 105, 0, 0.4);
    }
    .btn.ghost.primary.outline:hover,
    .btn.ghost.primary.outline:focus {
        border-color: rgba(255, 105, 0, 0.8);
        color: rgba(255, 105, 0, 0.8);
    }
    .btn.ghost.secondary:not(.outline) {
        background-color: rgba(136, 196, 64, 0.4);
    }
    .btn.ghost.secondary:not(.outline):hover,
    .btn.ghost.secondary:not(.outline):focus {
        background-color: rgba(136, 196, 64, 0.8);
    }
    .btn.ghost.secondary.outline {
        border-color: rgba(136, 196, 64, 0.4);
        color: rgba(136, 196, 64, 0.4);
    }
    .btn.ghost.secondary.outline:hover,
    .btn.ghost.secondary.outline:focus {
        border-color: rgba(136, 196, 64, 0.8);
        color: rgba(136, 196, 64, 0.8);
    }
    .btn.ghost.tertiary:not(.outline) {
        background-color: rgba(159, 164, 168, 0.4);
    }
    .btn.ghost.tertiary:not(.outline):hover,
    .btn.ghost.tertiary:not(.outline):focus {
        background-color: rgba(159, 164, 168, 0.8);
    }
    .btn.ghost.tertiary.outline {
        border-color: rgba(159, 164, 168, 0.4);
        color: rgba(159, 164, 168, 0.4);
    }
    .btn.ghost.tertiary.outline:hover,
    .btn.ghost.tertiary.outline:focus {
        border-color: rgba(159, 164, 168, 0.8);
        color: rgba(159, 164, 168, 0.8);
    }
    .btn.ghost.warning:not(.outline) {
        background-color: rgba(246, 54, 54, 0.4);
    }
    .btn.ghost.warning:not(.outline):hover,
    .btn.ghost.warning:not(.outline):focus {
        background-color: rgba(246, 54, 54, 0.8);
    }
    .btn.ghost.warning.outline {
        border-color: rgba(246, 54, 54, 0.4);
        color: rgba(246, 54, 54, 0.4);
    }
    .btn.ghost.warning.outline:hover,
    .btn.ghost.warning.outline:focus {
        border-color: rgba(246, 54, 54, 0.8);
        color: rgba(246, 54, 54, 0.8);
    }
    .btn.ghost.white:not(.outline) {
        background-color: rgba(255, 255, 255, 0.4);
        color: var(--color-abbey);
    }
    .btn.ghost.white:not(.outline):hover,
    .btn.ghost.white:not(.outline):focus {
        background-color: rgba(255, 255, 255, 0.8);
        color: var(--color-grey);
    }
    .btn.ghost.white.outline {
        border-color: rgba(255, 255, 255, 0.4);
        color: rgba(255, 255, 255, 0.4);
    }
    .btn.ghost.white.outline:hover,
    .btn.ghost.white.outline:focus {
        border-color: rgba(255, 255, 255, 0.8);
        color: rgba(255, 255, 255, 0.8);
    }
    .btn.ghost.black:not(.outline) {
        background-color: rgba(41, 47, 53, 0.4);
    }
    .btn.ghost.black:not(.outline):hover,
    .btn.ghost.black:not(.outline):focus {
        background-color: rgba(41, 47, 53, 0.8);
    }
    .btn.ghost.black.outline {
        border-color: rgba(41, 47, 53, 0.4);
        color: rgba(41, 47, 53, 0.4);
    }
    .btn.ghost.black.outline:hover,
    .btn.ghost.black.outline:focus {
        border-color: rgba(41, 47, 53, 0.8);
        color: rgba(41, 47, 53, 0.8);
    }
</style>
`;
