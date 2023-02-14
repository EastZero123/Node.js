import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

import { Low } from "lowdb"

import { JSONFile } from "lowdb/node"

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, "db.json")

const adapter = new JSONFile(file)
const db = new Low(adapter)

// await db.read()

db.data = db.data || { table1: [], table2: [] }

var { table1, table2 } = db.data

table1.push(
  { name: "choi", age: "25" },
  { name: "dong", age: "25" },
  { name: "young", age: "27" }
)
const data = table1.filter((p) => p.name !== "choi")

table1.length = 0
data.map((p, i) => (table1[i] = p))

await db.write()
