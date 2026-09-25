# FileDropzone

A bordered upload box with a title, the browser's file input and a format line, as in Elliot's "Add a source" dialog.

## Consumer provides

- `label`: the box title. Default "Drop a file here, or browse".
- `hint`: the format line ("MP3, MP4, DOCX, PDF, Markdown and more · up to 2GB").
- `accept`, `name`, `ariaLabel` (D: "Source file"), `onChange(file)`.
- `error` after your own checks. Reuse D's strings: "Choose a file to add.", "Choose a file smaller than 2GB."
- Optional `disabled` with `disabledReason`.

## Anatomy

- Box: 74px tall, padding 9px, 1px `dropzone-border`, `radius-md`, white, 12px/18 text.
- File input: up to 180px wide. The native button is reset to plain text, so it reads "Choose File No file chosen" as in D.
- Format line: 9.6px in an 18px line (D's inline small at 0.8em of the box text).
- Error under the box: 12px/18 `ink`, `role="alert"`.

## States

- Empty, file chosen (the native input shows the file name), error, disabled (box at 0.5 with an opaque reason). D shows no drag-over state.

## Keyboard and accessibility

- Tab reaches the native file input. Enter or Space opens the file picker.
- A file dropped anywhere on the box is passed to `onChange`.

## D exceptions

- Border: D #DDDDDD (1.36:1). The DS uses `dropzone-border` #949494, the same neutral at 3:1. Rule: control borders 3:1.
- D defect: D accepts a drop only on the native input, although the box says "Drop a file here". The DS accepts it on the whole box.

## Do / Don't

- Do pair it with a "Paste a link" tab when a link is also accepted, as D does.
- Don't close the dialog on an invalid file. Show the error and keep the choice.
