/// <reference path="../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../DefinitelyTyped/sugar/sugar.d.ts" />
"use strict";

var defsoftware;
(function (defsoftware) {
    var Utils;
    (function (Utils) {
        Utils.partial = function (f) {
            var someArguments = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                someArguments[_i - 1] = arguments[_i];
            }
            return function () {
                var moreArguments = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    moreArguments[_i - 0] = arguments[_i];
                }
                return f.apply(f, someArguments.concat(moreArguments));
            };
        };
        function intersperse(collection, separator) {
            if (collection.length <= 1) {
                return collection;
            } else {
                var xs = [];
                xs.push(collection[0]);
                collection.slice(1).forEach(function (x) {
                    xs.push(separator);
                    xs.push(x);
                });
                return xs;
            }
        }
        Utils.intersperse = intersperse;
    })(Utils = defsoftware.Utils || (defsoftware.Utils = {}));
    var HTML;
    (function (HTML) {
        function makeElement(tagName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            function makeNode(x) {
                if (typeof x == "string") {
                    return document.createTextNode(x);
                } else {
                    return x;
                }
            }
            var element = document.createElement(tagName);
            if (args.length > 0 && $.isPlainObject(args[0])) {
                var attributes = args.shift();
                $(element).attr(attributes);
            }
            return $(element).append(args.flatten().map(makeNode));
        }
        HTML.makeElement = makeElement;
        HTML.elementMaker = function (tagName) {
            return Utils.partial(makeElement, tagName);
        };
    })(HTML = defsoftware.HTML || (defsoftware.HTML = {}));
})(defsoftware || (defsoftware = {}));