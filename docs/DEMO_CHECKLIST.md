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

---

# Wersja publiczna na Netlify

Prototyp jest też opublikowany pod adresem **https://doroboty-ai.netlify.app** (projekt `doroboty-ai`, zespół DoRoboty.AI, plan Free). Każdy push na gałąź `design/siec-polaczen` sam buduje i publikuje nową wersję. Pushe na inne gałęzie, w tym `main`, nie zmieniają strony.

## Budżet planu Free – przeczytaj przed pushem

- Plan Free ma **300 kredytów na miesiąc**. Każdy deploy produkcyjny kosztuje **15 kredytów**, a ruch 20 kredytów za 1 GB.
- Jedna wizyta (strona główna, lista ofert, jedna oferta) pobiera ok. 2 MB. 100 wizyt to ok. 4 kredyty. **Najwięcej kosztują pushe, nie odwiedzający.**
- Gdy kredyty się skończą, **strona jest wstrzymana do końca miesiąca** („Site not available”), a na planie Free nie da się dokupić kredytów.
- Dlatego zbieraj zmiany i wypychaj je razem. Commit, który nie musi zmieniać strony (np. tylko dokumentacja), oznacz w wiadomości `[skip netlify]` – Netlify go nie zbuduje, a zmiana trafi na stronę przy następnym zwykłym pushu.
- Zużycie sprawdzisz w Netlify, w zespole DoRoboty.AI, w sekcji z zużyciem kredytów (**Usage**).

## Po każdej publikacji (ok. 3 minuty)

Otwórz stronę w oknie prywatnym (czysta przeglądarka, bez Twojego zapisu) i sprawdź:

- [ ] Netlify → projekt `doroboty-ai` → **Deploys**: najnowszy deploy ma status **Published** i właściwy commit.
- [ ] https://doroboty-ai.netlify.app otwiera się, adres zaczyna się od `https://`, na górze widać pasek „Prototyp edukacyjny”.
- [ ] Strona główna i lista ofert wyświetlają się poprawnie.
- [ ] Wejście jako pracodawca (Karolina) → **Dodaj ofertę** → oferta się publikuje.
- [ ] Wejście jako kandydat (Anna) → ta oferta → aplikacja się wysyła.
- [ ] Wejście jako pracodawca → **Kandydaci** → aplikacja Anny → **Zaproś na rozmowę**. Po odświeżeniu (F5) zmiana zostaje.
- [ ] To samo na telefonie: strona główna i lista ofert czytelne, menu działa.

**Warunek wycofania:** jeśli strona się nie otwiera, główny scenariusz nie przechodzi albo pojawia się ekran „Coś poszło nie tak” bez Twojej akcji – wycofaj wersję (niżej).

## Wycofanie wersji

Netlify publikuje nową wersję dopiero, gdy cały build się uda. Nieudany build niczego nie zmienia: na stronie zostaje poprzednia wersja i nie trzeba nic cofać.

Jeśli opublikowana wersja działa źle, wróć do poprzedniej, cofając zmianę w kodzie:

1. Znajdź commit, który zepsuł stronę: `git log --oneline -5`.
2. Cofnij go (powstaje nowy commit, historia zostaje):

   ```sh
   git revert <commit>
   npm run build
   npm run preview
   ```

   Sprawdź lokalnie główny scenariusz z listy wyżej.

3. Wypchnij: `git push origin design/siec-polaczen`. Netlify zbuduje i opublikuje poprzednią wersję w ciągu ok. 1–2 minut.
4. Przejdź listę „Po każdej publikacji”.

Każde wycofanie to kolejny deploy, czyli 15 kredytów.

## Plan B – gdy wersja publiczna nie działa

Reagujesz Ty. Idź od góry, aż zadziała:

1. **Zgłoszenie, że strona nie działa** → otwórz ją sama w oknie prywatnym. Jeśli działa, poproś zgłaszającego o odświeżenie strony albo **Ustawienia → Resetuj scenariusz** (zapis jest w jego przeglądarce).
2. **„Site not available”** → skończyły się kredyty. Sprawdź w Netlify, w zespole DoRoboty.AI, w sekcji z zużyciem kredytów (**Usage**). Strona wróci na początku kolejnego miesiąca albo po przejściu na plan płatny.
3. **Strona się nie otwiera albo scenariusz nie przechodzi po Twoim pushu** → wycofaj wersję (sekcja wyżej).
4. **Nie da się szybko naprawić** → usuń link do prototypu z CV/portfolio i dodaj notkę „wersja w przygotowaniu”. Możesz też ustawić projekt jako prywatny: Netlify → Project configuration → General → Visitor access → Project visibility → **Private**.
5. Zapisz, co się zepsuło i co pomogło.
