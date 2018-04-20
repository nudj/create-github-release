# Create Github Release

A Docker wrapped node script to automatically make a new Github release based on the latest tag. It will generate a basic set of release notes based on the commit messages between the penultimate and the latest tag, e.g.

```
- Add new user logic 43cd89a
- Rename visitor to lead b5894ac
```

## Requirements

- Docker
- [Github Access Token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
  - Requires full `repo` scope both public and private

## Usage

### Locally

- Pull the image
  - `docker pull nudj/create-github-release`
- Set your Github Access Token to an environment variable
  - `TOKEN=fb4u3fb493f...`
- Run the image passing in the repo your want to release
  - `docker run -it --rm -e TOKEN=$TOKEN nudj/create-github-release node . nudj/web`

### Codefresh

- Add the Github Access Token to the pipeline variables with name `GITHUB_ACCESS_TOKEN`
- Setup a step in your `codefresh.yml` with the following...

```
  github_release:
    title: Github Release
    description: Release the latest tag on Github
    image: nudj/create-github-release
    working_directory: 'IMAGE_WORK_DIR'
    environment:
      - TOKEN=${{GITHUB_ACCESS_TOKEN}}
    commands:
      - /bin/sh -c "node . ${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}"
```
