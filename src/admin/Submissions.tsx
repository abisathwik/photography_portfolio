import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import type { Submission } from '@/types';
import {
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  User,
  Trash2,
  Eye,
  Download,
} from 'lucide-react';

const Submissions = () => {
  const { submissions, deleteSubmission } = useContent();
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      deleteSubmission(id);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(submissions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-off-white mb-1">
            Form Submissions
          </h2>
          <p className="text-off-white/60 text-sm">
            View and manage inquiries from the contact form
          </p>
        </div>
        <button
          onClick={handleExport}
          className="btn-gold flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export JSON
        </button>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="bg-charcoal/50 border border-off-white/10 p-8 text-center">
            <MessageSquare className="w-12 h-12 text-off-white/30 mx-auto mb-4" />
            <p className="text-off-white/60">No submissions yet</p>
          </div>
        ) : (
          submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-charcoal/50 border border-off-white/10 p-6 hover:border-gold/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2 text-off-white">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{submission.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-off-white/60">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{submission.email}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-off-white/70">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{submission.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-off-white/70">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{submission.location}</span>
                    </div>
                    <div className="text-off-white/50 text-xs">
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                    </div>
                  </div>
                  
                  <p className="text-off-white/80 text-sm leading-relaxed">
                    {submission.message}
                  </p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setSelectedSubmission(submission)}
                    className="p-2 text-off-white/60 hover:text-gold hover:bg-gold/10 transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(submission.id)}
                    className="p-2 text-off-white/60 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-charcoal border border-off-white/20 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl text-off-white">
                Submission Details
              </h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-off-white/60 hover:text-off-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-off-white/60 text-sm mb-1">Name</label>
                  <p className="text-off-white">{selectedSubmission.name}</p>
                </div>
                <div>
                  <label className="block text-off-white/60 text-sm mb-1">Email</label>
                  <p className="text-off-white">{selectedSubmission.email}</p>
                </div>
                <div>
                  <label className="block text-off-white/60 text-sm mb-1">Date</label>
                  <p className="text-off-white">{selectedSubmission.date}</p>
                </div>
                <div>
                  <label className="block text-off-white/60 text-sm mb-1">Location</label>
                  <p className="text-off-white">{selectedSubmission.location}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-off-white/60 text-sm mb-1">Message</label>
                <p className="text-off-white whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>
              
              <div>
                <label className="block text-off-white/60 text-sm mb-1">Submitted At</label>
                <p className="text-off-white/70 text-sm">
                  {new Date(selectedSubmission.submittedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Submissions;