require("dotenv").config();
const express = require("express");
const { Client } = require("@notionhq/client");
const cors = require("cors");
var bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

//=================================== Info
const NOTION_API_KEY = "secret_JSYDEDjSpCKXNpgQCXXlNlCQcZsntWrrzJrktwc8dsS";
const NOTION_DATABASE_ID = "03f86a2e36c94b8897214ce91641ec0c";
const PORT = "4000";
const HOST = "localhost";
const NOTION_NAME_ID = "title";
const NOTION_DATE_ID = "M~LB";
const NOTION_DURATION_IN_SECS_ID = "fAAW";
const NOTION_NOTES_ID = "d%7BOb";

//===================================

const app = express();

app.use(cors());

const notion = new Client({ auth: NOTION_API_KEY });

app.post("/submitDataToNotion", jsonParser, async (req, res) => {
  //req.body
  const name = req.body.name;
  const note = req.body.note;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const durationSecs = req.body.durationSecs;

  try {
    const response = await notion.pages.create({
      parent: {
        database_id: NOTION_DATABASE_ID,
      },
      properties: {
        [NOTION_NAME_ID]: {
          title: [
            {
              type: "text",
              text: {
                content: name,
              },
            },
          ],
        },
        [NOTION_NOTES_ID]: {
          rich_text: [
            {
              type: "text",
              text: {
                content: note,
              },
            },
          ],
        },
        [NOTION_DURATION_IN_SECS_ID]: {
          number: durationSecs,
        },
        [NOTION_DATE_ID]: {
          date: {
            start: startTime,
            end: endTime,
            time_zone: "Singapore",
          },
        },
      },
    });
    console.log(response);
    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

app.get("/submitDataToNotion", async (req, res) => {
  const notionPages = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    sorts: [{ property: NOTION_DATE_ID, direction: "descending" }],
  });

  res.send(notionPages);
});

app.post("/deleteDataFromNotion", jsonParser, async (req, res) => {
  const pageId = req.body.pageID;

  try {
    const response = await notion.pages.update({
      page_id: pageId,
      archived: true,
    });
    console.log(response);
    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

//=========================== Get Notion Database
// async function getDatabase() {
//   const response = await notion.databases.retrieve({
//     database_id: NOTION_DATABASE_ID,
//   });
//   console.log(response);
// }
// getDatabase();
//=================================================

app.listen(PORT, HOST, () => {
  console.log(`starting proxy ${HOST} : ${PORT}`);
});

console.log("HELLO WORLARDO!!!");
// console.log(NOTION_DATE_ID);
