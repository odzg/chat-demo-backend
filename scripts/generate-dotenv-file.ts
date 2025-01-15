import { copyFile } from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';

await copyFile(path.join(cwd(), '.env.example'), '.env');
