import {
  about,
  contact,
  main,
  mySkills,
  projects,
  sidebar,
  work,
} from "../typings/data";
import spotifyImg from "./projects/spotify.png";
import chatBuddyImg from "./projects/chatBuddy.png";
import collegeCMSImg from "./projects/collegeCMS.png";
import fudoImg from "./projects/fudo.png";
import pinmeImg from "./projects/pinme.png";
import apiDexImg from "./projects/apiDex.png";
import instagramImg from "./projects/instagram.png";
import snapchatImg from "./projects/snapchat.png";
export const sidebarData: sidebar = {
  subTitle: "Web Developer",
  options: [
    {
      title: "Projects",
      id: "projects",
    },
    {
      title: "About",
      id: "about",
    },
    {
      title: "Work",
      id: "work",
    },
    {
      title: "My Skills",
      id: "skill",
    },
    {
      title: "Contact",
      id: "contact",
    },
  ],
  links: [
    {
      type: "instagram",
      link: "https://www.instagram.com/t.u.s.h.a.r0_0/",
    },
    {
      type: "github",
      link: "https://github.com/brogrammer07",
    },
    {
      type: "linkedin",
      link: "https://www.linkedin.com/in/tushar-tomar-882708213/",
    },
  ],
};

export const mainData: main = {
  firstLine: "Hi,",
  secondLine: "I'm-Tushar",
  thirdLine: "Web-Developer",
  subHeading: "Full-Stack Web Developer",
};

export const projectsData: projects = {
  number: "01",
  title: "My/Projects",
  desc: "A small gallery of web development projects carefully chosen by me, showcasing my diverse interests and skills. These projects reflect my passion for creating unique solutions and pushing boundaries in the field of web development.",
  projectList: [
    {
      img: chatBuddyImg,
      link: "https://github.com/brogrammer07/Chat-Buddy",
    },
    {
      img: collegeCMSImg,
      link: "https://github.com/brogrammer07/College-Erp",
    },
    {
      img: fudoImg,
      link: "https://github.com/brogrammer07/Fudo",
    },
    {
      img: pinmeImg,
      link: "https://github.com/brogrammer07/PinMe",
    },
    {
      img: apiDexImg,
      link: "https://github.com/brogrammer07/Api-Dex",
    },
    {
      img: instagramImg,
      link: "https://github.com/brogrammer07/Instagram-Clone",
    },
    {
      img: spotifyImg,
      link: "https://github.com/brogrammer07/Spotify-Clone",
    },
    {
      img: snapchatImg,
      link: "https://github.com/brogrammer07/Snapchat-Clone",
    },
  ],
};

export const aboutData: about = {
  number: "02",
  title: "Myself",
  desc: '<p className="text-white w-full lg:w-[70%] text-base" >Hello Stranger, I am Tushar Tomar, a Full Stack Web Developer based in Delhi. With a passion for coding, I began my journey in 2020 and have since gained experience as both an intern and a freelancer.<br/><br/>Currently pursuing a B.Tech in Computer Science, I am constantly looking for new opportunities to expand my skill set and take on exciting projects.<br/><br/>With a strong foundation in <span className="text-[#08fdd8]">web development</span> and expertise in multiple programming languages and frameworks, I am equipped to tackle complex problems and deliver top-quality solutions.</p>',
};

export const workData: work = {
  number: "03",
  title: "Where/I've/Worked",
  work: [
    {
      title: "Full-Stack Web Developer",
      company: "Bessalani",
      date: "May 2022 – July 2022",
      description: [
        "Led the development and delivery of a full-stack service that created a web application aimed at providing learners from multiple organizations with a platform to learn new skills.",
        "Designed and developed a fully operational Learning Management System (LMS) with Admin and Learner panels, featuring various CRUD operations, class scheduling, attendance tracking, course uploads, and user authentication.",
        "Led the design and implementation of the backend operations using Node.js and MongoDB, incorporating AWS S3 for cloud storage.",
        "Designed a Figma-based user interface and developed the frontend of an application that visualizes employee and learner growth, course completion, and batch progress using ReactJS, Tailwind CSS, and Syncfusion.",
        "Designed and implemented the landing page and course section of the Bessalani website, using Figma for the design and ReactJS and Tailwind CSS for the development.",
      ],
    },
    {
      title: "Frontend Web Developer Intern",
      company: "Cloutflow",
      date: "Sept 2022 – Nov 2022",
      description: [
        "Contributed to the development of the Brand Side Web Application, an online platform that facilitates the recruitment of creators for brands’ advertising campaigns.",
        "Contributed to the development of the Creator’s facing application, which enables creators to discover and apply for brand campaigns.",
        "Utilized WebSockets technology to implement real-time chat and notification functionality in both the Brand and Creator applications.",
        "Developed the Admin Panel using ReactJS, ReactQuery, and AntD, in accordance with a Figma design.",
      ],
    },
  ],
};

export const mySkillsData: mySkills = {
  number: "04",
  title: "My/Skill/Set",
  desc: `<p className="text-white lg:w-[90%]">As a Full Stack Web Developer, I have a comprehensive understanding of both front-end and back-end web development. I am proficient in several programming languages and frameworks, including ReactJS, which allows me to take on a wide variety of projects.<br/><br/>With my experience in web development, I am able to design, develop, and deploy fully functional web applications that meet my client's needs.<br/><br/>Additionally, my experience as an intern and a freelancer has given me valuable experience in project management, communication, and problem-solving, which allows me to work effectively both independently and as part of a team.<br/><br/>Visit my <a href="https://www.linkedin.com/in/tushar-tomar-882708213/" rel="noreferrer" target="_blank" className="text-secondary">LinkedIn</a> profile for more details or just <a href="#contact" className="text-secondary">contact</a> me.</p>`,
  skills: [
    { skill: "Front-end", progress: 90, color: "#03F6C0" },
    { skill: "Back-end", progress: 80, color: "#F6033E" },
    { skill: "ReactJs", progress: 70, color: "#8800AA" },
    { skill: "UX/UI", progress: 60, color: "#03F6C0" },
  ],
  words: [
    "JavaScript",
    "CSS",
    "HTML",
    "ReactQuery",
    "Figma",
    "React",
    "NextJS",
    "AWS S3",
    "Firebase",
    "NodeJS",
    "Express",
    "MongoDB",
    "Redux",
    "C/C++",
    "Java",
    "Sanity",
    "Typescript",
    "Git",
    "Bootstrap",
  ],
};

export const contactData: contact = {
  number: "04",
  title: "Contact/me",
  desc: "I'm interested in freelance opportunities - especially ambitious or large projects. However, if you have other request or question, don't hesitate to use the form",
};
