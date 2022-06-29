import React from "react";
import { useSelector } from "react-redux";

const DisplayList = () => {
  const storePagesObj = useSelector((state) => state.pomodoro.pagesObj);
  return (
    <div>
      <ul className="flex flex-wrap">
        {storePagesObj.map((page, i) => (
          <li
            className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-red-500 dark:border-gray-700 dark:hover:bg-gray-700"
            key={page.id}
          >
            <div>Title Id:{page.id}</div>
            <div>Title:{page.properties.Name.title[0].plain_text}</div>
            <div>Notes:{page.properties.Notes.rich_text[0].plain_text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayList;
