import os
import pdfplumber
import pandas as pd

# Directory containing your PDFs
PDF_DIR = os.path.expanduser("~/Downloads/aapl-10k-site/assets/pdfs")

# Loop through all PDF files
for filename in os.listdir(PDF_DIR):
    if filename.lower().endswith(".pdf"):
        pdf_path = os.path.join(PDF_DIR, filename)
        parquet_path = os.path.join(PDF_DIR, filename.replace(".pdf", ".parquet"))
        print(f"Converting: {filename} → {os.path.basename(parquet_path)}")

        data = []
        try:
            with pdfplumber.open(pdf_path) as pdf:
                for i, page in enumerate(pdf.pages):
                    text = page.extract_text()
                    if text:
                        data.append({
                            "file_name": filename,
                            "page_number": i + 1,
                            "content": text.strip()
                        })

            if data:
                df = pd.DataFrame(data)
               	df.to_parquet(parquet_path, engine="fastparquet")
                print(f"✅ Saved {parquet_path}")
            else:
                print(f"⚠️ No text extracted from {filename}")

        except Exception as e:
            print(f"❌ Error processing {filename}: {e}")

print("\n🎉 Conversion complete!")

