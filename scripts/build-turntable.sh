#!/bin/bash
# Build the hero turntable frames (24 Oct 2026).
# Usage: build-turntable.sh <sex> <main.mp4> <mainDegrees> [<close.mp4> <closeDegrees>]
# Samples 48 frames evenly by angle across the clip(s), cuts each out with
# Apple Vision (scripts/lift, built from scripts/lift.swift), and writes
# public/3d/turn/<sex>/NN.webp (828x1108, alpha) plus poster-540.webp.
set -euo pipefail
SEX=$1; MAIN=$2; MAIN_DEG=$3; CLOSE=${4:-}; CLOSE_DEG=${5:-0}
ROOT=$(cd "$(dirname "$0")/.." && pwd)
LIFT=${LIFT:-$ROOT/scripts/lift}
OUT=$ROOT/public/3d/turn/$SEX
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"
N=48
dur() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
MD=$(dur "$MAIN"); CD=0; [ -n "$CLOSE" ] && CD=$(dur "$CLOSE")
TOTAL=$(echo "$MAIN_DEG + $CLOSE_DEG" | bc -l)
for i in $(seq 0 $((N-1))); do
  DEG=$(echo "$i * $TOTAL / $N" | bc -l)
  if (( $(echo "$DEG < $MAIN_DEG" | bc -l) )); then SRC=$MAIN; T=$(echo "$DEG / $MAIN_DEG * $MD" | bc -l)
  else SRC=$CLOSE; T=$(echo "($DEG - $MAIN_DEG) / $CLOSE_DEG * $CD" | bc -l); fi
  T=$(printf "%.4f" "$T"); NN=$(printf %02d $i)
  ffmpeg -v error -y -ss "$T" -i "$SRC" -frames:v 1 -vf "scale=828:1108:flags=lanczos" "$TMP/f.png"
  "$LIFT" "$TMP/f.png" "$TMP/m.png"
  ffmpeg -v error -y -i "$TMP/f.png" -i "$TMP/m.png" -filter_complex "[1:v]format=gray,scale=828:1108[a];[0:v][a]alphamerge" "$TMP/rgba.png"
  cwebp -quiet -q 74 -alpha_q 80 -m 6 "$TMP/rgba.png" -o "$OUT/$NN.webp"
  if [ $i -eq 0 ]; then cwebp -quiet -q 78 -alpha_q 85 -m 6 -resize 540 0 "$TMP/rgba.png" -o "$OUT/poster-540.webp"; fi
done
du -sh "$OUT"
