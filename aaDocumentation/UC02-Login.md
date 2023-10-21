# ID: UC02, Title: Login

- **Description:** Existing user logs in

- **Level:** App

- **Flow of Events:** 
    1. User enters login details
    2. Client side form validation
    3. On success user is logged in and redirected

- **Pre-conditions:**
    1. User not already logged in
    2. User navigates to login route

- **Post-conditions:**
    1. User logged in
    2. User redirected

- **Exceptions:**
    1. Username or email exists
    2. And password is valid

- **Frequency:**
    - Every time an existing user tries to register

- **Related UC:**
    - UC_01
    - UC_03

- **Comment:**
    - *Luis*: Should the user be allowed to choose to log in with both username or email?
    - *Luis*: Similar to UC_01. Do we handle form on client or create a dedicated route?
    - *Luis*: What happens if a user tries to sign in again? Should we only allow for one user session at a time? 