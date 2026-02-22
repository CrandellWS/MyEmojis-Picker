#!/usr/bin/env python3
"""Generate icon files for MyPrize Emoji Picker Chrome Extension"""

from PIL import Image, ImageDraw, ImageFont
import os

# Output directory
output_dir = "/home/aiuser/projects/myprize-emoji-picker"

def create_slot_icon(size):
    """Create a slot machine themed icon with emoji"""
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Background circle - dark purple/blue gradient feel
    margin = max(2, size // 16)
    draw.ellipse(
        [margin, margin, size - margin, size - margin],
        fill=(139, 69, 255, 255),  # Purple
        outline=(255, 215, 0, 255),  # Gold border
        width=max(1, size // 32)
    )

    # Try to add slot emoji using a system font
    try:
        # For larger icons, try to use a font that supports emoji
        font_size = int(size * 0.6)

        # Try different font paths for emoji support
        font_paths = [
            "/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf",
            "/System/Library/Fonts/Apple Color Emoji.ttc",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
        ]

        font = None
        for font_path in font_paths:
            if os.path.exists(font_path):
                try:
                    font = ImageFont.truetype(font_path, font_size)
                    break
                except:
                    continue

        if font is None:
            font = ImageFont.load_default()

        # Draw slot emoji
        emoji = "🎰"

        # Get text bounding box
        bbox = draw.textbbox((0, 0), emoji, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]

        # Center the emoji
        x = (size - text_width) // 2
        y = (size - text_height) // 2 - bbox[1]

        draw.text((x, y), emoji, font=font, fill=(255, 255, 255, 255))

    except Exception as e:
        # Fallback: draw a simple slot machine representation
        # Three rectangles (reels)
        reel_width = size // 5
        reel_height = size // 2
        spacing = size // 15
        start_x = (size - (3 * reel_width + 2 * spacing)) // 2
        start_y = (size - reel_height) // 2

        for i in range(3):
            x = start_x + i * (reel_width + spacing)
            draw.rectangle(
                [x, start_y, x + reel_width, start_y + reel_height],
                fill=(255, 255, 255, 255),
                outline=(255, 215, 0, 255),
                width=max(1, size // 64)
            )

            # Draw a "7" on each reel
            seven_font_size = int(reel_width * 0.7)
            try:
                seven_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", seven_font_size)
            except:
                seven_font = ImageFont.load_default()

            seven_bbox = draw.textbbox((0, 0), "7", font=seven_font)
            seven_width = seven_bbox[2] - seven_bbox[0]
            seven_height = seven_bbox[3] - seven_bbox[1]

            seven_x = x + (reel_width - seven_width) // 2
            seven_y = start_y + (reel_height - seven_height) // 2 - seven_bbox[1]

            draw.text((seven_x, seven_y), "7", font=seven_font, fill=(220, 20, 60, 255))

    return img

# Generate all three sizes
for size in [16, 48, 128]:
    icon = create_slot_icon(size)
    icon.save(os.path.join(output_dir, f"icon{size}.png"))
    print(f"Created icon{size}.png")

print("\nAll icons generated successfully!")
