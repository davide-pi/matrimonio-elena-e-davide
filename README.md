# 💍 Matrimonio Elena & Davide

Benvenuti nel repository del sito ufficiale del nostro matrimonio!
Questo progetto è stato creato per condividere con amici e familiari tutte le informazioni utili per il grande giorno.

🌐 **Sito live**: [matrimonio-elena-e-davide.netlify.app](https://matrimonio-elena-e-davide.netlify.app)

---

## 📸 Contenuti del sito

Il sito contiene:

- La data e i dettagli della cerimonia
- Informazioni sulla location del ricevimento
- Una sezione RSVP per confermare la presenza
- Mappa e indicazioni per raggiungerci
- Una gallery di foto e uno spazio dedicato a noi

Design semplice, elegante, multilingua e ottimizzato per dispositivi mobili 📱

---

## 🛠️ Tecnologie usate

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) – interfaccia del sito
- [Vite](https://vitejs.dev) – build tool e dev server
- [Tailwind CSS](https://tailwindcss.com) – stili e layout responsive
- [i18next](https://www.i18next.com) / [react-i18next](https://react.i18next.com) – supporto multilingua
- [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) – test automatici
- [Netlify](https://www.netlify.com/) – deploy gratuito e continuo
- [GitHub Actions](https://docs.github.com/actions) – pipeline di build, test e deploy

---

## 🚀 Come avviare in locale

> ⚠️ Prerequisito: [Node.js](https://nodejs.org) (versione 22 o superiore) installato

```bash
# Clona il repository
git clone https://github.com/davide-pi/matrimonio-elena-e-davide.git
cd matrimonio-elena-e-davide

# Installa le dipendenze
npm ci

# Avvia il server di sviluppo
npm run dev
```

Il sito sarà disponibile su [http://localhost:5173](http://localhost:5173).

### Build di produzione

```bash
npm run build      # genera i file statici in dist/
npm run preview    # anteprima locale della build
```

---

## 🧪 Test e qualità del codice

```bash
npm test               # esegue i test con Vitest
npm run test:coverage  # test con report di code coverage
npm run lint           # analisi statica con ESLint
```

---

## 🔄 Deploy

Il deploy è automatizzato tramite [GitHub Actions](.github/workflows/build-and-deploy.yml):

- ogni push su `main` genera un **deploy di anteprima** su Netlify;
- ogni tag `vX.Y.Z` pubblica una **release ufficiale** in produzione.

---

## 📄 Licenza

Distribuito con licenza [MIT](LICENSE).
