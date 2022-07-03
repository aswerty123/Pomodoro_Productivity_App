# Pomodoro_Productivity_App

GA SEI Project 2

App that helps user to keep track of their pomodoro sessions to keep them motivated to fulfill the minimum focus sessions daily (maybe around 1hr to 5 hr) while allowing them to take at least 5 mins breaks in between.

## Description

pomodoro technique is a method that helps a person to concentrate on a specific task for a fixed duration of time and take a break afterwards and the cycle will continue until the minimum hrs of focus session is fulfilled. the duration varies for different people but it is common for the focus session to be 25 mins and break session to be 5 mins.

This app helps the user to keep track of daily pomodoro sessions to motivate them to fulfill the minimum daily focus sessions (i.e. 1-5 hrs/ 2-11 sessions). all of the pomodoro sessioons will be stored in the notion database. each session is stored as a page in the database. notion allows the user to alter/move the pages if neccesary i.e. move the page to a new database in notion (archive database) for housekeeping but this will mean that the app have no access to the pages in different database.

### Technical Used
What technologies you used that helped you build this project. 

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


### User Stories

When user open the app, they will be directed to the list of pomodoro sessions which is stored in the notion database. as a default, when there are no date selected, all of the pomodoro sessions will be listed in the dashboard page and the accumalative duration of foocus session will be shown in a blue box. When the user wants to access to a specific date, they can select the date 

```
Example:

User must be able to:

- View Example
- Blablabla
- Search Example
- Fine Example
- etc..

```

---

## Planning and Development Process

A basic story of your planning and developing this project.

### Problem-Solving Strategy

What strategy did you use to solve your problems.

### Unsolved problems

List unsolved problems which would be fixed in future iterations.
- maybe create add a new database to allow user to store pages in the archive database using the app

## APIs Used

Notion Api


---

## Acknowledgments


---

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
 
