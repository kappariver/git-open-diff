/**
 * @license git-open-diff v1.3.1
 * (c) 2018 kappariver
 * License: MIT
 */

'use strict';

import * as vscode from 'vscode';
import { getDiff } from './diff';
import { getRepositoryPath } from './repositoryPath';
import { showTextDocument } from './textDocument';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('git.openDiff', () => {
        if (!vscode.window.activeTextEditor || !vscode.window.activeTextEditor.document) {
            return;
        }
        let filePath = vscode.window.activeTextEditor.document.fileName;
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
        return showTextDocument(repositoryPath, diff);
    })
    .catch(function(error) {
        console.log(error);
    });
}

export function deactivate() { }
