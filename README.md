# RAG Chatbot

<div align="center">

A Streamlit RAG chatbot to upload PDFs and chat with their content using LangChain, ChromaDB, and Groq.

<p>
	<a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/" target="_blank" rel="noopener noreferrer">Open documentation</a>
	·
	<a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/" target="_blank" rel="noopener noreferrer">Documentation map</a>
	·
	<a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/getting-started/" target="_blank" rel="noopener noreferrer">Getting started</a>
</p>

</div>

---

## Documentation

The full project documentation is published on a separate site and opens outside GitHub:

<a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/" target="_blank" rel="noopener noreferrer">https://gabrieldlobo.github.io/07-RAG_Chatbot/</a>

### Documentation map

| Section | Link | Description |
|-------|------|-----------|
| Overview | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/" target="_blank" rel="noopener noreferrer">Open</a> | Project overview and useful shortcuts |
| Getting Started | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/getting-started/" target="_blank" rel="noopener noreferrer">Open</a> | Prerequisites, installation, and run instructions |
| Configuration | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/configuration/" target="_blank" rel="noopener noreferrer">Open</a> | Environment variables and setup options |
| Project Structure | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/project-structure/" target="_blank" rel="noopener noreferrer">Open</a> | Repository organization |
| Guidelines | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/guidelines/" target="_blank" rel="noopener noreferrer">Open</a> | Code and documentation standards |
| Development | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/development/" target="_blank" rel="noopener noreferrer">Open</a> | Development workflow |
| Testing | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/testing/" target="_blank" rel="noopener noreferrer">Open</a> | Testing strategy and commands |
| API Endpoints | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/api-endpoints/" target="_blank" rel="noopener noreferrer">Open</a> | API technical reference |
| System Modeling | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/system-modeling/" target="_blank" rel="noopener noreferrer">Open</a> | Architecture and data flow |
| Authentication & Security | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/authentication-security/" target="_blank" rel="noopener noreferrer">Open</a> | Security and best practices |
| Deployment | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/deployment/" target="_blank" rel="noopener noreferrer">Open</a> | Publishing and deployment |
| Contributing | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/contributing/" target="_blank" rel="noopener noreferrer">Open</a> | How to contribute |
| Release Notes | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/release-notes/" target="_blank" rel="noopener noreferrer">Open</a> | Version history |

### Local preview

```bash
pip install -r requirements_dev.txt
mkdocs serve -a 127.0.0.1:8001
```

Abra <a href="http://127.0.0.1:8001/" target="_blank" rel="noopener noreferrer">http://127.0.0.1:8001/</a> no navegador.
Open <a href="http://127.0.0.1:8001/" target="_blank" rel="noopener noreferrer">http://127.0.0.1:8001/</a> in your browser.

---

## Overview

This project lets users upload PDF files and chat with the content in natural language. The main flow uses ChromaDB for vector persistence, LangChain for orchestration, Hugging Face embeddings for semantic retrieval, and Groq for answer generation.

---

## Features

- Upload one or more PDF files
- Automatic chunking for indexing
- Semantic retrieval with conversation history
- LLM-generated responses with Groq
- Local persistence in `db/`
- Lightweight Streamlit interface

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| UI | Streamlit |
| RAG orchestration | LangChain |
| Vector database | ChromaDB |
| Embeddings | Hugging Face |
| LLM | Groq |
| PDF parsing | pypdf |
| Configuration | python-dotenv and python-decouple |

---

## Project structure

```text
.
├── app.py
├── db/
├── docs/
├── media/
├── mkdocs.yml
├── pyproject.toml
├── requirements.txt
├── requirements_dev.txt
└── README.md
```

---

## Getting started

### Prerequisites

- Python 3.11 or higher
- Git
- A valid Groq API key

### Local run

```bash
git clone https://github.com/GabrielDLobo/07-RAG_Chatbot.git
cd 07-RAG_Chatbot
python -m venv venv
```

Activate the virtual environment:

- Windows: `venv\Scripts\activate`
- macOS/Linux: `source venv/bin/activate`

Install dependencies and run the application:

```bash
pip install -r requirements.txt
streamlit run app.py
```

Create a `.env` file at the project root with your Groq key:

```bash
GROQ_API_KEY=your-groq-api-key-here
```

---

## Development

```bash
pip install -r requirements_dev.txt
black .
isort .
flake8
pytest
```

---

## License

This project is licensed under the MIT License.
