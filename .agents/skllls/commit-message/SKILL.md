---
name: commit-message
description: Draft a commit message from staged git changes. Use this when the user asks for a commit message for staged changes, asks to summarize staged diffs, or invokes /commit-message or $commit-message. Do not auto-commit unless the user explicitly approves.
---

## Purpose

Analyze the currently staged git changes and generate a commit message.

## Run these commands

```bash
git status
git diff --staged
```
