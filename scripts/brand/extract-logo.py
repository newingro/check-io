import sys
import numpy as np
from PIL import Image

src, outdir = sys.argv[1], sys.argv[2]
im = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
R, G, B = im[..., 0], im[..., 1], im[..., 2]
S = R + G + B

NAVY = np.array([11, 26, 42], np.float32)
TURQ = np.array([3, 184, 170], np.float32)
WHITE = np.array([255, 255, 255], np.float32)

from PIL import ImageFilter
strong = ((G > 90) & (G > R + 40)).astype(np.uint8) * 255
zone = Image.fromarray(strong).filter(ImageFilter.MaxFilter(11))
is_turq = np.asarray(zone) > 0
a_turq = np.clip((G - 10) / (TURQ[1] - 10), 0, 1)
a_navy = np.clip((S - 12) / (NAVY.sum() - 12), 0, 1)
alpha = np.where(is_turq, a_turq, a_navy)
alpha = np.asarray(Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(3))).astype(np.float32) / 255

# bounding boxes
mask = alpha > 0.5
rows = np.where(mask.any(1))[0]
cols = np.where(mask.any(0))[0]
print('full bbox rows', rows.min(), rows.max(), 'cols', cols.min(), cols.max())
# find vertical gap between wordmark and subtitle
row_has = mask.any(1)
gaps = []
inside = False
for y in range(rows.min(), rows.max() + 1):
    if not row_has[y] and not inside:
        start = y; inside = True
    elif row_has[y] and inside:
        gaps.append((start, y)); inside = False
print('gaps', gaps)
big = max(gaps, key=lambda g: g[1] - g[0])
word_bottom = big[0]
sub_top = big[1]

def save(name, color_navy, y0, y1, x0, x1, pad=6):
    rgb = np.where(is_turq[..., None], TURQ, color_navy)
    rgba = np.dstack([rgb, alpha * 255]).astype(np.uint8)
    y0 = max(0, y0 - pad); y1 = min(im.shape[0], y1 + pad)
    x0 = max(0, x0 - pad); x1 = min(im.shape[1], x1 + pad)
    crop = rgba[y0:y1, x0:x1]
    Image.fromarray(crop, 'RGBA').save(f'{outdir}/{name}.png', optimize=True)
    print(name, crop.shape)

top, bot = rows.min(), rows.max() + 1
left, right = cols.min(), cols.max() + 1
# wordmark-only horizontal bounds
wm = mask[top:word_bottom]
wcols = np.where(wm.any(0))[0]
save('logo-full', NAVY, top, bot, left, right)
save('logo-full-white', WHITE, top, bot, left, right)
save('logo-wordmark', NAVY, top, word_bottom, wcols.min(), wcols.max() + 1)
save('logo-wordmark-white', WHITE, top, word_bottom, wcols.min(), wcols.max() + 1)

# symbol: turquoise-only region ("iO")
tmask = mask & is_turq
tr = np.where(tmask.any(1))[0]; tc = np.where(tmask.any(0))[0]
print('symbol bbox', tr.min(), tr.max(), tc.min(), tc.max())
sym_alpha = np.where(is_turq, alpha, 0)
rgba = np.dstack([np.broadcast_to(TURQ, im.shape), sym_alpha * 255]).astype(np.uint8)
crop = rgba[tr.min():tr.max() + 1, tc.min():tc.max() + 1]
Image.fromarray(crop, 'RGBA').save(f'{outdir}/symbol.png', optimize=True)
print('symbol', crop.shape)
