import React from "react";

const SkillMapping = ({ skills }) => {
  return (
    <div className="w-full mt-8 bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <h2 className="text-3xl font-bold mb-4">Perfect Skill Mapping</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-indigo-400 p-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
          >
            <h3 className="text-2xl font-bold text-white mb-2">{skill.role}</h3>
            <ul className="list-disc list-inside text-lg text-gray-800">
              {skill.skills.map((skillDetail, i) => (
                <li
                  key={i}
                  className="hover:text-white transition-colors duration-200"
                >
                  {skillDetail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillMapping;
