#!/usr/bin/env bash
# Packs one skill directory into a tar.gz that Notion's skill import accepts,
# and prints the two values the prepare step needs.
#
# Usage: scripts/pack-skill.sh <path-to-skill-dir> [out-dir]
#
# The archive root must be the skill directory itself, named exactly as the
# skill. macOS extended attributes are excluded: without that, tar adds
# ._AppleDouble entries and the import rejects them as unknown files.

set -euo pipefail

skill_dir=${1:-}
out_dir=${2:-${TMPDIR:-/tmp}}

if [ -z "$skill_dir" ]; then
  echo "usage: pack-skill.sh <path-to-skill-dir> [out-dir]" >&2
  exit 2
fi
if [ ! -f "$skill_dir/SKILL.md" ]; then
  echo "error: no SKILL.md in $skill_dir -- pass the skill directory itself, not its parent" >&2
  exit 2
fi

parent=$(cd "$skill_dir/.." && pwd)
name=$(basename "$skill_dir")
mkdir -p "$out_dir"
archive="$out_dir/$name.tar.gz"
rm -f "$archive"

( cd "$parent" && COPYFILE_DISABLE=1 tar --no-xattrs -czf "$archive" "$name" )

python3 - "$archive" <<'PY'
import base64, os, struct, sys, zlib
path = sys.argv[1]
data = open(path, 'rb').read()
if len(data) > 20 * 1024 * 1024:
    sys.exit(f"error: {path} is {len(data)} bytes, over Notion's 20 MiB limit")
print(f"archive         {path}")
print(f"content_length  {len(data)}")
print(f"checksum_crc32  {base64.b64encode(struct.pack('>I', zlib.crc32(data) & 0xffffffff)).decode()}")
PY
