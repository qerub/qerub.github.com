/// <reference path="extdefs/jquery.d.ts" />
/// <reference path="extdefs/underscore.browser.d.ts" />
/// <reference path="defsoftware-utils.d.ts" />

var a      = defsoftware.HTML.a;
var div    = defsoftware.HTML.div;
var em     = defsoftware.HTML.em;
var h1     = defsoftware.HTML.h1;
var h2     = defsoftware.HTML.h2;
var li     = defsoftware.HTML.li;
var p      = defsoftware.HTML.p;
var strong = defsoftware.HTML.strong;
var ul     = defsoftware.HTML.ul;
// *yawn*

function main() {
  var ohloh = $("<a href='https://www.ohloh.net/accounts/484?ref=Detailed' target='_top'><img alt='Ohloh profile for Christoffer Sawicki' border='0' height='35' src='https://www.ohloh.net/accounts/484/widgets/account_detailed.gif' width='191' /></a>");
  
  var repoContainer, gistContainer;
  
  var body = div(
    h1("qerub.github.com"),
    h2(a({ href: "http://vemod.net/" }, "My Personal Website")),
    h2("My GitHub Repositories"),
    (repoContainer = div(em().html("Loading&hellip;"))),
    h2("My Gists"),
    (gistContainer = div(em().html("Loading&hellip;"))),
    h2("Misc. Open Source Contributions"),
    div(p("See Ohloh: "), p(ohloh))
  );
  
  $(document.body).append(body);
  
  var makeRepoListItem = (repo =>
    li(a({ href: repo.homepage || repo.html_url }, strong(repo.name, ": "), repo.description)));
  
  $.getJSON("https://api.github.com/users/qerub/repos?callback=?", response => {
    var repos = _.where(response.data, { fork: false });
    $(repoContainer).html(ul(_.map(repos, makeRepoListItem)));
  });
  
  var makeGistListItem = (gist =>
    li(a({ href: gist.html_url }, gist.description)));
  
  $.getJSON("https://api.github.com/users/qerub/gists?callback=?", response => {
    $(gistContainer).html(ul(_.map(response.data, makeGistListItem)));
  });
}

$(main);
