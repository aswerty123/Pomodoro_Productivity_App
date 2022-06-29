// const { Client } = require("@notionhq/client");

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

//===================================== checkdata from database

// const getDatabase = async () => {
// async function getDatabase() {
//   const response = await notion.databases.retrieve({
//     database_id: process.env.NOTION_DATABASE_ID,
//   });
//   console.log(response.properties);
// }

// getDatabase();

//===================================== get tags from database

// async function getTags() {
//   const database = await notion.databases.retrieve({
//     database_id: process.env.NOTION_DATABASE_ID,
//   });

//   return notionPropertiesById(database.properties)[
//     process.env.NOTION_TAGS_ID
//   ].multi_select.options.map((option) => {
//     return { id: option.id, name: option.name };
//   });
// }

// //make the 'id' into a key for the rest of info inside the properties obj
// function notionPropertiesById(properties) {
//   return Object.values(properties).reduce((obj, property) => {
//     const { id, ...rest } = property;
//     return { ...obj, [id]: rest };
//   }, {});
// }

// //===================================== adding things to database

// function createSuggestion({ title, note, durationSecs, startTime, endTime }) {
//   notion.pages.create({
//     parent: {
//       database_id: process.env.NOTION_DATABASE_ID,
//     },
//     properties: {
//       [process.env.NOTION_NAME_ID]: {
//         title: [
//           {
//             type: "text",
//             text: {
//               content: title,
//             },
//           },
//         ],
//       },
//       [process.env.NOTION_NOTES_ID]: {
//         rich_text: [
//           {
//             type: "text",
//             text: {
//               content: note,
//             },
//           },
//         ],
//       },
//       [process.env.NOTION_DURATION_IN_SECS_ID]: {
//         number: durationSecs,
//       },
//       [process.env.NOTION_DATE_ID]: {
//         date: {
//           start: startTime,
//           end: endTime,
//           time_zone: "Singapore",
//         },
//       },

//       //   [process.env.NOTION_PROJECT_ID]: {
//       //     checkbox: isProject,
//       //   },

//       //   [process.env.NOTION_TAGS_ID]: {
//       //     multi_select: tags.map((tag) => {
//       //       return { id: tag.id };
//       //     }),
//       //   },
//     },
//   });
// }

// createSuggestion({
//   title: "notes title",
//   note: "This is a note",
//   durationSecs: 102,
//   startTime: "2022-06-28T08:10:47",
//   endTime: "2022-06-28T08:45:47",
// });

// module.exports = {
//   createSuggestion,
// };

// // getTags().then((tags) => {
// //   createSuggestion({
// //     title: "Test",
// //     description: "Hello Woraldo!",
// //     isProject: false,
// //     tags: tags,
// //   });
// // });

// module.exports = {
//   createSuggestion,
//   getTags,
// };
