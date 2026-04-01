# System Modeling

This document provides comprehensive system modeling diagrams including data models, architecture, and process flows.

---

## Table of Contents

- [Data Models (ERD)](#data-models-erd)
- [System Architecture](#system-architecture)
- [Authentication Flow](#authentication-flow)
- [CRUD Operations Flow](#crud-operations-flow)
- [Security Flow](#security-flow)

---

## Data Models (ERD)

### Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ SESSION : creates
    SESSION ||--o{ MESSAGE : contains
    SESSION ||--o{ DOCUMENT : uploads
    DOCUMENT ||--o{ CHUNK : split_into
    CHUNK ||--o{ EMBEDDING : has
    MODEL ||--o{ SESSION : used_by
    
    USER {
        string session_id PK
        timestamp created_at
        string ip_address
    }
    
    SESSION {
        string id PK
        timestamp created_at
        timestamp updated_at
        string selected_model
    }
    
    MESSAGE {
        string id PK
        string session_id FK
        string role
        text content
        timestamp created_at
    }
    
    DOCUMENT {
        string id PK
        string filename
        integer file_size
        timestamp uploaded_at
        string status
    }
    
    CHUNK {
        string id PK
        string document_id FK
        integer chunk_index
        text content
        integer chunk_size
    }
    
    EMBEDDING {
        string id PK
        string chunk_id FK
        vector embedding_vector
        integer dimensions
    }
    
    MODEL {
        string id PK
        string model_name
        string provider
        string context_window
    }
```

### Data Model Descriptions

| Entity | Description | Storage |
|--------|-------------|---------|
| USER | Browser session identifier | Session state |
| SESSION | Chat session metadata | Streamlit session_state |
| MESSAGE | Chat messages | Streamlit session_state |
| DOCUMENT | Uploaded PDF metadata | Memory/Temp |
| CHUNK | Text chunks from documents | ChromaDB |
| EMBEDDING | Vector representations | ChromaDB |
| MODEL | LLM model configuration | Application config |

---

## System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        Browser[Web Browser]
        UI[Streamlit UI]
    end
    
    subgraph Application["Application Layer"]
        App[app.py]
        PDF[PDF Processor]
        Splitter[Text Splitter]
        Retriever[Retrieval Chain]
    end
    
    subgraph Services["Service Layer"]
        ChromaDB[(ChromaDB Vector Store)]
        Embeddings[HuggingFace Embeddings]
        Groq[Groq LLM API]
    end
    
    subgraph Storage["Storage Layer"]
        DB[(db/ Directory)]
        Temp[Temp Files]
    end
    
    Browser --> UI
    UI --> App
    App --> PDF
    App --> Splitter
    App --> Retriever
    PDF --> Temp
    Splitter --> Embeddings
    Embeddings --> ChromaDB
    Retriever --> ChromaDB
    Retriever --> Groq
    ChromaDB --> DB
```

### Component Architecture

```mermaid
graph LR
    subgraph Frontend["Frontend Components"]
        Upload[File Upload]
        Chat[Chat Interface]
        Model[Model Selector]
    end
    
    subgraph Backend["Backend Components"]
        Process[PDF Processing]
        Index[Indexing]
        Query[Query Processing]
        Generate[Response Generation]
    end
    
    Upload --> Process
    Process --> Index
    Chat --> Query
    Model --> Generate
    Index --> Query
    Query --> Generate
```

### Layered Architecture

```mermaid
graph TB
    subgraph Presentation["Presentation Layer"]
        Streamlit[Streamlit Web UI]
        Components[UI Components]
    end
    
    subgraph Business["Business Logic Layer"]
        RAG[RAG Pipeline]
        PDF[PDF Processing]
        Vector[Vector Operations]
    end
    
    subgraph Data["Data Access Layer"]
        Chroma[ChromaDB Client]
        Embedding[Embedding Service]
        LLM[LLM Client]
    end
    
    subgraph External["External Services"]
        Groq[Groq API]
        HF[Hugging Face]
    end
    
    Presentation --> Business
    Business --> Data
    Data --> External
```

---

## Authentication Flow

### API Key Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant App as Application
    participant Env as .env File
    participant Groq as Groq API
    
    U->>App: Start Application
    App->>Env: Read GROQ_API_KEY
    Env-->>App: API Key
    
    alt API Key Found
        App->>App: Validate Key Format
        App->>Groq: Test Authentication
        Groq-->>App: Authentication Success
        App->>U: Show Interface
    else API Key Missing
        App->>U: Show Error Message
        U->>Env: Add API Key
        App->>App: Restart
    end
```

### Session Management Flow

```mermaid
stateDiagram-v2
    [*] --> NoSession: Application Start
    NoSession --> ActiveSession: User Opens App
    ActiveSession --> HasMessages: User Sends Message
    HasMessages --> ActiveSession: Display Response
    ActiveSession --> FileUploaded: User Uploads PDF
    FileUploaded --> Processing: Process PDF
    Processing --> ActiveSession: Indexing Complete
    ActiveSession --> [*]: Session Ends
    
    note right of ActiveSession
        Session state stored in
        Streamlit session_state
    end note
```

### Authentication States

```mermaid
graph LR
    A[No API Key] -->|Add Key| B[Validating]
    B -->|Success| C[Authenticated]
    B -->|Failure| A
    C -->|API Error| D[Re-authenticate]
    D -->|Retry| B
    C -->|Valid| E[Ready to Use]
```

---

## CRUD Operations Flow

### Document Upload (Create)

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Streamlit UI
    participant App as Application
    participant PDF as PDF Loader
    participant Split as Text Splitter
    participant Emb as Embeddings
    participant DB as ChromaDB
    
    U->>UI: Select PDF Files
    UI->>App: Upload Files
    App->>App: Save to Temp
    App->>PDF: Load PDF
    PDF-->>App: Document Pages
    App->>Split: Split Text
    Split-->>App: Chunks
    
    loop For Each Chunk
        App->>Emb: Generate Embedding
        Emb-->>App: Vector
        App->>DB: Store Vector
    end
    
    DB-->>App: Confirmation
    App->>UI: Show Success
    UI-->>U: Processing Complete
```

### Document Query (Read)

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Streamlit UI
    participant App as Application
    participant Retriever as Retriever
    participant DB as ChromaDB
    participant Chain as RAG Chain
    participant LLM as Groq LLM
    
    U->>UI: Enter Question
    UI->>App: Submit Query
    App->>Retriever: Get Relevant Docs
    Retriever->>DB: Similarity Search
    DB-->>Retriever: Top K Chunks
    Retriever-->>App: Context
    
    App->>Chain: Create Prompt
    Chain->>LLM: Send Request
    LLM-->>Chain: Generate Response
    Chain-->>App: Answer
    App->>UI: Display Response
    UI-->>U: Show Answer
```

### Vector Store Update (Update)

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Streamlit UI
    participant App as Application
    participant DB as ChromaDB
    
    U->>UI: Upload Additional PDF
    UI->>App: Process New Document
    App->>App: Generate Chunks
    App->>DB: Check Existing Store
    
    alt Store Exists
        App->>DB: Add Documents
        DB-->>App: Updated Store
    else No Store
        App->>DB: Create From Documents
        DB-->>App: New Store
    end
    
    App->>UI: Update Complete
    UI-->>U: Documents Indexed
```

### Vector Store Reset (Delete)

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Streamlit UI
    participant App as Application
    participant DB as ChromaDB
    participant FS as File System
    
    U->>UI: Request Reset
    UI->>App: Clear Vector Store
    App->>DB: Disconnect
    App->>FS: Delete db/ Directory
    FS-->>App: Directory Deleted
    App->>App: Reset State
    App->>UI: Show Reset Complete
    UI-->>U: Ready for New Uploads
```

### Complete CRUD Flow

```mermaid
graph TB
    Start([Start]) --> Upload[Upload PDF]
    Upload --> Create[CREATE: Index Document]
    Create --> Query[Query System]
    Query --> Read[READ: Retrieve Context]
    Read --> Generate[Generate Response]
    Generate --> Update[UPDATE: Add to History]
    Update --> MoreQueries{More Queries?}
    MoreQueries -->|Yes| Query
    MoreQueries -->|No| Reset[DELETE: Clear Store]
    Reset --> End([End])
```

---

## Security Flow

### Request Security Flow

```mermaid
sequenceDiagram
    participant U as User
    participant App as Application
    participant Env as Environment
    participant API as External API
    
    U->>App: Send Request
    App->>Env: Get API Key
    Env-->>App: API Key
    
    App->>App: Validate Input
    App->>App: Sanitize Query
    
    App->>API: HTTPS Request
    Note over App,API: API Key in Header
    Note over App,API: TLS Encryption
    
    API-->>App: Response
    App->>App: Validate Response
    App-->>U: Display Result
    
    Note right of App: API Key Never Logged<br/>or Exposed to Client
```

### Data Protection Flow

```mermaid
graph TB
    A[User Input] --> B{Input Validation}
    B -->|Invalid| C[Reject Input]
    B -->|Valid| D[Process Data]
    D --> E{Contains Sensitive Data?}
    E -->|Yes| F[Encrypt/Hash]
    E -->|No| G[Store/Transmit]
    F --> G
    G --> H{External Transfer?}
    H -->|Yes| I[HTTPS/TLS]
    H -->|No| J[Local Storage]
    I --> K[API Response]
    J --> L[Vector Store]
```

### Error Handling Security

```mermaid
stateDiagram-v2
    [*] --> NormalOperation
    NormalOperation --> APIError: API Fails
    NormalOperation --> NetworkError: Network Fails
    NormalOperation --> ValidationError: Invalid Input
    
    APIError --> GenericMessage: Hide Details
    NetworkError --> GenericMessage: Hide Details
    ValidationError --> SpecificMessage: User-Friendly Error
    
    GenericMessage --> LogError: Log Internally
    SpecificMessage --> LogError: Log Internally
    
    LogError --> NormalOperation: Recover
```

### Security Layers

```mermaid
graph TB
    subgraph Layer1["Layer 1: Input Validation"]
        A1[Sanitize Input]
        A2[Validate File Types]
        A3[Check File Size]
    end
    
    subgraph Layer2["Layer 2: Authentication"]
        B1[API Key Validation]
        B2[Environment Variables]
        B3[No Hardcoded Secrets]
    end
    
    subgraph Layer3["Layer 3: Transmission"]
        C1[HTTPS Only]
        C2[TLS Encryption]
        C3[Secure Headers]
    end
    
    subgraph Layer4["Layer 4: Storage"]
        D1[Local Only]
        D2[No Sensitive Data]
        D3[Auto Cleanup]
    end
    
    Layer1 --> Layer2
    Layer2 --> Layer3
    Layer3 --> Layer4
```

### Session Security Flow

```mermaid
sequenceDiagram
    participant U as User
    participant S as Session
    participant M as Messages
    participant D as Documents
    
    U->>S: Create Session
    S->>S: Generate Session ID
    S->>M: Initialize Message Array
    S->>D: Initialize Document Store
    
    loop Each Message
        U->>M: Add Message
        M->>M: Store in session_state
    end
    
    U->>D: Upload Document
    D->>D: Process and Index
    
    U->>S: End Session
    S->>M: Clear Messages
    S->>D: Clear Documents
    S->>S: Destroy Session
```

---

## RAG Pipeline Flow

### Complete RAG Process

```mermaid
flowchart TD
    A[User Question] --> B[Query Processing]
    B --> C[Vector Search]
    C --> D[Retrieve Top K Chunks]
    D --> E[Build Context]
    E --> F[Create Prompt]
    F --> G[Send to LLM]
    G --> H[Receive Response]
    H --> I[Format Output]
    I --> J[Display to User]
    
    K[Document Upload] --> L[PDF Loading]
    L --> M[Text Splitting]
    M --> N[Generate Embeddings]
    N --> O[Store in Vector DB]
    O --> C
```

### Chunk Processing Flow

```mermaid
graph LR
    A[PDF Document] --> B[Load Pages]
    B --> C[Extract Text]
    C --> D[Split into Chunks]
    D --> E{Chunk Size OK?}
    E -->|No| F[Merge/Split]
    E -->|Yes| G[Generate Embedding]
    F --> G
    G --> H[Store with Metadata]
    H --> I[(Vector Database)]
```

---

## Next Steps

- [Authentication & Security](authentication-security.md) - Detailed security documentation
- [Development Guide](development.md) - Development workflow
- [API Endpoints](api-endpoints.md) - API documentation
