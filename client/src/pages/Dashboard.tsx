import { useEffect, useState } from 'react'
import { api } from '../api/client'
import type { DashboardStats, Patient, Prescription } from '../api/types'

const STATUS_STYLE: Record<Prescription['status'], string> = {
  Active: 'bg-green-100 text-green-700',
  Completed: 'bg-slate-100 text-slate-600',
  Pending: 'bg-amber-100 text-amber-700',
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentRx, setRecentRx] = useState<Pick<Prescription, 'rxId' | 'medication' | 'status'>[]>([])
  const [rxInput, setRxInput] = useState('')
  const [verified, setVerified] = useState<string | null>(null)

  const [patientCode, setPatientCode] = useState('')
  const [patient, setPatient] = useState<Patient | null>(null)
  const [lookupError, setLookupError] = useState<string | null>(null)
  const [looking, setLooking] = useState(false)

  useEffect(() => {
    api.getDashboardStats().then(setStats).catch(() => {})
    api.getRecentPrescriptions().then(setRecentRx).catch(() => {})
  }, [])

  function verifyPrescription(e: React.FormEvent) {
    e.preventDefault()
    if (!rxInput.trim()) return
    const match = recentRx.find((rx) => rx.rxId.toLowerCase() === rxInput.trim().toLowerCase())
    setVerified(match ? `Verified: ${match.medication} (${match.status})` : 'No matching prescription found in demo data.')
  }

  async function lookupPatient(e: React.FormEvent) {
    e.preventDefault()
    if (!patientCode.trim()) return
    setLooking(true)
    setLookupError(null)
    setPatient(null)
    try {
      const found = await api.getPatient(patientCode.trim())
      setPatient(found)
    } catch (err) {
      setLookupError(err instanceof Error ? err.message : 'Lookup failed.')
    } finally {
      setLooking(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Internal Administration</p>
          <h1 className="text-2xl font-bold text-slate-900">Pharmacist Portal</h1>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
          <span className="h-2 w-2 rounded-full bg-green-500" /> System Status: Online
        </span>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-800">Prescription Verification</h3>
          <p className="mt-1 text-xs text-slate-500">
            Enter the unique identifier provided by the patient to verify a prescription.
          </p>
          <form onSubmit={verifyPrescription} className="mt-3 flex gap-2">
            <input
              value={rxInput}
              onChange={(e) => setRxInput(e.target.value)}
              placeholder="Enter RX ID (e.g. RX-448291)…"
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </form>
          <button
            onClick={verifyPrescription}
            className="mt-2 w-full rounded-md bg-blue-700 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            ✓ Verify Prescription
          </button>
          {verified && <p className="mt-2 text-xs font-medium text-slate-600">{verified}</p>}

          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold text-slate-500">Recent Scans</p>
            <div className="space-y-2">
              {recentRx.map((rx) => (
                <div key={rx.rxId} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 text-xs">
                  <span className="font-medium text-slate-700">{rx.rxId}</span>
                  <span className="text-slate-400">Verified</span>
                  <span className="text-green-600">✓</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-800">Patient ID Lookup</h3>
          <p className="mt-1 text-xs text-slate-500">
            Look up a patient by their internal patient ID (demo data only — never a real SSN).
          </p>
          <form onSubmit={lookupPatient} className="mt-3 flex gap-2">
            <input
              value={patientCode}
              onChange={(e) => setPatientCode(e.target.value)}
              placeholder="e.g. 992-BA-01"
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
            <button className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
              {looking ? '…' : 'Retrieve Info'}
            </button>
          </form>
          {lookupError && <p className="mt-2 text-xs text-red-600">{lookupError}</p>}

          {patient && (
            <div className="mt-4 rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">{patient.fullName}</p>
                  <p className="text-xs text-slate-400">
                    ID: {patient.patientCode} · <span className="text-green-600">{patient.insuranceStatus}</span>
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-md bg-slate-50 px-2 py-1">DOB: {patient.dateOfBirth}</span>
                <span className="rounded-md bg-slate-50 px-2 py-1">Blood Type: {patient.bloodType}</span>
                <span className="rounded-md bg-slate-50 px-2 py-1">Allergies: {patient.allergies}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {patient && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase text-slate-400">
                <th className="pb-2">Date</th>
                <th className="pb-2">Medication</th>
                <th className="pb-2">Dosage</th>
                <th className="pb-2">Physician</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patient.prescriptions.map((rx) => (
                <tr key={rx.id}>
                  <td className="py-2 text-slate-500">{rx.datePrescribed}</td>
                  <td className="py-2">
                    <p className="font-medium text-slate-800">{rx.medication}</p>
                    <p className="text-xs text-slate-400">{rx.dosageInfo}</p>
                  </td>
                  <td className="py-2 text-slate-600">{rx.dosage}</td>
                  <td className="py-2 text-slate-600">{rx.physician}</td>
                  <td className="py-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[rx.status]}`}>
                      {rx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-slate-400">Pending</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">{stats?.pending ?? '—'}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-slate-400">Filled Today</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">{stats?.filledToday ?? '—'}</p>
        </div>
      </div>
    </div>
  )
}
