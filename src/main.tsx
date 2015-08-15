/// <reference path="../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="defsoftware-utils.ts" />

/** @jsx defsoftware.HTML.makeElement */

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

  var body = <div>
    <h1><a href="http://qerub.se/">My Personal Website</a></h1>
    <h1><a href="https://www.ohloh.net/accounts/Qerub/positions">My Page on Ohloh</a></h1>
    <h1><a href="https://github.com/qerub">My GitHub Repositories</a></h1>
    {repoContainer = <p><em>Loading…</em></p>}
    <h1><a href="https://gist.github.com/qerub">My Gists</a></h1>
    {gistContainer = <p><em>Loading…</em></p>}
  </div>;
    
  $(document.body).append(body);
  
  var makeRepoListItem = (repo =>
    <li><a href={repo.html_url}><strong>{repo.name}:</strong> {repo.description}</a></li>);
  
  GitHubAPI("users/qerub/repos")
    .then(data => {
      var repos = data.filter(x => !x.fork);
      $(repoContainer).html(<ul>{repos.map(makeRepoListItem)}</ul>);
    })
    .fail(message => $(repoContainer).text("Error: " + message));
  
  var makeGistListItem = (gist =>
    <li><a href={gist.html_url}>{truncate(gist.description, 100)}</a></li>);
  
  GitHubAPI("users/qerub/gists")
    .then(data    => $(gistContainer).html(<ul>{data.map(makeGistListItem)}</ul>))
    .fail(message => $(gistContainer).text("Error: " + message));
}

$(main);
