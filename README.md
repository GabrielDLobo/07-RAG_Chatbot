# RAG Chatbot

<div align="center">

Chatbot RAG em Streamlit para enviar PDFs e conversar com o conteúdo, usando LangChain, ChromaDB e Groq.

<p>
	<a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/" target="_blank" rel="noopener noreferrer">Abrir documentação</a>
	·
	<a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/" target="_blank" rel="noopener noreferrer">Mapa da documentação</a>
	·
	<a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/getting-started/" target="_blank" rel="noopener noreferrer">Primeiros passos</a>
</p>

</div>

---

## Documentação / Documentation

A documentação completa do projeto está publicada em um site separado e abre fora do GitHub:

<a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/" target="_blank" rel="noopener noreferrer">https://gabrieldlobo.github.io/07-RAG_Chatbot/</a>

### Mapa da documentação / Documentation map

| Seção | Link | Descrição |
|-------|------|-----------|
| Overview | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/" target="_blank" rel="noopener noreferrer">Abrir</a> | Visão geral do projeto e atalhos úteis |
| Getting Started | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/getting-started/" target="_blank" rel="noopener noreferrer">Abrir</a> | Pré-requisitos, instalação e execução |
| Configuration | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/configuration/" target="_blank" rel="noopener noreferrer">Abrir</a> | Variáveis de ambiente e ajustes |
| Project Structure | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/project-structure/" target="_blank" rel="noopener noreferrer">Abrir</a> | Organização do repositório |
| Guidelines | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/guidelines/" target="_blank" rel="noopener noreferrer">Abrir</a> | Padrões de código e documentação |
| Development | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/development/" target="_blank" rel="noopener noreferrer">Abrir</a> | Fluxo de desenvolvimento |
| Testing | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/testing/" target="_blank" rel="noopener noreferrer">Abrir</a> | Estratégia e comandos de teste |
| API Endpoints | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/api-endpoints/" target="_blank" rel="noopener noreferrer">Abrir</a> | Referência técnica da API |
| System Modeling | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/system-modeling/" target="_blank" rel="noopener noreferrer">Abrir</a> | Arquitetura e fluxo de dados |
| Authentication & Security | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/authentication-security/" target="_blank" rel="noopener noreferrer">Abrir</a> | Boas práticas e segurança |
| Deployment | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/deployment/" target="_blank" rel="noopener noreferrer">Abrir</a> | Publicação e deploy |
| Contributing | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/contributing/" target="_blank" rel="noopener noreferrer">Abrir</a> | Como contribuir |
| Release Notes | <a href="https://gabrieldlobo.github.io/07-RAG_Chatbot/release-notes/" target="_blank" rel="noopener noreferrer">Abrir</a> | Histórico de versões |

### Pré-visualização local / Local preview

```bash
pip install -r requirements_dev.txt
mkdocs serve -a 127.0.0.1:8001
```

Abra <a href="http://127.0.0.1:8001/" target="_blank" rel="noopener noreferrer">http://127.0.0.1:8001/</a> no navegador.

---

## Visão geral / Overview

O projeto permite fazer upload de arquivos PDF e conversar com o conteúdo em linguagem natural. O fluxo principal usa ChromaDB para persistência vetorial, LangChain para orquestração, embeddings do Hugging Face para busca semântica e Groq para geração de respostas.

---

## Recursos / Features

- Upload de um ou mais arquivos PDF
- Quebra automática em chunks para indexação
- Busca semântica com histórico de conversa
- Respostas geradas por LLM com Groq
- Persistência local em `db/`
- Interface leve com Streamlit

---

## Tecnologias / Tech Stack

| Camada | Tecnologia |
|--------|------------|
| UI | Streamlit |
| Orquestração RAG | LangChain |
| Banco vetorial | ChromaDB |
| Embeddings | Hugging Face |
| LLM | Groq |
| Parsing de PDF | pypdf |
| Configuração | python-dotenv e python-decouple |

---

## Estrutura do projeto / Project structure

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

## Primeiros passos / Getting started

### Pré-requisitos / Prerequisites

- Python 3.11 ou superior
- Git
- Uma chave válida da Groq

### Execução local / Local run

```bash
git clone https://github.com/GabrielDLobo/07-RAG_Chatbot.git
cd 07-RAG_Chatbot
python -m venv venv
```

Ative o ambiente virtual:

- Windows: `venv\Scripts\activate`
- macOS/Linux: `source venv/bin/activate`

Instale as dependências e execute a aplicação:

```bash
pip install -r requirements.txt
streamlit run app.py
```

Crie um arquivo `.env` na raiz do projeto com a chave da Groq:

```bash
GROQ_API_KEY=your-groq-api-key-here
```

---

## Desenvolvimento / Development

```bash
pip install -r requirements_dev.txt
black .
isort .
flake8
pytest
```

---

## Licença / License

Este projeto está licenciado sob a MIT License.
