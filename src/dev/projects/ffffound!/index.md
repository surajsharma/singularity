## problem statement

- a bare-bones image bookmarking service along the lines of ffffound

- minimalism and speed

- add with bookmarklet
- recommendation engine
  - based on likes of other users
  - based on ML

- Architecture
  - images are served from a CDN with a single unique identifier, my guess is this is another db
  - static files are served from yet another subdomain
  - [[frontend]]
    - vite / svelte
  - [[api]]
  - [[cicd]]