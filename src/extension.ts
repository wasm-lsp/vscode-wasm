import * as client from "./client";
import * as lspClient from "vscode-languageclient/node";

let languageClient: lspClient.LanguageClient;

export function activate(): Promise<void> {
  return client.launch().then((result) => {
    languageClient = result;
  });
}

export function deactivate(): Promise<void> | undefined {
  if (null == languageClient) {
    return undefined;
  }
  return languageClient.stop();
}
