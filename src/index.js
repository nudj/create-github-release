const octokit = require('@octokit/rest')()

const token = process.env.TOKEN
const ownerRepo = process.argv[2]
const [ owner, repo ] = ownerRepo.split('/')
const perPage = 100

octokit.authenticate({ type: 'token', token })

async function run () {
  try {
    const tagsResults = await octokit.repos.getTags({ owner, repo })
    const latestTag = tagsResults.data[0]
    const penultimateTag = tagsResults.data[1]

    const latestCommitResult = await octokit.repos.getCommit({
      owner,
      repo,
      sha: latestTag.commit.sha
    })
    const penultimateCommitResult = await octokit.repos.getCommit({
      owner,
      repo,
      sha: penultimateTag.commit.sha
    })

    const commitResults = await octokit.repos.getCommits({
      owner,
      repo,
      since: penultimateCommitResult.data.commit.committer.date,
      until: latestCommitResult.data.commit.committer.date,
      per_page: perPage
    })
    const releaseCommits = commitResults.data.slice(0, -1)

    const body = releaseCommits.map(commit => `- ${commit.commit.message} ${commit.sha}`).join('\n')
    await octokit.repos.createRelease({
      owner,
      repo,
      tag_name: latestTag.name,
      name: latestTag.name,
      body
    })

    console.log(`For release ${latestTag.name} the release notes (from ${penultimateTag.name}) are...`)
    console.log(body)
  } catch (error) {
    console.log('Release failed', error)
  }
}

run()
