/**
`kwc-lightboard-preview`

Renders animated covers from lightboard spritesheets.

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                display: block;
            }

            #canvas {
                background-color: #22272d;
                image-rendering: pixelated;
                width: 100%;
                max-width: 100%;

                display: block;
            }
        </style>

        <canvas id="canvas" width="16" height="8" style\$="[[_computeCanvasStyle(width)]]"></canvas>
`,

  is: 'kwc-lightboard-preview',

  properties: {
      /*
      * Playback frames per second
      */
      fps: {
          type: Number,
          value: 4
      },
      /*
      * Number of frames in the image sprite
      */
      frames: {
          type: Number,
          value: 12
      },
      /*
      * Image file location
      */
      src: {
          type: String,
          required: true,
          observer: '_loadImage'
      },
      /*
      * Horizontal position of the image
      */
      _x: {
          type: Number,
          value: 0
      },
      /*
      * Width of the source image frames
      */
      xResolution: {
          type: Number,
          value: 16
      },
      /*
      * Vertical position of the image
      */
      _y: {
          type: Number,
          value: 0
      },
      /*
      * Height of the source image frames
      */
      yResolution: {
          type: Number,
          value: 8
      },
      /*
      * Width of the component
      */
      width: {
          type: Number
      }
  },

  connectedCallback () {
      this._loadImage(this.src);
  },

  disconnectedCallback () {
      clearInterval(this.interval);
  },

  _animate () {
      let xMax = this.frames * this.xResolution,
          timing = 1000 / this.fps,
          xPosition;
      this.context.clearRect(
          0,
          0,
          this.xResolution,
          this.yResolution
      );
      this.context.drawImage(
          this.image,
          this._x,
          this._y,
          this.xResolution,
          this.yResolution,
          0,
          0,
          this.xResolution,
          this.yResolution
      );
      if (this._x + this.xResolution <= xMax) {
          xPosition = this._x + this.xResolution;
      } else {
          xPosition = 0;
      }
      this.set('_x', xPosition);
      clearInterval(this.interval);
      this.interval = setInterval(() => {
          requestAnimationFrame(() => this._animate());
      }, timing);
  },

  _computeCanvasStyle (width) {
      let height = width * 0.5;
      return `height: ${height}px; max-width: 100%; width: ${width}px;`;
  },

  _loadImage (src) {
      if (src) {
          this.image = new Image();
          this.image.src = src;
          this.context = this.$.canvas.getContext('2d');
          this.image.onload = () => {
              this._animate();
          }
      }
  }
});
