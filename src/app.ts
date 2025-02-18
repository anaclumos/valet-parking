import { Context, Probot } from "probot"

export default (app: Probot) => {
  app.on("issues.opened", async (context: Context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    })
    await context.octokit.issues.createComment(issueComment)
  })
}
