import { useEffect, useState } from 'react'
import { api } from '../api/client'
import type { DashboardStats, Patient, Prescription } from '../api/types'
import { useLanguage } from '../i18n/LanguageContext'
import { translatePatient, translateProductName } from '../i18n/content'
import { CheckIcon } from '../components/icons'

const STATUS_STYLE: Record<Prescription['status'], string> = {
  Active: 'bg-green-100 text-green-700',
  Completed: 'bg-slate-100 text-slate-600',
  Pending: 'bg-amber-100 text-amber-700',
}

export function Dashboard() {
  const { t, language } = useLanguage()
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
    setVerified(
      match
        ? `${t.dashboard.verifiedPrefix} ${translateProductName(match.medication, language)} (${(t.prescriptionStatus as Record<string, string>)[match.status]})`
        : t.dashboard.noMatch,
    )
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

  const displayPatient = patient ? translatePatient(patient, language) : null

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{t.dashboard.badge}</p>
          <h1 className="text-2xl font-bold text-slate-900">{t.dashboard.title}</h1>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
          <span className="h-2 w-2 rounded-full bg-green-500" /> {t.dashboard.systemOnline}
        </span>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-800">{t.dashboard.verifyTitle}</h3>
          <p className="mt-1 text-xs text-slate-500">{t.dashboard.verifyCopy}</p>
          <form onSubmit={verifyPrescription} className="mt-3 flex gap-2">
            <input
              value={rxInput}
              onChange={(e) => setRxInput(e.target.value)}
              placeholder={t.dashboard.rxPlaceholder}
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </form>
          <button
            onClick={verifyPrescription}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-blue-700 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            <CheckIcon className="h-4 w-4" />
            {t.dashboard.verifyButton}
          </button>
          {verified && <p className="mt-2 text-xs font-medium text-slate-600">{verified}</p>}

          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold text-slate-500">{t.dashboard.recentScans}</p>
            <div className="space-y-2">
              {recentRx.map((rx) => (
                <div key={rx.rxId} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 text-xs">
                  <span className="font-medium text-slate-700">{rx.rxId}</span>
                  <span className="text-slate-400">{t.dashboard.verifiedLabel}</span>
                  <CheckIcon className="h-3.5 w-3.5 text-green-600" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-slate-800">{t.dashboard.lookupTitle}</h3>
          <p className="mt-1 text-xs text-slate-500">{t.dashboard.lookupCopy}</p>
          <form onSubmit={lookupPatient} className="mt-3 flex gap-2">
            <input
              value={patientCode}
              onChange={(e) => setPatientCode(e.target.value)}
              placeholder={t.dashboard.lookupPlaceholder}
              className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
            <button className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
              {looking ? t.dashboard.lookingButton : t.dashboard.lookupButton}
            </button>
          </form>
          {lookupError && <p className="mt-2 text-xs text-red-600">{lookupError}</p>}

          {displayPatient && (
            <div className="mt-4 rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">{displayPatient.fullName}</p>
                  <p className="text-xs text-slate-400">
                    ID: {displayPatient.patientCode} · <span className="text-green-600">{displayPatient.insuranceStatus}</span>
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-md bg-slate-50 px-2 py-1">{t.dashboard.dob}: {displayPatient.dateOfBirth}</span>
                <span className="rounded-md bg-slate-50 px-2 py-1">{t.dashboard.bloodType}: {displayPatient.bloodType}</span>
                <span className="rounded-md bg-slate-50 px-2 py-1">{t.dashboard.allergies}: {displayPatient.allergies}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {displayPatient && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase text-slate-400">
                <th className="pb-2">{t.dashboard.tableDate}</th>
                <th className="pb-2">{t.dashboard.tableMedication}</th>
                <th className="pb-2">{t.dashboard.tableDosage}</th>
                <th className="pb-2">{t.dashboard.tablePhysician}</th>
                <th className="pb-2">{t.dashboard.tableStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayPatient.prescriptions.map((rx) => (
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
                      {(t.prescriptionStatus as Record<string, string>)[rx.status]}
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
          <p className="text-xs font-semibold uppercase text-slate-400">{t.dashboard.pending}</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">{stats?.pending ?? '—'}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-slate-400">{t.dashboard.filledToday}</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">{stats?.filledToday ?? '—'}</p>
        </div>
      </div>
    </div>
  )
}
