#!/usr/bin/env python3
"""
Generate multi-resolution responsive hero variants for Saul's Podship Scriptorium.
Produces:
  - <basename>-1920.webp / .jpg (desktop)
  - <basename>-1280.webp (tablet)
  - <basename>-portrait.webp (mobile 1080x1920: entire painting at full width,
    centred at 34% from top, padded above/below with blurred+darkened copy of itself)
  - <basename>-og.jpg (1200x630 social)
"""

import sys
import os
from PIL import Image, ImageFilter, ImageEnhance

def make_variants(input_path: str, output_dir: str, basename: str):
    if not os.path.exists(input_path):
        print(f"[ERROR] Source image not found: {input_path}")
        sys.exit(1)

    os.makedirs(output_dir, exist_ok=True)
    src = Image.open(input_path).convert('RGB')
    orig_w, orig_h = src.size

    print(f"Processing '{input_path}' ({orig_w}x{orig_h}) -> '{output_dir}/{basename}-*'")

    # 1. Desktop 1920 variants
    w_1920 = 1920
    h_1920 = int(round(w_1920 * orig_h / orig_w))
    img_1920 = src.resize((w_1920, h_1920), Image.Resampling.LANCZOS)
    
    out_1920_webp = os.path.join(output_dir, f"{basename}-1920.webp")
    out_1920_jpg = os.path.join(output_dir, f"{basename}-1920.jpg")
    img_1920.save(out_1920_webp, "WEBP", quality=86, method=6)
    img_1920.save(out_1920_jpg, "JPEG", quality=88, optimize=True)

    # 2. Tablet 1280 variant
    w_1280 = 1280
    h_1280 = int(round(w_1280 * orig_h / orig_w))
    img_1280 = src.resize((w_1280, h_1280), Image.Resampling.LANCZOS)
    out_1280_webp = os.path.join(output_dir, f"{basename}-1280.webp")
    img_1280.save(out_1280_webp, "WEBP", quality=85, method=6)

    # 3. Mobile Portrait (1080 x 1920)
    target_pw = 1080
    target_ph = 1920

    # Background: cover target canvas, heavy blur, darken
    scale_bg = max(target_pw / orig_w, target_ph / orig_h)
    bg_w = int(round(orig_w * scale_bg))
    bg_h = int(round(orig_h * scale_bg))
    bg_scaled = src.resize((bg_w, bg_h), Image.Resampling.LANCZOS)
    
    crop_x = (bg_w - target_pw) // 2
    crop_y = (bg_h - target_ph) // 2
    bg_crop = bg_scaled.crop((crop_x, crop_y, crop_x + target_pw, crop_y + target_ph))
    
    # Heavy Gaussian blur and darkening
    bg_blurred = bg_crop.filter(ImageFilter.GaussianBlur(radius=38))
    bg_darkened = ImageEnhance.Brightness(bg_blurred).enhance(0.40)

    # Foreground: entire uncropped painting at full width (1080px)
    fg_w = target_pw
    fg_h = int(round(target_pw * orig_h / orig_w))
    fg_img = src.resize((fg_w, fg_h), Image.Resampling.LANCZOS)

    # Centred at 34% from the top
    center_y = int(round(target_ph * 0.34))
    fg_y = center_y - (fg_h // 2)

    # Composite foreground on top of blurred darkened background
    portrait_canvas = bg_darkened.copy()
    portrait_canvas.paste(fg_img, (0, fg_y))

    out_portrait_webp = os.path.join(output_dir, f"{basename}-portrait.webp")
    portrait_canvas.save(out_portrait_webp, "WEBP", quality=85, method=6)

    # 4. Social / OG Image (1200 x 630)
    og_w = 1200
    og_h = 630
    scale_og = max(og_w / orig_w, og_h / orig_h)
    og_scaled = src.resize((int(round(orig_w * scale_og)), int(round(orig_h * scale_og))), Image.Resampling.LANCZOS)
    og_crop_x = (og_scaled.width - og_w) // 2
    og_crop_y = (og_scaled.height - og_h) // 2
    og_img = og_scaled.crop((og_crop_x, og_crop_y, og_crop_x + og_w, og_crop_y + og_h))
    out_og_jpg = os.path.join(output_dir, f"{basename}-og.jpg")
    og_img.save(out_og_jpg, "JPEG", quality=88, optimize=True)

    print(f"Generated variants successfully for {basename}:")
    print(f"  - {out_1920_webp} ({os.path.getsize(out_1920_webp)} bytes)")
    print(f"  - {out_1920_jpg} ({os.path.getsize(out_1920_jpg)} bytes)")
    print(f"  - {out_1280_webp} ({os.path.getsize(out_1280_webp)} bytes)")
    print(f"  - {out_portrait_webp} ({os.path.getsize(out_portrait_webp)} bytes, size={portrait_canvas.size})")
    print(f"  - {out_og_jpg} ({os.path.getsize(out_og_jpg)} bytes)")

if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("Usage: python3 scripts/make_hero_variants.py <source_image> <output_dir> <basename>")
        sys.exit(1)
    make_variants(sys.argv[1], sys.argv[2], sys.argv[3])
