module defsoftware {
    export module Utils {
        export function partial(f, ...someArguments: any[]): (args: any[]) => any;
        export function intersperse(collection: any[], separator: any): any[];
    }
    export module HTML {
        export function makeElement(tagName: string, ...args: any[]): Element;
        export var a: (args: any[]) => Element;
        export var button: (args: any[]) => Element;
        export var div: (args: any[]) => Element;
        export var em: (args: any[]) => Element;
        export var h1: (args: any[]) => Element;
        export var h2: (args: any[]) => Element;
        export var h3: (args: any[]) => Element;
        export var li: (args: any[]) => Element;
        export var p: (args: any[]) => Element;
        export var strong: (args: any[]) => Element;
        export var ul: (args: any[]) => Element;
    }
}
