// clients/ClientManagement.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Edit, Trash2, Eye, X,
  Mail, Phone, User, Briefcase, BarChart3
} from 'lucide-react';
import mainAxios from '../../../Instance/mainAxios';

interface Client {
  id: number;
  name: string;
  client_type: string;
  phone: string;
  email: string;
  num_projects: string;
  user_id: number;
  creator_first_name: string;
  creator_last_name: string;
}

interface CreateClientRequest {
  name: string;
  client_type: string;
  phone: string;
  email: string;
  num_projects: string;
}

interface ClientStats {
  total_clients: number;
  client_type_breakdown: Array<{
    client_type: string;
    count: number;
  }>;
  user_breakdown: Array<{
    user_id: number;
    user_name: string;
    client_count: number;
  }>;
}

const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [viewingClient, setViewingClient] = useState<Client | null>(null);
  const [stats, setStats] = useState<ClientStats | null>(null);
  const [formData, setFormData] = useState<CreateClientRequest>({
    name: '',
    client_type: '',
    phone: '',
    email: '',
    num_projects: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [clientTypes, setClientTypes] = useState<string[]>([]);

  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
    fetchClientTypes();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await mainAxios.get('/clients/');
      setClients(response.data);
    } catch (err: any) {
      setError('Failed to fetch clients');
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientTypes = async () => {
    try {
      const response = await mainAxios.get('/clients/');
      const clientsData: Client[] = response.data;
      const uniqueTypes = Array.from(new Set(
        clientsData.map(client => client.client_type).filter(Boolean)
      ));
      setClientTypes(uniqueTypes);
    } catch (err) {
      console.error('Error fetching client types:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await mainAxios.get('/clients/stats/summary');
      setStats(response.data);
    } catch (err: any) {
      setError('Failed to fetch statistics');
      console.error('Error fetching stats:', err);
    }
  };

  const searchClients = async (query: string) => {
    try {
      setLoading(true);
      if (query.trim()) {
        const response = await mainAxios.get(`/clients/search/?query=${encodeURIComponent(query)}`);
        setClients(response.data);
      } else {
        fetchClients();
      }
    } catch (err: any) {
      setError('Failed to search clients');
      console.error('Error searching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchClients(query);
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (editingClient) {
        await mainAxios.put(`/clients/${editingClient.id}`, formData);
      } else {
        await mainAxios.post('/clients/', formData);
      }
      
      setShowModal(false);
      setFormData({ name: '', client_type: '', phone: '', email: '', num_projects: '' });
      setEditingClient(null);
      fetchClients();
      fetchClientTypes();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save client');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      client_type: client.client_type,
      phone: client.phone,
      email: client.email,
      num_projects: client.num_projects
    });
    setShowModal(true);
  };

  const handleDelete = async (clientId: number) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      await mainAxios.delete(`/clients/${clientId}`);
      fetchClients();
      fetchClientTypes();
    } catch (err: any) {
      setError('Failed to delete client');
      console.error('Error deleting client:', err);
    }
  };

  const handleView = (client: Client) => {
    setViewingClient(client);
    setShowViewModal(true);
  };

  const handleShowStats = async () => {
    await fetchStats();
    setShowStatsModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', client_type: '', phone: '', email: '', num_projects: '' });
    setEditingClient(null);
    setError('');
  };

  const filteredClients = clients.filter(client => 
    clientTypeFilter === 'all' || client.client_type === clientTypeFilter
  );

  const formatPhoneNumber = (phone: string) => {
    // Simple phone formatting
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  if (loading && clients.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Client Management
            </h1>
            <p className="text-gray-600">
              Manage your clients and their information
            </p>
          </div>
          <button
            onClick={handleShowStats}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors w-fit"
          >
            <BarChart3 className="w-4 h-4" />
            <span>View Stats</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-700 p-4 rounded-lg mb-6"
        >
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError('')}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filters and Actions */}
          <div className="flex gap-3 w-full md:w-auto">
            {/* Client Type Filter */}
            <select
              value={clientTypeFilter}
              onChange={(e) => setClientTypeFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              {clientTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Add Client Button */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Client</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      {filteredClients.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || clientTypeFilter !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Get started by adding your first client'
            }
          </p>
          {!searchQuery && clientTypeFilter === 'all' && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
            >
              Add Client
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
                      {client.name}
                    </h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {client.client_type}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    
                    {client.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{formatPhoneNumber(client.phone)}</span>
                      </div>
                    )}
                    
                    {client.num_projects && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span>{client.num_projects} projects</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(client)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(client)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit Client"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Client"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-400 text-right">
                      <div>By {client.creator_first_name}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Create/Edit Client Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingClient ? 'Edit Client' : 'Add New Client'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleCreateClient} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter client name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client Type *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.client_type}
                      onChange={(e) => setFormData({ ...formData, client_type: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., Corporate, Individual"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="client@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Projects
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={formData.num_projects}
                      onChange={(e) => setFormData({ ...formData, num_projects: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 5 projects, Ongoing, Completed"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Describe the project status or count
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      editingClient ? 'Update Client' : 'Add Client'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Client Modal */}
      <AnimatePresence>
        {showViewModal && viewingClient && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Client Details
                  </h2>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Client Name</h3>
                    <p className="text-gray-900 font-medium text-lg">{viewingClient.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Client Type</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {viewingClient.client_type}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Email Address</h3>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a 
                        href={`mailto:${viewingClient.email}`}
                        className="text-primary hover:text-primary transition-colors"
                      >
                        {viewingClient.email}
                      </a>
                    </div>
                  </div>
                  {viewingClient.phone && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Phone Number</h3>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a 
                          href={`tel:${viewingClient.phone}`}
                          className="text-gray-900 hover:text-primary transition-colors"
                        >
                          {formatPhoneNumber(viewingClient.phone)}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Projects */}
                {viewingClient.num_projects && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Projects</h3>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 font-medium">{viewingClient.num_projects}</span>
                    </div>
                  </div>
                )}

                {/* Creator Info */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Created By</h3>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">
                      {viewingClient.creator_first_name} {viewingClient.creator_last_name}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Statistics Modal */}
      <AnimatePresence>
        {showStatsModal && stats && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Client Statistics
                  </h2>
                  <button
                    onClick={() => setShowStatsModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Total Clients */}
                <div className="bg-primary bg-opacity-10 rounded-lg p-6 text-center">
                  <h3 className="text-sm font-medium text-white mb-2">Total Clients</h3>
                  <p className="text-3xl font-bold text-white">{stats.total_clients}</p>
                </div>

                {/* Client Type Breakdown */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Type Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats.client_type_breakdown.map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-1">{item.client_type}</h4>
                        <p className="text-2xl font-bold text-primary">{item.count}</p>
                        <p className="text-sm text-gray-500">
                          {((item.count / stats.total_clients) * 100).toFixed(1)}% of total
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Breakdown */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Clients by User</h3>
                  <div className="space-y-3">
                    {stats.user_breakdown.map((user, index) => (
                      <div key={user.user_id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{user.user_name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-primary font-bold">{user.client_count}</span>
                          <span className="text-sm text-gray-500">
                            {((user.client_count / stats.total_clients) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientManagement;