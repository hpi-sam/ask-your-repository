# esra
Coverage: [![Coverage Status](https://coveralls.io/repos/github/hpi-sam/ask-your-repository-api/badge.svg)](https://coveralls.io/github/hpi-sam/ask-your-repository-api)  Branch-Master:
[![CircleCI](https://circleci.com/gh/hpi-sam/ask-your-repository-api/tree/master.svg?style=svg)](https://circleci.com/gh/hpi-sam/ask-your-repository-api/tree/master)
## Setup
1. Install YARN: https://yarnpkg.com/lang/en/docs/install/
2. Clone the repository: `git clone https://github.com/hpi-sam/ask-your-repository-api.git`
3. Change directory into the repository folder: `cd esra`
4. Execute `yarn install` to install dependencies
5. Execute `yarn flow-typed install` to install types for all dependencies
5. Start developing and Have fun!
6. ???
7. Profit!

## Preconfigured project commands

If you have a look at the `package.json` you can see quite a few preconfigured 'scripts'.  
The most important one is `yarn start`. This basically executes everything you could wish for:
* Automatically starts builds on file change
* Automatically restarts the server on file change
* Automatically executes tests on file change
* Automatically runs ESLint on file change
* Automatically runs flow type check on file change

If you want to only do one of the above you can use: `yarn build`, `yarn serve`, `yarn test`, `yarn lint`, `yarn flow` respectively.  
For test and lint the commands `yarn tdd` and `yarn ldd` start a watcher to run them automatically on file change. `yarn build` and `yarn serve` are always running with a watcher.

## [Git Workflow](https://github.com/hpi-sam/BP2018HG1/wiki/Git-Workflow)
