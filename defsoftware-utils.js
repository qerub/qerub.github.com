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
            }
        };
        function intersperse(collection, separator) {
            if(collection.length <= 1) {
                return collection;
            } else {
                var xs = [];
                xs.push(_.first(collection));
                _.rest(collection).forEach(function (x) {
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
                if(typeof (x) == "string") {
                    return document.createTextNode(x);
                } else {
                    return x;
                }
            }
            var element = document.createElement(tagName);
            if(args.length > 0 && $.isPlainObject(args[0])) {
                var attributes = args.shift();
                $(element).attr(attributes);
            }
            return $(element).append(_.map(_.flatten(args), makeNode));
        }
        HTML.makeElement = makeElement;
        HTML.a = Utils.partial(makeElement, "a");
        HTML.button = Utils.partial(makeElement, "button");
        HTML.div = Utils.partial(makeElement, "div");
        HTML.em = Utils.partial(makeElement, "em");
        HTML.h1 = Utils.partial(makeElement, "h1");
        HTML.h2 = Utils.partial(makeElement, "h2");
        HTML.h3 = Utils.partial(makeElement, "h3");
        HTML.li = Utils.partial(makeElement, "li");
        HTML.p = Utils.partial(makeElement, "p");
        HTML.strong = Utils.partial(makeElement, "strong");
        HTML.ul = Utils.partial(makeElement, "ul");
    })(defsoftware.HTML || (defsoftware.HTML = {}));
    var HTML = defsoftware.HTML;
})(defsoftware || (defsoftware = {}));
//@ sourceMappingURL=defsoftware-utils.js.map
