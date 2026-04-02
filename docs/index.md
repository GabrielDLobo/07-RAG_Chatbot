<div class="hero-shell">

<div class="hero-badge">RAG Chatbot Documentation</div>

# RAG Chatbot

<p class="hero-lead">Documentação do projeto em um formato mais visual e navegável, com acesso rápido para setup, configuração, desenvolvimento e deployment.</p>

<div class="hero-actions">
    <a class="md-button md-button--primary" href="getting-started/">Começar agora</a>
    <a class="md-button" href="configuration/">Ver configuração</a>
    <a class="md-button" href="https://github.com/GabrielDLobo/07-RAG_Chatbot" target="_blank" rel="noopener noreferrer">Repositório</a>
</div>

<div class="hero-metrics">
    <div class="metric-card">
        <span class="metric-label">Fluxo principal</span>
        <strong>Upload de PDF + chat</strong>
        <p>Leitura de documentos com respostas contextualizadas.</p>
    </div>
    <div class="metric-card">
        <span class="metric-label">Stack</span>
        <strong>Streamlit + LangChain</strong>
        <p>Interface leve com orquestração RAG e Groq.</p>
    </div>
    <div class="metric-card">
        <span class="metric-label">Persistência</span>
        <strong>ChromaDB local</strong>
        <p>Embeddings e vetores salvos em <code>db/</code>.</p>
    </div>
</div>

</div>

## Visão geral

O RAG Chatbot permite fazer upload de arquivos PDF e conversar com o conteúdo de forma natural. O pipeline usa LangChain para orquestração, ChromaDB para busca vetorial, Hugging Face para embeddings e Groq para gerar as respostas.

## Acesso rápido

<div class="doc-grid">
    <a class="doc-card" href="getting-started/">
        <span class="doc-card-eyebrow">01</span>
        <h3>Getting Started</h3>
        <p>Pré-requisitos, instalação e execução local.</p>
    </a>
    <a class="doc-card" href="configuration/">
        <span class="doc-card-eyebrow">02</span>
        <h3>Configuration</h3>
        <p>Variáveis de ambiente, modelos e ajustes do app.</p>
    </a>
    <a class="doc-card" href="project-structure/">
        <span class="doc-card-eyebrow">03</span>
        <h3>Project Structure</h3>
        <p>Organização dos arquivos e responsabilidades.</p>
    </a>
    <a class="doc-card" href="development/">
        <span class="doc-card-eyebrow">04</span>
        <h3>Development</h3>
        <p>Fluxo de desenvolvimento e boas práticas locais.</p>
    </a>
    <a class="doc-card" href="testing/">
        <span class="doc-card-eyebrow">05</span>
        <h3>Testing</h3>
        <p>Estratégia de testes e comandos de validação.</p>
    </a>
    <a class="doc-card" href="deployment/">
        <span class="doc-card-eyebrow">06</span>
        <h3>Deployment</h3>
        <p>Publicação, ambiente e opções de deploy.</p>
    </a>
</div>

## O que você encontra

<div class="feature-grid">
    <div class="feature-card">
        <h3>Documentação modular</h3>
        <p>Cada assunto está separado em páginas próprias, com navegação rápida entre setup, configuração, arquitetura e testes.</p>
    </div>
    <div class="feature-card">
        <h3>Experiência orientada ao uso</h3>
        <p>O conteúdo foi reorganizado para funcionar como ponto de entrada principal do projeto, não apenas como referência técnica.</p>
    </div>
    <div class="feature-card">
        <h3>Links externos para o site publicado</h3>
        <p>Os atalhos principais apontam para a documentação hospedada em GitHub Pages, abrindo em nova aba quando necessário.</p>
    </div>
</div>

## Começar localmente

```bash
git clone https://github.com/GabrielDLobo/07-RAG_Chatbot.git
cd 07-RAG_Chatbot
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
streamlit run app.py
```

## Estrutura resumida

| Seção | Descrição |
|-------|-----------|
| Getting Started | Setup inicial, pré-requisitos e execução |
| Configuration | Variáveis e comportamento do aplicativo |
| Guidelines | Padrões de código e documentação |
| Project Structure | Mapa do repositório |
| API Endpoints | Interface técnica e uso interno |
| System Modeling | Fluxo e arquitetura do sistema |
| Authentication & Security | Regras de acesso e proteção |
| Development | Rotina de desenvolvimento |
| Testing | Validação e cobertura |
| Deployment | Publicação em produção |
| Contributing | Processo de contribuição |
| Release Notes | Histórico de versões |

## Screenshots

| Upload Interface | Chat Interface |
|------------------|----------------|
| ![Upload Interface](images/1.png) | ![Chat Interface 1](images/2.png) |
| ![Chat Interface 2](images/3.png) | ![Chat Interface 3](images/4.png) |

## Links úteis

- [GitHub Repository](https://github.com/GabrielDLobo/07-RAG_Chatbot)
- [LangChain Documentation](https://python.langchain.com/)
- [Streamlit Documentation](https://docs.streamlit.io/)
- [Groq API](https://console.groq.com/)
- [ChromaDB Documentation](https://docs.trychroma.com/)

## Suporte

Para dúvidas, problemas ou sugestões, consulte o repositório do projeto.
