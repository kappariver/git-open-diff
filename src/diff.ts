/**
 * @license git-open-diff v1.0.0
 * (c) 2018 kappariver
 * License: MIT
 */

import { spawn } from 'child_process';

export function getDiff(repositoryPath) {
    return new Promise((resolve, reject) => {
        const args = ['diff', '--name-only', 'HEAD', 'master'];
        const options = { cwd: repositoryPath };

        let git = spawn('git', args, options);

        let lines: string[] = [];
        let error = '';

        git.stdout.setEncoding('utf-8');
        git.stdout.on('data', (data: string) => {
            lines = data.split(/\r?\n/g)
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
            resolve(lines);
        });
    });
}
