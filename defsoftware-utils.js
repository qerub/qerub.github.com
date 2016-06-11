/// <reference path="../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../DefinitelyTyped/sugar/sugar.d.ts" />
"use strict";

var defsoftware;
(function (defsoftware) {
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
    })(HTML = defsoftware.HTML || (defsoftware.HTML = {}));
})(defsoftware || (defsoftware = {}));
//# sourceMappingURL=defsoftware-utils.js.map
