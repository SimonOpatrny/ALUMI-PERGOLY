# ALUMI PERGOLY — PREMIUM REDESIGN V2

**Prezentační návrh**, nikoli oficiální web společnosti ALUMI PERGOLY. Návrh byl připraven pro představení modernějšího vzhledu a přepracování uživatelského zážitku (listopad 2026).

## Rychlé spuštění

1. Rozbalte ZIP.
2. Otevřete `index.html` dvojklikem v Chrome, Edge nebo Firefoxu. Všechny obrázky, styly i interakce jsou součástí balíčku; není potřeba internet ani framework.
3. Přecházejte přes horní menu. Stránka `realizace.html` nyní **zobrazuje fotografie okamžitě** pod kompaktním úvodem; filtry fungují a fotografie lze zvětšovat.
4. Pro editaci otevřete složku například ve Visual Studio Code.
5. Pro lokální server můžete použít `python -m http.server 8000` a potom navštívit `http://localhost:8000`.

## Co je v nové verzi podstatně jiné

- 13 přepracovaných propojených HTML stránek. Žádný jednotný tmavý prázdný blok na každé podstránce.
- Silné fotografické prvky *nad přehybem*: na produktových stránkách je fotografie vidět hned po otevření.
- Galerie: fotografie začínají již na první obrazovce; filtrace 7 kategorií, lightbox, klávesnice (šipky a Escape).
- Nové typografické měřítko, kombinace editoriálního sans/serif, bronzové akcenty, čisté mezery a kontrast.
- Homepage: filmový fotografický hero, asymetrická prezentace produktů, přepínač typů střech, galerie a konkrétní průběh spolupráce.
- Obsahové sekce místo opakujících se prázdných benefit karet; kratší, čitelnější bloky doplněné fotografiemi.
- Poptávka: výběr produktu pomocí obrázků, parametry, kontaktní údaje, kontrola kroků a přehled před odesláním.
- Mobile-first responzivita a mobilní navigace, focus-visible, alternativní texty, podpora reduced motion.

## Struktura

- `index.html` — domovská stránka
- `hlinikove-pergoly.html` — přehled pergol
- `pergola-se-stahovaci-strechou.html` — stahovací střecha
- `pergola-se-sklenenou-strechou.html` — skleněná střecha
- `pergola-s-polykarbonatem.html` — polykarbonát
- `zimni-zahrady.html`, `prislusenstvi.html`, `hlinikove-ploty.html`
- `realizace.html` — galerie a filtry
- `o-nas.html`, `faq.html`, `kontakt.html`, `nezavazna-nabidka.html`
- `assets/css/styles.css` — designový systém a responzivní styly
- `assets/js/main.js` — navigace, přepínače, galerie a animace
- `assets/js/quote.js` — vícekroková poptávka
- `assets/img/` — lokální demonstrační vizualizace
- `docs/` — náhledy, zdroje a podklady pro migraci

## Co je DEMO a vyžaduje dopracování před spuštěním

1. **Obrazové podklady:** dodané obrázky jsou ilustrační AI vizualizace, nikoli ověřené snímky realizací ALUMI PERGOLY. Část doplňkových obrázků je připravena z menších dostupných vizuálních podkladů; pro produkci je nutné doplnit schválené fotografie ve vysokém rozlišení. Z prezentace nelze odvozovat, že byly pergoly na obrázcích skutečně postavené touto firmou.
2. **Formulář:** bez serveru nic automaticky neodesílá ani neukládá. Po kontrole údajů otevře e-mailovou aplikaci s připravenou zprávou. Před publikací je nutný bezpečný formulářový endpoint, serverová validace, antispam, ochrana osobních údajů a potvrzení až po úspěšném odeslání.
3. **Právní texty a obchodní tvrzení:** ověřte záruky, obchodní podmínky, kontakty a katalogy přímo s majitelem. Nekopírujte cizí recenze ani nepodložené reference.
4. **SEO:** všechny HTML stránky v tomto DEMU mají `<meta name="robots" content="noindex,nofollow">`, `robots.txt` blokuje indexaci. Před nasazením po schválení je nutné odstranit blokaci, sladit canonical adresy a sitemap s reálnými URL, připravit 301 přesměrování a testovat indexaci.
5. **Přístupová práva:** prezentace a veřejné vystavení pod logem společnosti vyžadují souhlas oprávněného zástupce.

## Testování provedené v tomto balíčku

- Validováno všech 13 stránek: každá má jednu H1, title/description, lokální obrázky a odkazy na existující soubory.
- Ověřen syntakticky JavaScript (`node --check`).
- Prohlížečová kontrola: při vykreslení z vloženého HTML/CSS/JS nebyly nalezeny chyby JavaScriptu ani nefunkční obrázky na vzorcích desktopových a mobilních stran.
- Ověřeno filtrování galerie, otevření/zavření lightboxu, přepínání produktu a mobilní menu.
- Ověřeny všechny kroky poptávky 01→02→03, validace výběru produktu a správné sestavení souhrnu.
- Šířky 320, 390, 768 a 1440 px: u kontrolovaných stránek žádný horizontální overflow.
- Poznámka: v tomto prostředí je přímá navigace prohlížeče na file:// a localhost administrativně blokována; testy interakcí proto proběhly s lokálním obsahem vloženým do prohlížeče. Pro ostrý web proveďte běžný end-to-end test na skutečném hostingu a na fyzických zařízeních.

## Doporučené schválení s klientem

1. Nejprve mu ukažte **homepage, galerii a jednu produktovou stránku**.
2. Získejte originální schválené fotografie a finální logo.
3. Potvrďte technické údaje a napojení poptávkového formuláře.
4. Teprve potom nasaďte na doménu a zaveďte přesměrování.
