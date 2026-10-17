# Head textures for the extra faces (512px) and the body skin tint that matches each face.
import json
from PIL import Image
import numpy as np
H = "heads/dl/tex"; O = "rb/heads"
lin = lambda c: np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
def skin_med(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]; mx = a.max(-1); mn = a.min(-1); sat = (mx - mn) / np.maximum(mx, 1e-3)
    m = (r > g) & (g >= b - 0.02) & (r - b > 0.05) & (sat < 0.8) & (mx > 0.06)
    return np.median(lin(a[m]), axis=0)
body = np.asarray(Image.open("rb/body_k5.png").convert("RGB")).astype(np.float32) / 255
bodyskin = skin_med(body[500:1000, 0:250])
out = {}
for p in ["m300", "m006", "m007", "m102", "m130", "sm005", "m016", "m108"]:
    im = Image.open(f"{H}/{p}_head_color.tga" if p != "m300" else "rb/head_k5.png").convert("RGB")
    a = np.asarray(im.resize((1024, 1024))).astype(np.float32) / 255
    face = skin_med(a[300:560, 380:650])
    out[p] = [round(float(v), 3) for v in face / bodyskin]
    if p != "m300": im.resize((512, 512), Image.LANCZOS).save(f"{O}/{p}_head.png")
Image.open(f"{H}/m006_opacity_color.tga").convert("RGBA").resize((512, 512), Image.LANCZOS).save(f"{O}/m006_hair.png")
json.dump(out, open(f"{O}/tints.json", "w")); print(out)
