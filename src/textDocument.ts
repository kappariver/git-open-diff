import * as vscode from 'vscode';

export function openTextDocument(repositoryPath, diff) {
    return new Promise((resolve) => {
        diff.forEach((line, index, lines) => {
            vscode.workspace.openTextDocument(repositoryPath + '/' + line).then(document => {
                vscode.window.showTextDocument(document);
            });
        });
        resolve(0);
    });
}