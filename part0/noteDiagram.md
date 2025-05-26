sequenceDiagram
participant browser
participant server

    Note right of browser: User writes note and clicks "Save"

    browser->>browser: JS intercepts form submit (event.preventDefault)
    browser->>browser: JS constructs a note object from input

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note with form data
    activate server
    server-->>browser: 302 Redirect to /notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: CSS file

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>browser: JS file

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: Updated notes as JSON

    browser->>browser: JS renders updated notes
