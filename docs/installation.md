# Installation Guide

This guide explains how to install and run the RAG Chatbot locally.

## 1. Clone Repository

```bash
git clone https://github.com/GabrielDLobo/07-RAG_Chatbot.git
cd 07-RAG_Chatbot
```

## 2. Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## 4. Configure Environment

Create `.env` file in the project root:

```bash
GROQ_API_KEY=your-groq-api-key-here
```

## 5. Run Application

```bash
streamlit run app.py
```

## Verification

- App starts without errors
- PDF upload works
- Chat answers are generated

---

**Next Steps**:
- [Configuration](configuration.md) - Configure advanced settings
- [Development](development.md) - Development workflow
