# Configuration Guide

This guide explains how to configure the RAG Chatbot application for different environments and use cases.

---

## Table of Contents

- [Environment Variables](#environment-variables)
- [Vector Store Configuration](#vector-store-configuration)
- [LLM Configuration](#llm-configuration)
- [Text Splitting Configuration](#text-splitting-configuration)
- [Streamlit Configuration](#streamlit-configuration)

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GROQ_API_KEY` | Your Groq API key for LLM inference | `gsk_abc123...` |

### Creating the .env File

```bash
# Method 1: Using echo (Windows)
echo GROQ_API_KEY=your-api-key-here > .env

# Method 2: Using echo (Linux/Mac)
echo "GROQ_API_KEY=your-api-key-here" > .env

# Method 3: Manual creation
# Create a file named .env in the project root with:
GROQ_API_KEY=your-api-key-here
```

### .env File Location

```
07-RAG_Chatbot/
├── .env              # ← Must be in project root
├── app.py
├── requirements.txt
└── ...
```

---

## Vector Store Configuration

### ChromaDB Settings

The vector store is configured in `app.py` with the following defaults:

| Setting | Default | Description |
|---------|---------|-------------|
| `persist_directory` | `db/` | Directory for vector storage |
| `embedding_function` | `HuggingFaceEmbeddings()` | Embedding model |

### Changing Vector Store Directory

```python
# In app.py, modify:
persist_directory = 'db'  # Change to your preferred path
```

### Resetting Vector Store

To clear all indexed documents:

```bash
# Windows
rmdir /s /q db

# Linux/Mac
rm -rf db
```

---

## LLM Configuration

### Available Models

The application supports these Groq models:

| Model ID | Description | Use Case |
|----------|-------------|----------|
| `llama-3.3-70b-versatile` | Llama 3.3 70B | General purpose, balanced performance |
| `openai/gpt-oss-120b` | GPT-OSS 120B | Complex reasoning tasks |

### Adding New Models

Edit the `model_options` list in `app.py`:

```python
model_options = [
    'llama-3.3-70b-versatile',
    'openai/gpt-oss-120b',
    # Add new models here:
    # 'llama-3.1-8b-instant',
]
```

### Default Model

To set a default model:

```python
selected_model = st.sidebar.selectbox(
    label='Select LLM Model',
    options=model_options,
    index=0,  # Default to first option
)
```

---

## Text Splitting Configuration

### Current Settings

| Parameter | Value | Description |
|-----------|-------|-------------|
| `chunk_size` | 1000 | Maximum characters per chunk |
| `chunk_overlap` | 400 | Characters overlapping between chunks |

### Modifying Chunk Settings

```python
# In app.py, find and modify:
text_spliter = RecursiveCharacterTextSplitter(
    chunk_size=1000,      # Adjust based on your needs
    chunk_overlap=400,    # Higher overlap = better context continuity
)
```

### Recommended Settings by Document Type

| Document Type | Chunk Size | Chunk Overlap |
|---------------|------------|---------------|
| Technical Manuals | 1000 | 400 |
| Legal Documents | 1500 | 500 |
| Academic Papers | 800 | 200 |
| General Text | 1000 | 300 |

---

## Streamlit Configuration

### Server Settings

Create `.streamlit/config.toml`:

```toml
[server]
port = 8501
headless = false
enableCORS = false
enableXsrfProtection = true

[browser]
gatherUsageStats = false

[theme]
primaryColor = "#FF4B4B"
backgroundColor = "#FFFFFF"
secondaryBackgroundColor = "#F0F2F6"
textColor = "#262730"
font = "sans serif"
```

### Running with Custom Port

```bash
streamlit run app.py --server.port 8502
```

### Running in Headless Mode

```bash
streamlit run app.py --server.headless true
```

---

## Embedding Configuration

### Current Embedding Model

The application uses `HuggingFaceEmbeddings()` with default settings.

### Customizing Embeddings

```python
# In app.py, modify:
embedding_function = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={'device': 'cpu'},  # or 'cuda' for GPU
    encode_kwargs={'normalize_embeddings': True},
)
```

### Recommended Embedding Models

| Model | Dimensions | Speed | Quality |
|-------|------------|-------|---------|
| `all-MiniLM-L6-v2` | 384 | Fast | Good |
| `all-mpnet-base-v2` | 768 | Medium | Better |
| `multi-qa-mpnet-base` | 768 | Medium | Best for QA |

---

## System Prompt Configuration

### Current System Prompt

```python
system_prompt = '''
Use o contexto para responder as perguntas.
Se não encontrar uma resposta no contexto,
explique que não há informações disponíveis.
Responda em formato de markdown e com visualizações
elaboradas e interativas.
Contexto: {context}
'''
```

### Customizing the Prompt

Edit the `system_prompt` variable in `app.py`:

```python
system_prompt = '''
You are a helpful assistant. Use the provided context 
to answer questions. If the answer is not in the context,
state that you don't have enough information.
Always respond in markdown format.
Context: {context}
'''
```

---

## Configuration Checklist

Before running the application:

- [ ] `.env` file created in project root
- [ ] `GROQ_API_KEY` set with valid key
- [ ] `db/` directory exists or can be created
- [ ] Required dependencies installed
- [ ] Python version is 3.8+

---

## Troubleshooting Configuration

| Issue | Solution |
|-------|----------|
| API Key not found | Verify `.env` file location and content |
| Model not available | Check model ID spelling and Groq availability |
| Embedding errors | Ensure `sentence-transformers` is installed |
| Port conflicts | Change port in Streamlit config or command line |

---

## Next Steps

- [Guidelines](guidelines.md) - Coding standards
- [System Modeling](system-modeling.md) - Architecture diagrams
- [Deployment](deployment.md) - Production configuration
