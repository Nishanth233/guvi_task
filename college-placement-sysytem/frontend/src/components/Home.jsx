import React, { useState } from "react";
import SkillMapping from "../components/SkillMapping";
import Footer from "../components/Footer";
const Home = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      message: "Placement applications are due tomorrow!",
      type: "warning",
    },
    { id: 2, message: "New internship opportunities available.", type: "info" },
    { id: 3, message: "Company ABC is visiting next week.", type: "success" },
  ]);
  const skillData = [
    {
      role: "Software Developer",
      skills: ["JavaScript", "React", "Node.js", "CSS"],
    },
    {
      role: "Data Scientist",
      skills: ["Python", "R", "Machine Learning", "SQL"],
    },
    {
      role: "Project Manager",
      skills: [
        "Leadership",
        "Communication",
        "Agile Methodologies",
        "Risk Management",
      ],
    },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-col items-center flex-grow p-10">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <div className="text-gray-7V00 md:w-1/2">
            <h1 className="text-3xl text-indigo-500 font-bold mb-6">
              College Placement Management System
            </h1>
            <p className="mb-4 text-2xl">
              Manage student applications, schedule interviews, and coordinate
              with companies efficiently.
            </p>
            <p className="mb-4 text-2xl ">
              Our platform provides a streamlined process for managing the
              college placement lifecycle. From application submissions to
              interview scheduling, and from company collaborations to result
              tracking, everything is integrated into one seamless system. This
              ensures that students, companies, and college administrators can
              collaborate effectively and achieve successful placements.
            </p>
            <p className="mb-4 text-2xl">
              Join us and take advantage of a robust system that enhances the
              college placement experience, ensuring better opportunities for
              students and seamless operations for colleges and companies.
            </p>
          </div>
          <div>
            <video autoPlay loop muted playsInline id="solution-banner-video">
              <source src="videos/Placement.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div>
          <section className="bg-white p-8  rounded-lg shadow-md  ">
            <div className="flex space-x-4">
              <div className="flex flex-col md:flex-row bg-indigo-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-4">
                <div className="md:w-1/2 mb-4 md:mb-0">
                  <h2 className="text-2xl text-white font-bold mb-4">
                    Students
                  </h2>
                  <p className="mb-4 text-lg text-white">
                    Empowers students to create job profiles, search, and apply
                    for jobs and internships; instant job matching that takes
                    their career to the next level.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center items-center">
                  <img
                    src="\images\download.jpg"
                    alt="Students Image"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row bg-indigo-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-4">
                <div className="md:w-1/2 mb-4 md:mb-0">
                  <h2 className="text-2xl text-white font-bold mb-4">
                    Placement Team
                  </h2>
                  <p className="mb-4 text-lg text-white">
                    Attract several companies and manage them from a centralized
                    place; capture data and reports related to students and
                    employers in a single click, securely.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center items-center">
                  <img
                    src="\images\team.jpg"
                    alt="Placement Team Image"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row bg-indigo-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-4">
                <div className="md:w-1/2 mb-4 md:mb-0">
                  <h2 className="text-2xl text-white font-bold mb-4">
                    Companies
                  </h2>
                  <p className="mb-4 text-lg text-white">
                    Create multiple job postings and get instant access to the
                    entire students' database to match them based on skills,
                    GPA, and certificates for the best hiring experience.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-center items-center">
                  <img
                    src="\images\company.jpg"
                    alt="Companies Image"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div>
              <h2 className="text-4xl text-indigo-800 font-bold mb-4 mt-9">
                Student Placement Management System that automates campus
                placements to the tee.
              </h2>
              <div>
                <p className="text-gray-700 text-2xl mb-4">
                  The system brings together various stakeholders and offers
                  targeted placements, reliable data management, compliance, and
                  the ability to scale across your institution.
                </p>
              </div>
              <div className="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mt-8 w-full">
                <div className="md:w-1/2 mb-4 md:mb-0">
                  <h2 className="text-3xl text-indigo-600 font-bold mb-4">
                    Do more with our system:
                  </h2>
                  <ul className="list-disc list-inside text-2xl text-gray-700 mb-4">
                    <li className="hover:text-indigo-500 transition-colors duration-200">
                      Dashboards to monitor and evaluate each step
                    </li>
                    <li className="hover:text-indigo-500 transition-colors duration-200">
                      Real-time placement status tracking
                    </li>
                    <li className="hover:text-indigo-500 transition-colors duration-200">
                      Integrated learning to get students placement-ready
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2 flex justify-center items-center">
                  <img
                    src="\images\Student-profiling (1).webp"
                    alt="System Features Image"
                    className="rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mt-8 w-full">
                <div className="md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
                  <img
                    src="\images\Transparent-placement-process (1).webp"
                    alt="Student Profiling Image"
                    className="rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-3xl text-indigo-600 font-bold mb-4">
                    Comprehensive Student Profiling
                  </h2>
                  <p className="text-gray-700 text-2xl mb-4">
                    Gives students innovative profile-building options with easy
                    sign-in, profile creation, edit and update options, which
                    students would love the most.
                  </p>
                  <p className="text-gray-700 text-2xl mb-4">
                    Our student career placement software empowers your students
                    to portray all their achievements and share them
                    impressively in no time. Build a healthy student-university
                    bond with the e-track that regularly sends notifications to
                    students about their job application progress.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 text-2xl mb-4">
                    <li className="hover:text-indigo-500 transition-colors duration-200">
                      Digital portfolio to display skills and achievements
                    </li>
                    <li className="hover:text-indigo-500 transition-colors duration-200">
                      Alignment of portfolios to the competency framework
                    </li>
                    <li className="hover:text-indigo-500 transition-colors duration-200">
                      Powerful learning path reports with insights
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mt-8 w-full">
                <div className="md:w-1/2">
                  <h2 className="text-3xl text-indigo-600 font-bold mb-4">
                    Top-Notch Employer Management
                  </h2>
                  <p className="text-gray-700 text-2xl mb-4">
                    Our student placement management software helps plan out a
                    recruitment strategy with milestones pitched out for the
                    employers to manage a high volume of job profiles
                    efficiently, choose the right candidates from the campus
                    talent pool, and nail on the one that they had been looking
                    for.
                  </p>
                  <p className="text-gray-700 text-2xl mb-4">
                    Receive constant updates from clubs, companies, and
                    committees and be notified of campus activities all year
                    round.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 text-2xl mb-4">
                    <li className="hover:text-indigo-500 transition-colors duration-200">
                      Job posting and efficient candidate shortlisting
                    </li>
                    <li className="hover:text-indigo-500 transition-colors duration-200">
                      Scheduling mock interviews, GDs, aptitude tests
                    </li>
                    <li className="hover:text-indigo-500 transition-colors duration-200">
                      Repository to store placement agreements, safely
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2 flex justify-center items-center">
                  <img
                    src="\images\Employer_management (1).webp"
                    alt="Employer Management Image"
                    className="rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mt-8 w-full">
                <div className="md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
                  <img
                    src="\images\Real_time_reporting (1).webp"
                    alt="Reporting Tools Image"
                    className="rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-3xl text-indigo-600 font-bold mb-4">
                    Robust Reporting Tools
                  </h2>
                  <p className="text-gray-700 text-2xl mb-4">
                    Generate easy reports with customizable dashboard views that
                    allow drag and drop of data. Pull countless customized
                    reports to analyze trends in your placement process from
                    start to finish and to monitor the activities of the users
                    closely.
                  </p>
                  <p className="text-gray-700 text-2xl mb-4">
                    You get a safe and confidential placement evaluation and
                    data management system with our student placement management
                    software.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 text-2xl mb-4">
                    <li className="hover:text-indigo-500 transition-colors duration-200">
                      Intelligent workflows using report/form builders
                    </li>
                    <li className="hover:text-indigo-500 transition-colors duration-200">
                      Analytics on payments, finances, accreditation
                    </li>
                    <li className="hover:text-indigo-500 transition-colors duration-200">
                      Customized insights and reports, just in seconds
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white p-8 rounded-lg shadow-md mt-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-indigo-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-4">
                <h2 className="text-2xl text-white font-bold mb-4">
                  <img
                    src="/images/Effective_outreach.png"
                    alt="Effective Outreach Icon"
                    className="inline-block mr-2 h-15 w-15"
                  />
                  Effective Outreach
                </h2>
                <p className="text-gray-700 mb-4">
                  The platform offers better outreach with greater employer
                  conversions. The integrated CRM makes it easy to manage and
                  track placement-related actions on mobile and the web.
                </p>
              </div>
              <div className="bg-indigo-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-4">
                <h2 className="text-2xl text-white font-bold mb-4">
                  <img
                    src="\images\skill mapping.png"
                    alt="skill mapping Icon"
                    className="inline-block mr-2 h-15 w-15"
                  />
                  Perfect Skill Mapping
                </h2>
                <p className="text-gray-700 mb-4">
                  Recruiters can target the best profiles, and students can find
                  the best matching job openings from a variety of verticals
                  using our Job Matching Templates.
                </p>
              </div>
              <div className="bg-indigo-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-4">
                <h2 className="text-2xl text-white font-bold mb-4">
                  <img
                    src="\images\systematic recruitment.png"
                    alt="systematic recruitment Icon"
                    className="inline-block mr-2 h-15 w-15"
                  />
                  Systematic Recruitment
                </h2>
                <p className="text-gray-700 mb-4">
                  Nurture and establish healthy relationships with both
                  candidates and recruiters. One-view database to connect with
                  more companies and get regular updates from them.
                </p>
              </div>
              <div className="bg-indigo-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-4">
                <h2 className="text-2xl text-white font-bold mb-4">
                  <img
                    src="\images\data migration.png"
                    alt="data migration Icon"
                    className="inline-block mr-2 h-15 w-15"
                  />
                  Flexible Data Migrations
                </h2>
                <p className="text-gray-700 mb-4">
                  Cleanse and load data from legacy systems and repositories
                  during cutover and easy data import of additional data sources
                  or disciplines for future use.
                </p>
              </div>
              <div className="bg-indigo-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-4">
                <h2 className="text-2xl text-white font-bold mb-4">
                  <img
                    src="\images\alert and notification.png"
                    alt="alert and notification Icon"
                    className="inline-block mr-2 h-15 w-15"
                  />
                  Prompt Alerts and Notifications
                </h2>
                <p className="text-gray-700 mb-4">
                  Stay up-to-date with automated alerts, notifications, and
                  reminders sent on every action done. The system enables
                  effective communication via SMS, text messages, and email
                  alerts.
                </p>
              </div>
              <div className="bg-indigo-400 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 mb-4">
                <h2 className="text-2xl text-white font-bold mb-4">
                  <img
                    src="\images\analytics and reporting.png"
                    alt="analytics and reporting Icon"
                    className="inline-block mr-2 h-15 w-15"
                  />
                  Rich Data Analytics
                </h2>
                <p className="text-gray-700 mb-4">
                  Access data analytics and create ad-hoc reports in no time.
                  The reports help plug the gaps in the existing placement
                  process, offering better insights to the entire team.
                </p>
              </div>
            </div>
          </section>
        </div>
        <SkillMapping skills={skillData} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
