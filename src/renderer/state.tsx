import { atom } from 'jotai';
import { Student } from '../lib/types';

export const seniorsAtom = atom([] as Student[]);
export const juniorsAtom = atom([] as Student[]);
