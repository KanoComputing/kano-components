/**


    @demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class KwcMusicPlayer extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                background: #58d6fa;
                @apply --layout-vertical;
                @apply --layout-center-justified;
                color: white;
                padding: 16px;
            }
            .player {
                @apply --layout-horizontal;
                @apply --layout-center;
            }
            .player .spectrum {
                flex: 1 0 auto;
                margin-left: 16px;
            }
            .playback-time {
                margin-left: 16px;
                min-width: 30px;
            }
            .playback-button {
                border-radius: 50%;
                border: 4px solid white;
                width: 32px;
                height: 32px;
                background: transparent;
                cursor: pointer;
                padding: 4px;
            }
            .playback-button:focus {
                outline: none;
                @apply --shadow-elevation-4dp;
            }
            .playback-button svg {
                width: 100%;
                height: 100%;
            }
            .playback-button svg path {
                fill : white;
                transition: all linear 100ms;
            }
        </style>
        <div class="player">
            <button type="button" class="playback-button" on-tap="_playbackButtonTapped" hidden\$="[[cannotRenderSample]]">
                <svg viewBox="0 0 17 19">
                    <path id="button-icon-path" d="M 4,18 10.5,14 10.5,6 4,2 z M 10.5,14 17,10 17,10 10.5,6 z">
                    </path>
                </svg>
            </button>
            <div id="spectrum-container" class="spectrum">
                <canvas id="canvas"></canvas>
            </div>
            <span class="playback-time">[[_formatTime(playbackTime)]]</span>
        </div>
        `;
    }
    static get properties() {
        return {
            share: {
                type: Object,
                observer: '_shareChanged',
            },
            cannotRenderSample: {
                type: Boolean,
                value: false,
            },
            playbackTime: {
                type: Number,
            },
        };
    }
    static get observers() {
        return [
            '_playbackStatusChanged(_playbackStatus)',
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        this.stoppedPath = 'M 4,18 10.5,14 10.5,6 4,2 z M 10.5,14 17,10 17,10 10.5,6 z';
        this.playingPath = 'M 2,18 6,18 6,2 2,2 z M 11,18 15,18 15,2 11,2 z';
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            window.OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
            this.context = new AudioContext();
        } catch (e) {
            this.cannotRenderSample = true;
        }
        this._onPlaybackEnded = this._onPlaybackEnded.bind(this);
    }
    _playbackStatusChanged(status) {
        if (status === 'playing') {
            this.$['button-icon-path'].setAttribute('d', this.playingPath);
        } else {
            this.$['button-icon-path'].setAttribute('d', this.stoppedPath);
        }
    }
    _formatTime(duration) {
        let min = Math.floor(duration / 60),
            sec = Math.floor(duration % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }
    _fitCanvas() {
        let rect = this.$['spectrum-container'].getBoundingClientRect();
        this.$.canvas.width = rect.width;
        this.$.canvas.height = rect.height;
        this._canvasFitted = true;
    }
    _play() {
        if (this.cannotRenderSample || !this.buffer) {
            return;
        }
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.context.destination);
  
        this.source.addEventListener('ended', this._onPlaybackEnded);
  
        if (this._playbackPosition) {
            this.source.start(0, this._playbackPosition);
            this._startedAt = this.context.currentTime - this._playbackPosition;
        } else {
            this.source.start(0)
            this._startedAt = this.context.currentTime;
        }
        this._playbackStatus = 'playing';
        this._render();
    }
    _pause() {
        this._playbackPosition = this.context.currentTime - this._startedAt;
        this.source.removeEventListener('ended', this._onPlaybackEnded);
        this.source.stop();
        this._playbackStatus = 'stopped';
        this._stopRendering();
    }
    _onPlaybackEnded() {
        this._playbackPosition = 0;
        this._playbackStatus = 'stopped';
        this._stopRendering();
    }
    _playbackButtonTapped() {
        if (this._playbackStatus === 'playing') {
            this._pause();
        } else {
            this._play();
        }
    }
    _updatePlaybackTime() {
        let position = this._startedAt ? this.context.currentTime - this._startedAt : 0;
        this.playbackTime = this.buffer.duration - position;
    }
    _shareChanged(share) {
        let sampleUrl;
  
        if (!share) {
            return;
        }
  
        sampleUrl = share.sample_url;
  
        if (!sampleUrl) {
            this.cannotRenderSample = true;
        }
        // That might have been set by the audio context checking
        if (this.cannotRenderSample) {
            return;
        }
        fetch(sampleUrl)
            .then(r => r.arrayBuffer())
            .then(ab => {
                this.context.decodeAudioData(ab, (buffer) => {
                    this.buffer = buffer;
                    this._playbackPosition = 0;
                    this._updatePlaybackTime();
                    this._render(true);
                });
            });           
    }
    _render(once) {
        let ctx = this.$.canvas.getContext('2d'),
            playbackTime,
            playbackPosition;
        if (!this._spectrumCache) {
            this._drawSpectrum();
        }
        if (!this._canvasFitted) {
            this._fitCanvas();
        }
        if (!this._playbackTimeInterval) {
            this._playbackTimeInterval = setInterval(this._updatePlaybackTime.bind(this), 1000);
        }
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        playbackTime = this.context.currentTime - this._startedAt;
        playbackPosition = playbackTime / this.buffer.duration;
        ctx.fillRect(0, 0, playbackPosition * ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = 'destination-atop';
        ctx.drawImage(this._spectrumCache, 0, 0, this.$.canvas.width, this.$.canvas.height);
        ctx.restore();
        if (!once) {
            this._renderId = requestAnimationFrame(this._render.bind(this, false));
        }
    }
    _stopRendering() {
        cancelAnimationFrame(this._renderId);
        clearInterval(this._playbackTimeInterval);
        this._playbackTimeInterval = null;
    }
    _drawSpectrum() {
        let data = this.buffer.getChannelData(0),
            height = 140,
            width = 600,
            value, ctx;
  
        this._spectrumCache = document.createElement('canvas');
  
        this._spectrumCache.width = width;
        this._spectrumCache.height = height;
  
        ctx = this._spectrumCache.getContext('2d');
  
        ctx.fillStyle = '#58afd4';
  
        ctx.fillRect(0, height / 2, width, 1);
  
        for (let i = 0; i < width; i++) {
            value = height / 2 * data[Math.floor(data.length / width * i)];
            ctx.fillRect(i, height / 2 - value / 2, 1, value);
        }
    }
}

customElements.define('kwc-music-player', KwcMusicPlayer);
