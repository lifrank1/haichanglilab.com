export interface EducationEntry {
  degree: string;
  fieldOfStudy: string;
  school: string;
}

export interface Person {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  image: string;
  researchFocus: string;
  education: EducationEntry[];
  email: string;
  isPrincipalInvestigator?: boolean;
  status?: 'current' | 'alumni';
}

export const people: Person[] = [
  {
    id: "haichang-li",
    name: "Dr. Haichang Li",
    title: "Assistant Professor",
    affiliation: "The Ohio State University College of Veterinary Medicine",
    image: "/headshots/headshot1.png",
    researchFocus: "Dr. Li's research focuses on cell membrane repair mechanisms, particularly the MG53 protein, and its applications in regenerative medicine, cancer biology, and therapeutic protein development. His work spans from basic molecular mechanisms to translational applications, with significant contributions to understanding tissue repair, wound healing, and tumor suppression.",
    education: [
      { degree: "PhD", fieldOfStudy: "Molecular Biology and Genetics", school: "Gifu University, Japan" },
      { degree: "MS", fieldOfStudy: "Physiology and Biochemistry", school: "Beijing Agricultural University, China" },
      { degree: "BA", fieldOfStudy: "Veterinary Science", school: "Henan Agricultural University, China" }
    ],
    email: "li.3714@osu.edu",
    isPrincipalInvestigator: true,
    status: 'current'
  }
  // To add more team members, simply add new Person objects here:
  // {
  //   id: "jane-doe",
  //   name: "Dr. Jane Doe",
  //   title: "Postdoctoral Researcher",
  //   affiliation: "The Ohio State University College of Veterinary Medicine",
  //   image: "/jane-doe.jpg",
  //   researchFocus: "Dr. Doe's research focuses on...",
  //   education: ["PhD, Biology, University of Example"],
  //   email: "jane.doe@osu.edu",
  //   phone: "614-xxx-xxxx",
  //   address: "1900 Coffey Road, Columbus, OH 43210",
  //   isPrincipalInvestigator: false
  // }
];
