sequenceDiagram
participant Browser
participant Server

    Browser->>Server: GET /exampleapp/spa
    activate Server
    Server-->>Browser: index.html (SPA version)
    deactivate Server

    Browser->>Server: GET /exampleapp/main.css
    activate Server
    Server-->>Browser: CSS file
    deactivate Server

    Browser->>Server: GET /exampleapp/spa.js
    activate Server
    Server-->>Browser: JavaScript SPA code
    deactivate Server

    Note right of Browser: Browser executes spa.js

    Browser->>Server: GET /exampleapp/data.json
    activate Server
    Server-->>Browser: JSON data with notes
    deactivate Server

    Note right of Browser: Browser renders the notes dynamically using JavaScript

    Note right of Browser: No page reloads occur after this point
