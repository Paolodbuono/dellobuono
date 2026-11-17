"""Genera gli asset del logo Dello Buono da images.jpg.

Il monogramma DB viene isolato con le componenti connesse (niente ritagli a
occhio), poi si producono:

  public/monogram.png   monogramma, sfondo trasparente
  public/logo-full.png  logo completo (DELLO + DB + BUONO), trasparente
  public/favicon.png    monogramma su disco bianco, angoli trasparenti
  public/favicon.ico    16/32/48 px

Uso:  python tools/prepare-logo.py
"""

from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets" / "logo-originale.jpg"
OUT = ROOT / "public"
INK_THRESHOLD = 200
# zona in cui vive il monogramma (le scritte e gli archi stanno fuori)
ZONE = (60, 80, 300, 320)
MIN_AREA = 400


def components(gray):
    w, h = gray.size
    px = gray.load()
    seen = bytearray(w * h)
    out = []
    for y in range(h):
        for x in range(w):
            idx = y * w + x
            if seen[idx] or px[x, y] >= INK_THRESHOLD:
                continue
            q = deque([(x, y)])
            seen[idx] = 1
            pixels = []
            x0, y0, x1, y1 = x, y, x, y
            while q:
                cx, cy = q.popleft()
                pixels.append((cx, cy))
                x0, y0 = min(x0, cx), min(y0, cy)
                x1, y1 = max(x1, cx), max(y1, cy)
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= nx < w and 0 <= ny < h:
                        i2 = ny * w + nx
                        if not seen[i2] and px[nx, ny] < INK_THRESHOLD:
                            seen[i2] = 1
                            q.append((nx, ny))
            out.append((pixels, (x0, y0, x1 + 1, y1 + 1)))
    return out


def alpha_layer(img, color, keep=None):
    """Sfondo bianco -> trasparente; opzionalmente tiene solo i pixel di `keep`."""
    rgb = img.convert("RGB")
    src = rgb.load()
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    dst = layer.load()
    for y in range(img.height):
        for x in range(img.width):
            if keep is not None and (x, y) not in keep:
                continue
            r, g, b = src[x, y]
            alpha = 255 - (r * 299 + g * 587 + b * 114) // 1000
            if alpha < 14:
                continue
            dst[x, y] = (*color, min(255, int(alpha * 1.08)))
    return layer


def square(layer, size, pad=0.06, background=None):
    content = layer.crop(layer.getbbox())
    side = int(max(content.size) * (1 + pad * 2))
    canvas = Image.new("RGBA", (side, side), background or (0, 0, 0, 0))
    canvas.paste(content, ((side - content.width) // 2, (side - content.height) // 2), content)
    return canvas.resize((size, size), Image.LANCZOS)


def main():
    img = Image.open(SRC).convert("RGB")
    gray = img.convert("L")

    comps = components(gray)
    keep = set()
    used = []
    for pixels, box in comps:
        cx, cy = (box[0] + box[2]) / 2, (box[1] + box[3]) / 2
        if len(pixels) < MIN_AREA:
            continue
        if not (ZONE[0] <= cx <= ZONE[2] and ZONE[1] <= cy <= ZONE[3]):
            continue
        keep.update(pixels)
        used.append((len(pixels), box))
    print("componenti del monogramma:", used)

    color = (0x2C, 0x1C, 0x68)
    OUT.mkdir(parents=True, exist_ok=True)

    mono = alpha_layer(img, color, keep)
    square(mono, 256).save(OUT / "monogram.png")

    full = alpha_layer(img, color)
    square(full, 384, pad=0.02).save(OUT / "logo-full.png")

    # favicon: monogramma su disco bianco, angoli trasparenti
    size = 192
    disc = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(disc).ellipse((4, 4, size - 5, size - 5), fill=(255, 255, 255, 255))
    mark = square(mono, int(size * 0.66))
    disc.paste(mark, ((size - mark.width) // 2, (size - mark.height) // 2), mark)
    disc.save(OUT / "favicon.png")
    disc.save(OUT / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

    print("scritti: monogram.png, logo-full.png, favicon.png, favicon.ico")


if __name__ == "__main__":
    main()
