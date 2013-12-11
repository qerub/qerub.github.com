/// <reference path="extdefs/jquery.d.ts" />
/// <reference path="extdefs/sugar.d.ts" />
var defsoftware;
(function (defsoftware) {
    (function (Utils) {
        Utils.partial = function (f) {
            var someArguments = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                someArguments[_i] = arguments[_i + 1];
            }
            return function () {
                var moreArguments = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    moreArguments[_i] = arguments[_i + 0];
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
    })(defsoftware.Utils || (defsoftware.Utils = {}));
    var Utils = defsoftware.Utils;

    (function (HTML) {
        function makeElement(tagName) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            function makeNode(x) {
                if (typeof (x) == "string") {
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
    })(defsoftware.HTML || (defsoftware.HTML = {}));
    var HTML = defsoftware.HTML;
})(defsoftware || (defsoftware = {}));
//# sourceMappingURL=defsoftware-utils.js.map
