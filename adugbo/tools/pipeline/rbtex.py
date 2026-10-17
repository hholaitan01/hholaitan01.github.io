# Skin to dark brown, kit areas to neutral grey (the game's shader paints team colours there).
import sys
from PIL import Image
import numpy as np
src = sys.argv[1]
def skin_mask(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx = a.max(-1); mn = a.min(-1); sat = (mx - mn) / np.maximum(mx, 1e-3)
    return (r > g) & (g >= b - 0.02) & (r - b > 0.13) & (sat < 0.78) & (mx > 0.12)
def recolor(a, m, base=np.array([0.29, 0.195, 0.145])):
    L = a @ np.array([0.2126, 0.7152, 0.0722])
    Lm = np.median(L[m])
    k = np.clip(L / Lm, 0, 2.2) ** 1.1
    out = a.copy(); out[m] = (base[None, :] * k[m][:, None])
    return np.clip(out, 0, 1), L
body = np.asarray(Image.open(f"{src}/m300_body_color.tga").convert("RGB")).astype(np.float32) / 255
m = skin_mask(body)
out, L = recolor(body, m)
grey = 0.35 + 0.5 * L
out[~m] = np.stack([grey[~m]] * 3, -1)
Image.fromarray((out * 255).astype(np.uint8)).resize((1024, 1024), Image.LANCZOS).save(f"{src}/body_k5.png")
head = np.asarray(Image.open(f"{src}/m300_head_color.tga").convert("RGB")).astype(np.float32) / 255
hm = skin_mask(head)
hout, _ = recolor(head, hm)
Image.fromarray((hout * 255).astype(np.uint8)).resize((1024, 1024), Image.LANCZOS).save(f"{src}/head_k5.png")
op = Image.open(f"{src}/m300_opacity_color.tga").convert("RGBA").resize((512, 512), Image.LANCZOS); op.save(f"{src}/hair_k5.png")
Image.open(f"{src}/m300_body_normal.tga").convert("RGB").resize((512, 512), Image.LANCZOS).save(f"{src}/body_n.png")
print("skin fraction body %.2f head %.2f" % (m.mean(), hm.mean()))
