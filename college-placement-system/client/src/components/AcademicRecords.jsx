import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const AcademicRecords = () => {
  const records = {
    grades: [
      { subject: "Mathematics", grade: "A" },
      { subject: "Computer Science", grade: "A+" },
      { subject: "Physics", grade: "A" },
      { subject: "Chemistry", grade: "B+" },
    ],
    achievements: [
      "First Place in Coding Competition",
      "Dean's List",
      "Winner of Science Fair",
      "Member of Robotics Club",
    ],
  };

  return (
    <div>
      <Header/>
      <h2>Academic Records</h2>
      <h3>Grades</h3>
      <ul>
        {records.grades.map((record, index) => (
          <li key={index}>
            {record.subject}: {record.grade}
          </li>
        ))}
      </ul>
      <h3>Achievements</h3>
      <ul>
        {records.achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
};

export default AcademicRecords;
