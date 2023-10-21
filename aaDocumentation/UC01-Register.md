# ID: UC01, Title: Register

- **Description:** New user creates an account

- **Level:** App

- **Flow of Events:** 
    1. User enters registration details
    2. Client side form validation
    3. On success user is logged in and redirected

- **Pre-conditions:**
    1. User not already logged in
    2. User navigates to register route

- **Post-conditions:**
    1. User instance is created in the DB.
    2. User assigned JWT token
    3. User redirected

- **Exceptions:**
    - Server side form validation
    - Username or email already exists in DB
    - Invalid http requests

- **Frequency:**
    - Every time a new user tries to register

- **Comment:**
    - Luis: How do send the client the correct information for form validation? Should we send this in the response body of the **/register get** request? I.e. how do we let the user know the min/max number of characters for each forms, how do we tell them that a username/email is already taken?
