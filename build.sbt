enablePlugins(ScalaJSPlugin)

name := "qerub.github.io"

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  "be.doeraene" %%% "scalajs-jquery" % "0.8.1-qerub",
  "com.github.japgolly.scalajs-react" %%% "core" % "0.9.2"
)

jsDependencies ++= Seq(
  "org.webjars" % "react" % "0.12.2" / "react-with-addons.js" commonJSName "React"
)

skip in packageJSDependencies := false
