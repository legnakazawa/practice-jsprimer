import * as util from "node:util"
import * as fs from "node:fs/promises"
import { md2html } from "./md2html";

const { 
  values,
  positionals
} = util.parseArgs({
  allowPositionals: true,
  options: {
    gfm: {
      type: "boolean",
      default: false,
    }
  }
})

const filePath = positionals[0];
fs.readFile(filePath, { encoding: "utf8"}).then(file => {
  const html = md2html(file, {
    gfm: values.gfm
  })
  console.log(html);
}).catch(err => {
  console.error(err.message)
  process.exit(1)
})