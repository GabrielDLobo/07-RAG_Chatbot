# Guidelines and Standards

This document outlines the coding standards, conventions, and best practices for the RAG Chatbot project.

---

## Table of Contents

- [Python Style Guide](#python-style-guide)
- [Code Organization](#code-organization)
- [Documentation Standards](#documentation-standards)
- [Git Workflow](#git-workflow)
- [Best Practices](#best-practices)
- [Security Guidelines](#security-guidelines)

---

## Python Style Guide

### Code Formatting

Follow [PEP 8](https://pep8.org/) style guidelines:

| Rule | Description | Example |
|------|-------------|---------|
| Indentation | 4 spaces per level | `def func():\n    pass` |
| Line Length | Max 100 characters | Break long lines |
| Imports | One per line, grouped | Standard lib → Third-party → Local |
| Naming | snake_case for functions/vars | `process_pdf`, `vector_store` |
| Classes | PascalCase | `class PDFProcessor` |
| Constants | UPPER_CASE | `GROQ_API_KEY` |

### Example Code Style

```python
# ✅ Good
import os
import tempfile

from langchain.chains import create_retrieval_chain

def process_pdf(file):
    """Process a PDF file and return text chunks."""
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
        temp_file.write(file.read())
        temp_file_path = temp_file.name
    
    loader = PyPDFLoader(temp_file_path)
    docs = loader.load()
    os.remove(temp_file_path)
    
    return docs

# ❌ Bad - poor formatting
import os,tempfile
from langchain.chains import create_retrieval_chain
def process_pdf(file):
  with tempfile.NamedTemporaryFile(delete=False,suffix='.pdf') as temp_file:
    temp_file.write(file.read())
    temp_file_path=temp_file.name
```

### Type Hints

Use type hints for function parameters and return values:

```python
from typing import List, Optional
from langchain.schema import Document

def add_to_vector_store(
    chunks: List[Document],
    vector_store: Optional[Chroma] = None
) -> Chroma:
    """Add document chunks to vector store."""
    ...
```

---

## Code Organization

### File Structure

```
07-RAG_Chatbot/
├── app.py                 # Main application (Streamlit)
├── requirements.txt       # Dependencies
├── .env                   # Environment variables (gitignored)
├── .gitignore            # Git ignore rules
├── README.md             # Project readme
├── docs/                 # Documentation
├── db/                   # Vector store persistence
├── media/                # Images and assets
└── venv/                 # Virtual environment (gitignored)
```

### Function Organization

Organize code logically:

1. Imports
2. Global variables/constants
3. Helper functions
4. Main functions
5. Entry point/UI code

```python
# Imports
import os
import tempfile

# Global variables
persist_directory = 'db'

# Helper functions
def process_pdf(file):
    ...

# Main functions
def load_existing_vector_store():
    ...

# Entry point
if __name__ == "__main__":
    ...
```

---

## Documentation Standards

### Docstrings

Use Google-style docstrings:

```python
def ask_question(model: str, query: str, vector_store: Chroma) -> str:
    """
    Ask a question to the RAG system and get an answer.
    
    Args:
        model: The LLM model identifier to use
        query: The user's question
        vector_store: The Chroma vector store instance
    
    Returns:
        The AI-generated answer as a string
    
    Raises:
        ValueError: If the query is empty
    """
    ...
```

### Comments

- Use comments to explain **why**, not **what**
- Keep comments up-to-date
- Avoid obvious comments

```python
# ✅ Good - explains reasoning
# Using temp file to avoid loading entire PDF into memory
with tempfile.NamedTemporaryFile(delete=False) as temp_file:
    ...

# ❌ Bad - obvious
temp_file.write(file.read())  # Write file to temp
```

### Markdown Documentation

All documentation files should:

- Use clear headings with `#`
- Include tables for structured data
- Use code blocks with language specification
- Link to related documents

---

## Git Workflow

### Branch Naming

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/pdf-upload-improvement` |
| Bugfix | `fix/description` | `fix/embedding-error` |
| Hotfix | `hotfix/description` | `hotfix/api-key-validation` |
| Documentation | `docs/description` | `docs/add-api-guide` |

### Commit Messages

Follow conventional commits:

```
feat: add support for multiple PDF uploads
fix: resolve chunk overlap calculation error
docs: update configuration guide
refactor: extract PDF processing to separate function
test: add unit tests for vector store
```

### Pull Request Guidelines

1. Create feature branch from `main`
2. Make changes with clear commits
3. Test thoroughly
4. Submit PR with description
5. Address review feedback
6. Squash commits if needed
7. Merge after approval

---

## Best Practices

### Error Handling

```python
# ✅ Good - specific error handling
try:
    response = chain.invoke({'input': query})
    return response.get('answer')
except Exception as e:
    st.error(f"Error generating response: {str(e)}")
    return None

# ❌ Bad - silent failure
try:
    response = chain.invoke({'input': query})
except:
    pass
```

### Logging

```python
# Use Streamlit's built-in feedback
with st.spinner('Processing documents...'):
    chunks = process_pdf(file)
    st.success(f"Processed {len(chunks)} chunks")

# For debugging
st.write(f"Debug: {variable}")  # Remove before commit
```

### Session State Management

```python
# Initialize session state safely
if 'messages' not in st.session_state:
    st.session_state['messages'] = []

# Append messages consistently
st.session_state.messages.append({
    'role': 'user',
    'content': question
})
```

### Resource Management

```python
# Always clean up temporary files
with tempfile.NamedTemporaryFile(delete=False) as temp_file:
    temp_file.write(file.read())
    temp_file_path = temp_file.name

try:
    # Process file
    loader = PyPDFLoader(temp_file_path)
    docs = loader.load()
finally:
    os.remove(temp_file_path)  # Ensure cleanup
```

---

## Security Guidelines

### API Key Management

```python
# ✅ Good - use environment variables
from decouple import config
os.environ['GROQ_API_KEY'] = config('GROQ_API_KEY')

# ❌ Bad - hardcode API keys
os.environ['GROQ_API_KEY'] = 'gsk_abc123...'
```

### File Upload Security

```python
# Validate file types
uploaded_files = st.file_uploader(
    label='Upload PDF files',
    type=['pdf'],  # Only allow PDFs
    accept_multiple_files=True,
)
```

### Environment Variables

| Practice | Description |
|----------|-------------|
| Never commit `.env` | Add to `.gitignore` |
| Use `.env.example` | Provide template without values |
| Validate on startup | Check required vars exist |
| Use secrets management | For production deployments |

---

## Testing Guidelines

### Unit Test Structure

```python
def test_process_pdf():
    """Test PDF processing function."""
    # Arrange
    test_file = create_test_pdf()
    
    # Act
    chunks = process_pdf(test_file)
    
    # Assert
    assert len(chunks) > 0
    assert all(isinstance(chunk, Document) for chunk in chunks)
```

### Test Coverage

Aim for coverage of:

- [ ] PDF processing logic
- [ ] Vector store operations
- [ ] Question-answer chain
- [ ] Error handling paths

---

## Performance Guidelines

### Chunking Optimization

| Setting | Impact | Recommendation |
|---------|--------|----------------|
| Larger chunk_size | More context, slower retrieval | Use for detailed docs |
| Higher overlap | Better continuity, more storage | 20-40% of chunk_size |
| Smaller chunks | Faster retrieval, less context | Use for simple docs |

### Vector Store Performance

```python
# Use efficient retriever settings
retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4}  # Return top 4 results
)
```

---

## Accessibility Guidelines

### Streamlit UI

- Use clear labels for all inputs
- Provide feedback for user actions
- Ensure color contrast meets WCAG standards
- Add alt text to images when applicable

```python
st.file_uploader(
    label='Upload PDF files',  # Clear label
    type=['pdf'],
    help='Supported format: PDF only'  # Helpful tooltip
)
```

---

## Next Steps

- [Project Structure](project-structure.md) - Directory organization
- [Development Guide](development.md) - Development workflow
- [Contributing](contributing.md) - How to contribute
