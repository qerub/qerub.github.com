/// <reference path="extdefs/jquery.d.ts" />
/// <reference path="extdefs/underscore.browser.d.ts" />

module defsoftware {
  export module Utils {
    export var partial =
      (f, ...someArguments: any[]) =>
         (...moreArguments: any[]) => f.apply(f, someArguments.concat(moreArguments));
    
    export function intersperse(collection: any[], separator: any) {
      if (collection.length <= 1) {
        return collection;
      }
      else {
        var xs = [];
        xs.push(_.first(collection));
        _.rest(collection).forEach(function (x) {
          xs.push(separator);
          xs.push(x);
        });
        return xs;
      }
    }
  }

  export module HTML {
    export function makeElement(tagName: string, ...args: any[]): JQuery {
      function makeNode(x) {
        if (typeof(x) == "string") {
          return document.createTextNode(x);
        }
        else {
          return x;
        }
      }

      var element = document.createElement(tagName);
      
      if (args.length > 0 && $.isPlainObject(args[0])) {
        var attributes = args.shift();
        $(element).attr(attributes);
      }

      return $(element).append(_.map(_.flatten(args), makeNode));
    }
    
    export var elementMaker = (tagName: string) => Utils.partial(makeElement, tagName);
  }
}
