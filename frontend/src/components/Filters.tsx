interface FiltersProps {
  serviceFilter: string;
  statusFilter: 'all' | 'Active' | 'Expired';
  onServiceFilterChange: (value: string) => void;
  onStatusFilterChange: (value: 'all' | 'Active' | 'Expired') => void;
  onClearFilters: () => void;
}

function Filters({
  serviceFilter,
  statusFilter,
  onServiceFilterChange,
  onStatusFilterChange,
  onClearFilters
}: FiltersProps) {
  const hasActiveFilters = serviceFilter !== '' || statusFilter !== 'all';

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Service Name Filter */}
        <div>
          <label htmlFor="service-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Search by Service
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="service-filter"
              value={serviceFilter}
              onChange={(e) => onServiceFilterChange(e.target.value)}
              placeholder="e.g., GitHub, Stripe..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as 'all' | 'Active' | 'Expired')}
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
          >
            <option value="all">All Status</option>
            <option value="Active">Active Only</option>
            <option value="Expired">Expired Only</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filters

