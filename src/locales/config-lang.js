import merge from 'lodash/merge';
import {
  enUS as enUSAdapter,
  zhCN as zhCNAdapter,
  arSA as arSAAdapter,
  faIR as faIRAdapter,
} from 'date-fns/locale';

// date-pickers
import { enUS as enUSDate, zhCN as zhCNDate, faIR as faIRDate } from '@mui/x-date-pickers/locales';
// core
import {
  enUS as enUSCore,
  zhCN as zhCNCore,
  arSA as arSACore,
  faIR as faIRCore,
} from '@mui/material/locale';
// data-grid
import {
  faIR as faIRGrid,
  enUS as enUSDataGrid,
  zhCN as zhCNDataGrid,
  arSD as arSDDataGrid,
} from '@mui/x-data-grid';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  },
  {
    label: 'Chinese',
    value: 'cn',
    systemValue: merge(zhCNDate, zhCNDataGrid, zhCNCore),
    adapterLocale: zhCNAdapter,
    icon: 'flagpack:cn',
  },
  {
    label: 'Arabic',
    value: 'ar',
    systemValue: merge(faIRDate, arSDDataGrid, arSACore),
    adapterLocale: arSAAdapter,
    icon: 'flagpack:ae',
  },
  {
    label: 'Farsi',
    value: 'fa',
    systemValue: merge(faIRGrid, faIRCore),
    adapterLocale: faIRAdapter,
    icon: 'flagpack:ir',
  },
];

export const defaultLang = allLangs[0]; // English

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
