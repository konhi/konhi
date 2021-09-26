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

  const stats = fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({query}),
    headers: {
      'Authorization': `Bearer ${process.env.token}`
    }
  })
    .then(response => response.json())

  console.log(await stats.data)

  return stats
}

const res = await getStats()
const stats = res.data.viewer.contributionsCollection


const text = `
<center>
👋 Hello! I'm <b>${moment("20050512").fromNow(true)} old</b> student from <b>Poland!</b>


<br>
<br>

🔮 <b>${stats.totalIssueContributions}</b> Issues ✨ <b>${stats.totalPullRequestContributions}</b> Pull Requests ⌚ Last Commit <b>${moment(stats.endedAt).toNow()}</b>

<br>
<center>

😊 I'm always looking for cool opportunities! Feel free to contact me throught Discord <b><konhi#1588></b> or <b>hello.konhi@gmail.com</b>
</center>
<br>

💛 JavaScript   💚 Node.js   💙 Python   🧡 Web Dev   💖 Open-source   🐧 Linux   🐱‍💻 Git   🎨 UI
</center>
`

fs.writeFileSync('readme.md', text)
