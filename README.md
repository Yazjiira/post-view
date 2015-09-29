# Post View application
This application pulls in some posts from a wordpress api and then serves them to the page.

This initial commit is far from code complete, but it gives a general overview of how I would want to organize a project.

# Get it running
Getting the application up and running should be fairly easy.

```
  #pull the repo down
  git clone https://github.com/Yazjiira/post-view.git
  cd post-view

  #set up the app and serve it
  ./setup && ./serve
```

## Things that I tried to do
- Posts load 12 at a time when you load
- Code is separated out into modules to allow for easier testing later

## TODOS/Other Considerations
- Add loading states for when calls are being made
- Add some more error handling to the server
- Add drill down views (ex: click on a square and then have a modal w/ the details)
- Add state for when you've reached the last call for that site (no more new posts to get from server)
- Consolidate run scripts better
	- I didn't have time to drill down into the startup/setup scripts
	- Create a .bat files for Jim

## New learnings that I took away from this
- First Times:
	- Setting up an asset build pipeline in grunt
	- Building Node server for application use
	- Setting up build pipeline for RequireJS modules
	- Using CanJS 
