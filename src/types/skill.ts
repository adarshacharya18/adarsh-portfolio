export interface Skill {
  name: string;
  level: 'Core' | 'Intermediate' | 'Familiar';
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}
