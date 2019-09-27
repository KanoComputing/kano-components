import { html } from './template.js';

/**
 * Tabs styles, sets the styles for tabs used by kit-app-ui user profile
 * and kwc-avatar-creator to start with.
 */
const tabs = html`
<custom-style>
  <style is="custom-style">
        html {
            --kano-profile-tabs: {
                display: flex;
                flex-direction: row;
                justify-content: center;
            };

            --kano-profile-tabs-link: {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                margin: 0px 4px;
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                background-color: rgba(0, 0, 0, 0.5);
                color: var(--color-porcelain);
                text-decoration: none;
                font-size: 16px;
                transition: all linear 120ms;
                font-weight: bold;
                min-width: 110px;
                pointer-events: all;
                background-color: rgba(0, 0, 0, 0.25);
                color: rgba(255, 255, 255, 0.75);
            };
            --kano-profile-tabs-link-selected: {
                opacity: 1;
                color: black;
                background: var(--color-porcelain);
            };
            --kano-profile-tabs-link-selected-hover: {
                @apply --kano-profile-tabs-link-selected;
                color: rgba(0, 0, 0, 1);
                background-color: var(--color-porcelain);
            };
            --kano-profile-tabs-link-hover: {
                background-color: rgba(0, 0, 0, 0.5);
                color: rgba(255, 255, 255, 1);
            };
            --kano-profile-tabs-link-svg {
                fill: rgba(255, 255, 255, 0.75);
            }
            --kano-profile-tabs-link-svg-hover {
                fill: rgba(255, 255, 255, 1);
            }
        }
    </style>
</custom-style>
`;

document.head.appendChild(tabs.content);
