export type RunningStationRow = {
  sl: number;
  ownerName: string;
  membershipId?: string | null; // null => show Apply badge
  zone: string;
  district: string;
  upazila: string;
  ownerBadge?: string; // e.g. "Member"
};

const BASE: RunningStationRow[] = [
  {
    sl: 1,
    ownerName: 'Modina LPG Gas Station & Conversion Center',
    membershipId: '14906-5837',
    zone: 'Barisal',
    district: 'Barisal',
    upazila: 'Barisal Sadar',
    ownerBadge: 'Member',
  },
  {
    sl: 2,
    ownerName: 'Faridpur LPG Autogas Filling Station',
    membershipId: '80362-1779',
    zone: 'Lionelchester',
    district: '46781 Hettinger Gateway',
    upazila: 'Barisal Sadar',
    ownerBadge: 'Member',
  },
  {
    sl: 3,
    ownerName: 'Barak S LPG & Filling Station',
    membershipId: '53913-6773',
    zone: '112 Wil Prairie',
    district: 'Barisal',
    upazila: 'Barisal Sadar',
    ownerBadge: 'Member',
  },
  {
    sl: 4,
    ownerName: 'Sheikh Saad LPG Auto gas Filling Station',
    membershipId: null,
    zone: 'Barisal',
    district: 'Barisal',
    upazila: 'Barisal Sadar',
  },
  {
    sl: 5,
    ownerName: 'Ashohtalhi Filling Station',
    membershipId: '78406-4981',
    zone: 'Charleston',
    district: 'Barisal',
    upazila: 'Barisal Sadar',
    ownerBadge: 'Member',
  },
  {
    sl: 6,
    ownerName: 'A Rahman & sons',
    membershipId: null,
    zone: '13VJN N Broad Street',
    district: 'Barisal',
    upazila: 'Barisal Sadar',
  },
];

const STATION_PREFIX = [
  'Green Fuel',
  'Orion',
  'Bashundhara',
  'Delta',
  'Meghna',
  'Padma',
  'Jamuna',
  'Rupsha',
  'Karnaphuli',
  'Sundarban',
  'Baraka',
  'Al-Amin',
  'Safa',
  'Nafisa',
  'Rahman',
  'Hasan',
  'Sultana',
  'Mawla',
  'Akash',
  'City',
];

const STATION_SUFFIX = [
  'LPG Autogas Filling Station',
  'LPG Station & Conversion Center',
  'Autogas Service Point',
  'LPG Refueling Point',
  'LPG & Filling Station',
  'Auto Gas Station',
];

const ZONES = [
  'Barisal',
  'Dhaka',
  'Chattogram',
  'Khulna',
  'Rajshahi',
  'Rangpur',
  'Sylhet',
  'Mymensingh',
];

const DISTRICTS = [
  'Barisal',
  'Dhaka',
  'Gazipur',
  'Narayanganj',
  'Chattogram',
  'Cumilla',
  'Noakhali',
  'Khulna',
  'Jashore',
  'Rajshahi',
  'Bogura',
  'Rangpur',
  'Dinajpur',
  'Sylhet',
  'Moulvibazar',
  'Mymensingh',
];

const UPAZILAS = [
  'Barisal Sadar',
  'Kotwali',
  'Mirpur',
  'Savar',
  'Uttara',
  'Pahartali',
  'Panchlaish',
  'Sonadanga',
  'Daulatpur',
  'Boalia',
  'Shah Makhdum',
  'Sadar',
  'Birampur',
  'Beanibazar',
  'Sreemangal',
  'Trishal',
];

function pad(n: number, len: number) {
  return String(n).padStart(len, '0');
}

function makeMembershipId(i: number) {
  // deterministic, looks like "14906-5837"
  const a = 10000 + ((i * 73) % 90000);
  const b = 1000 + ((i * 91) % 9000);
  return `${pad(a, 5)}-${pad(b, 4)}`;
}

function buildExtra(count: number, startSl: number): RunningStationRow[] {
  return Array.from({length: count}, (_, idx) => {
    const sl = startSl + idx;
    const name = `${STATION_PREFIX[idx % STATION_PREFIX.length]} ${STATION_SUFFIX[idx % STATION_SUFFIX.length]}`;

    const zone = ZONES[(idx * 3) % ZONES.length];
    const district = DISTRICTS[(idx * 5) % DISTRICTS.length];
    const upazila = UPAZILAS[(idx * 7) % UPAZILAS.length];

    // every 4th row => no membership yet (shows Apply badge)
    const membershipId = sl % 4 === 0 ? null : makeMembershipId(sl);

    return {
      sl,
      ownerName: name,
      membershipId,
      zone,
      district,
      upazila,
      ownerBadge: membershipId ? 'Member' : undefined,
    };
  });
}

// change this to 395 - BASE.length if you want "395" rows like the screenshot
const EXTRA_ROWS = 120;

export const MOCK_RUNNING_STATIONS: RunningStationRow[] = [
  ...BASE,
  ...buildExtra(EXTRA_ROWS, BASE.length + 1),
];
