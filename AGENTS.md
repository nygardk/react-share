# Maintainer Instructions

## Workflow

- Make granular semantic commits.
- Prefer amending the relevant existing commit instead of stacking follow-up cleanup commits when refining in-flight work.

## Changesets

- Add changesets for all changes that result in change in the library's exposed API.
- Keep each changeset in the same commit as the code change it describes.
- Do not add changesets for internal-only tooling, test, build, or documentation refactors unless they change released behavior.
- In changesets, mention the related GitHub issue or pull request when the change is based on one, and include the reason for the fix.
- Follow semantic versioning in changes:
  - Major version for breaking changes.
  - Minor version for new features and deprecated features.
  - Patch version for bug fixes.

## Commit Messages

- When a fix is based on a GitHub issue or pull request, mention that issue or pull request in the commit message body.
- Include enough context in the commit message to explain why the change was made, not just what changed.

## Tests

- Cover all features and edge cases.
- When fixing a bug, write a test that fails without the fix and passes with the fix.
