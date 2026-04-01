# Getting Started

This guide covers everything you need to know to get the RAG Chatbot up and running.

---

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)

---

## Overview

**RAG Chatbot** is a Retrieval-Augmented Generation application that enables users to upload PDF documents and chat with their content. The system retrieves relevant information from uploaded documents and uses a Large Language Model (LLM) to generate accurate, context-aware responses.

### Key Features

| Feature | Description |
|---------|-------------|
| 📄 PDF Upload | Upload single or multiple PDF files for processing |
| 🔍 Vector Search | Semantic search using ChromaDB vector store |
| 💬 Conversational UI | Chat interface with conversation history |
| 🤖 LLM Integration | Powered by Groq LLMs (Llama 3.3, GPT-OSS) |
| 📦 Persistent Storage | Vector embeddings stored locally in `db/` directory |
| 🎯 Context-Aware Responses | Answers grounded in document content |

---

## Prerequisites

Before you begin, ensure you have the following:

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| Python | 3.8+ (recommended: 3.10+) | Runtime environment |
| pip | Latest | Package manager |
| Git | Latest | Version control |

### API Keys

| Service | Required | Purpose |
|---------|----------|---------|
| Groq API | ✅ Yes | LLM inference |

### Hardware Requirements

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| RAM | 4 GB | 8 GB |
| Disk Space | 1 GB | 5 GB+ (for vector storage) |
| CPU | Any modern processor | Multi-core recommended |

### Knowledge Requirements

- Basic Python knowledge
- Familiarity with command line
- Understanding of API keys and environment variables

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/GabrielDLobo/07-RAG_Chatbot.git
cd 07-RAG_Chatbot
```

### Step 2: Create Virtual Environment (Recommended)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Create .env file
echo GROQ_API_KEY=your-groq-api-key-here > .env
```

Or manually create the file:

```env
GROQ_API_KEY=your-groq-api-key-here
```

### Step 5: Obtain Groq API Key

1. Visit [Groq Console](https://console.groq.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key
5. Copy the key to your `.env` file

---

## Quick Start

### Running the Application

```bash
streamlit run app.py
```

The application will open in your default browser at `http://localhost:8501`.

### First Use

1. **Upload PDFs**: Use the sidebar to upload one or more PDF files
2. **Wait for Processing**: The system will automatically chunk and index your documents
3. **Select Model**: Choose an LLM model from the dropdown in the sidebar
4. **Start Chatting**: Type your questions in the chat input

### Example Workflow

```
1. Upload "laptop_manual.pdf"
2. Wait for processing confirmation
3. Select "llama-3.3-70b-versatile" model
4. Ask: "How do I reset the laptop?"
5. Receive context-based answer from document
```

---

## Verification

To verify the installation is working:

1. Check that the `db/` directory is created after first run
2. Verify PDF upload works without errors
3. Confirm chat responses are generated
4. Check conversation history persists during session

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `GROQ_API_KEY` error | Ensure `.env` file exists and contains valid API key |
| Import errors | Run `pip install -r requirements.txt` again |
| Port 8501 in use | Use `streamlit run app.py --server.port 8502` |
| PDF not processing | Check file is valid PDF and not corrupted |

### Getting Help

- Review [Configuration](configuration.md) guide
- Open an issue on GitHub

---

## Next Steps

- [Configuration Guide](configuration.md) - Learn about environment variables
- [Project Structure](project-structure.md) - Understand the codebase
- [Development Guide](development.md) - Start contributing
