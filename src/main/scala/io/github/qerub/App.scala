package io.github.qerub

import japgolly.scalajs.react.{React, ReactComponentB, ReactElement}
import org.scalajs.dom.document
import org.scalajs.jquery._

import scala.async.Async.{async, await}
import scala.concurrent.{Future, Promise}
import scala.scalajs.concurrent.JSExecutionContext.Implicits.queue
import scala.scalajs.js
import scala.util.{Failure, Success}

object App extends js.JSApp {
  object GitHub {
    case class Repository(name: String, description: String, fork: Boolean, url: String)
    case class Gist(description: String, url: String)

    def repositoriesForUser(username: String): Future[Seq[Repository]] =
      load(s"users/$username/repos").map(data => {
        // TODO: Use some smart object mapper
        data.asInstanceOf[js.Array[js.Dynamic]].map(r =>
          Repository(
            r.name.asInstanceOf[String],
            r.description.asInstanceOf[String],
            r.fork.asInstanceOf[Boolean],
            r.html_url.asInstanceOf[String]
          )
        ).toSeq
      })

    def gistsForUser(username: String): Future[Seq[Gist]] =
      load(s"users/$username/gists").map(data => {
        // TODO: Use some smart object mapper
        data.asInstanceOf[js.Array[js.Dynamic]].map(r =>
          Gist(
            r.description.asInstanceOf[String],
            r.html_url.asInstanceOf[String]
          )
        ).toSeq
      })

    //noinspection ComparingUnrelatedTypes
    private def load(path: String): Future[js.Dynamic] = async {
      val response = await(mkFuture(jQuery.getJSON(s"https://api.github.com/$path?callback=?")))
      if (response.meta.status != 200) throw new RuntimeException(response.data.message.asInstanceOf[String])
      response.data
    }

    private def mkFuture(xhr: JQueryXHR): Future[js.Dynamic] = {
      val p = Promise[js.Dynamic]()
      xhr.done((v: js.Dynamic) => { p.success(v) })
      p.future
    }
  }

  object Model {
    // NOTE: Component state should be immutable, but it was very convenient to do it this way.
    case class Page(repositories: Future[Seq[GitHub.Repository]], gists: Future[Seq[GitHub.Gist]])
  }

  object View {
    private def truncate(s: String, n: Int): String =
      if (s.length > n) s.substring(0, n - 1) + "…" else s

    private def render(page: Model.Page): ReactElement = {
      import japgolly.scalajs.react.vdom.all._

      def renderFuture[T](future: Future[T])(sf: T => ReactTag): ReactTag = future.value match {
        case None => p(em("Loading…"))
        case Some(Success(value)) => sf(value)
        case Some(Failure(exception)) => p(em("Error: ", exception.getMessage))
      }

      div(
        h1(a(href := "http://qerub.se/", "My Personal Website")),

        h1(a(href := "https://www.ohloh.net/accounts/Qerub/positions", "My Page on Ohloh")),

        h1(a(href := "https://github.com/qerub", "My GitHub Repositories")),
        renderFuture(page.repositories) { repos =>
          ul(repos.map(r => li(a(href := r.url, strong(r.name, ":"), " ", r.description))))
        },

        h1(a(href := "https://gist.github.com/qerub", "My Gists")),
        renderFuture(page.gists) { gists =>
          ul(gists.map(r => li(a(href := r.url, truncate(r.description, 100)))))
        }
      ).render
    }

    val Component =
      ReactComponentB[Unit]("Page")
        .initialState(Model.Page(Promise().future, Promise().future))
        .render((props, state) => View.render(state))
        .componentDidMount(scope => {
          val repos = GitHub.repositoriesForUser("qerub")
                            .map(repos => repos.filterNot(_.fork))
          val gists = GitHub.gistsForUser("qerub")

          scope.setState(Model.Page(repos, gists))
          repos.onComplete(t => { scope.forceUpdate() })
          gists.onComplete(t => { scope.forceUpdate() })
        })
        .build
  }

  def main(): Unit = {
    React.render(View.Component(()), document.getElementById("container"))
  }
}
