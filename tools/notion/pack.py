#!/usr/bin/env python3
"""Python 3.10+, standard library only. Read a file manifest from stdin; write ZIP bytes."""
import base64
import io
import json
import stat
import sys
import zipfile
from pathlib import PurePosixPath


def pack(files):
    output = io.BytesIO()
    seen = set()
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for entry in sorted(files, key=lambda value: value["path"]):
            name = entry["path"]
            path = PurePosixPath(name)
            if not name or path.is_absolute() or ".." in path.parts or "\\" in name or ":" in name or name in seen:
                raise ValueError("Unsafe or duplicate archive path")
            seen.add(name)
            info = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
            info.create_system = 3
            info.external_attr = (stat.S_IFREG | entry["mode"]) << 16
            info.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(info, base64.b64decode(entry["data"], validate=True))
    return output.getvalue()


if __name__ == "__main__":
    sys.stdout.buffer.write(pack(json.load(sys.stdin)))
