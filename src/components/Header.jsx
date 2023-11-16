import React from "react";

export default function Header() {
  return (
    <>
      <div className="wrapperStyle text-center">
        {" "}
        <h1 className=" itemTitle text-4xl my-5"> WHERE DO I EVEN START?!</h1>
        <p className=" p-1">
          Ever wanted to move to a new city? A new country? And you had no idea
          where to even begin? Simply ask your friendly neighbourhood AI by
          typing below or use the handy dandy speech to text tool! Try typing
          something like:
        </p>
        <p className="p-1">"I want to move to Lisbon from Berlin"</p>
        <p className=" p-1">
          and the assistant will suggest a list of things to do in your current
          location, things to do on your journey and finally the things to do
          when you arrive!
        </p>
        <p className=" p-1">
          Then simply wait for the assistant to generate your todo list and then
          you can make changes and even add new steps!
        </p>
      </div>
    </>
  );
}
