Bridge18 Web Single Page Application

## Build and run ##
    * clone repository
    * git submodule update
    * npm install
    * npm run build:libs
    * npm start

## *GIT* ##
### Branching ###
* master - stable sources deployed to `public` env
* develop - current unstable sources deployed to `sandbox` env
* staging - stable sources deployed to test before `public` env deployment
* `JIRA-ID` - branch to implement feature or to fix issue listed in Jira

All the development should be done at `JIRA-ID` branch.
After finishing development you should create pull request to `develop` branch.

### Commit comments
Commit comments should be written in `Smart commit` format.
The format is described at [Smart Commit Format](https://confluence.atlassian.com/jirasoftwarecloud/processing-issues-with-smart-commits-788960027.html).

Release Tags of master branch:
vX.Y.Z
X - major
Y - minor
Z - patch

## *Workflow, Contribution guidelines* ##

    * Creating branch name accordingly to "GIT Branch management" section. Pull requests with one branch but several features or bugs will be always declined
    * Actual development
    * Writing unit tests for business services or utils, integration tests for restful services or integration services
    * When ready to create pull request, run ci checks ('npm run ci'), ci steps can be run step by step with next commands
        - typescript lints - 'npm run lint'
        - style lints - 'npm run lint:style'
        - tests = 'nom run test'
    * Create pull request into `develop` branch, assign code-reviewer and after send PR url to code-reviewer through slack (@dev-webapp room)
    * Code reviewing & merging
        - on merge, code-reviewer has to notify QA team through slack (@dev-webapp room) that task is assinged to QA
        - on declining merge, code-reviewer has to notify developer through slack (@dev-webapp room) that PR was declined

## *Who do I talk to?* ##

All communication should be done through Slack
