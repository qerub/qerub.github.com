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

    export var a      : (...args: any[]) => JQuery = Utils.partial(makeElement, "a")    
    export var button : (...args: any[]) => JQuery = Utils.partial(makeElement, "button")
    export var div    : (...args: any[]) => JQuery = Utils.partial(makeElement, "div")   
    export var em     : (...args: any[]) => JQuery = Utils.partial(makeElement, "em")    
    export var h1     : (...args: any[]) => JQuery = Utils.partial(makeElement, "h1")
    export var h2     : (...args: any[]) => JQuery = Utils.partial(makeElement, "h2")
    export var h3     : (...args: any[]) => JQuery = Utils.partial(makeElement, "h3")
    export var li     : (...args: any[]) => JQuery = Utils.partial(makeElement, "li")    
    export var p      : (...args: any[]) => JQuery = Utils.partial(makeElement, "p")
    export var strong : (...args: any[]) => JQuery = Utils.partial(makeElement, "strong")
    export var ul     : (...args: any[]) => JQuery = Utils.partial(makeElement, "ul")    
  }
}
