# 07-RAG_Chatbot

A Retrieval-Augmented Generation application that allows users to interact with PDF documents through a conversational chat interface.  Built with Streamlit, this project uses LLMs hosted on Groq for response generation and Hugging Face embeddings for local semantic search, providing an intuitive and interactive document exploration experience.

## Main Features

- PDF document upload and processing
- Interactive chat interface powered by Streamlit
- Retrieval-Augmented Generation for accurate responses
- Local semantic search using Hugging Face embeddings
- Multiple LLM provider support (Groq, OpenAI, Ollama)
- ChromaDB vector database for efficient document retrieval
- Conversation history and context awareness
- Real-time document indexing and search
- Support for multiple PDF documents simultaneously

---

## Table of Contents

- [Technologies](#technologies)
- [Requirements](#requirements)
- [Setup Instructions](#setup-instructions)
- [Running Locally](#running-locally)
- [Usage](#usage)
- [Configuration](#configuration)
- [License](#license)

---

## Technologies

This project leverages the following key technologies:

- **Frontend**:
  - Streamlit 1.49.1
  - Altair 5.5.0 (for visualizations)
  
- **AI & Machine Learning**:
  - Groq 0.31.1
  - OpenAI 1.108.1
  - Ollama 0.5.4
  - LangChain 0.3.27
  - LangChain Community 0.3.29
  - LangChain Groq 0.3.8
  - LangChain OpenAI 0.3.33
  - LangChain Ollama 0.3.8

- **Vector Store & Embeddings**:
  - ChromaDB 1.1.0
  - Sentence Transformers 5.1.1
  - Hugging Face Hub 0.35.0
  
- **Document Processing**:
  - PyPDF 6.1.0
  - LangChain Text Splitters 0.3.11

- **Data Processing**:
  - Pandas 2.3.2
  - NumPy 2.3.3
  - PyArrow 21.0.0
  
- **Additional Libraries**:
  - python-dotenv 1.1.1
  - python-decouple 3.8
  - requests 2.32.5

---

## Requirements

Make sure you have the following installed:

- Python 3.8+
- pip (Python package manager)
- Groq API key (or OpenAI/Ollama)
- At least 2GB of free disk space for embeddings models

---

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/GabrielDLobo/07-RAG_Chatbot.git
cd 07-RAG_Chatbot
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
# LLM Provider (choose one or configure multiple)
GROQ_API_KEY=your-groq-api-key-here

# Optional: OpenAI
OPENAI_API_KEY=your-openai-api-key-here

# Optional: Ollama (if using local models)
OLLAMA_BASE_URL=http://localhost:11434

# Model Configuration
MODEL_NAME=llama-3.3-70b-versatile
TEMPERATURE=0.7

# Embedding Model
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

# ChromaDB Configuration
CHROMA_DB_PATH=./db
```

---

## Running Locally

### Start the Application

Run the Streamlit application:

```bash
streamlit run app.py
```

The application will open in your default web browser at `http://localhost:8501`.

### Alternative Port

To run on a different port:

```bash
streamlit run app.py --server.port 8080
```

---

## Usage

### Uploading Documents

1. Launch the application
2. Use the sidebar to upload one or more PDF files
3. Wait for the documents to be processed and indexed
4. The system will create embeddings and store them in ChromaDB

### Asking Questions

1. Type your question in the chat input box
2. The system will retrieve relevant document chunks
3. The LLM will generate a response based on the retrieved context
4. Conversation history is maintained for follow-up questions

### Example Use Cases

- Extract information from product manuals
- Query technical documentation
- Analyze research papers
- Search through legal documents
- Interactive learning from textbooks

---

## Configuration

### LLM Provider Selection

The application supports multiple LLM providers:

#### Groq (Recommended)
- Fast inference with hosted models
- Set `GROQ_API_KEY` in `.env`
- Configure `MODEL_NAME` (e.g., llama-3.3-70b-versatile)

#### OpenAI
- High-quality responses with GPT models
- Set `OPENAI_API_KEY` in `.env`
- Configure model name (e.g., gpt-4o-mini)

#### Ollama
- Run models locally for privacy
- Install Ollama and pull desired models
- Set `OLLAMA_BASE_URL` in `.env`

### Embedding Models

The application uses Hugging Face embeddings for local semantic search.  You can configure different embedding models in the `.env` file:

- `sentence-transformers/all-MiniLM-L6-v2` (default, lightweight)
- `sentence-transformers/all-mpnet-base-v2` (higher quality)
- Any compatible Hugging Face embedding model

### Vector Database

ChromaDB is used for storing and retrieving document embeddings. The database is persisted in the `db/` directory by default.

---

## Project Structure

```
.
|-- app.py                   # Main Streamlit application
|-- requirements. txt         # Python dependencies
|-- db/                      # ChromaDB vector database storage
|-- media/                   # Media assets and screenshots
|-- ayrfrier_manual.pdf      # Sample PDF document
|-- laptop_manual.pdf        # Sample PDF document
```

---

## How It Works

### Document Processing Flow

1. User uploads PDF documents via Streamlit interface
2. PDFs are parsed and text is extracted using PyPDF
3. Text is split into manageable chunks using LangChain text splitters
4. Chunks are converted to embeddings using Hugging Face models
5. Embeddings are stored in ChromaDB for fast retrieval

### Question Answering Flow

1. User submits a question through the chat interface
2. Question is converted to an embedding
3. ChromaDB performs similarity search to find relevant document chunks
4. Retrieved chunks are provided as context to the LLM
5. LLM generates a response based on the context
6. Response is displayed in the chat interface

### RAG Pipeline

The application implements a complete RAG pipeline: 
- **Retrieval**:  Semantic search using vector embeddings
- **Augmentation**: Retrieved context is added to the prompt
- **Generation**:  LLM generates contextually relevant responses

---

## Performance Optimization

- Embeddings are computed once and cached in ChromaDB
- Lazy loading of models to reduce startup time
- Efficient text chunking for optimal retrieval
- Session state management for conversation history

---

## Deployment

### Streamlit Cloud

1. Push your code to GitHub
2. Connect your repository to Streamlit Cloud
3. Add secrets (API keys) in Streamlit Cloud settings
4. Deploy the application

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt . 
RUN pip install -r requirements.txt

COPY .  . 

EXPOSE 8501

CMD ["streamlit", "run", "app. py"]
```

Build and run:

```bash
docker build -t rag-chatbot .
docker run -p 8501:8501 rag-chatbot
```

---

## Security Notes

- Store API keys in environment variables or `.env` file
- Never commit `.env` file to version control
- Use `.gitignore` to exclude sensitive files
- Implement rate limiting for production deployments
- Validate and sanitize user inputs

---

## Troubleshooting

### Common Issues

**Embeddings not loading:**
- Ensure you have sufficient disk space
- Check internet connection for downloading models
- Verify Hugging Face Hub access

**ChromaDB errors:**
- Clear the `db/` directory and reindex documents
- Ensure write permissions for the database directory

**Out of memory errors:**
- Reduce chunk size in text splitters
- Use a smaller embedding model
- Limit number of documents processed simultaneously

---

## License

This project is open source, but no license was explicitly defined. 

Feel free to clone, use, and contribute back! 

---

## Contributing

Pull requests are welcome! For large changes, consider opening an issue first to discuss what you would like to change.

---

## Sample Documents

The repository includes sample PDF documents for testing: 
- `ayrfrier_manual.pdf` - Air fryer manual
- `laptop_manual.pdf` - Laptop user guide

---
## Project Images

![alt text](</media/1.png>)
---
![alt text](</media/2.png>)
---
![alt text](</media/3.png>)
---
![alt text](</media/4.png>)