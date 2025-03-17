import { test } from "node:test"
import * as assert from "node:assert"
import * as fs from "node:fs/promises"
import { md2html } from "../md2html.js"

test("converts Markdown to HTML (GFM=false)", async() => {
  const sample = await fs.readFile("test/fixtures/sample.md", {
    encoding: "utf8",
  })
  const expected = await fs.readFile("test/fixtures/expected.html", {
    encoding: "utf8",
  })
  assert.strictEqual(
    md2html(sample, {gfm: false}).trimEnd(),
    expected.trimEnd(),
  )
})

test("converts Markdown to HTML (GFM=true)", async() => {
  const sample = await fs.readFile("test/fixtures/sample.md", {
    encoding: "utf8"
  })
  const expected = await fs.readFile("test/fixtures/expected-gfm.html", {
    encoding: "utf8"
  })
  assert.strictEqual(
    md2html(sample, {gfm: true}).trimEnd(),
    expected.trimEnd(),
  )
})