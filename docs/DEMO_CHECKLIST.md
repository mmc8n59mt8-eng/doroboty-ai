# Pokaz prototypu – lista kontrolna i plan B

Prototyp pokazujesz lokalnie, z własnego laptopa, prowadzącym i grupie AIPH3. Ta strona mówi, co sprawdzić przed pokazem (ok. 5 minut) i co zrobić, gdy coś się zepsuje w trakcie pokazu.

## Dzień przed pokazem

1. Zbuduj i uruchom wersję do pokazu:

   ```sh
   npm ci
   npm run build
   npm run preview
   ```

   Otwórz http://127.0.0.1:3001.

2. Przygotuj scenariusz pokazu (opublikowane oferty, aplikacje itd.), a potem zapisz go: **Ustawienia → Eksportuj scenariusz**. Plik `doroboty-scenariusz.json` trzymaj na pulpicie. To Twoja kopia zapasowa.
3. Przećwicz raz **Ustawienia → Importuj** z tym plikiem, żeby wiedzieć, że działa.
4. Przygotuj wersję zapasową (gałąź `main`) w osobnym folderze, na wypadek gdyby nowa wersja się psuła:

   ```sh
   git worktree add ../doroboty-ai-zapas main
   cd ../doroboty-ai-zapas
   npm ci
   npm run build
   npx vite preview --host 127.0.0.1 --port 3002 --strictPort
   ```

   Sprawdź, że http://127.0.0.1:3002 się otwiera, i zatrzymaj (Ctrl+C). Uwaga: zapis w przeglądarce jest osobny dla każdego portu, więc na 3002 zaimportuj scenariusz z kroku 2.

## 5 minut przed pokazem

- [ ] `npm run preview` działa, http://127.0.0.1:3001 się otwiera.
- [ ] Strona główna i lista ofert wyświetlają się poprawnie.
- [ ] Wejście jako kandydat (Anna) → oferta → aplikacja się wysyła.
- [ ] Wejście jako pracodawca (Karolina) → widać aplikację, można zapisać decyzję.
- [ ] Po odświeżeniu strony (F5) zmiany zostają.
- [ ] Wejdź na http://127.0.0.1:3001/#/diagnostyka/blad. Ma pojawić się ekran „Coś poszło nie tak” z przyciskami. Kliknij **Wróć na stronę główną**.
- [ ] Jeśli stan się pomieszał podczas próby: **Ustawienia → Importuj** plik z dnia przed pokazem.
- [ ] Zamknij inne karty z prototypem (jedna karta naraz).

## Plan B – gdy coś się zepsuje w trakcie pokazu

Reagujesz Ty, bo prowadzisz pokaz. Idź od góry, aż zadziała:

1. **Ekran „Coś poszło nie tak”** → kliknij **Wróć na stronę główną**.
2. **Błąd wraca** → na tym ekranie **Pobierz kopię zapisu**, potem **Resetuj scenariusz**. Następnie **Ustawienia → Importuj** plik `doroboty-scenariusz.json`.
3. **Pusta strona / „nie można połączyć”** → w terminalu zatrzymaj (Ctrl+C) i uruchom ponownie `npm run preview`, potem odśwież przeglądarkę.
4. **Nowa wersja dalej nie działa** → przełącz się na wersję zapasową: w folderze `../doroboty-ai-zapas` uruchom `npx vite preview --host 127.0.0.1 --port 3002 --strictPort`, otwórz http://127.0.0.1:3002 i zaimportuj scenariusz.
5. **Nic nie działa** → pokaż zrzuty ekranu z folderu `artifacts/` i opowiedz scenariusz.

Po pokazie zapisz, co się zepsuło i na którym kroku, żeby to naprawić.
