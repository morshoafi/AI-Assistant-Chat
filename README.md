# AI Assistant Chat Application

A professional AI-powered chat platform that provides a seamless, context-aware conversational experience. It bridges a modern React frontend with a robust Python backend to deliver intelligent responses.

## 🔗 Repository
You can find the source code for this project here: https://github.com/morshoafi/AI-Assistant-Chat

## 🚀 Features
- **Intelligent Conversations:** Powered by OpenAI GPT-4o API for high-quality, human-like responses.
- **Context-Aware:** Maintains chat history via `session_id` to ensure fluid dialogue.
- **Modern UI:** Responsive and clean interface designed for focus.
- **Full-Stack Architecture:** Efficient communication between FastAPI backend and React frontend.

## 🛠️ Technical Stack
* **Frontend:** React (TypeScript), Vite, Axios.
* **Backend:** Python, FastAPI, Uvicorn.
* **Database:** MySQL.
* **Integration:** OpenAI API.

## ⚙️ How to Run

### Prerequisites
- Python 3.x installed.
- Node.js & npm installed.
- MySQL database configured.

### Backend Setup
1. Navigate to the `Backend` folder.
2. Activate your virtual environment (e.g., `env\Scripts\activate`).
3. Install dependencies: `pip install -r requirements.txt`.
4. Create a `.env` file and add your `OPENAI_API_KEY` and database credentials.
5. Run the server: `py src/app.py`.

### Frontend Setup
1. Navigate to the `Frontend` folder.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.

### Database Setup
1. Open **MySQL Workbench**.
2. Click on the **Server** menu at the top and select **Data Import**.
3. In the **Data Import** tab, select **Import from Self-Contained File**.
4. Click the `...` button to select the `chatgpt.sql` file located in your project's `Database` folder.
5. Ensure the **Default Target Schema** is set correctly (or click **New** to create your database schema).
6. Click the **Start Import** button at the bottom right to complete the process.

---
*Created by Mor Shoafi*