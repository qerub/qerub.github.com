var a = this.defsoftware.HTML.elementMaker("a");
var div = this.defsoftware.HTML.elementMaker("div");
var em = this.defsoftware.HTML.elementMaker("em");
var h1 = this.defsoftware.HTML.elementMaker("h1");
var h2 = this.defsoftware.HTML.elementMaker("h2");
var li = this.defsoftware.HTML.elementMaker("li");
var p = this.defsoftware.HTML.elementMaker("p");
var strong = this.defsoftware.HTML.elementMaker("strong");
var ul = this.defsoftware.HTML.elementMaker("ul");
var link = function (content, href) {
    return a({
        href: href
    }, content);
};
function main() {
    var ohloh = $("<a href='https://www.ohloh.net/accounts/484?ref=Detailed' target='_top'><img alt='Ohloh profile for Christoffer Sawicki' border='0' height='35' src='https://www.ohloh.net/accounts/484/widgets/account_detailed.gif' width='191' /></a>");
    ohloh.find("img").css("vertical-align", "middle");
    var repoContainer, gistContainer;
    var body = div(h1("qerub.github.com"), h2(link("My Personal Website", "http://vemod.net/")), h2(link("My GitHub Repositories", "https://github.com/qerub")), (repoContainer = div(em().html("Loading&hellip;"))), h2(link("My Gists", "https://gist.github.com/qerub")), (gistContainer = div(em().html("Loading&hellip;"))), h2("Misc. Open Source Contributions"), p("See Ohloh: ", ohloh));
    $(document.body).append(body);
    var makeRepoListItem = (function (repo) {
        return li(link([
            strong(repo.name, ": "), 
            repo.description
        ], repo.html_url));
    });
    $.getJSON("https://api.github.com/users/qerub/repos?callback=?", function (response) {
        var repos = response.data.filter(function (x) {
            return !x.fork;
        });
        $(repoContainer).html(ul(repos.map(makeRepoListItem)));
    });
    var makeGistListItem = (function (gist) {
        return li(link(gist.description, gist.html_url));
    });
    $.getJSON("https://api.github.com/users/qerub/gists?callback=?", function (response) {
        $(gistContainer).html(ul(response.data.map(makeGistListItem)));
    });
}
$(main);
//@ sourceMappingURL=main.js.map
