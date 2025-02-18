import { createNodeMiddleware, createProbot } from "probot"
import app from "../../../src"

const probot = createProbot()

export default createNodeMiddleware(app, {
  probot,
  webhooksPath: "/api/github/webhooks",
})
