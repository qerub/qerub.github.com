/// <reference path="extdefs/jquery.d.ts" />
/// <reference path="extdefs/underscore.browser.d.ts" />
module defsoftware {
    module Utils {
        var partial: (f: any, ...someArguments: any[]) => (...moreArguments: any[]) => any;
        function intersperse(collection: any[], separator: any): any[];
    }
    module HTML {
        function makeElement(tagName: string, ...args: any[]): JQuery;
        var a: (...args: any[]) => JQuery;
        var button: (...args: any[]) => JQuery;
        var div: (...args: any[]) => JQuery;
        var em: (...args: any[]) => JQuery;
        var h1: (...args: any[]) => JQuery;
        var h2: (...args: any[]) => JQuery;
        var h3: (...args: any[]) => JQuery;
        var li: (...args: any[]) => JQuery;
        var p: (...args: any[]) => JQuery;
        var strong: (...args: any[]) => JQuery;
        var ul: (...args: any[]) => JQuery;
    }
}
