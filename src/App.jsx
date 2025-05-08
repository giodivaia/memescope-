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
  { name: 'FAQ', path: '/faq' },
  { name: 'Import', path: '/import' },
];

function App() {
  const navigate = useNavigate();

  return (
    <ColumnVisibilityProvider>
      <DashboardProvider>
        <DndProvider backend={HTML5Backend}>
          <div className="min-h-screen bg-zinc-900 text-white">
            {/* Top Navigation Bar */}
            <div className="flex justify-between items-center px-6 py-4 bg-black/80 backdrop-blur-md shadow-sm border-b border-neutral-800 sticky top-0 z-10">
              <div className="flex items-center space-x-4">
                <h1 
                  className="text-xl font-bold text-white cursor-pointer" 
                  onClick={() => navigate('/')}
                >
                  SCOPE<sup className="text-white">2</sup>
                </h1>
                <div className="flex space-x-4 text-sm text-white/80">
                  {NAV.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.path)}
                      className="font-semibold px-4 py-2 rounded-full transition-all duration-200 shadow-inner hover:text-white/90"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-sm text-right text-purple-400 italic drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]">
                <span className="font-semibold text-purple-500">news2pump</span> powered
              </div>
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