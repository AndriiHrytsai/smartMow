## Workflow

1. Find a task in [Jira](https://jumedi.atlassian.net/browse "Issues")
2. In the task we take its name, for example: SA-15
3. Create a new branch from the dev branch | [Branch Style](#branch-style)
4. A developer completes the task, making commits sometimes | [Commit Style](#commit-style)
5. When the task is done, create a Pull Request in the dev branch
6. Making Assign on a Reviewer
7. The reviewer checks how the task is completed
8. The reviewer makes notes (Optional)
9. The developer fixes bugs (Optional)
10. The reviewer makes a Merge Request to the dev branch
11. The developer will return to point 1

## Branch Style:
When you create a new branch, you should use the syntax below:

```html
<!-- Style -->
<preffix>/<taskName>_<description>
```

> preffix -> one of the options: [feat, bug, ref, doc] -> [feature, refactoring, bug, documentation]

> taskName -> you can find the issue number here in [Jira](https://jumedi.atlassian.net/browse "Issues")

> description -> a short description of the task

```html
<!-- Example: -->
feat/SA-10_registration
bug/SA-15_login
ref/SA-20_settings
doc/SA-35_help
```

## Commit Style:
When you create a new commit, you should use the syntax below:

```html
<!-- Style -->
<preffix>(<taskName>): <description>
```

> preffix -> one of the options: [feat, ref, fiix, doc] -> [feature, refactoring, fixing, documentation]

> taskName -> you can find the issue number here in [Jira](https://jumedi.atlassian.net/browse "Issues")

> description -> a description of what you did for this task

```html
<!-- Example: -->
feat(SA-10): added translate service
fix(SA-15): fixed styles for the home page
ref(SA-20): moved styles to global
doc(SA-30): added comments for the settings page
```
