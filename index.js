import fetch from "node-fetch";
import { config } from "dotenv";
import fs from "fs";
import moment from 'moment';

config();
moment().format();

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql"

async function getStats() {
  const query = `
  {
    viewer {
      contributionsCollection {
        totalIssueContributions
        totalPullRequestContributions
        endedAt
      }
    }
  }
  `

  const stats = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({query}),
    headers: {
      'Authorization': `Bearer ${process.env.TOKEN}`
    }
  })

  console.log(stats)

  return stats.json()
}

const res = await getStats()
const stats = res.data.viewer.contributionsCollection


const text = `
๐ Hello! I'm <b>${moment("20050512").fromNow(true)} old</b> student from <b>Poland!</b>

- ๐ฎ Issues: **${stats.totalIssueContributions}**
- โจ Pull Requests: **${stats.totalPullRequestContributions}**
- โ Last Commit: **${moment(stats.endedAt).toNow()}**

๐ I'm always looking for cool opportunities! Feel free to contact me throught Discord <b><konhi#1588></b> or <b>hello.konhi@gmail.com</b>

๐ JavaScript   ๐ Node.js   ๐ Python   ๐งก Web Dev  ๐ง Linux ๐จ [UI](https://dribbble.com/konhi)
`

fs.writeFileSync('readme.md', text)
