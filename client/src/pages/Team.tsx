import type { TeamMember } from '../api/types'
import { useLanguage } from '../i18n/LanguageContext'
import { translateTeamMember } from '../i18n/content'
import { getTeamMembers } from '../data/team'
import { Reveal } from '../components/Reveal'
import { ParallaxBand } from '../components/ParallaxBand'

export function Team() {
  const { t, language } = useLanguage()

  const translated = getTeamMembers().map((m) => translateTeamMember(m, language))
  const headOffice = translated.filter((m) => m.isHeadOffice)
  const branches = translated.filter((m) => !m.isHeadOffice)

  return (
    <div>
      <ParallaxBand
        as="h1"
        image="/images/article-personalized-medicine.webp"
        eyebrow={t.team.badge}
        title={t.team.title}
        copy={t.team.subtitle}
      />
      <div className="mx-auto max-w-6xl px-6 py-10">
        {headOffice.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-4 border-l-4 border-blue-600 pl-3 text-sm font-semibold text-slate-800">
              {t.team.headOfficeHeading}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {headOffice.map((member, i) => (
                <Reveal key={member.id} delay={i * 80}>
                  <TeamCard member={member} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {branches.length > 0 && (
          <div>
            <h2 className="mb-4 border-l-4 border-blue-600 pl-3 text-sm font-semibold text-slate-800">
              {t.team.branchesHeading}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((member, i) => (
                <Reveal key={member.id} delay={i * 80}>
                  <TeamCard member={member} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// A couple of the team photos frame the face high up in the source image, so the default
// centered crop clips the chin/mouth in the small round avatar — nudge those down a bit.
const PHOTO_POSITION_OVERRIDES: Record<number, string> = {
  3: 'center 25%', // Elena
  7: 'center 20%', // Ivana
}

function TeamCard({ member }: { member: TeamMember }) {
  const { t } = useLanguage()
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-slate-300 to-slate-400">
          {member.photoUrl && (
            <img
              src={member.photoUrl}
              alt={member.name}
              className="h-full w-full object-cover"
              style={{ objectPosition: PHOTO_POSITION_OVERRIDES[member.id] }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-800">{member.name}</h3>
          <p className="text-xs font-medium text-blue-700">{member.role}</p>
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">{member.bio}</p>
      <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
        <p className="font-medium text-slate-600">{member.branchName}</p>
        <p>{member.branchAddress}</p>
      </div>
      <div className="mt-3 space-y-1 text-xs text-slate-500">
        <p>
          <span className="font-medium text-slate-600">{t.team.contactEmail}:</span>{' '}
          <a href={`mailto:${member.email}`} className="text-blue-700 hover:underline">
            {member.email}
          </a>
        </p>
        <p>
          <span className="font-medium text-slate-600">{t.team.contactPhone}:</span> {member.phone}
        </p>
      </div>
    </div>
  )
}
