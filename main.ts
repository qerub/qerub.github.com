/// <reference path="extdefs/jquery.d.ts" />
/// <reference path="defsoftware-utils.d.ts" />

var a      = defsoftware.HTML.elementMaker("a");
var div    = defsoftware.HTML.elementMaker("div");
var em     = defsoftware.HTML.elementMaker("em");
var h1     = defsoftware.HTML.elementMaker("h1");
var li     = defsoftware.HTML.elementMaker("li");
var p      = defsoftware.HTML.elementMaker("p");
var strong = defsoftware.HTML.elementMaker("strong");
var ul     = defsoftware.HTML.elementMaker("ul");
// *yawn*

var link = (content, href) => a({href: href}, content);

var GitHubAPI = (path: string): JQueryPromise<any> =>
  $.getJSON("https://api.github.com/"+path+"?callback=?").then(response =>
    (response.meta.status == 200)
      ? $.Deferred().resolve(response.data)
      : $.Deferred().reject (response.data.message)
  );

var truncate = (s: string, n: number) =>
  (s.length > n) ? s.slice(0, n - 1) + "…" : s

function main() {
  var repoContainer, gistContainer;
  
  var body = div(
    h1(link("My Personal Website", "http://qerub.se/")),
    h1(link("My Page on Ohloh", "https://www.ohloh.net/accounts/Qerub/positions")),
    h1(link("My GitHub Repositories", "https://github.com/qerub")),
    (repoContainer = p(em().html("Loading&hellip;"))),
    h1(link("My Gists", "https://gist.github.com/qerub")),
    (gistContainer = p(em().html("Loading&hellip;")))
  );
  
  $(document.body).append(body);
  
  var makeRepoListItem = (repo =>
    li(link([strong(repo.name, ": "), repo.description], repo.html_url)));
  
  GitHubAPI("users/qerub/repos")
    .then(data => {
      var repos = data.filter(x => !x.fork);
      $(repoContainer).html(ul(repos.map(makeRepoListItem)));
    })
    .fail(message => $(repoContainer).text("Error: " + message));
  
  var makeGistListItem = (gist =>
    li(link(truncate(gist.description, 100), gist.html_url)));
  
  GitHubAPI("users/qerub/gists")
    .then(data    => $(gistContainer).html(ul(data.map(makeGistListItem))))
    .fail(message => $(gistContainer).text("Error: " + message));
}

$(main);
