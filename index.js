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
👋 Hello! I'm <b>${moment("20050512").fromNow(true)} old</b> student from <b>Poland!</b>

- 🔮 Issues: **${stats.totalIssueContributions}**
- ✨ Pull Requests: **${stats.totalPullRequestContributions}**
- ⌚ Last Commit: **${moment(stats.endedAt).toNow()}**

😊 I'm always looking for cool opportunities! Feel free to contact me throught Discord <b><konhi#1588></b> or <b>hello.konhi@gmail.com</b>

💛 JavaScript   💚 Node.js   💙 Python   🧡 Web Dev   💖 Open-source   🐧 Linux   🐱‍💻 Git   🎨 UI
`

fs.writeFileSync('readme.md', text)
