export interface HeaderProps {
  name: string;
}

interface Part {
  name: string;
  exerciseCount: number;
}

interface CourseDiscription extends Part {
  description: string;
}

interface CourseBasic extends CourseDiscription {
  kind: "basic";
}

interface CourseGroup extends Part {
  groupProjectCount: number;
  kind: "group";
}

interface CourseBackground extends CourseDiscription {
  backgroundMaterial: string;
  kind: "background";
}

interface CourseRequirement extends CourseDiscription {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CourseBasic
  | CourseGroup
  | CourseBackground
  | CourseRequirement;
