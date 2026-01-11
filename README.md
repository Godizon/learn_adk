<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Run with Docker for ease

**Prerequisites:**  Docker


1. Clone the repo
2. Build the Docker image:
   `docker build -t adk-learning-hub .`
3. Run the imgae:
   `docker run -p 8000:8000 adk-learning-hub`


