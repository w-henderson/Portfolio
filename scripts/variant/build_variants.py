import os
import re
from pathlib import Path

PROJECT_DIR = os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir, os.pardir, os.pardir))
DIST_DIR = os.path.join(PROJECT_DIR, "dist")

def process_variants(content):
    """Process variant tags and return default content and variant files."""
    # Find all variant tags with their content
    variant_pattern = r'<variant\s+name="([^"]+)"[^>]*>(.*?)</variant>'
    all_variants = re.findall(variant_pattern, content, re.DOTALL | re.IGNORECASE)
    
    if not all_variants:
        return content, {}
    
    # Get unique variant names
    unique_variant_names = list(set(name for name, _ in all_variants))
    
    # Process default content - keep only "default" variants, remove all others
    default_content = content
    
    # Replace all variant tags one by one
    def replace_variant_tags(text, target_variant_name):
        def replacer(match):
            variant_name = match.group(1)
            variant_content = match.group(2).strip()
            
            if variant_name.lower() == target_variant_name.lower() and variant_content:
                return f'<p>{variant_content}</p>'
            else:
                return ''
        
        return re.sub(r'<variant\s+name="([^"]+)"[^>]*>(.*?)</variant>', 
                     replacer, text, flags=re.DOTALL | re.IGNORECASE)
    
    # Helper function to clean up empty <p> tags
    def clean_empty_paragraphs(text):
        # Remove empty <p> tags (with optional whitespace)
        return re.sub(r'<p>\s*</p>', '', text, flags=re.IGNORECASE)
    
    # Create default content
    default_content = replace_variant_tags(content, 'default')
    default_content = clean_empty_paragraphs(default_content)
    
    # Create variant files
    variant_files = {}
    for variant_name in unique_variant_names:
        if variant_name.lower() != 'default':
            variant_content = replace_variant_tags(content, variant_name)
            variant_content = clean_empty_paragraphs(variant_content)
            
            # Add robots noindex meta tag to variant pages
            if '<head>' in variant_content.lower():
                variant_content = re.sub(
                    r'(<head[^>]*>)',
                    r'\1\n    <meta name="robots" content="noindex">',
                    variant_content,
                    flags=re.IGNORECASE
                )
            
            variant_files[variant_name] = variant_content
    
    return default_content, variant_files

for root, dirs, files in os.walk(DIST_DIR):
    for file in files:
        if file == "index.html":
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                if '<variant' in content.lower():
                    relative_path = os.path.relpath(file_path, PROJECT_DIR)
                    print(f"Processing variants in: {relative_path}")
                    
                    # Process the variants
                    default_content, variant_files = process_variants(content)
                    
                    # Write the default content back to the original file
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(default_content)
                    
                    # Create variant files
                    base_dir = os.path.dirname(file_path)
                    for variant_name, variant_content in variant_files.items():
                        variant_file_path = os.path.join(base_dir, f"{variant_name}.html")
                        with open(variant_file_path, 'w', encoding='utf-8') as f:
                            f.write(variant_content)
                        print(f"Created variant file: {os.path.relpath(variant_file_path, PROJECT_DIR)}")
                        
            except Exception as e:
                print(f"Error processing {file_path}: {e}")