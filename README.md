# Pomodoro_Productivity_App

GA SEI Project 2

App that helps user to keep track of their pomodoro sessions to keep them motivated to fulfill the minimum focus sessions daily (maybe around 1hr to 5 hr) while allowing them to take at least 5 mins breaks in between.

## Description

pomodoro technique is a method that helps a person to concentrate on a specific task for a fixed duration of time and take a break afterwards and the cycle will continue until the minimum hrs of focus session is fulfilled. the duration varies for different people but it is common for the focus session to be 25 mins and break session to be 5 mins.

This app helps the user to keep track of daily pomodoro sessions to motivate them to fulfill the minimum daily focus sessions (i.e. 1-5 hrs/ 2-11 sessions). all of the pomodoro sessioons will be stored in the notion database. each session is stored as a page in the database. notion allows the user to alter/move the pages if neccesary i.e. move the page to a new database in notion (archive database) for housekeeping but this will mean that the app have no access to the pages in different database.

---

### Technical Used

###### Frontend
- react
- react-router
- react-icon
- redux toolkit
- tailwind css
- dayjs

###### Backend
- express js
- notion api (@notionhq/client)
- body-parser
- cors
- nodemon


### Wireframes

![image](https://user-images.githubusercontent.com/44399805/176833046-3f5f201f-e04a-4417-acad-7d50f01586e3.png)

---

### User Stories

When user open the app, they will be directed to the list of pomodoro sessions which is stored in the notion database. as a default, when there are no date selected, all of the pomodoro sessions will be listed in the dashboard page and the accumulative duration of focus session will be shown in a blue box. 

When the user wants to access the pomodoro sessions on a specific date, they can select the date and see the total duration of focus session that happened that day. when the total duration > 5hrs, box will be green, if total duration < 1hrs, box will be red, if neither, box will be yellow. 

each session listed in the dashboard have the a delete button and info button. the delete button will set the archive to be true for the specific page id so the page will no longer appear in the notion database but can be recovered if need to, through a history function in notion. the info button will show all the information related to the the session i.e. name(summary of note), note, date, duratioon of sessioon, start and end time.

there is a side nav bar that have 2 icons which can direct the user to the dashboard (list of pomodoro sessions is displayed) or the pomoodoro session page (current pomodoro session and notes are recorded). the sidebar will dissapear when the pomodoro session is ongoing.

the pomodoro session page is where the user writes the summary of the notes (name) and the note during the pomodoroo session. when the user start the session by pressing the start button, the nav bar will dissapear and the user can foocus oof the task at hand. the user can either pause the session or stop the session. when the user press the stop button or the timer goes down to 0, the button will change to start and the timer will display 5 mins. when the user press start button for the break session, the data(name, note, duraiton, start date with time and end date with time) will be send to the notion database and the input will be cleared from input box.

---

## Planning and Development Process

First Step:

Read the documentation of the notion api and watch youtube videos to see how the api is being used. It is being used too send data to and fro from the app to notion database and vice-versa. so far most example shows that notion api is use with express js to work.

Second Step:

create a nav bar too direct user to the two different pages. create the 2 pages (dashboard, pomodooro session). initially was trying to use css and bootstrap but changed to tailwind css since it is easier to use tailwind to alter individaul div.

Third Step:

create a countdown timer and figure out the logic for the focus session and the break session. Plan what data is needed too be pass and stored in the notion database. when is the data is stored in the state defined in the redux store i.e. start date and time, end date and time, all data is send when user press the start button during the break session, etc. the backgroound will be ligth blue or light red based on is the session is a focus session or break session. create a form component to store user input onChange to the data state in store.

Fourth Step:

Trying to send data from the app to notion database. watched youtube videos to see how they send data from react app to notion database and follow their codes. seems like the cooper codes used the express js post method to connect the local host 4000 server to the notion database and send(fetch with method post) the data using the localhost:4000 so i follow suit. Need to use the notion.pages.create() function to create a new page in notion.

Fifth Step:

trying to get the data from the app from the notion database. I used the fetch normal method to get the data from the nootion database after using the get method in express to connect the local host 4000 server to the notion database. managed to obtain the object which is then stored in a state call pageObj as list of object within an array. Need to use the notion.databases.query() to get the object that contains all the information in the notion database. Then I used the ErrorModal code to make it such that each list of session can display more information when the info button is clicked. I used tailwind css to style the modal.

Six Step:

Next is too delete the object froom the list of session displayed in the dashboard. Had to read the notion documentation properly and google to figure out that you need to change the archive property of an individual page to true to remove page so the page id is required. had to pass the page id to the delete button when mapping the list of session. Need to use the notion.pages.update() function to change page archive property to true. Added

Seventh Step:

Created the function to filter the list by date base on user date selection. but if the user did not choose any date, by default the list will display everything. also added the function to calculate the total duration of all the session in the list/ filtered list. if list is filtered by date, the box that display the total duration will change colour based on the duration. but if date is not filtered, box will be colour blue by default. 


### Problem-Solving Strategy

I draw things out to see how the logic/data flows which helps me to see the overall picture. ask google and watch youtube to see how other people used the api, see how other people create a countdown timer, see how other people creat a side nav bar, etc.

### Unsolved problems

- maybe create add a new database to allow user to store pages in the archive database using the app
- timer is slightly inaccurate since it uses interval to calculate and display time, might need to use research a more accurate way to record and display time using the Date.now()

## APIs Used

Notion Api

 ## References
 
 send data to notion database 
 - https://www.youtube.com/watch?v=WbekTHVISh0
 
 retrieve data from notion database
 - https://www.youtube.com/watch?v=zVfVLBjQuSA&t=675s
 
 send page id to 'delete' page
 - https://developers.notion.com/reference/patch-page

pomodoro timer
- https://www.youtube.com/watch?v=kTWJypbcSLI&t=576s
- https://www.youtube.com/watch?v=9z1qBcFwdXg&t=42s
 
