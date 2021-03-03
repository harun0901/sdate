import { LookingFor } from './user';

export interface Option<T> {
  value: T;
  label: string;
}

export interface MultiOption<T> extends Option<T> {
  selected?: boolean;
}

export const lookingForList: Option<string>[] = [
  {value: '', label: 'No Answer'},
  {value: LookingFor.WOMAN, label: 'Women'},
  {value: LookingFor.MAN, label: 'Men'},
  {value: 'Any', label: 'Any'}
];

export const bodyList: Option<string>[] = [
  {value: '', label: 'No Answer'},
  {value: 'Slim', label: 'Slim'},
  {value: 'Normal', label: 'Normal'},
  {value: 'Athletic', label: 'Athletic'},
  {value: 'Muscular', label: 'Muscular'},
  {value: 'Chubby', label: 'Chubby'}
];

export const educationList: Option<string>[] = [
  {value: '', label: 'No Answer'},
  {value: 'Not finished', label: 'Not finished'},
  {value: 'Secondary school', label: 'Secondary school'},
  {value: 'High school', label: 'High school'},
  {value: 'High school diploma', label: 'High school diploma'},
  {value: 'College/University', label: 'College/University'},
  {value: 'Postgraduate degree', label: 'Postgraduate degree'}
];

export const professionList: Option<string>[] = [
  {value: '', label: 'No Answer'},
  {value: 'Seeking work', label: 'Seeking work'},
  {value: 'Trainee', label: 'Trainee'},
  {value: 'Employee', label: 'Employee'},
  {value: 'Public Official', label: 'Public Official'},
  {value: 'Housewife', label: 'Housewife'},
  {value: 'Retired', label: 'Retired'},
  {value: 'Self-employed', label: 'Self-employed'},
  {value: 'Student', label: 'Student'}
];

export const heightList: Option<string>[] = [
  {value: '149', label: '4′11″'},
  {value: '154', label: '5′1″'},
  {value: '159', label: '5′3″'},
  {value: '164', label: '5′5″'},
  {value: '169', label: '5′7″'},
  {value: '174', label: '5′9″'},
  {value: '180', label: '5′11″'},
  {value: '185', label: '6′1″'},
  {value: '190', label: '6′3″'},
  {value: '195', label: '6′5″'},
  {value: '200', label: '6′7″'},
  {value: '205', label: '6′9″'},
  {value: '210', label: '6′11″'},
];

export const kidsList: Option<string>[] = [
  {value: '', label: 'No Answer'},
  {value: 'No Kids', label: 'No Kids'},
  {value: 'One Kid', label: 'One Kid'},
  {value: 'Two Kids', label: 'Two Kids'},
  {value: 'Three Kids', label: 'Three Kids'},
  {value: 'More then Three Kids', label: 'More then Three Kids'}
];

export const alcoholicList: Option<string>[] = [
  {value: '', label: 'No Answer'},
  {value: 'Never', label: 'Never'},
  {value: 'Sometimes', label: 'Sometimes'},
  {value: 'Gladly', label: 'Gladly'}
];

export const smokerList: Option<string>[] = [
  {value: '', label: 'No Answer'},
  {value: 'Non-Smoker', label: 'Non-Smoker'},
  {value: 'Ex-Smoker', label: 'Ex-Smoker'},
  {value: 'Occasional Smoker', label: 'Occasional Smoker'},
  {value: 'Regular Smoker', label: 'Regular Smoker'}
];

export const RelationshipList: Option<string>[] = [
  {value: '', label: 'No Answer'},
  {value: 'Single', label: 'Single'},
  {value: 'Relationship', label: 'Relationship'},
  {value: 'Openrelationship', label: 'Open relationship'},
  {value: 'Any', label: 'Any'},
];

export const interestedList: Option<string>[] = [
  {value: '', label: 'No Answer'},
  {value: 'Single', label: 'Single'},
  {value: 'Relationship', label: 'Relationship'},
  {value: 'Openrelationship', label: 'Open relationship'},
  {value: 'Any', label: 'Any'},
];

export const languageList: Option<string>[] = [
  {value: '', label: 'No Answer'},
  {value: 'English', label: 'english'},
  {value: 'Dutch', label: 'dutch'},
  {value: 'French', label: 'french'},
  {value: 'German', label: 'german'},
  {value: 'Italian', label: 'italian'},
  {value: 'Portuguese', label: 'portuguese'},
  {value: 'Russian', label: 'russian'},
  {value: 'Spanish', label: 'spanish'},
  {value: 'Hebrew', label: 'hebrew'},
  {value: 'Turkish', label: 'turkish'},
];
