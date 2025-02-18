import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import nock from "nock"
import { Probot, ProbotOctokit } from "probot"
import { afterEach, beforeEach, describe, expect, test } from "vitest"
import app from "../src/app"

const issueCreatedBody = { body: "Thanks for opening this issue!" }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const privateKey = fs.readFileSync(
  path.join(__dirname, "fixtures/mock-cert.pem"),
  "utf-8",
)

const payload = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/issues.opened.json"), "utf-8"),
)

describe("Probot", () => {
  let probot: any

  beforeEach(() => {
    nock.disableNetConnect()
    probot = new Probot({
      appId: 123,
      privateKey,
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
    })
    probot.load(app)
  })

  test("creates a comment when an issue is opened", async () => {
    const mock = nock("https://api.github.com")
      .post("/app/installations/2/access_tokens")
      .reply(200, {
        token: "test",
        permissions: {
          issues: "write",
        },
      })

      .post("/repos/hiimbex/testing-things/issues/1/comments", (body: any) => {
        expect(body).toMatchObject(issueCreatedBody)
        return true
      })
      .reply(200)

    await probot.receive({ name: "issues", payload })
    expect(mock.pendingMocks()).toStrictEqual([])
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })
})
