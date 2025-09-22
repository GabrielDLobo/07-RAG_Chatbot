# 📄 Chat PythonGPT — RAG with PDFs using LangChain, Hugging Face and Groq


This project is a **Retrieval-Augmented Generation (RAG)** application that allows users to interact with PDF documents via chat. It uses LLMs hosted on Groq for response generation and Hugging Face embeddings for local semantic search. The interface is built with **Streamlit**, providing an intuitive and interactive experience.


### PT/BR 
Este projeto é uma aplicação de **RAG (Retrieval-Augmented Generation)** que permite ao usuário interagir com documentos PDF via chat, utilizando modelos LLM hospedados na Groq e embeddings locais via Hugging Face. A interface é construída com **Streamlit**, oferecendo uma experiência interativa e intuitiva.

---

## 🚀 Features

- Upload multiple PDF files
- Extract and chunk document content
- Store vector embeddings using **ChromaDB**
- Generate embeddings with **HuggingFaceEmbeddings**
- Retrieve relevant context using **LangChain Retrieval Chain**
- Generate answers using **Groq-hosted LLMs**
- Interactive chat interface with message history


### PT/BR 
- Upload de múltiplos arquivos PDF
- Extração e segmentação de conteúdo textual
- Armazenamento vetorial com **ChromaDB**
- Geração de embeddings com **HuggingFaceEmbeddings**
- Consulta contextual com **LangChain Retrieval Chain**
- Respostas geradas por LLMs via **Groq API**
- Interface de chat interativa com histórico de mensagens

---

## 🧠 Technologies and Libraries


| Component              | Description                                                             |
|----------------------|---------------------------------------------------------------------------|
| `LangChain`            | Framework for orchestrating LLMs and document chains                    |
| `langchain-community`  | Integrations for Chroma, Hugging Face, and document loaders             |
| `langchain-groq`       | Integration with Groq-hosted LLMs                                       |
| `sentence-transformers`| Library for generating embeddings using Hugging Face models             |
| `Streamlit`            | Web framework for building interactive Python apps                      |
| `python-decouple`      | Secure environment variable management via `.env`                       |


### PT/BR

| Componente           | Descrição                                                                 |
|----------------------|---------------------------------------------------------------------------|
| `LangChain`          | Framework para orquestração de LLMs e cadeias de processamento            |
| `langchain-community`| Integrações com Chroma, Hugging Face e loaders de documentos              |
| `langchain-groq`     | Integração com modelos LLM hospedados na Groq                             |
| `sentence-transformers` | Biblioteca para geração de embeddings com modelos Hugging Face         |
| `Streamlit`          | Framework para construção de interfaces web interativas em Python         |
| `python-decouple`    | Gerenciamento seguro de variáveis de ambiente via `.env`                  |


---


## 🧱 Estrutura do Projeto

├── app.py               # Main Streamlit application ├── db/                  # ChromaDB persistence directory ├── .env                 # Groq API key file ├── README.md            # Project documentation

---

## 📚 How It Works
- Users upload one or more PDF files.
- Text is extracted and split into chunks using RecursiveCharacterTextSplitter.
- Chunks are embedded with Hugging Face and stored in ChromaDB.
- Users ask questions via chat.
- Relevant chunks are retrieved and passed to the LLM via ChatGroq.
- The model responds with markdown-formatted answers.

### PT/BR
- O usuário faz upload de arquivos PDF.
- O conteúdo é extraído e dividido em chunks com RecursiveCharacterTextSplitter.
- Os chunks são embeddados com HuggingFaceEmbeddings e armazenados no ChromaDB.
- O usuário envia uma pergunta via chat.
- O sistema recupera os documentos relevantes e os envia ao modelo LLM via ChatGroq.
- A resposta é exibida em formato Markdown com visualização interativa.

---

## 🧪 Supported Model
- llama-3.3-70b-versatile
- openai/gpt-oss-120b
You can add other Groq-supported models as needed.

---

## 🛡️ Security
- API keys are securely managed via .env using python-decouple.
- No document data is sent to Groq — only relevant context snippets are used for generation.

### PT/BR
- As chaves de API são gerenciadas via .env usando python-decouple.
- Nenhum dado dos documentos é enviado para a Groq — apenas os trechos relevantes são usados para gerar respostas.

---

## Project Images

![alt text](</media/1.png>)
---
![alt text](</media/2.png>)
---
![alt text](</media/3.png>)
---
![alt text](</media/4.png>)