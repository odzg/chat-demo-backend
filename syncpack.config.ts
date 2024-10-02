import type { RcFile } from 'syncpack';

export default {
  semverGroups: [
    {
      range: '',
    },
  ],
  sortFirst: ['$schema', 'name', 'description', 'version', 'author'],
} satisfies RcFile;
