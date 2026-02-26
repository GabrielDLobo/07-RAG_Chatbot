# 07-RAG_Chatbot (PDF RAG Chat)

A minimal **Retrieval-Augmented Generation (RAG)** chatbot that lets you **upload PDF files** and **chat with their content**.

The UI is built with **Streamlit**. PDFs are loaded with **PyPDFLoader**, split into chunks, embedded with **Hugging Face embeddings**, stored in **ChromaDB**, and queried using a **Groq-hosted LLM** via `langchain-groq`.

---

## Features

- Upload **one or multiple PDFs** (sidebar)
- Automatic PDF loading and chunking
- Vector search with **ChromaDB** (persisted locally in `db/`)
- Chat with conversation history (Streamlit session state)
- LLM inference using **Groq** (`ChatGroq`)

---

## Tech Stack (high level)

- Python + Streamlit
- LangChain (retrieval chain + prompt templates + text splitting)
- ChromaDB (vector database)
- Hugging Face embeddings (local embeddings)
- Groq LLMs (via LangChain integration)
- PyPDF (PDF parsing/loading)

---

## Project Structure

```text
.
├── app.py                # Streamlit app (RAG pipeline)
├── requirements.txt       # Python dependencies
├── README.md              # This file
├── db/                    # ChromaDB persistence directory (created/used at runtime)
├── media/                 # Images used in README
├── ayrfrier_manual.pdf    # Sample PDF
└── laptop_manual.pdf      # Sample PDF
```

---

## How It Works (Pipeline)

### 1) Ingestion (upload PDFs)
1. Each uploaded PDF is saved to a temporary file
2. `PyPDFLoader` loads the PDF into LangChain Documents
3. Text is chunked via `RecursiveCharacterTextSplitter` with:
   - `chunk_size=1000`
   - `chunk_overlap=400`
4. Chunks are embedded with `HuggingFaceEmbeddings()`
5. Vectors are stored in ChromaDB under the `db/` directory

### 2) Q&A (ask a question)
1. Your question is sent to a retrieval chain (`create_retrieval_chain`)
2. Chroma retrieves the most relevant chunks
3. Retrieved chunks are passed as `{context}` to the LLM prompt
4. The answer is shown in the chat UI

---

## Requirements

- Python 3.8+ (recommended: 3.10+)
- A **Groq API key**
- Disk space for embeddings and ChromaDB persistence

---

## Setup

### 1) Clone the repository

```bash
git clone https://github.com/GabrielDLobo/07-RAG_Chatbot.git
cd 07-RAG_Chatbot
```

### 2) Install dependencies

```bash
pip install -r requirements.txt
```

### 3) Configure environment variables

Create a `.env` file in the repository root:

```env
GROQ_API_KEY=your-groq-api-key-here
```

---

## Run Locally

```bash
streamlit run app.py
```

Open: http://localhost:8501

---

## Usage

1. Open the app
2. Upload one or more PDFs using the sidebar
3. Wait until indexing is finished
4. Select an LLM model in the sidebar
5. Ask questions in the chat input

---

## Available Models (current UI)

The app currently offers these options in the model dropdown:

- `llama-3.3-70b-versatile`
- `openai/gpt-oss-120b`

These identifiers are passed into `ChatGroq(model=...)`.

---

## Notes / Limitations

- **Groq is required** in the current codebase (the app uses `ChatGroq` directly).
- UI text and the system prompt are currently in **Portuguese**.
- The vector database persistence directory is fixed to `db/` in code.
- To re-index from scratch, delete the `db/` folder.

---

## Security

- Never commit `.env`
- Keep your API keys private

---

## Project Images

![alt text](</media/1.png>)
---
![alt text](</media/2.png>)
---
![alt text](</media/3.png>)
---
![alt text](</media/4.png>)