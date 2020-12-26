# Scalable React Development Boilerplate

## Idea

- pull this repo
- set up with new AWS config / Circle CI config / Slack config
- enjoy three envs to develop new project on
  - hosted on AWS
  - with automated builds / releases managed by CircleCI

## Tech Stack

- AWS
  - S3 (storage)
  - Cloudfront (static / dynamic Content delivery)
- CircleCI
  - Build Pipeline(s)
  - Multiple env
    - [Dev](https://d25n348mtdlevv.cloudfront.net/)
    - [Staging](https://d25n348mtdlevv.cloudfront.net/)
    - [Prod](https://d33ny7kfd0joai.cloudfront.net/)
  - Slack Notification Integration
- React
- Redux
- Redux-Thunk
- React Router Dom
- Scss
- Axios
- Datefns

Coming Soon:

- MaterialUI
- I18n
- Semantic

## Quick Start

Prerequisites:

- Node

```bash
# Install Dependancies
npm i
# Run App
npm run start
```
