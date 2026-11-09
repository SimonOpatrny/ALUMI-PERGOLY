# Příprava produkčního nasazení / SEO

**Nyní je web výhradně prezentační demo.** Nepublikovat beze změn.

1. Zachovat URL původního webu, kde existují; pro případnou změnu vytvořit mapu 301 přesměrování. V tomto návrhu mají stránky souborové adresy `*.html`; při nasazení sjednotit routy s hlavním webem.
2. Zkontrolovat canonical URL (`link rel=canonical`) na všech 13 stránkách. Jsou nastaveny jako zamýšlené oficiální URL, ale produkční cesty a dostupnost je nutné ověřit.
3. Po schválení odstranit `noindex,nofollow` a změnit `robots.txt`, nyní obsahuje `Disallow: /` záměrně.
4. Upravit `sitemap.xml` na skutečné finální URL webu.
5. Nahraďte ilustrační vizualizace originálními obrázky (optimálně WebP/AVIF, varianty podle rozlišení a responsive `srcset`).
6. Připojte funkční formulářový backend; ověřte správné zpracování souhlasu/GDPR a antispam.
7. Zkontrolujte HTTPS, přístupnost, Core Web Vitals, strukturovaná data, odkazování na PDF dokumenty a aktuální obchodní podmínky.
8. Proveďte migraci včetně nástroje Search Console a ověřte stav chyb 404.
