import { useState } from 'react'
import { Icon, Card, PageHeader, Avatar, StatusBadge, Button, formatDate } from '@/components/ui'
import { residents } from '@/data/dummy'
import type { NavFn } from '@/types'

export default function ResidentsPage({ navigate }: { navigate: NavFn }) {
  const [search, setSearch] = useState('')
  const [filterGender, setFilterGender] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [sortBy, setSortBy] = useState<'name' | 'update'>('update')

  const filtered = residents
    .filter(r => {
      const q = search.toLowerCase()
      const matchSearch = !q || r.name.toLowerCase().includes(q) || r.residentId.toLowerCase().includes(q)
      const matchGender = filterGender === 'All' || r.gender === filterGender
      const matchStatus = filterStatus === 'All' || r.status === filterStatus
      return matchSearch && matchGender && matchStatus
    })
    .sort((a, b) =>
      sortBy === 'name'
        ? a.name.localeCompare(b.name)
        : b.lastUpdate.localeCompare(a.lastUpdate)
    )

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Residents"
        description="Manage resident profiles and care-related information."
        action={
          <Button onClick={() => navigate('add-resident')}>
            <Icon name="plus" size={16} />
            Add Resident
          </Button>
        }
      />

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
            <input
              type="text"
              placeholder="Search by name or Resident ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-edge bg-canvas text-sm text-navy placeholder-subtle focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
            />
          </div>
          <select
            value={filterGender}
            onChange={e => setFilterGender(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-edge bg-canvas text-sm text-navy focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors cursor-pointer"
          >
            <option value="All">All Genders</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 rounded-lg border border-edge bg-canvas text-sm text-navy focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'name' | 'update')}
            className="px-3 py-2.5 rounded-lg border border-edge bg-canvas text-sm text-navy focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors cursor-pointer"
          >
            <option value="update">Sort: Recent Update</option>
            <option value="name">Sort: Name (A–Z)</option>
          </select>
        </div>
      </Card>

      {/* Resident count */}
      <p className="text-slate text-sm mb-4">
        Showing <span className="font-semibold text-navy">{filtered.length}</span> of {residents.length} residents
      </p>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface border-b border-edge">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider">Resident</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider hidden sm:table-cell">ID</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider hidden md:table-cell">Age</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider hidden md:table-cell">Gender</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider hidden lg:table-cell">Last Update</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-subtle uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edge">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-slate text-sm">
                    No residents match the current filters.
                  </td>
                </tr>
              ) : (
                filtered.map(r => (
                  <tr
                    key={r.id}
                    className="hover:bg-surface transition-colors cursor-pointer"
                    onClick={() => navigate('resident-profile', r.id)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={r.name} size="md" />
                        <div>
                          <p className="font-semibold text-navy text-sm">{r.name}</p>
                          <p className="text-subtle text-xs sm:hidden">{r.residentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-xs font-mono text-slate bg-surface px-2 py-0.5 rounded">{r.residentId}</span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-sm text-slate">{r.age} yrs</td>
                    <td className="px-5 py-4 hidden md:table-cell text-sm text-slate">{r.gender}</td>
                    <td className="px-5 py-4 hidden lg:table-cell text-sm text-slate">{formatDate(r.lastUpdate)}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={e => { e.stopPropagation(); navigate('resident-profile', r.id) }}
                        className="text-brand hover:text-brand-700 text-xs font-medium flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        View Profile
                        <Icon name="chevron-right" size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
