/// <reference path="extdefs/jquery.d.ts" />
/// <reference path="defsoftware-utils.d.ts" />
var a = defsoftware.HTML.elementMaker("a");
var div = defsoftware.HTML.elementMaker("div");
var em = defsoftware.HTML.elementMaker("em");
var h1 = defsoftware.HTML.elementMaker("h1");
var li = defsoftware.HTML.elementMaker("li");
var p = defsoftware.HTML.elementMaker("p");
var strong = defsoftware.HTML.elementMaker("strong");
var ul = defsoftware.HTML.elementMaker("ul");

// *yawn*
var link = function (content, href) {
    return a({ href: href }, content);
};

var GitHubAPI = function (path) {
    return $.getJSON("https://api.github.com/" + path + "?callback=?").then(function (response) {
        return (response.meta.status == 200) ? $.Deferred().resolve(response.data) : $.Deferred().reject(response.data.message);
    });
};

function main() {
    var repoContainer, gistContainer;

    var body = div(h1(link("My Personal Website", "http://vemod.net/")), h1(link("My Page on Ohloh", "https://www.ohloh.net/accounts/Qerub?ref=Detailed")), h1(link("My GitHub Repositories", "https://github.com/qerub")), (repoContainer = p(em().html("Loading&hellip;"))), h1(link("My Gists", "https://gist.github.com/qerub")), (gistContainer = p(em().html("Loading&hellip;"))));

    $(document.body).append(body);

    var makeRepoListItem = (function (repo) {
        return li(link([strong(repo.name, ": "), repo.description], repo.html_url));
    });

    GitHubAPI("users/qerub/repos").then(function (data) {
        var repos = data.filter(function (x) {
            return !x.fork;
        });
        $(repoContainer).html(ul(repos.map(makeRepoListItem)));
    }).fail(function (message) {
        return $(repoContainer).text("Error: " + message);
    });

    var makeGistListItem = (function (gist) {
        return li(link(gist.description, gist.html_url));
    });

    GitHubAPI("users/qerub/gists").then(function (data) {
        return $(gistContainer).html(ul(data.map(makeGistListItem)));
    }).fail(function (message) {
        return $(gistContainer).text("Error: " + message);
    });
}

$(main);
//# sourceMappingURL=main.js.map
