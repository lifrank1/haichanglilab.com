export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  citations: number;
  pmid?: string;
  doi?: string;
  type: 'article' | 'book' | 'conference';
  role?: 'first' | 'corresponding' | 'co-first' | 'co-corresponding';
}

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

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  keyFindings?: string[];
  status: 'active' | 'completed' | 'upcoming';
  collaborators?: string[];
  funding?: string;
}
