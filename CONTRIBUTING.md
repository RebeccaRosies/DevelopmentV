# Contributing

We would ❤️ if you contributed to the project. All contributions are welcome, including features, issues, documentation, guides, and more.

## Found a bug?

If you find a bug in the source code, you can help us by [submitting an issue](https://github.com/RebeccaRosies/DevelopmentV/issues) to our GitHub Repository. Even better, you can submit a Pull Request with a fix.

## Missing a feature?

If you'd like to implement a new feature, it's always good to be in touch with us before you invest time and effort, since not all features can be supported.

- Features can be crafted and directly submitted as a Pull Request.

## What do you need to know to help?

If you want to help out with a code contribution, our project uses the following stack:

- [Node.JS](https://nodejs.org/)
- [Jest](https://docs.nestjs.com/fundamentals/testing) (for testing)
- [Supertest](https://www.npmjs.com/package/supertest) (for API testing)
- [Docker](https://www.docker.com/)

## Open to community

You can check all the issues that are open for community contributions. Check [here](https://github.com/RebeccaRosies/DevelopmentV/issues)

# How do I make a code contribution?

## Step 1: Make a fork

Fork the Amplication repository to your GitHub organization. This means that you'll have a copy of the repository under _your-GitHub-username/repository-name_.

## Step 2: Clone the repository to your local machine

```
git clone https://github.com/{your-GitHub-username}/amplication.git

```

## Step 3: Prepare the development environment

Set up and run the development environment on your local machine:

**BEFORE** you run the following steps make sure:
1. You are using node version: ^16.3.0 || ^14.0.0"
2. You are using npm version: ^8.1.0 || ^7.3.0"
3. You have `docker` installed and running on your machine

```shell
docker-compose build
docker-compose up
```

```shell
cd images/api
npm init -y
npm run test
```

```shell
cd images/ThreeJS_WebContent
npm init -y
npm run 
```

## Step 4: Create a branch
Create a new branch for your changes.
In order to keep branch names uniform and easy-to-understand, please use the following conventions for branch naming.
Generally speaking, it is a good idea to add a group/type prefix to a branch.
Here is a list of good examples:
- for docs change : docs/{ISSUE_NUMBER}-{CUSTOM_NAME} for e.g. docs/2233-update-contributing-docs
- for new features : feat/{ISSUE_NUMBER}-{CUSTOM_NAME} for e.g. feat/1144-add-plugins
- for bug fixes : fix/{ISSUE_NUMBER}-{CUSTOM_NAME} for e.g. fix/9878-fix-invite-wrong-url


```jsx
git checkout -b branch-name-here
```

## Step 5: Make your changes

Update the code with your bug fix or new feature.

## Step 6: Add the changes that are ready to be committed

Stage the changes that are ready to be committed:

```jsx
git add .
```

## Step 7: Commit the changes (Git)

Commit the changes with a short message. (See below for more details on how we structure our commit messages)

```jsx
git commit -m "<type>: <subject>"
```

## Step 8: Push the changes to the remote repository

Push the changes to the remote repository using:

```jsx
git push origin branch-name-here
```

## Step 9: Create Pull Request

In GitHub, do the following to submit a pull request to the upstream repository:

1.  Give the pull request a title and a short description of the changes made. Include also the issue or bug number associated with your change. Explain the changes that you made, any issues you think exist with the pull request you made, and any questions you have for the maintainer.

2.  Wait for the pull request to be reviewed by a maintainer.

3.  Make changes to the pull request if the reviewing maintainer recommends them.

Celebrate your success after your pull request is merged :-)

## Git Commit Messages

We structure our commit messages like this:

```
<type>: <subject>
```

Example

```
fix: missing entity on init
```

### Types:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Changes to the documentation
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation*

## Code of conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

[Code of Conduct](https://github.com/RebeccaRosies/DevelopmentV/blob/main/CODE_OF_CONDUCT.md)