from flask import Flask, request, jsonify
from openai import AzureOpenAI
from flask_cors import CORS
import json
import os
import fitz  
from werkzeug.utils import secure_filename
from pytube import YouTube
import re
app = Flask(__name__)
CORS(app)
jfbjfskajkbxjk
# Xác định đường dẫn đến tệp API key và endpoint
api_key_path = os.path.join(os.getcwd(), 'config', 'API_key.txt')
endpoint_path = os.path.join(os.getcwd(), 'config', 'endpoint_url.txt')

# Đọc khóa API và địa chỉ kết nối từ tệp
with open(api_key_path) as f:
    key = f.read().strip()  # loại bỏ khoảng trắng thừa nếu có
with open(endpoint_path) as f:
    endpoint = f.read().strip() 

# Loại bỏ các ký tự không in ASCII từ địa chỉ kết nối
endpoint = ''.join(char for char in endpoint if char.isprintable())

client = AzureOpenAI(
    api_key=key,
    api_version="2023-05-15",
    azure_endpoint=endpoint
)

outputs_json_path = os.path.join(os.getcwd(), 'config', 'outputs.json')

# Đọc dữ liệu từ tệp outputs.json
try:
    with open(outputs_json_path, 'r') as f:
        text_data = json.load(f)
    if not text_data:
        # Handle the case where the file is empty
        text_data = {}
except json.decoder.JSONDecodeError as json_error:
    # Handle the JSON decoding error
    print(f"Error decoding JSON in outputs.json: {json_error}")
    text_data = {}
except FileNotFoundError as file_not_found_error:
    # Handle the case where the file is not found
    print(f"outputs.json file not found: {file_not_found_error}")
    text_data = {}
except Exception as e:
    # Handle other unexpected errors
    print(f"Error reading outputs.json: {e}")
    text_data = {}

def process_pdf(file_path):
    doc = fitz.open(file_path)
    text = ''
    for page_num in range(doc.page_count):
        page = doc[page_num]
        text += page.get_text()
    return text
def youtube_audio_downloader(link):
    if 'youtube.com' not in link:
        print('Invalid YouTube link!')
        return None

    try:
        yt = YouTube(link)
        # Lấy thông tin về video mà không tải xuống
        video_info = {
            "title": yt.title,
            "author": yt.author,
            "description": yt.description
        }
        return video_info

    except Exception as e:
        print(f'Error fetching YouTube video info: {e}')
        return {"error": str(e)}
    
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        # Get user input from the request
        user_input = request.form.get('user_input', '')

        # Process uploaded file
        uploaded_file = request.files['file']
        if uploaded_file and uploaded_file.filename != '':
            file_path = os.path.join(os.getcwd(), 'uploads', secure_filename(uploaded_file.filename))
            uploaded_file.save(file_path)

            # Process PDF if the file is a PDF
            if file_path.endswith('.pdf'):
                pdf_text = process_pdf(file_path)
                user_input += f"\nPDF Text: {pdf_text}"
            # Process YouTube link
        youtube_link = request.form.get('youtube_link', '')
        if youtube_link:
            youtube_info = youtube_audio_downloader(youtube_link)
            if youtube_info and 'error' not in youtube_info:
                user_input += f"\nYouTube Video Info:\nTitle: {youtube_info['title']}\nAuthor: {youtube_info['author']}\nDescription: {youtube_info['description']}"
            elif youtube_info and 'error' in youtube_info:
                return jsonify({"error": f"Error processing YouTube link: {youtube_info['error']}"})

        # Make a chat completion request to OpenAI
        response = client.chat.completions.create(
            model="GPT35TURBO16K",
            messages=[
                {"role": "system", "content": "You are an AI Assistant that helps people find information"},
                {"role": "user", "content": user_input},
                {"role": "assistant", "content": str(text_data)}  # Convert to string
            ]
        )
        # print("JSON Response Data:", response.model_dump_json(indent=2))
        print("Assistant Response Content:", response.choices[0].message.content)

        # if "choices" in response.data:
        if hasattr(response, 'choices') and response.choices:
            # Trích xuất nội dung từ phản hồi OpenAI
            #  assistant_response = response.data["choices"][0]["message"]["content"]
            assistant_response = response.choices[0].message.content
             
        else:
            return jsonify({"error": "Invalid response format from OpenAI API"})

        # Update the response structure
        response_data = {
            "id": response.id,
            "assistant_response": response.choices[0].message.content
        }

        # Return the response as JSON
        # return jsonify({"json_response_data": response.model_dump_json(indent=2)})
        return jsonify({"json_response_data": response_data})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
