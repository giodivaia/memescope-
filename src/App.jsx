import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DashboardProvider } from './context/DashboardContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import TemplatesTab from './components/TemplatesTab';
import CreateTab from './components/CreateTab';
import DiscoverTab from './components/DiscoverTab';
import BuilderTab from './components/BuilderTab';
import FeedPage from './pages/FeedPage';
import TradeTerminal from './components/TradeTerminal';
import StrategyWorkspace from './components/StrategyWorkspace';
import FAQPage from './components/FAQPage';
import ImportPage from './components/ImportPage';
import StrategyBuilder from './components/StrategyBuilder';
import { ColumnVisibilityProvider } from './context/ColumnVisibilityContext';
import LayoutWithColumnBar from './components/LayoutWithColumnBar';

const NAV = [
  { name: 'Discover', path: '/discover' },
  { name: 'Create', path: '/create' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Import', path: '/import' },
];

function App() {
  const navigate = useNavigate();

  return (
    <ColumnVisibilityProvider>
      <DashboardProvider>
        <DndProvider backend={HTML5Backend}>
          <div className="min-h-screen">
            {/* Top Navigation Bar */}
            <div className="navbar-tactical">
              <div className="navbar-ares-tactical" onClick={() => navigate('/')}>ARES</div>
              <div className="navbar-links-center">
                {NAV.map((item, idx) => (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`navbar-link navbar-link-animate`}
                    style={{ animationDelay: `${0.08 * idx + 0.1}s` }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="navbar-right">GET IN TOUCH</div>
            </div>

            <main className="flex flex-col items-center justify-center flex-1 w-full">
              <Routes>
                <Route path="/" element={<WelcomeScreen />} />
                <Route path="/feed" element={<LayoutWithColumnBar><FeedPage /></LayoutWithColumnBar>} />
                <Route path="/trade/:tokenName" element={<TradeTerminal />} />
                <Route path="/terminal/:tokenName" element={<LayoutWithColumnBar><TradeTerminal /></LayoutWithColumnBar>} />
                <Route path="/templates" element={<TemplatesTab />} />
                <Route path="/create" element={<CreateTab />} />
                <Route path="/discover" element={<DiscoverTab />} />
                <Route path="/workspace" element={<StrategyWorkspace />} />
                <Route path="/builder" element={<BuilderTab />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/import" element={<ImportPage />} />
                <Route path="/strategy-builder" element={<StrategyBuilder />} />
                {/* Add more routes as needed */}
              </Routes>
            </main>
          </div>
        </DndProvider>
      </DashboardProvider>
    </ColumnVisibilityProvider>
  );
}

export default App; 