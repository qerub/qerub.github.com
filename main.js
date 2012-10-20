var a = defsoftware.HTML.a;
var div = defsoftware.HTML.div;
var em = defsoftware.HTML.em;
var h1 = defsoftware.HTML.h1;
var h2 = defsoftware.HTML.h2;
var li = defsoftware.HTML.li;
var p = defsoftware.HTML.p;
var strong = defsoftware.HTML.strong;
var ul = defsoftware.HTML.ul;
var makeRepositoryListItem = (function (repo) {
    return li(a({
        href: repo.homepage || repo.html_url
    }, strong(repo.name, ": "), repo.description));
});
function main() {
    var ohloh = $("<a href='https://www.ohloh.net/accounts/484?ref=Detailed' target='_top'><img alt='Ohloh profile for Christoffer Sawicki' border='0' height='35' src='https://www.ohloh.net/accounts/484/widgets/account_detailed.gif' width='191' /></a>");
    var repoContainer;
    var body = div(h1("qerub.github.com"), h2("My GitHub Repositories"), (repoContainer = div(em("Loading..."))), h2("Misc. Open Source Contributions"), div(p("See Ohloh: "), p(ohloh)));
    $(document.body).append(body);
    $.getJSON("https://api.github.com/users/qerub/repos?callback=?", function (response) {
        var repos = _.where(response.data, {
            fork: false
        });
        $(repoContainer).html(ul(_.map(repos, makeRepositoryListItem)));
    });
}
$(main);
//@ sourceMappingURL=main.js.map
