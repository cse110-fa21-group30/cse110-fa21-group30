# Overview:
This is the deatiled documentation for the CI/CD pipeline we've constructed for this project.  

**This document includes:**
1. Lists of features that are planned for implementation
2. Lists of tools used for CI/CD pipeline
3. Lists of particular rules enforced by the linter
5. Descriptions for implemented functionalities
6. Overall workflow of this CI/CD pipeline

**For the detailed visual diagram and demo of this pipeine, check [video](admin/cipipeline/pipeline-demo1.mp4) and [diagram](admin/cipipeline/phase1.drawio.png)**

## Lists of features that are planed for implementation:
- [x] Linting and code style enforcement
- [x] Check code quality via tool
- [x] Check code quality via human review
- [x] Unit tests via automation
- [x] Documentation generation via automation
- [x] End to end testing

## Lists of tools used for this CI/CD Pipeline:
- Codacy
- ESLint
- Jest
- npm
- Node.js
- Github Actions
- Github pull request
- JSDoc

## Lists of particular rules enforced by linter: 
- indent
- linebreak-style
- quotes
- semi
- no-unused-vars
- no-const-assign
- no-extra-semi
- semi-spacing
- curly
- eqeqeq
- no-extra-boolean-cast
- no-redeclare

## Descriptions for implemented functionalities:

  - **Linting and code style enforcement via [ESLint](https://eslint.org/):** We implemented linting and style enforcement via ESLint, which can be customized to be well fitted for a variedty of types of coding files. Linting is useful for flaging programming errors and stylistic errors, such as inconsistency in terms of quotations marks or variables that are declared but never used. When new pull requests are created, the raw code would be linted first to minimize number of bugs and to make sure that the style can remain consistent in this repo. 

  - **Unit test:** After the pull requests has been checked for linting and style enforcement, a series of unit test would automatically run on the given pull request to see if desiered fucntions regarding the recipe management application can be fulfilled. Unlike E2E tests, units tests usually only test certain features of the application and would not require the application to run perfectly end to end, thus allowing us to implement small improvements piece by piece rather than finishing the entire application in one push. 

- **E2E test:** Other than unit tests, which focus on the performance of certain section of our application, we also designed E2E test cases to help us test the performance of the recipe management application as a whole. 

- **Human review**: After a series of checks and tests are performed on the given pull request, the approval of this pull requst depends on human review, which is performed by our team members. By enforcing such practice, conflicts among different pull requests can be forstalled and the final product presented in the repo would be better organized. Also, human reviews make sure that all desired features are covered, and new features that don't have test cases yet can be manually tested.

- **Code quality via Codacy:** Similar to Linting and Style enforcement, Codacy is used as the tool to analyze source code and give suggestions regarding potential problems of our codes, including code coverage, code duplication and code complexity for each pull request. After installing Codacy in this repo, we can monitor and discover potential issues through the separate dashboard provided by Codacy, which allows us to keep track of quality of the source code and minimize problems that could pose threats to qualtiy of our recipe management application. 

- **Documentation Generation via [JSDoc](https://jsdoc.app/):** Unlike the traditional appraoch which we manually make documentations for different features of our applications, we've implemented documentation generation automation in the CI/CD pipeline using JSDoc. With the help of JSDoc, we could generate documentations out of comments form the source code, which would come in handy when customers want to get familiar with what our application is capable of. 

## Overall workflow of this CI/CD pipeline: 
1. Raw codes are being commited and pushed to repo
2. Linter is activated and check is performed as needed
3. Corresponding Unit tests are run as needed
4. E2E tests are run if necessary
5. Codes are sent to Codacy for quality analysis
6. Pending for human review
7. Merge to branch 
