import secrets
import hashlib
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from io import BytesIO
import os
from django.conf import settings

def modify_pdf(filename, token, url):

    def add_text_to_page_bottom(page, text):
        packet = BytesIO()
        can = canvas.Canvas(packet)
        text_width = can.stringWidth(text, 'Helvetica', 12)
        # Position at the bottom
        can.drawString((page.mediabox[2] - text_width) / 2, 10, text)
        can.save()
        packet.seek(0)
        new_pdf = PdfReader(packet)
        page.merge_page(new_pdf.pages[0])
        return page

    # Open the existing PDF
    file_path = os.path.join(settings.MEDIA_ROOT, filename)
    existing_pdf = PdfReader(file_path, 'rb')

    output = PdfWriter()

    # Add text to the bottom of every page
    for page in existing_pdf.pages:
        page_with_text = add_text_to_page_bottom(page, token)
        output.add_page(page_with_text)

    # Define the path for the modified PDF
    output_folder = os.path.join(settings.MEDIA_ROOT, 'pdf')
    os.makedirs(output_folder, exist_ok=True)
    output_path = os.path.join(output_folder, f'{token}.pdf')

    # Save the result to a new file
    with open(output_path, 'wb') as f:
        output.write(f)


def generate_token(email):
    # Generate a random URL-safe token (16 bytes)
    random_token = secrets.token_urlsafe(16)
    combined = f"{random_token}-{email}"
    hashed = hashlib.sha256(combined.encode()).hexdigest()
    short_token = hashed[:10]  # Take the first 10 characters of the hash
    return short_token
