/** @jsx defsoftware.HTML.makeElement */
var GitHubAPI = function (path) {
    return $.getJSON("https://api.github.com/" + path + "?callback=?").then(function (response) {
        return response.meta.status == 200 ? $.Deferred().resolve(response.data) : $.Deferred().reject(response.data.message);
    });
};
var truncate = function (s, n) {
    return s.length > n ? s.slice(0, n - 1) + "…" : s;
};
function main() {
    var repoContainer, gistContainer;
    var body = defsoftware.HTML.makeElement(
        "div",
        null,
        defsoftware.HTML.makeElement(
            "h1",
            null,
            defsoftware.HTML.makeElement(
                "a",
                { href: "http://qerub.se/" },
                "My Personal Website"
            )
        ),
        defsoftware.HTML.makeElement(
            "h1",
            null,
            defsoftware.HTML.makeElement(
                "a",
                { href: "https://www.openhub.net/accounts/qerub/positions" },
                "My Page on Open Hub"
            )
        ),
        defsoftware.HTML.makeElement(
            "h1",
            null,
            defsoftware.HTML.makeElement(
                "a",
                { href: "https://github.com/qerub" },
                "My GitHub Repositories"
            )
        ),
        repoContainer = defsoftware.HTML.makeElement(
            "p",
            null,
            defsoftware.HTML.makeElement(
                "em",
                null,
                "Loading\u2026"
            )
        ),
        defsoftware.HTML.makeElement(
            "h1",
            null,
            defsoftware.HTML.makeElement(
                "a",
                { href: "https://gist.github.com/qerub" },
                "My Gists"
            )
        ),
        gistContainer = defsoftware.HTML.makeElement(
            "p",
            null,
            defsoftware.HTML.makeElement(
                "em",
                null,
                "Loading\u2026"
            )
        )
    );
    $(document.body).append(body);
    var makeRepoListItem = function (repo) {
        return defsoftware.HTML.makeElement(
            "li",
            null,
            defsoftware.HTML.makeElement(
                "a",
                { href: repo.html_url },
                defsoftware.HTML.makeElement(
                    "strong",
                    null,
                    repo.name,
                    ":"
                ),
                " ",
                repo.description
            )
        );
    };
    GitHubAPI("users/qerub/repos").then(function (data) {
        var repos = data.filter(function (x) {
            return !x.fork;
        });
        $(repoContainer).html(defsoftware.HTML.makeElement(
            "ul",
            null,
            repos.map(makeRepoListItem)
        ));
    }).fail(function (message) {
        return $(repoContainer).text("Error: " + message);
    });
    var makeGistListItem = function (gist) {
        return defsoftware.HTML.makeElement(
            "li",
            null,
            defsoftware.HTML.makeElement(
                "a",
                { href: gist.html_url },
                truncate(gist.description, 100)
            )
        );
    };
    GitHubAPI("users/qerub/gists").then(function (data) {
        return $(gistContainer).html(defsoftware.HTML.makeElement(
            "ul",
            null,
            data.map(makeGistListItem)
        ));
    }).fail(function (message) {
        return $(gistContainer).text("Error: " + message);
    });
}
$(main);
//# sourceMappingURL=main.js.map
