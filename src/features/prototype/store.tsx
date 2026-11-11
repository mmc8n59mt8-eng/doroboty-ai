import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import posthog, { isPostHogConfigured } from "@/lib/posthog";
import { currentPerson, initialState, transition, type Action, type State } from "./model";
import { parseState, readState, saveState, type StoragePort } from "./storage";
function browserStorage(): StoragePort | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
function useStore() {
  const [loaded] = useState(() => readState(browserStorage()));
  const [state, setState] = useState(loaded.state);
  const [issue, setIssue] = useState(loaded.issue);
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState(loaded.blocked);
  const latest = useRef(state);
  const restoredIdentity = useRef(false);

  function identify(person: NonNullable<ReturnType<typeof currentPerson>>) {
    if (!isPostHogConfigured) return;

    posthog.identify(person.id, {
      name: person.name,
      role: person.role,
    });
  }

  function syncIdentity(previous: State, next: State) {
    const previousPerson = currentPerson(previous);
    const nextPerson = currentPerson(next);
    if (previousPerson?.id === nextPerson?.id) return;

    if (previousPerson && isPostHogConfigured) posthog.reset();
    if (nextPerson) identify(nextPerson);
  }

  function commit(next: State, replace = false) {
    latest.current = next;
    setState(next);
    setError("");
    if (blocked && !replace) return;
    try {
      saveState(browserStorage(), next);
      setIssue("");
      if (replace) setBlocked(false);
    } catch (e) {
      setIssue((e as Error).message);
    }
  }
  function run(action: Action) {
    try {
      const previous = latest.current;
      const next = transition(previous, action);

      commit(next);

      if (action.type === "select_person") syncIdentity(previous, next);

      return true;
    } catch (e) {
      setError(
        e instanceof Error && e.name !== "ZodError"
          ? e.message
          : "Sprawdź poprawność i długość wprowadzonych danych.",
      );
      return false;
    }
  }
  function importState(raw: string) {
    try {
      const previous = latest.current;
      const next = parseState(raw);
      commit(next, true);
      syncIdentity(previous, next);
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    }
  }
  useEffect(() => {
    document.documentElement.classList.remove("dark");

    if (!restoredIdentity.current) {
      const person = currentPerson(latest.current);
      if (person) identify(person);
      restoredIdentity.current = true;
    }
  }, []);
  return {
    state,
    issue,
    error,
    blocked,
    original: loaded.original,
    run,
    importState,
    clearError: () => setError(""),
    reset: () => {
      const previous = latest.current;
      const next = initialState();
      commit(next, true);
      syncIdentity(previous, next);
    },
  };
}
type Store = ReturnType<typeof useStore>;
const Context = createContext<Store | null>(null);
export function PrototypeProvider({ children }: { children: ReactNode }) {
  const store = useStore();
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
export function usePrototype() {
  const store = useContext(Context);
  if (!store) throw new Error("PrototypeProvider is required");
  return store;
}
