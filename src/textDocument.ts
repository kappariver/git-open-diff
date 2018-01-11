/**
 * @license git-open-diff v1.3.0
 * (c) 2018 kappariver
 * License: MIT
 */

import * as vscode from 'vscode';

export function showTextDocument(repositoryPath, diff) {
    return new Promise((resolve, reject) => {
        try {
            const options: vscode.TextDocumentShowOptions = {
                preview: false
            };
            diff.forEach((line, index, lines) => {
                vscode.workspace.openTextDocument(repositoryPath + '/' + line).then(document => {
                    vscode.window.showTextDocument(document, options);
                });
            });
            resolve(0);
        } catch {
            reject(1);
        }
    });
}
