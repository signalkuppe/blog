/* eslint-disable no-func-assign */
function _typeof(obj) {
    '@babel/helpers - typeof';

    return (
        (_typeof =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (obj) {
                      return typeof obj;
                  }
                : function (obj) {
                      return obj &&
                          'function' == typeof Symbol &&
                          obj.constructor === Symbol &&
                          obj !== Symbol.prototype
                          ? 'symbol'
                          : typeof obj;
                  }),
        _typeof(obj)
    );
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
        for (
            // eslint-disable-next-line no-redeclare
            var i = 0, p = Object.getOwnPropertySymbols(s);
            i < p.length;
            i++
        ) {
            if (
                e.indexOf(p[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(s, p[i])
            )
                t[p[i]] = s[p[i]];
        }
    return t;
}

function HtmlPlugin(rawOptions) {
    var favicon = rawOptions.favicon,
        title = rawOptions.title,
        _rawOptions$headScrip = rawOptions.headScripts,
        headScripts =
            _rawOptions$headScrip === void 0 ? [] : _rawOptions$headScrip,
        _rawOptions$metas = rawOptions.metas,
        metas = _rawOptions$metas === void 0 ? [] : _rawOptions$metas,
        _rawOptions$links = rawOptions.links,
        links = _rawOptions$links === void 0 ? [] : _rawOptions$links,
        style = rawOptions.style,
        _rawOptions$scripts = rawOptions.scripts,
        scripts = _rawOptions$scripts === void 0 ? [] : _rawOptions$scripts;

    var getScriptContent = function getScriptContent(script, injectTo) {
        var result = {};

        if (_typeof(script) === 'object' && script.src) {
            result = {
                tag: 'script',
                injectTo: injectTo,
                attrs: Object.assign({}, script),
            };
        } else if (_typeof(script) === 'object' && script.content) {
            var content = script.content,
                attr = __rest(script, ['content']);

            result = {
                tag: 'script',
                injectTo: injectTo,
                attrs: Object.assign({}, attr),
                children: ''.concat(content),
            };
        } else {
            result = {
                tag: 'script',
                injectTo: injectTo,
                children: ''.concat(script),
            };
        }

        return result;
    };

    return {
        name: 'html-plugin',
        transformIndexHtml: function transformIndexHtml() {
            var htmlResult = [];

            if (title) {
                htmlResult.push({
                    tag: 'title',
                    injectTo: 'head',
                    children: title,
                });
            }

            if (favicon) {
                htmlResult.push({
                    tag: 'link',
                    attrs: {
                        rel: 'shortcut icon',
                        type: 'image/x-icon',
                        href: favicon,
                    },
                    injectTo: 'head',
                });
            }

            if (metas.length) {
                metas.forEach(function (meta) {
                    htmlResult.push({
                        tag: 'meta',
                        injectTo: 'head',
                        attrs: Object.assign({}, meta),
                    });
                });
            }

            if (links.length) {
                links.forEach(function (meta) {
                    htmlResult.push({
                        tag: 'link',
                        injectTo: 'head',
                        attrs: Object.assign({}, meta),
                    });
                });
            }

            if (style && style.length) {
                htmlResult.push({
                    tag: 'style',
                    injectTo: 'head',
                    children: ''
                        .concat(style)
                        .split('\n')
                        .map(function (line) {
                            return '  '.concat(line);
                        })
                        .join('\n'),
                });
            }

            if (headScripts.length) {
                headScripts.forEach(function (script) {
                    htmlResult.push(getScriptContent(script, 'head'));
                });
            }

            if (scripts.length) {
                scripts.forEach(function (script) {
                    htmlResult.push(getScriptContent(script, 'body'));
                });
            }

            return htmlResult;
        },
    };
} // overwrite for cjs require('...')() usage
// module.exports = HtmlPlugin;
// HtmlPlugin['default'] = HtmlPlugin;

export { HtmlPlugin as default };
