# How to contribute to food-pantry-app

Welcome!  As an open source project, contributions are welcome to help make the project better.  Generally, contributions fall into the following categories:

## Bug reports
If something is not working the way you expect, or the way it was intended and needs to be fixed, please open an issue https://github.com/ncosd/food-pantry-app/issues/new/choose following the Bug Report template.   Information about how to reproduce the bug is essential to ensure it is fixed as fast as possible.

## Feature Requests
If something is missing, and you really think it should be added, then open an https://github.com/ncosd/food-pantry-app/issues/new/choose for a Feature Request.  If you plan to create a pull request and build it, please call that out in the issue.

## Questions
Not sure how something works?  Ask a question by [Opening a Question Issue](https://github.com/ncosd/food-pantry-app/issues/new/choose).

# Getting Started
To get started running the Food Pantry App locally, follow the instructions for setting up your [development environment](https://github.com/ncosd/food-pantry-app?tab=readme-ov-file#developing).

To contribute code, you should fork the https://github.com/ncosd/food-pantry-app repository and develop your fix in a branch other than `main`.  Then open a pull request from your branch to `ncosd/food-pantry-app/branches/main`.

## Development workflow
Branch `stable` holds the current stable version of the project.   Each release is tagged with a version number like `v1.7.0`.

Work done between releases is done on `main`.  If you are working on code, it is a good practice to create a branch from the `main` branch.  Usually name your branch something like `issue#-short-description-in-a-word-or-two` and do your work there.  When you open a pull request, target it at the `ncosd/food-pantry-app/branches/main` branch to have it included in the next release.

When opening a pull request, also add a line in the Release Notes page for that version.  The page is prepared at the beginning of a development sprint on `main` after a release is made.

- Admin: https://github.com/ncosd/food-pantry-app/blob/main/web/admin/src/views/ReleaseNotesPage.vue
- App: https://github.com/ncosd/food-pantry-app/blob/main/web/app/src/views/ReleaseNotesPage.vue

To summarize, the steps you take are:

1. Fork the repo https://github.com/ncosd/food-pantry-app
2. Clone your fork

```git
    git clone git@github.com:yourname/food-pantry-app
```

3. Create a branch off `main`

```git
    git checkout main
    git checkout -b my-work
    git push -u origin my-work
```

4. Do your work, don't forget to add to the release notes.

5. Open a pull request from `my-work` to `ncosd/main` https://github.com/ncosd/food-pantry-app/compare/main...your-name:food-pantry-app:my-work



# Pull Requests
Pull requests are welcome, and will be reviewed.   If you are new to open source development there are many resources on github, and [this guide](https://github.com/freeCodeCamp/how-to-contribute-to-open-source) can be helpful with getting started.
