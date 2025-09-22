# 📄 Chat PythonGPT — RAG com PDFs usando LangChain, Hugging Face e Groq

Este projeto é uma aplicação de **RAG (Retrieval-Augmented Generation)** que permite ao usuário interagir com documentos PDF via chat, utilizando modelos LLM hospedados na Groq e embeddings locais via Hugging Face. A interface é construída com **Streamlit**, oferecendo uma experiência interativa e intuitiva.

---

## 🚀 Funcionalidades

- Upload de múltiplos arquivos PDF
- Extração e segmentação de conteúdo textual
- Armazenamento vetorial com **ChromaDB**
- Geração de embeddings com **HuggingFaceEmbeddings**
- Consulta contextual com **LangChain Retrieval Chain**
- Respostas geradas por LLMs via **Groq API**
- Interface de chat interativa com histórico de mensagens

---

## 🧠 Tecnologias e Bibliotecas

| Componente            | Descrição                                                                 |
|----------------------|---------------------------------------------------------------------------|
| `LangChain`          | Framework para orquestração de LLMs e cadeias de processamento            |
| `langchain-community`| Integrações com Chroma, Hugging Face e loaders de documentos              |
| `langchain-groq`     | Integração com modelos LLM hospedados na Groq                             |
| `sentence-transformers` | Biblioteca para geração de embeddings com modelos Hugging Face         |
| `Streamlit`          | Framework para construção de interfaces web interativas em Python         |
| `python-decouple`    | Gerenciamento seguro de variáveis de ambiente via `.env`                  |

---

## 🧱 Estrutura do Projeto

├── app.py               # Código principal da aplicação Streamlit ├── db/                  # Diretório de persistência do ChromaDB ├── .env                 # Arquivo com a chave da API Groq ├── README.md            # Documentação do projeto

---

## 📚 Como funciona

- O usuário faz upload de arquivos PDF.
- O conteúdo é extraído e dividido em chunks com RecursiveCharacterTextSplitter.
- Os chunks são embeddados com HuggingFaceEmbeddings e armazenados no ChromaDB.
- O usuário envia uma pergunta via chat.
- O sistema recupera os documentos relevantes e os envia ao modelo LLM via ChatGroq.
- A resposta é exibida em formato Markdown com visualização interativa.

---

## 🧪 Modelos suportados
- llama-3.3-70b-versatile
- openai/gpt-oss-120b
Você pode adicionar outros modelos disponíveis na Groq conforme necessário.

---

## 🛡️ Segurança
- As chaves de API são gerenciadas via .env usando python-decouple.
- Nenhum dado dos documentos é enviado para a Groq — apenas os trechos relevantes são usados para gerar respostas.

---

## Imagens do Projeto

media\1.png
media\2.png
media\3.png
media\4.png