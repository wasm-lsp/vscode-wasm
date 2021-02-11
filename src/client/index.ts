import * as lspClient from "vscode-languageclient/node";
import * as vscode from "vscode";

export async function launch(context: vscode.ExtensionContext): Promise<lspClient.LanguageClient> {
  const run: lspClient.Executable = {
    command: "wasm-language-server",
  };
  const debug: lspClient.Executable = {
    command: "wasm-language-server",
    options: {
      env: {
        RUST_BACKTRACE: "full",
        RUST_LOG: "info",
        ...process.env,
      },
    },
  };
  const serverOptions: lspClient.ServerOptions = { debug, run };
  const clientOptions: lspClient.LanguageClientOptions = {
    diagnosticCollectionName: "wasm-language-server",
    documentSelector: [
      { language: "wasm.wat", scheme: "file" },
      { language: "wasm.wat", scheme: "untitled" },
      { language: "wasm.wast", scheme: "file" },
      { language: "wasm.wast", scheme: "untitled" },
      { language: "wasm.wit", scheme: "file" },
      { language: "wasm.wit", scheme: "untitled" },
      { language: "wasm.witx", scheme: "file" },
      { language: "wasm.witx", scheme: "untitled" },
    ],
    synchronize: {
      fileEvents: [
        vscode.workspace.createFileSystemWatcher("**/*.wat"),
        vscode.workspace.createFileSystemWatcher("**/*.wast"),
      ],
    },
  };
  const languageClient = new lspClient.LanguageClient(
    "wasm-language-server",
    "WebAssembly Language Server",
    serverOptions,
    clientOptions,
  );
  languageClient.registerProposedFeatures();
  const session = languageClient.start();
  context.subscriptions.push(session);
  await languageClient.onReady();
  return languageClient;
}
