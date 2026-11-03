# Implementation Plan: Restructure `class-9 Express EJS` to `src/` + Move `sms.json` to `public/db/`

Move `controllers/`, `router/` (renamed `routes/`), `utils/`, and `views/` inside a `src/` folder. Move `sms.json` to `public/db/`. Keep `public/` and `app.js` at the project root. No logic changes.

---

## Target Folder Structure

```
class-9  Express EJS/
├── app.js                          ← stays at root
├── public/                         ← stays at root
│   ├── db/
│   │   └── sms.json                ← was sms.json at root
│   └── styles/
│       ├── input.css
│       └── output.css
├── src/
│   ├── controllers/                ← was controllers/
│   ├── routes/                     ← was router/
│   │   ├── homeRouter.js
│   │   ├── aboutRouter.js
│   │   ├── contactRouter.js
│   │   ├── contactPostRouter.js
│   │   └── notFoundRouter.js
│   ├── utils/                      ← was utils/
│   │   └── pathUtil.js
│   └── views/                      ← was views/
│       ├── home.ejs
│       ├── about.ejs
│       ├── contactFrom.ejs
│       ├── contactMassage.ejs
│       ├── notFound.ejs
│       └── partials/
│           ├── head.ejs
│           ├── nav.ejs
│           ├── footer.ejs
│           └── layout.ejs
└── package.json
```

---

## Files That Need Path Updates (logic unchanged)

### 1. [app.js](file:///home/pc/coding_Lab/personal/classes/%20Node/class-9%20%20Express%20EJS/app.js)
| Line | Old | New |
|---|---|---|
| `app.set('views', ...)` | `'views'` | `path.join(__dirname, 'src/views')` |
| Router requires | `'./router/homeRouter'` | `'./src/routes/homeRouter'` |
| (same for all 4 other routers) | | |

---

### 2. [contactPostRouter.js](file:///home/pc/coding_Lab/personal/classes/%20Node/class-9%20%20Express%20EJS/router/contactPostRouter.js)
| Line | Old | New |
|---|---|---|
| `filePath` | `path.join(__dirname, '../sms.json')` | `path.join(__dirname, '../../public/db/sms.json')` |

*(All other routers have no `__dirname` path references to fix.)*

---

### 3. [public/styles/input.css](file:///home/pc/coding_Lab/personal/classes/%20Node/class-9%20%20Express%20EJS/public/styles/input.css)
| Line | Old | New |
|---|---|---|
| `@source` | `"../../views/**/*.ejs"` | `"../../src/views/**/*.ejs"` |

---

## Steps

1. Create `src/` with `controllers/`, `routes/`, `utils/`, `views/` subfolders.
2. Move all files into their new locations.
3. Create `public/db/` and move `sms.json` into it.
4. Update `app.js` require paths and views path.
5. Update `contactPostRouter.js` `sms.json` path.
6. Update `input.css` `@source` path.
7. Recompile Tailwind CSS.
8. Remove old `controllers/`, `router/`, `utils/`, `views/` folders.
9. Verify the server boots without errors.
