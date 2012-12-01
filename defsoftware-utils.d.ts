/// <reference path="extdefs/jquery.d.ts" />
/// <reference path="extdefs/underscore.browser.d.ts" />
module defsoftware {
    module Utils {
        var partial: (f: any, ...someArguments: any[]) => (...moreArguments: any[]) => any;
        function intersperse(collection: any[], separator: any): any[];
    }
    module HTML {
        function makeElement(tagName: string, ...args: any[]): Element;
        var a: (...args: any[]) => Element;
        var button: (...args: any[]) => Element;
        var div: (...args: any[]) => Element;
        var em: (...args: any[]) => Element;
        var h1: (...args: any[]) => Element;
        var h2: (...args: any[]) => Element;
        var h3: (...args: any[]) => Element;
        var li: (...args: any[]) => Element;
        var p: (...args: any[]) => Element;
        var strong: (...args: any[]) => Element;
        var ul: (...args: any[]) => Element;
    }
}
