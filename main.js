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
function GitHubAPI(path, callback) {
    $.getJSON("https://api.github.com/" + path + "?callback=?", function (response) {
        if(response.meta.status == 200) {
            callback(response.data);
        } else {
            throw response.data.message;
        }
    });
}
function main() {
    var repoContainer, gistContainer;
    var body = div(h1("qerub.github.com"), h2(link("My Personal Website", "http://vemod.net/")), h2(link("My Page on Ohloh", "https://www.ohloh.net/accounts/Qerub?ref=Detailed")), h2(link("My GitHub Repositories", "https://github.com/qerub")), (repoContainer = p(em().html("Loading&hellip;"))), h2(link("My Gists", "https://gist.github.com/qerub")), (gistContainer = p(em().html("Loading&hellip;"))));
    $(document.body).append(body);
    var makeRepoListItem = (function (repo) {
        return li(link([
            strong(repo.name, ": "), 
            repo.description
        ], repo.html_url));
    });
    GitHubAPI("users/qerub/repos", function (data) {
        var repos = data.filter(function (x) {
            return !x.fork;
        });
        $(repoContainer).html(ul(repos.map(makeRepoListItem)));
    });
    var makeGistListItem = (function (gist) {
        return li(link(gist.description, gist.html_url));
    });
    GitHubAPI("users/qerub/gists", function (data) {
        $(gistContainer).html(ul(data.map(makeGistListItem)));
    });
}
$(main);
//@ sourceMappingURL=main.js.map
