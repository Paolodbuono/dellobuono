"""Analizza images.jpg: trova le componenti connesse (monogramma, lettere, archi)."""

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images.jpg"
INK_THRESHOLD = 200


def main():
    img = Image.open(SRC).convert("L")
    w, h = img.size
    px = img.load()
    seen = bytearray(w * h)
    comps = []

    for y in range(h):
        for x in range(w):
            idx = y * w + x
            if seen[idx] or px[x, y] >= INK_THRESHOLD:
                continue
            q = deque([(x, y)])
            seen[idx] = 1
            area = 0
            x0, y0, x1, y1 = x, y, x, y
            while q:
                cx, cy = q.popleft()
                area += 1
                x0, y0 = min(x0, cx), min(y0, cy)
                x1, y1 = max(x1, cx), max(y1, cy)
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= nx < w and 0 <= ny < h:
                        i2 = ny * w + nx
                        if not seen[i2] and px[nx, ny] < INK_THRESHOLD:
                            seen[i2] = 1
                            q.append((nx, ny))
            comps.append((area, (x0, y0, x1 + 1, y1 + 1)))

    comps.sort(reverse=True)
    print(f"immagine {w}x{h} — {len(comps)} componenti")
    for area, box in comps[:14]:
        cx, cy = (box[0] + box[2]) / 2, (box[1] + box[3]) / 2
        print(f"  area={area:6d}  box={box}  centro=({cx:.0f},{cy:.0f})")


if __name__ == "__main__":
    main()
