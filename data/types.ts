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

export interface Person {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  image: string;
  researchFocus: string;
  education: string[];
  email: string;
  phone: string;
  address: string;
  isPrincipalInvestigator?: boolean;
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
