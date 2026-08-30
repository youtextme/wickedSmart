# POS contract folder (thin)

This repo does **not** vendor the Prompt OS kernel. It holds **repo-local contracts** only.

| File | Purpose |
|------|---------|
| `need.md` | Frozen Need for the active change (success, kill, boundary, DoD) |

**Upstream (source of truth):**

- Repo: https://github.com/youtextme/prompt-operating-system
- Docs: https://youtextme.github.io/prompt-operating-system/

Install kernel locally (optional):

```bash
curl -fsSL https://raw.githubusercontent.com/youtextme/prompt-operating-system/main/install.sh | bash
```

For each non-trivial change, write or update `pos/need.md` **before** product code.
