var a = this.defsoftware.HTML.a;
var div = this.defsoftware.HTML.div;
var em = this.defsoftware.HTML.em;
var h1 = this.defsoftware.HTML.h1;
var h2 = this.defsoftware.HTML.h2;
var li = this.defsoftware.HTML.li;
var p = this.defsoftware.HTML.p;
var strong = this.defsoftware.HTML.strong;
var ul = this.defsoftware.HTML.ul;
function main() {
    var ohloh = $("<a href='https://www.ohloh.net/accounts/484?ref=Detailed' target='_top'><img alt='Ohloh profile for Christoffer Sawicki' border='0' height='35' src='https://www.ohloh.net/accounts/484/widgets/account_detailed.gif' width='191' /></a>");
    ohloh.find("img").css("vertical-align", "middle");
    var repoContainer, gistContainer;
    var body = div(h1("qerub.github.com"), h2(a({
        href: "http://vemod.net/"
    }, "My Personal Website")), h2("My GitHub Repositories"), (repoContainer = div(em().html("Loading&hellip;"))), h2("My Gists"), (gistContainer = div(em().html("Loading&hellip;"))), h2("Misc. Open Source Contributions"), p("See Ohloh: ", ohloh));
    $(document.body).append(body);
    var makeRepoListItem = (function (repo) {
        return li(a({
            href: repo.homepage || repo.html_url
        }, strong(repo.name, ": "), repo.description));
    });
    $.getJSON("https://api.github.com/users/qerub/repos?callback=?", function (response) {
        var repos = _.where(response.data, {
            fork: false
        });
        $(repoContainer).html(ul(_.map(repos, makeRepoListItem)));
    });
    var makeGistListItem = (function (gist) {
        return li(a({
            href: gist.html_url
        }, gist.description));
    });
    $.getJSON("https://api.github.com/users/qerub/gists?callback=?", function (response) {
        $(gistContainer).html(ul(_.map(response.data, makeGistListItem)));
    });
}
$(main);
//@ sourceMappingURL=main.js.map
