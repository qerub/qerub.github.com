module defsoftware {
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

      return $(element).append(args.flatten().map(makeNode));
    }
  }
}
