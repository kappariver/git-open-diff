/**
 * @license git-open-diff v1.1.0
 * (c) 2018 kappariver
 * License: MIT
 */

'use strict';

import * as vscode from 'vscode';
import { getDiff } from './diff';
import { getRepositoryPath } from './repositoryPath';
import { openTextDocument } from './textDocument';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('git.openDiff', (uri?: vscode.Uri) => {
        let filePath = '';
        if (uri && uri.fsPath) {
            filePath = uri.fsPath;
        } else {
            if (!vscode.window.activeTextEditor || !vscode.window.activeTextEditor.document) {
                return;
            }
            filePath = vscode.window.activeTextEditor.document.fileName;
        }
        run(filePath);
    });
    context.subscriptions.push(disposable);
}

function run(filePath) {
    let repositoryPath = null;
    let diff = null;
    Promise.resolve()
    .then(function() {
        return getRepositoryPath(filePath);
    })
    .then(function(data: string) {
        repositoryPath = data;
        return getDiff(repositoryPath);
    })
    .then(function(data: string[]) {
        diff = data;
        return openTextDocument(repositoryPath, diff);
    })
    .catch(function(error) {
        console.log(error);
    });
}

export function deactivate() { }
