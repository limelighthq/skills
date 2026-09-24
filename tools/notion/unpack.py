#!/usr/bin/env python3
"""Python 3.10+, stdlib only. Validate a complete skill ZIP without extracting files."""
import base64
import io
import json
import re
import stat
import sys
import zipfile

LIMIT = 20 * 1024 * 1024


def unpack(data):
    if len(data) > LIMIT:
        raise ValueError("Archive exceeds 20 MiB")
    files, seen, total = [], set(), 0
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        entries = archive.infolist()
        if len(entries) > 1000:
            raise ValueError("Too many archive entries")
        for entry in entries:
            name = entry.filename
            parts = name.rstrip("/").split("/")
            if (not name or any(p in ("", ".", "..") or p.lower() == ".git" for p in parts)
                    or re.search(r'[\\:\x00-\x1f<>"|?*]', name)
                    or any(p.endswith((".", " ")) for p in parts)
                    or name.casefold().rstrip("/") in seen):
                raise ValueError("Unsafe or duplicate archive path")
            seen.add(name.casefold().rstrip("/"))
            mode = entry.external_attr >> 16 if entry.create_system == 3 else 0
            kind = stat.S_IFMT(mode)
            if entry.is_dir():
                if kind not in (0, stat.S_IFDIR):
                    raise ValueError("Unsupported archive entry")
                continue
            if kind not in (0, stat.S_IFREG):
                raise ValueError("Only regular files are supported")
            total += entry.file_size
            if entry.file_size > 1024 * 1024 or total > LIMIT:
                raise ValueError("Expanded archive exceeds limits")
            content = archive.read(entry)
            files.append({"path": name, "mode": 0o755 if mode & 0o111 else 0o644,
                          "data": base64.b64encode(content).decode("ascii")})
    paths = {f["path"] for f in files}
    if any("/".join(f["path"].split("/")[:i]) in paths
           for f in files for i in range(1, len(f["path"].split("/")))):
        raise ValueError("File and directory collision")
    return sorted(files, key=lambda f: f["path"])


if __name__ == "__main__":
    json.dump(unpack(sys.stdin.buffer.read(LIMIT + 1)), sys.stdout)
