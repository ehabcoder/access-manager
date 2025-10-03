import { useState, useEffect } from 'react'
import TokenTable from './components/TokenTable'
import Filters from './components/Filters'
import Header from './components/Header'
import type { Token } from './types'

const API_BASE_URL = 'http://localhost:5000/api'

function App() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [serviceFilter, setServiceFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Expired'>('all')

  // Fetch tokens from API
  useEffect(() => {
    fetchTokens()
  }, [])

  // Apply filters whenever tokens or filters change
  useEffect(() => {
    let filtered = [...tokens]

    // Filter by service name
    if (serviceFilter) {
      filtered = filtered.filter(token =>
        token.serviceName.toLowerCase().includes(serviceFilter.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(token => token.status === statusFilter)
    }

    setFilteredTokens(filtered)
  }, [tokens, serviceFilter, statusFilter])

  const fetchTokens = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_BASE_URL}/tokens`)
      const data = await response.json()
      
      if (data.success) {
        setTokens(data.data)
      } else {
        setError('Failed to fetch tokens')
      }
    } catch (err) {
      setError('Error connecting to the server. Make sure the backend is running on port 5000.')
      console.error('Error fetching tokens:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRenewToken = async (tokenId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tokens/${tokenId}/renew`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      
      if (data.success) {
        // Show success message
        alert(`✅ ${data.message}`)
        // Refresh tokens
        fetchTokens()
      } else {
        alert('❌ Failed to renew token')
      }
    } catch (err) {
      console.error('Error renewing token:', err)
      alert('❌ Error renewing token')
    }
  }

  const handleClearFilters = () => {
    setServiceFilter('')
    setStatusFilter('all')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Tokens</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{tokens.length}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Tokens</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {tokens.filter(t => t.status === 'Active').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Expired Tokens</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {tokens.filter(t => t.status === 'Expired').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Filters
          serviceFilter={serviceFilter}
          statusFilter={statusFilter}
          onServiceFilterChange={setServiceFilter}
          onStatusFilterChange={setStatusFilter}
          onClearFilters={handleClearFilters}
        />

        {/* Token Table */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64">
              <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-600 text-lg font-medium mb-2">Error Loading Tokens</p>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchTokens}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <TokenTable tokens={filteredTokens} onRenewToken={handleRenewToken} />
          )}
        </div>

        {/* Footer Info */}
        {!loading && !error && filteredTokens.length === 0 && tokens.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-gray-500">No tokens match your filters. Try adjusting the filters above.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

