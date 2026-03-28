import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import {
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  Check,
  Copy,
  FileJson,
} from 'lucide-react';

const Settings = () => {
  const { exportData, importData, resetToDefaults } = useContent();
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gayathri-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = () => {
    const data = exportData();
    navigator.clipboard.writeText(data);
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    
    const success = importData(importText);
    setImportStatus(success ? 'success' : 'error');
    
    if (success) {
      setImportText('');
      setTimeout(() => setImportStatus('idle'), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl text-off-white mb-1">
          Settings
        </h2>
        <p className="text-off-white/60 text-sm">
          Manage your data, backup, and restore options
        </p>
      </div>

      {/* Export Section */}
      <div className="bg-charcoal/50 border border-off-white/10 p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-gold/10">
            <Download className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h3 className="font-display text-lg text-off-white mb-1">
              Export Data
            </h3>
            <p className="text-sm text-off-white/60">
              Download a backup of all your website content as a JSON file
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="btn-gold flex items-center gap-2"
          >
            <FileJson className="w-4 h-4" />
            Download JSON
          </button>
          <button
            onClick={handleCopyToClipboard}
            className="flex items-center gap-2 px-4 py-2 border border-off-white/20 text-off-white/60 hover:text-off-white hover:border-off-white/40 transition-colors text-xs uppercase tracking-wide"
          >
            {copyStatus === 'copied' ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </>
            )}
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-charcoal/50 border border-off-white/10 p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-blue-500/10">
            <Upload className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-display text-lg text-off-white mb-1">
              Import Data
            </h3>
            <p className="text-sm text-off-white/60">
              Restore your website content from a previously exported JSON file
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            value={importText}
            onChange={(e) => {
              setImportText(e.target.value);
              setImportStatus('idle');
            }}
            placeholder="Paste your JSON data here..."
            rows={6}
            className="w-full bg-transparent border border-off-white/20 py-3 px-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors resize-none font-mono text-xs"
          />

          {importStatus === 'success' && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              Data imported successfully! Refresh the page to see changes.
            </div>
          )}

          {importStatus === 'error' && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Invalid JSON data. Please check your backup file.
            </div>
          )}

          <button
            onClick={handleImport}
            disabled={!importText.trim()}
            className="btn-gold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4" />
            Import Data
          </button>
        </div>
      </div>

      {/* Reset Section */}
      <div className="bg-charcoal/50 border border-red-500/20 p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-red-500/10">
            <RotateCcw className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-display text-lg text-off-white mb-1">
              Reset to Defaults
            </h3>
            <p className="text-sm text-off-white/60">
              Clear all custom content and restore the original default values
            </p>
          </div>
        </div>

        <div className="p-4 bg-red-500/5 border border-red-500/20 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-400 font-medium mb-1">
                Warning: This action cannot be undone
              </p>
              <p className="text-xs text-off-white/60">
                All your custom content including gallery images, text, and settings will be permanently deleted. Make sure to export a backup first.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={resetToDefaults}
          className="flex items-center gap-2 px-4 py-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors text-xs uppercase tracking-wide"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All Content
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-charcoal/50 border border-off-white/10 p-6">
        <h3 className="font-display text-lg text-off-white mb-4">
          How to Add New Images
        </h3>
        <div className="space-y-3 text-sm text-off-white/70">
          <p>
            1. Upload your image files to the <code className="bg-off-white/10 px-2 py-0.5 text-gold">/public</code> folder
          </p>
          <p>
            2. In the Gallery Manager, click <strong className="text-off-white">Add Image</strong>
          </p>
          <p>
            3. Enter the image path (e.g., <code className="bg-off-white/10 px-2 py-0.5">/your-image.jpg</code>)
          </p>
          <p>
            4. Fill in the title, location, date, and select category
          </p>
          <p>
            5. Click <strong className="text-off-white">Add Image</strong> to save
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
