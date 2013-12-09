/// <reference path="extdefs/jquery.d.ts" />
/// <reference path="defsoftware-utils.d.ts" />

var a      = defsoftware.HTML.elementMaker("a");
var div    = defsoftware.HTML.elementMaker("div");
var em     = defsoftware.HTML.elementMaker("em");
var h1     = defsoftware.HTML.elementMaker("h1");
var h2     = defsoftware.HTML.elementMaker("h2");
var li     = defsoftware.HTML.elementMaker("li");
var p      = defsoftware.HTML.elementMaker("p");
var strong = defsoftware.HTML.elementMaker("strong");
var ul     = defsoftware.HTML.elementMaker("ul");
// *yawn*

var link = (content, href) => a({href: href}, content);

function GitHubAPI(path: string, callback) {
  $.getJSON("https://api.github.com/"+path+"?callback=?", response => {
    if (response.meta.status == 200) {
      callback(response.data);
    }
    else {
      throw response.data.message;
    }
  });
}

function main() {
  var ohloh = $("<a href='https://www.ohloh.net/accounts/484?ref=Detailed' target='_top'><img alt='Ohloh profile for Christoffer Sawicki' border='0' height='35' src='https://www.ohloh.net/accounts/484/widgets/account_detailed.gif' width='191' /></a>");
  
  ohloh.find("img").css("vertical-align", "middle");
  
  var repoContainer, gistContainer;
  
  var body = div(
    h1("qerub.github.com"),
    h2(link("My Personal Website", "http://vemod.net/")),
    h2(link("My GitHub Repositories", "https://github.com/qerub")),
    (repoContainer = p(em().html("Loading&hellip;"))),
    h2(link("My Gists", "https://gist.github.com/qerub")),
    (gistContainer = p(em().html("Loading&hellip;"))),
    h2("Misc. Open Source Contributions"),
    p("See Ohloh: ", ohloh)
  );
  
  $(document.body).append(body);
  
  var makeRepoListItem = (repo =>
    li(link([strong(repo.name, ": "), repo.description], repo.html_url)));
  
  GitHubAPI("users/qerub/repos", data => {
    var repos = data.filter(x => !x.fork);
    $(repoContainer).html(ul(repos.map(makeRepoListItem)));
  });
  
  var makeGistListItem = (gist =>
    li(link(gist.description, gist.html_url)));
  
  GitHubAPI("users/qerub/gists", data => {
    $(gistContainer).html(ul(data.map(makeGistListItem)));
  });
}

$(main);
