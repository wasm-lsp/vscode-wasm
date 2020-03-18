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
    } as any,
  };
  const languageClient = new lspClient.LanguageClient(
    "webassembly-language-server",
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
