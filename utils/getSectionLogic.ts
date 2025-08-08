import { section5 } from '@/logic/section5';
import { section6 } from '@/logic/section6';
import { section9 } from '@/logic/section9';
import { section13 } from '@/logic/section13';
import { section14 } from '@/logic/section14';
import { section24 } from '@/logic/section24';
import { section25 } from '@/logic/section25';
import { section31 } from '@/logic/section31';
import { section32 } from '@/logic/section32';
import { section33 } from '@/logic/section33';

export function getSectionLogic(id: string) {
  switch (id) {
    case 'section5':
      return section5;
    case 'section6':
      return section6;
    case 'section9':
      return section9;
    case 'section13':
      return section13;
    case 'section14':
      return section14;
    case 'section24':
      return section24;
    case 'section25':
      return section25;
    case 'section31':
      return section31;
    case 'section32':
      return section32;
    case 'section33':
      return section33;
    default:
      return null;
  }
}
