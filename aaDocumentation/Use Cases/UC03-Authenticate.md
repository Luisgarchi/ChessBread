# ID: UC_03, Title: Stay logged in

- **Description:** Automatically authenticate user

- **Level:** App

- **Flow of Events:**
    1. User navigates to url requiring authentication
    2. Session is authenticated

- **Pre-conditions:**
    - User has previously logged in without loggin out from their prior session
    - User session cookie has not expired

- **Post-conditions:**
    - Access granted to routes requiring authentication
    - **On Failure**: access denied

- **Exceptions:**
    - Session or token exists in client storage (if we end up using JWT for authentication in the later)

- **Frequency:**
    Every time authentication is require for a URL

- **Related UC:**
    - UC_02

- **Comment:**
    - *Luis*: Do we reset the JWT everytime the user is logged in?
    - *Luis*: Can we achieve the same functionality using either JWT stored in client storage or with express-session middleware?
    - *Luis*: JWT approach - looks like we have to save the JWT in the client local storage and then send it as an Authorization header. For example ("*05-JWT-Basics/public/browser-app.js*") of saving the header look at *line 27*, and for setting and sending header request look at *line 48*.