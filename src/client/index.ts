import * as lspClient from "vscode-languageclient";
import {
  SemanticTokensFeature,
  DocumentSemanticsTokensSignature,
} from "vscode-languageclient/lib/semanticTokens.proposed";
import * as vscode from "vscode";

export async function launch(context: vscode.ExtensionContext): Promise<lspClient.LanguageClient> {
  const run: lspClient.Executable = {
    command: "webassembly-language-server",
  };
  const debug: lspClient.Executable = {
    command: "webassembly-language-server",
    options: {
      env: {
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
    middleware: {
      async provideDocumentSemanticTokens(
        document: vscode.TextDocument,
        token: vscode.CancellationToken,
        next: DocumentSemanticsTokensSignature,
      ) {
        const signature = await next(document, token);
        if (signature == null) throw new Error("busy");
        return signature;
      },
    } as lspClient.Middleware,
  };
  const languageClient = new lspClient.LanguageClient(
    "wasm-language-server",
    "WebAssembly Language Server",
    serverOptions,
    clientOptions,
  );
  languageClient.registerFeature(new SemanticTokensFeature(languageClient));
  const session = languageClient.start();
  context.subscriptions.push(session);
  await languageClient.onReady();
  return languageClient;
}
