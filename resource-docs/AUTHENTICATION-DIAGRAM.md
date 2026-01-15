sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Session
    participant DB

    User->>Frontend: Submit login form
    Frontend->>API: POST /auth/login (request)
    API->>DB: fetch user
    DB-->>API: user record
    API->>API: validate password

    alt Invalid credentials
        API-->>Frontend: 401 response
    else Valid credentials
        API->>Session: create session
        Session-->>API: session id
        API-->>Frontend: response (cookie)
    end
