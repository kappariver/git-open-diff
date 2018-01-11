/**
 * @license git-open-diff v1.3.1
 * (c) 2018 kappariver
 * License: MIT
 */

import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export function getRepositoryPath(filePath) {
    return new Promise((resolve, reject) => {
        const args = ['rev-parse', '--show-toplevel'];
        const directory = fs.existsSync(filePath) && fs.statSync(filePath).isDirectory() ? filePath : path.dirname(filePath);
        const options = { cwd: directory };

        let git = spawn('git', args, options);

        let line = '';
        let error = '';

        git.stdout.setEncoding('utf-8');
        git.stdout.on('data', (data: string) => {
            line = data.replace('\r', '').replace('\n', '');
        });

        git.stderr.setEncoding('utf-8');
        git.stderr.on('data', (data: string) => {
            error = data;
        });

        git.on('error', (error) => {
            reject(error);
            return;
        });

        git.on('close', () => {
            if (error.length > 0) {
                reject(error);
                return;
            }
            resolve(line);
        });
    });
}
