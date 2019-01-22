import 'prismjs/prism.js'
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-markup.js';
import './style.js';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/node_modules/prismjs/themes/prism.css';
document.head.appendChild(link);

function htmlValue(value) {
    if (value instanceof HTMLTemplateElement) {
        return value.innerHTML;
    }
    return value;
}

export const html = function html(strings, ...values) {
    const template = document.createElement('template');
    template.innerHTML = values.reduce((acc, v, idx) =>
        acc + htmlValue(v) + strings[idx + 1], strings[0]);
    return template;
};

function createDemoSnippet(title, template, script) {
    const instance = template.content.cloneNode(true);
    const element = instance.children[0];
    const scriptSnippet = html`
                    <pre>
                <code class="language-javascript">
${script ? script.toString() : ''}
                </code>
            </pre>
    `;
    const tpl = html`
        <fieldset>
            <legend>${title}</legend>
            <div id="output"></div>
            <hr>
            <pre>
                <code class="language-html">
${template.innerHTML.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                </code>
            </pre>
            ${script ? scriptSnippet : ''}
        </fieldset>
    `;
    const tplInstance = tpl.content.cloneNode(true);
    const output = tplInstance.querySelector('#output');
    output.appendChild(instance);
    return { element, tpl: tplInstance };
}

export function demo(title, tpl, script) {
    const demoSnippet = createDemoSnippet(title, tpl, script);
    const instance = demoSnippet.tpl;
    document.body.appendChild(instance);
    if (script) {
        script(demoSnippet.element);
    }
}

