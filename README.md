[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Tic-Tac-Toe  https://donpowers.github.io/Tic-Tac-Toe-Client/
Repo: https://github.com/donpowers/Tic-Tac-Toe-Client
Goals

1. Build a web Tic-Tac-Toe application from scratch, without a starter codebase
2. Using my programming skills, map out the game logic for a simple game like Tic Tac Toe
3. eparate HTML, CSS, and JavaScript files in your application
4. Build an application to a spec that someone else gives you
5. Build a dynamic game that allows two players to compete (bonus: compete from separate devices)
6. Craft a readme.md file that explains your app to the world
7. Communicate with a back-end to store the state of your game.

Objectives
1. Command Line: Interacting with the computer and navigating the filesystem from
the command line.
2. Source Control: Managing and interacting with a git repository to store changes to code.
3. Programming Fundamentals: Working with objects, constructors, and events, while
learning how to strategically solve problems and resolve errors.
4. Web Fundamentals: Structuring, styling, and animating documents within a browser;
responding to actions your users take and the data they input into the browser.
5. Browser Applications: Using AJAX to connect to a back-end application.
6. Server Applications: We haven't covered a ton of server-side technologies yet
(that's up next), but we learned a bit about how API endpoints work, and how to
get data from them.
7. Security: With JavaScript closures, scratching the surface of why security matters.
8. Deployment: Host a static web site in a managed hosting environment (GitHub Pages)
9. Products and Teams: Document your code and your code repository so others
understand what you've built.

Requirements
1. Be a single-page application.
2. Use a custom game engine written by you.
3. Be deployed online, where the rest of the world can access it.
4 .Render a game board in the browser.
5. Switch turns between X and O (or whichever markers you select).
6. Visually display which side won if a player gets three in a row
or show a draw/"cat’s game" if neither wins.
7. Support playing multiple games, one at a time.
8. Use jQuery for DOM manipulation and event handling.
  -Use AJAX for interacting with a provided API. Specifically, your app must:
  -Visually display the results of retrieving game statistics, such as total
  games won by a user. (READ)
  -Create new games on the server. (CREATE)
  -Update a game by storing new moves. (UPDATE)

  Technologies: HTML, CSS, SASS, BootStrap, JavaScript, JQuery, GIT, DOM, AJAX

##User stories

The user: anyone who wants to play Tic Tac Toe.

Story: As a User, I want to Play in a desktop browser, So that I can play on
my computer
Story: As a User, I want to know my current games won, So that I can try
harder
Story: As a User, I want to change my password, So that I feel secure.
Story: As a User, I want to logout, So that no one can play under my account.
Story: As a User, I want to know when it is my turn, So that I can play my turn.
Story: As a User, I want to my mark to be X, So I can go first.
Story: As a User, I want to Sign Up, so that I can play in the future.
Story: As a User, I want to know who won, So that I can celebrate

##Wireframe
The initial wireframe mockup of a potential site design is located here
http://i.imgur.com/Ml7FeJx.jpg

##Game approach

My approach was a concept that is often talked about at work, Minimum Viable
Product or MVP. The goal is have a product with the minimal features, so that
users feedback can be recieved early, allowing adjustments to be made, with
minimal work upfront. Looking at the requirements I created a simple wireframe.
Next I created user stories from the requirements based from the User's
perspective.

I started out with a basic UI, building the sign up and sign in user stories. We were
just introduced to bootstrap, so I wanted to use some of these components. I thought
I had followed what we had done in class when working with sigup/in, giving each
input the proper ID so that it could be read in via the helper function
getFormFields.  Well I missed the critical part 'form' tag.  After much
debugging I realized my error. The clock was ticking and already I hit an
unexpected bump, one of many along the way.

Next, jquery and I had a did not see I to eye to eye.  I had given my tags ids
to help manage them so they could be used to identify the elements in the DOM.
Trying to be clever, I gave my IDs a similar root and I would build off of that
root to access the related elements. I happened to be using images as my X and O.
One of the features I wanted to implement if time permitted was to allow the user
to change the mark used in the game. It turns out the ID for these images I built
using the string concatenate feature. I assigned this to a variable with the idea
to place this variable inside of $(). Well there were no lint errors and things
appeared fine, until there were no events being recieved. When I used
element.addHandlers things worked as expected. WTF! Several hours later and into the
next day I was at a lost why this would not work. To make matters worse, even though
I was able to add the event using the element method, I could not disable the
event, one of the requirements, the user should not be able to click more than
once in the same cell. When I hard coded the ID(did not build it as a string), it
worked as expected.  Sometime later I learned that jquery, when passing a string
does some magic behind the scene, to determine what you are passing.  With a
little more research(and many hours) I learned that you can build the string
inside $('#'+id+img) and it works like a charm!

Unfortunately while I was trying
to figure this issue out I was working on several things at one time, trying to
keep the ball moving. By the time I had to merge my code back, there were more
changes in many branches that I had not yet merged. OMG, what do I do now? All the
code got in, without to much heartache and learning more about GIT.

Next, I built the game logic, storing the game results locally. This took some
time. Looking at the api, I created my game objects to reflect what the api was
either going to pass back or needed sent.  This decision helped build the api
calls since I had working knowledge of the objects. Api calls followed a pattern
that lead to building them out straight forward. Sending the current play to the api
was a success out of the box. The return object was as expected, a nice feeling.

I did have some cut and paste challenges when saving my local version of the
game.  I failed to update similar but different lines of code. This was not an easy
fix, since I looked at the line of code many times, thinking this is as it should
be, but in the end it was not!  Beware cut n paste issues!

I also hit a road block when starting a new game.  It was not as straight forward
as I thought it was going to be.  I spent several hours getting this to work. I
spent must of Friday working on this.  This prevented me from finishing the
next user story which determines the number of games won. It also pushed back
my desire to get a more fancy front end design.  By this time several others
had some impressive front ends and I was starting to feel like I was falling
behind.

On Friday I did my first attempt at deploy. It was not overly clear what
was needed.  There were errors. Sure I read them, but it was like reading another
language. After reading someone else's issue post, I just took the git command
listed in the error message and ran it. Sure enough whatever thing was not as
expected got fixed and my deploy was successful.

Saturday, not that my game logic was working I was able to start on determing
the Wins.  I had some challenges parsing the arrays. I finally was able to
determine the correct way to index them and get the necessary totals.

After this checkin, I notice that someone had posted a comment to my TTT repo!
I left it public, never thinking someone would look at my code. Well they had a
suggestion to use for(i in id). I was always using 'length' to iterate over
my arrays. I thanked the person and made some changes.

Sunday, I finally was able to revisit the UI. I watch some videos on bootstrap,
used the websites and started on making my UI better.  Four hours later I was
struggling with rows and colums and getting no where fast. I abandon that idea
and decided time was running out. I cleaned up my FE and called it a wrap, that
is after I commented out all my console messages.  Also, getting my images
on the web, since for some reason they did not deploy, known issue?

I think I made all the requirements. I code could be cleaned up a bit, some
reuse could be done(determining game winner) and using some of the built in
array features when parsing the games. I don't think there are bugs, HA!

Building the FE with bootstrap is something that I was not able to do. My plan,
over the next few days is to look into this more and potentially get some
guidance via a one-on-one.
