sequenceDiagram
%% Actors
participant User as User
participant Browser as Browser
participant Server as Server

    %% User action
    User ->> Browser: Type note text<br/>and click **Save**

    %% Browser-side handling
    Note right of Browser: JS event handler runs:<br/>`event.preventDefault()`
    Browser ->> Browser: Create <code>note = { content, date }</code>
    Browser ->> Browser: <code>notes.push(note)</code><br/>& re-render list (DOM)

    %% Send note to server
    Browser ->> Server: POST&nbsp;/new_note_spa<br/>Content-Type: application/json<br/>Body: <code>{content, date}</code>
    activate Server
    Note right of Server: Store note in memory / DB
    Server -->> Browser: 201 Created (no redirect)
    deactivate Server

    %% Final state
    Note right of Browser: Stays on same page;<br/>UI already shows the new note;<br/>**no full-page reloads** occur
