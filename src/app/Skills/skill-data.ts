import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Skill } from './skill';

export class SkillData implements InMemoryDbService {

  createDb() {
    const skills: Skill[] = [
        
            {
                id: 1,
                skillUserName: 'Dave Grohl',
                skillName: 'Python',
                skillCode: 'PY-0001',
                skillLevel: 1,
                skillCategory: 'Coding'
            },
            {
                id: 2,
                skillUserName: 'Serena Williams',
                skillName: 'C#',
                skillCode: 'C#-0001',
                skillLevel: 3,
                skillCategory: 'Coding'
            },
            {
                id: 3,
                skillUserName: 'James Bond',
                skillName: 'Java',
                skillCode: 'Ja-0001',
                skillLevel: 3,
                skillCategory: 'Coding'
            },
            {
                id: 4,
                skillUserName: 'Sherlock Holmes',
                skillName: 'Project Management',
                skillCode: 'PM-0001',
                skillLevel: 3,
                skillCategory: 'Admin'
            },
            {
                id: 5,
                skillUserName: 'Bobby Charlton',
                skillName: 'Football',
                skillCode: 'Fo-0001',
                skillLevel: 3,
                skillCategory: 'Sport'
            },
            {
                id: 6,
                skillUserName: 'Tom Hanks',
                skillName: 'Acting',
                skillCode: 'Ac-0001',
                skillLevel: 3,
                skillCategory: 'Film'
            },
            {
                id: 7,
                skillUserName: 'Elon Musk',
                skillName: 'Entrepeneur',
                skillCode: 'En-0001',
                skillLevel: 1,
                skillCategory: 'Business'
            },
            {
                id: 8,
                skillUserName: 'John Smith',
                skillName: 'C#',
                skillCode: 'C#-0001',
                skillLevel: 2,
                skillCategory: 'Coding'
            },
            {
                id: 9,
                skillUserName: 'Jim Clark',
                skillName: 'HTML',
                skillCode: 'Ht-0001',
                skillLevel: 3,
                skillCategory: 'Coding'
            },
            {
                id: 10,
                skillUserName: 'Margaret Thatcher',
                skillName: 'Leadership',
                skillCode: 'Le-0001',
                skillLevel: 3,
                skillCategory: 'Politics'
            },
          

    ];
    return { skills };
  }
}