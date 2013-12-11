/// <reference path="extdefs/jquery.d.ts" />
/// <reference path="extdefs/sugar.d.ts" />
declare module defsoftware {
    module Utils {
        var partial: (f: any, ...someArguments: any[]) => (...moreArguments: any[]) => any;
        function intersperse(collection: any[], separator: any): any[];
    }
    module HTML {
        function makeElement(tagName: string, ...args: any[]): JQuery;
        var elementMaker: (tagName: string) => (...moreArguments: any[]) => any;
    }
}
