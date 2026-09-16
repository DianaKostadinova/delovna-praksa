// Static, in-code data — same reasoning as team.ts: this never changes at runtime, so there's
// nothing to gain from a DB round-trip.
export interface Branch {
  id: number
  name: string
  city: string
  address: string
  phone: string
  email: string
  lat: number
  lng: number
}

export const BRANCHES: Branch[] = [
  { id: 1, name: 'Zegin Head Office', city: 'Skopje', address: 'Bulevar Ilinden 1, Skopje', phone: '+389 2 3100 101', email: 'headoffice@zegin.com', lat: 41.9965, lng: 21.4341 },
  { id: 2, name: 'Zegin Centar', city: 'Skopje', address: 'Makedonija 11, Skopje', phone: '+389 2 3100 201', email: 'centar@zegin.com', lat: 41.9973, lng: 21.428 },
  { id: 3, name: 'Zegin Aerodrom', city: 'Skopje', address: 'Aleksandar Makedonski 42, Skopje', phone: '+389 2 3100 202', email: 'aerodrom@zegin.com', lat: 41.972, lng: 21.465 },
  { id: 4, name: 'Zegin Karpoš', city: 'Skopje', address: 'Partizanski Odredi 45, Skopje', phone: '+389 2 3100 203', email: 'karpos@zegin.com', lat: 42.005, lng: 21.385 },
  { id: 5, name: 'Zegin Gazi Baba', city: 'Skopje', address: 'Nikola Karev 5, Skopje', phone: '+389 2 3100 204', email: 'gazibaba@zegin.com', lat: 42.01, lng: 21.47 },
  { id: 6, name: 'Zegin Bitola', city: 'Bitola', address: 'Shirok Sokak 15, Bitola', phone: '+389 47 220 101', email: 'bitola@zegin.com', lat: 41.0297, lng: 21.3347 },
  { id: 7, name: 'Zegin Ohrid', city: 'Ohrid', address: 'Turistichka 22, Ohrid', phone: '+389 46 260 102', email: 'ohrid@zegin.com', lat: 41.1231, lng: 20.8016 },
  { id: 8, name: 'Zegin Prilep', city: 'Prilep', address: 'Marshal Tito 10, Prilep', phone: '+389 48 400 103', email: 'prilep@zegin.com', lat: 41.3452, lng: 21.554 },
  { id: 9, name: 'Zegin Tetovo', city: 'Tetovo', address: 'Ilindenska 8, Tetovo', phone: '+389 44 330 104', email: 'tetovo@zegin.com', lat: 42.01, lng: 20.9714 },
  { id: 10, name: 'Zegin Veles', city: 'Veles', address: 'Kočo Racin 3, Veles', phone: '+389 43 230 105', email: 'veles@zegin.com', lat: 41.715, lng: 21.7753 },
  { id: 11, name: 'Zegin Štip', city: 'Štip', address: 'Leninova 12, Štip', phone: '+389 32 380 106', email: 'stip@zegin.com', lat: 41.7433, lng: 22.1953 },
  { id: 12, name: 'Zegin Kumanovo', city: 'Kumanovo', address: '11 Oktomvri 20, Kumanovo', phone: '+389 31 420 107', email: 'kumanovo@zegin.com', lat: 42.1322, lng: 21.7144 },
]
