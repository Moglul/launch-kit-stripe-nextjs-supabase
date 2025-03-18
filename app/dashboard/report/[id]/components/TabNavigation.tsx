'use client';

interface TabNavigationProps {
  activeTab: 'report' | 'edit' | 'generate';
  setActiveTab: (tab: 'report' | 'edit' | 'generate') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab}) => {
  return (
    <div className="flex space-x-4 mb-2 border-b border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setActiveTab('report')}
        className={`px-4 py-2 text-sm font-medium ${
          activeTab === 'report'
            ? 'text-slate-900 dark:text-white border-b-2 border-black'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        View Report
      </button>
      {(
        <button
          onClick={() => setActiveTab('edit')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'edit'
              ? 'text-slate-900 dark:text-white border-b-2 border-black'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Edit Report
        </button>
      )}
      <button
        onClick={() => setActiveTab('generate')}
        className={`px-4 py-2 text-sm font-medium ${
          activeTab === 'generate'
            ? 'text-slate-900 dark:text-white border-b-2 border-black'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        Generate
      </button>
    </div>
  );
};

export default TabNavigation;