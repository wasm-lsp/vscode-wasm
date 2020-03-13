import * as lspClient from "vscode-languageclient";
import * as vscode from "vscode";

export async function launch(context: vscode.ExtensionContext): Promise<lspClient.LanguageClient> {
  const run: lspClient.Executable = {
    command: "webassembly-language-server",
  };
  const debug: lspClient.Executable = run;
  const serverOptions: lspClient.ServerOptions = { debug, run };
  const clientOptions: lspClient.LanguageClientOptions = {
    diagnosticCollectionName: "webassembly-language-server",
    documentSelector: [
      { language: "webassembly", scheme: "file" },
      { language: "webassembly", scheme: "untitled" },
    ],
    synchronize: {
      fileEvents: [
        vscode.workspace.createFileSystemWatcher("**/*.wat"),
        vscode.workspace.createFileSystemWatcher("**/*.wast"),
      ],
    },
  };
  const languageClient = new lspClient.LanguageClient("WebAssembly", serverOptions, clientOptions);
  const session = languageClient.start();
  context.subscriptions.push(session);
  await languageClient.onReady();
  return languageClient;
}
