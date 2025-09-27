export type sidebar = {
  subTitle: string;
  options: {
    title: string;
    id: string;
  }[];
  links: { type: "github" | "linkedin" | "instagram"; link: string }[];
};
export type main = {
  firstLine: string;
  secondLine: string;
  thirdLine: string;
  subHeading: string;
};
export type projects = {
  number: string;
  title: string;
  desc: string;
  projectList: {
    link: string;
    img: string;
  }[];
};
export type about = {
  number: string;
  title: string;
  desc: string;
};

export type work = {
  number: string;
  title: string;
  work: {
    title: string;
    company: string;
    date: string;
    description: string[];
  }[];
};

export type mySkills = {
  number: string;
  title: string;
  desc: string;
  skills: { skill: string; progress: number; color: string }[];
  words: string[];
};
export type contact = {
  number: string;
  title: string;
  desc: string;
};
