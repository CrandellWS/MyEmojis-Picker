#!/usr/bin/env python3
"""Create ZIP package for Chrome Web Store submission"""

import zipfile
import os

# Files to include in ZIP
files_to_zip = [
    'manifest.json',
    'content.js',
    'icon16.png',
    'icon48.png',
    'icon128.png'
]

# Create ZIP file
zip_name = 'myprize-emoji-picker.zip'
output_path = f'/home/aiuser/projects/myprize-emoji-picker/{zip_name}'

with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in files_to_zip:
        file_path = f'/home/aiuser/projects/myprize-emoji-picker/{file}'
        if os.path.exists(file_path):
            zipf.write(file_path, file)
            print(f"✓ Added: {file}")
        else:
            print(f"✗ Missing: {file}")

print(f"\n✓ ZIP package created: {zip_name}")
print(f"  Location: {output_path}")
print(f"  Size: {os.path.getsize(output_path)} bytes")
print("\n🚀 Ready to upload to Chrome Web Store!")
