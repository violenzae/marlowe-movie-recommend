5/8/20

8:30am - purchased 10 hr udemy course on creating react chatbots and started following: https://www.udemy.com/course/chatbot-for-website-with-react-and-nodejs/

9:20am - created data flow diagram for top down look at the connected app parts

9:50am - created dialogflow account and base "agent"

10:39am - configuring custom default responses (ie "don't understand") and then user welcome triggers (ie "hello" "sup" "good morning) within the dialogflow console

11:06am - discovered dialogflow has the skeleton of a prebuilt video searcher with parameters/intents/entities for actors and directors and genres D: the actions aren't set to do anything yet obviously but super helpful!!

11:48am - adding a ton of common small talk/chit chat responses in dialogflow console

12:03pm taking a break on small talk and dialogflow, will do component diagram after lunch

1:50pm added kind of bad component diagram, still need to research how the chat bot text aspect can be rendered in react via tutorial

3:00pm working on backend portion of chatbot tutorial for awhile now, reconfiguring file structure to add in react later. hopefully does not break the repo

3:43pm created heroku deploy for backend (https://rocky-meadow-29560.herokuapp.com/)

4:19pm installed lots of dependencies, created basic route skeleton. set up separate google service account for api client of dialog flow


------
 
 5/15/20

 9-11AM: Reading about deployment methods, backend API calls and eating breakfast

 11am: updating api calls to await/async to declutter code

 11:20: OH HELL YEAH API SUCCESS  

![API success](public/img/liftoff.PNG)  


12:30: working on setting up dev/prod google environment variables for heroku.

12:57pm: api calls to deployed heroku backend server work!!

1:30pm: setting up react app and concurrently npm package. got both to run locally thru making npm run dev command in package.json, installing proxy middleware npm'


5/18/20

spent today working either in dialogflow console tweaking the custom json responses or following along with the tutorial on backend/front end. the code end work is covered in the commits from today.

5/19/20

strugglebussing in dialogflow setting up a path tree that will ask all of the questions used in the movie api call.. which does not exist yet. ;-;

possibly switching to TMDB instead of OMDB for api, it has discover feature for genre and year that will be more useful.

having a hard time accessing the parameters within json.. will probably just follow along with tutorial to add to database and access from there.

setting up the mongodb database and schema and connecting to backend . installing mongoose.

oh god dammmmn i got the json right in the save state so i don't need the database for now! yessss.



5/20/20

12:30pm - had an inspired day and pretty much wrapped up all of the coding and design side of things as memorialized in git commits. will now work on deploying, more conversation flavor text in dialogflow console and creating the README.

3:50 utterly stuck for now trying to get the tmdb api call working in the back end as opposed to the front. struggle. bus. the google one is very obscured and specific and is not helpful in replicating it. might not be able to deploy successfully as of yet.. stretch goal.

cleaning up stuff in dialogflow now.

5pm: spent more time trying to pass the key to the front from the back and giving up for now.