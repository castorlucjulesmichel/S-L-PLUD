# SÒL PLUS SUPER — Achitekti ak plan konstriksyon

**Vèsyon:** 1.0  
**Platfòm:** Android + Web  
**Eta dokiman:** Espesifikasyon pwojè; pa yon aplikasyon finansye ki deja fonksyone.

## 1. Desizyon konfime

- Nivo pwodwi: SUPER.
- Platfòm: Android ak Web, ak yon backend ak yon baz done santral pataje.
- Depo: manyèl + otomatik.
- Retrè: manyèl + otomatik.
- Kontwòl retrè: apwobasyon administratè obligatwa pou tout demann retrè, kit peman an manyèl kit li otomatik.
- Notifikasyon: chak tranzaksyon ak chak chanjman enpòtan nan estati tranzaksyon dwe voye notifikasyon bay administratè.
- SÒL: komisyon 12% sou depo SÒL ak sou PAYROLL.
- Prè: garanti 25%; to enterè, dire, frekans ranbousman ak penalite poko defini.
- Limit gwoup: 100 manm.
- Dire maksimòm: 50 semèn oswa 60 mwa.
- Kontribisyon maksimòm: 20,000 HTG pa jou; 30,000 HTG pa semèn; 50,000 HTG pa mwa.

## 2. Prensip achitekti

Android ak Web se de entèfas ki sèvi ak menm API backend la. Backend la se sèl sous verite pou idantite, otorizasyon, règ biznis, balans, tranzaksyon, komisyon ak notifikasyon.

Pa mete kalkil finansye final oswa kontwòl sekirite sèlman nan aplikasyon kliyan an. Backend la dwe revalide tout montan, dwa aksè, limit ak estati anvan li aksepte yon operasyon.

Achitekti lojik:

1. Android app
2. Web app
3. API backend
4. Sèvis idantite ak otorizasyon
5. Sèvis finansye ak rejis kontab
6. Sèvis SÒL, epay ak prè
7. Sèvis notifikasyon
8. Baz done relasyonèl
9. Adaptè founisè peman ekstèn (pou yon faz pita)

## 3. Modil pwodwi

### Kont ak idantite
Enskripsyon, koneksyon, verifikasyon telefòn, pwofil, rekiperasyon kont, sesyon, aparèy ak verifikasyon idantite selon règleman ki pral apwouve.

### Bous ak bank dijital
Balans disponib, balans rezève, balans an atant, depo, retrè, transfè, resi ak istorik. Tout chanjman balans dwe soti nan antre rejis kontab ki valide.

### Depo
- Manyèl: manm soumèt demann ak prèv/referans; demann lan rete an atant jiskaske yon ajan otorize verifye li.
- Otomatik: sistèm nan kreye yon demann peman; se sèlman konfimasyon verifye founisè a ki ka finalize kredi a.
- Pa janm kredite yon depo otomatik sou baz ekran retou kliyan an sèlman.
- Pwoteje kont doub soumèt ak referans idempotans.

### Retrè
- Manm soumèt demann lan; backend verifye balans disponib, limit ak kont destinasyon.
- Montan an rezève pandan demann lan an atant.
- Administratè dwe apwouve oswa refize tout retrè.
- Apre apwobasyon: mòd manyèl mande prèv peman ajan an; mòd otomatik ka voye peman atravè adaptè founisè a.
- Retrè a pa make kòm fini anvan prèv oswa konfimasyon founisè a verifye.
- Si demann lan refize oswa anile, rezèvasyon an dwe libere yon sèl fwa.

### SÒL
Kreyasyon gwoup, envitasyon, manm, kalandriye kontribisyon, limit, reta, depo obligatwa, PAYROLL, komisyon ak rapò. Règ ki deja bay yo dwe aplike sou backend la, pa sèlman nan fòm entèfas la.

### Epay
Objektif ekonomi, depo, pwogrè, istwa ak retrè. Pa aplike komisyon 12% SÒL sou depo epay sof si pwopriyetè pwodwi a defini sa klèman.

### Prè
Demann, dokiman, analiz, garanti 25%, apwobasyon, debousman, orè ak ranbousman. Pa fikse enterè, dire, penalite oswa plafon prè san desizyon eksplisit.

### Administrasyon
Dashboard separe, jesyon manm ak gwoup, apwobasyon retrè, revizyon depo manyèl, desizyon sou prè, rapò, jesyon plent ak jounal odit. Wòl yo dwe gen pèmisyon minimòm ki nesesè.

## 4. Notifikasyon administratè — règ obligatwa

Chak tranzaksyon dwe pwodui yon evènman notifikasyon pou administratè. Sa gen ladan depo, retrè, transfè, kontribisyon SÒL, PAYROLL, mouvman epay, operasyon prè, garanti, ranbousman, frè ak komisyon.

Notifikasyon an dwe gen omwen:
- ID tranzaksyon ak referans inik
- ID manm (montre sèlman enfòmasyon pèsonèl ki nesesè)
- Kalite tranzaksyon
- Montan ak lajan (HTG)
- Dat/èdtan
- Mòd manyèl oswa otomatik
- Estati aktyèl ak lyen/destinasyon pou revizyon nan dashboard admin

Notifikasyon pa prèv ke lajan deplase. Backend la dwe ekri tranzaksyon ak antre kontab yo an sekirite anvan li voye evènman an. Sèvi ak yon modèl transactional outbox oswa mekanis ekivalan pou evite tranzaksyon san notifikasyon. Kenbe istorik, retry, ak idantifyan evènman pou pa voye menm evènman an plizyè fwa san kontwòl.

Chanèl yo: sant notifikasyon nan dashboard admin an premye; push/SMS/imèl ap ajoute lè sèvis ekstèn yo pare. Echèk SMS oswa push pa dwe efase notifikasyon entèn la.

## 5. Modèl done inisyal

Tab prensipal yo:
- users, profiles, roles, permissions, user_sessions
- wallets, ledger_accounts, ledger_transactions, ledger_entries
- transactions, transaction_events, payment_proofs
- sol_groups, sol_members, contributions, payrolls
- savings_goals, savings_movements
- loan_applications, loan_guarantees, loans, loan_repayments
- admin_notifications, notification_deliveries
- audit_logs, idempotency_keys

Tout tranzaksyon finansye dwe gen ID inik, estati, montan, kalite, lè kreyasyon, lè konfimasyon, moun/oswa sistèm ki otorize l, ak lyen sou antre kontab yo. Pa modifye oswa efase antre kontab ki deja finalize; sèvi ak antre koreksyon/ranvèsman ki gen tras odit.

## 6. Sekirite ak kontwòl

- Modpas hash ak yon algoritm modèn ki adapte pou modpas.
- HTTPS pou tout kominikasyon.
- Chifreman done sansib nan depo.
- OTP pou verifikasyon telefòn ak aksyon ki mande plis konfyans.
- 2FA pou wòl administratè.
- RBAC ak prensip pi piti privilèj.
- Limit tantativ koneksyon, pwoteksyon kont abi ak siveyans.
- Jounal odit pou aksyon finansye ak aksyon admin.
- Backup otomatik ak tès restorasyon.
- Idempotans, tranzaksyon baz done atomik ak kontwòl konkirans pou evite doub debousman.
- Pa mete sekrè API, kle peman oswa modpas nan kòd frontend oswa nan depo GitHub.

## 7. Faz konstriksyon san sèvis ekstèn

### Faz 1 — Fondasyon
Òganizasyon repozitwa, backend, konfigirasyon lokal, modèl baz done, migrasyon, API, idantite, wòl ak pèmisyon.

### Faz 2 — Rejis kontab ak bous
Kont, balans kalkile apati rejis, tranzaksyon, transfè entèn, resi, idempotans ak tès finansye.

### Faz 3 — Depo/retrè ak workflow admin
Demann manyèl, prèv, apwobasyon, rezèvasyon retrè, estati, rejis odit ak sant notifikasyon admin. Mòd otomatik la ka prepare atravè koòdone adaptè/mock, men li pa dwe voye lajan reyèl san koneksyon founisè ki verifye.

### Faz 4 — SÒL ak epay
Gwoup, manm, kontribisyon, PAYROLL, komisyon 12%, objektif epay ak rapò.

### Faz 5 — Prè
Dosye, garanti 25%, workflow admin ak ranbousman apre paramèt prè yo fin defini.

### Faz 6 — Tès ak preparasyon
Tès inite, entegrasyon, sekirite, chaj, backup/restorasyon, tès navigatè ak tès Android.

## 8. Travay ki rete pou demen

Pa antre nan konfigirasyon oswa depandans sa yo jodi a:
- Cloudflare, DNS, domèn, proxy oswa deplwaman ki mande kont ekstèn.
- Koneksyon MonCash/NatCash ak kle API.
- SMS, imèl, push notification provider oswa lòt aplikasyon ekstèn.
- Sekrè, token ak kont sèvis ekstèn.

Jodi a, travay la rete sou konsepsyon, kòd lokal/repozitwa, backend, baz done, tès ak sant notifikasyon entèn. Tout entegrasyon ekstèn dwe fèt pita ak aksè, kle ak otorizasyon ki apwopriye.

## 9. Kritè akseptasyon anvan lajan reyèl

- Menm kont ak done sou Android ak Web.
- Pa gen chanjman balans san antre kontab valide.
- Tout tranzaksyon pwodui notifikasyon admin.
- Tout retrè mande apwobasyon admin.
- Pa gen doub kredi oswa doub debousman.
- Tout aksyon finansye ka swiv atravè referans ak audit log.
- Tès backup/restorasyon reyisi.
- Founisè peman ak kondisyon legal/konfòmite verifye anvan lansman ak lajan reyèl.
