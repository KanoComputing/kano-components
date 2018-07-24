import { html } from '../template.js';
 
export const range = html`
    <style>
        .input[type=range] {
            -webkit-appearance: none;
            background-color: transparent;
        }
        .input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
        }
        .input[type=range]::-ms-track {
            cursor: pointer;
            background-color: transparent;
            border-color: transparent;
            color: transparent;
        }
        /* Special styling for WebKit/Blink */
        .input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 9px;
            width: 20px;
            border-radius: 3px;
            background-color: #B2B2B2;
            cursor: pointer;
            margin-top: -3px;
        }
        /* All the same stuff for Firefox */
        .input[type=range]::-moz-range-thumb {
            height: 9px;
            width: 20px;
            border-radius: 3px;
            background-color: #B2B2B2;
            cursor: pointer;
        }
        /* All the same stuff for IE */
        .input[type=range]::-ms-thumb {
            height: 9px;
            width: 20px;
            border-radius: 3px;
            background-color: #B2B2B2;
            cursor: pointer;
        }
        .input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: #CBCBCB;
        }
        .input[type=range]:focus::-webkit-slider-runnable-track {
            background: #CBCBCB;
        }
        .input[type=range]::-moz-range-track {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: #CBCBCB;
        }
        .input[type=range]::-ms-track {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: #CBCBCB;
        }
        .input[type=range]::-ms-fill-lower {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: #CBCBCB;
        }
        .input[type=range]:focus::-ms-fill-lower {
            background: #CBCBCB;
        }
        .input[type=range]::-ms-fill-upper {
            width: 100%;
            height: 3px;
            cursor: pointer;
            background: #CBCBCB;
        }
        .input[type=range]:focus::-ms-fill-upper {
            background: #CBCBCB;
        }
    </style>
`;
