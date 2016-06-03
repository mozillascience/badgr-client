# Contribution Guidelines

## Reporting issues

- **Search for existing issues.** Please check to see if someone else has reported the same issue.
- **Share as much information as possible.** Include operating system and version, browser and version. Also, include steps to reproduce the bug.

## Project Setup

Refer to the [README](../README.md).

## Code Style

### Editor
Please use an editor with support for [ESLint](http://eslint.org/) and [EditorConfig](http://editorconfig.org/). Configuration
files for both tools are provided in the root directory of the project.

### JavaScript

See [Mozilla Foundation JavaScript Style Guide](https://www.npmjs.com/package/mofo-style)

This project does not currently fully support the latest
[mofo-style](https://www.npmjs.com/package/mofo-style) version because it is not a front end ES6 project.
At the moment it uses a modified version of _.eslintrc.yaml_, provided in the root directory, instead of using the file
inside _./node-modules/mofo-style/.eslintrc.yaml_.

**TL;DR** Run `npm run lint` before pushing a commit. It will validate your JS.

#### Variable Naming

- `lowerCamelCase` General variables
- `UpperCamelCase` Constructor functions
- Use semantic and descriptive variables names (e.g. `colors` *not* `clrs` or `c`). Avoid abbreviations except in cases of industry wide usage (e.g. `AJAX` and `JSON`).



## Testing

Any patch should be manually tested as much as possible.
You can run all automated tests with `mocha test/*` or `npm test`. If _mocha_ is not installed globally, please use `./node_modules/mocha/bin/mocha test/*`.

_Unit_ and _Integration_ tests can also be run separately with `npm run test:unit` and `npm run test:integration` respectively.

## Pull requests

- Try not to pollute your pull request with unintended changes – keep them simple and small. If possible, squash your commits.
- Try to share which browsers and devices your code has been tested in before submitting a pull request.
- If your PR resolves an issue, include **closes #ISSUE_NUMBER** in your commit message (or a [synonym](https://help.github.com/articles/closing-issues-via-commit-messages)).
- Review
    - If your PR is ready for review, another contributor will be assigned to review your PR within 1 business day
    - The reviewer will comment on the PR with a final r+ or r-, along with inline comments on the code (if any)
        - r-: address the comments left by the reviewer. Once you're ready to continue the review, ping the reviewer in a comment.
        - r+: You code will be merged to _dev_
