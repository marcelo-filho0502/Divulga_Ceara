import { useEffect, useSyncExternalStore } from 'react';
import { ChartColumn, FileText, LayoutDashboard, Users, Wallet } from 'lucide-react';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import ExpenseHistory from './components/ExpenseHistory/ExpenseHistory';
import GovernorHistory from './components/GovernorHistory/GovernorHistory';
import Contracts from './pages/Contracts/Contracts';
import Expenses from './pages/Expenses/Expenses';
import Overview from './pages/Overview/Overview';
import './App.css';

const pages = [
  { href: '#visao-geral', label: 'Visão geral', icon: LayoutDashboard, Page: Overview },
  {
    href: '#historico', label: 'Histórico de gastos', icon: ChartColumn, Page: ExpenseHistory,
    description: 'Compare os valores anuais e veja onde o dinheiro foi aplicado.',
  },
  {
    href: '#governo', label: 'Governadores', icon: Users, Page: GovernorHistory,
    description: 'Consulte os gastos por gestão e a transição de 2022.',
  },
  {
    href: '#despesas', label: 'Despesas', icon: Wallet, Page: Expenses,
    description: 'Acesse a execução orçamentária e as notas de empenho.',
  },
  {
    href: '#contratos', label: 'Contratos', icon: FileText, Page: Contracts,
    description: 'Pesquise contratos estaduais e consulte os registros oficiais.',
  },
];

const overview = pages[0];
const shortcuts = pages.slice(1);
const transitionHash = '#governo-2022';
const readHash = () => window.location.hash;
const initialHash = () => '';

function subscribeToHash(onChange) {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
}

function App() {
  const hash = useSyncExternalStore(subscribeToHash, readHash, initialHash);
  const route = hash === transitionHash ? '#governo' : hash;
  const page = pages.find(({ href }) => href === route) ?? overview;
  const { Page } = page;

  useEffect(() => {
    document.title = `${page.label} | DivulgaCE`;
    if (!hash) return;

    const target = hash === transitionHash
      ? document.getElementById('governo-2022')
      : document.getElementById('main-content');
    target?.focus({ preventScroll: true });
    if (hash === transitionHash) target?.scrollIntoView({ block: 'start' });
    else window.scrollTo({ top: 0 });
  }, [hash, page.label]);

  return (
    <div className="app-container">
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault();
        const main = document.getElementById('main-content');
        main?.focus();
        main?.scrollIntoView({ block: 'start' });
      }}>Ir para o conteúdo</a>
      <Sidebar menuItems={pages} activeHash={page.href} />
      <main className="main-content" id="main-content" tabIndex={-1} aria-labelledby="page-title">
        <Header title={page.label} />
        {page === overview ? <Overview links={shortcuts} /> : <Page />}
      </main>
    </div>
  );
}

export default App;
