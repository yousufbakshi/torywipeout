import { Plugin } from 'vite';
import fs from 'fs';

export default function hexjsonPlugin(): Plugin {
  return {
    name: 'vite-plugin-hexjson',
    transform(src, id) {
      if (id.endsWith('.hexjson')) {
        const json = fs.readFileSync(id, 'utf-8');
        return `export default ${json}`;
      }
    },
  };
}
