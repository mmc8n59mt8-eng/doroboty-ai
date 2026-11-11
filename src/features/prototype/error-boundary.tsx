import { Component, useState, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { STORAGE_KEY } from "./storage";

// Safety net for render errors: without it a crashing view leaves a blank page
// and no way to reach the settings (export/reset). It deliberately avoids the
// store, router and other app state, because any of them may be what failed.

function readRawSave() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function download(name: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function goHome() {
  window.location.hash = "#/";
  window.location.reload();
}

function CrashScreen() {
  const [confirming, setConfirming] = useState(false);
  const raw = readRawSave();
  return (
    <div className="drai-theme min-h-dvh text-foreground">
      <main className="prototype-section" role="alert" aria-labelledby="crash-title">
        <h1 id="crash-title">Coś poszło nie tak</h1>
        <p className="my-5">
          Ten ekran nie dał się wyświetlić. Twoje dane w przeglądarce nie zostały zmienione. Spróbuj
          wrócić na stronę główną. Jeśli błąd wraca, pobierz kopię zapisu, a potem zresetuj
          scenariusz do danych startowych.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={goHome}>Wróć na stronę główną</Button>
          {raw && (
            <Button
              variant="outline"
              onClick={() => download("doroboty-zapis-po-bledzie.txt", raw)}
            >
              Pobierz kopię zapisu
            </Button>
          )}
          {!confirming ? (
            <Button variant="destructive" onClick={() => setConfirming(true)}>
              Resetuj scenariusz
            </Button>
          ) : (
            <>
              <Button
                variant="destructive"
                onClick={() => {
                  try {
                    window.localStorage.removeItem(STORAGE_KEY);
                  } catch {
                    // Storage unavailable: the app starts from fixtures anyway.
                  }
                  goHome();
                }}
              >
                Tak, usuń zapis i zacznij od nowa
              </Button>
              <Button variant="ghost" onClick={() => setConfirming(false)}>
                Anuluj
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("DoRoboty.ai: błąd renderowania", error, info.componentStack);
  }
  render() {
    return this.state.failed ? <CrashScreen /> : this.props.children;
  }
}

// Deliberate failure for rehearsing the crash screen before a demo (#/diagnostyka/blad).
export function CrashRehearsal(): never {
  throw new Error("Próba ekranu błędu (diagnostyka).");
}
