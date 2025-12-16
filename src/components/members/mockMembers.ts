export type Member = {
  sl: number;
  ownerName: string;
  memberId: string;
  stations: string[];
  zone: string;
  district: string;
  upazila: string;
  photoUrl: string;
};

const ZONES = ['Rajshahi', 'Dhaka', 'Chattogram', 'Khulna', 'Barishal', 'Rangpur', 'Sylhet', 'Mymensingh'];
const DISTRICTS = ['Rajshahi', 'Dhaka', 'Gazipur', 'Chattogram', 'Cumilla', 'Khulna', 'Barishal', 'Rangpur', 'Sylhet'];
const UPAZILAS = ['Paba', 'Savar', 'Tongi', 'Kotwali', 'Patiya', 'Daudkandi', 'Sonadanga', 'Panchagarh', 'Beanibazar'];

const NAMES = [
  'Engr. Md. Serajul Mawla',
  'Engr. Hasin Parfez',
  'Engr. Md. Arif Hossain',
  'Engr. Mahmudul Hasan',
  'Md. Rezaul Karim',
  'Md. Nazmul Islam',
  'Sabrina Rahman',
  'Mst. Jannatul Ferdous',
  'Md. Ashikur Rahman',
  'Md. Tanvir Ahmed',
  'Md. Saif Uddin',
  'Engr. Iftekhar Hossain',
];

const STATIONS = [
  'Saad Motors',
  'MS Aladhin Filling Station',
  'Saad Motors LPG Autogas Station',
  'SS LPG Autogas Filling Station',
  'Green Fuel Autogas',
  'Orion LPG Station',
];

function pick<T>(arr: T[], i: number) {
  return arr[i % arr.length];
}

function makeStations(i: number) {
  // first row in screenshot has multiple lines; mimic that pattern occasionally
  if (i % 9 === 0) return [pick(STATIONS, i), pick(STATIONS, i + 1), pick(STATIONS, i + 2), pick(STATIONS, i + 3)];
  if (i % 4 === 0) return [pick(STATIONS, i), pick(STATIONS, i + 1)];
  return [pick(STATIONS, i)];
}

function makePhotoUrl(seed: string) {
  // stable avatar generator (works fine with <img> without Next config)
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}`;
}

export function buildMockMembers(total = 395): Member[] {
  const out: Member[] = [];
  for (let i = 1; i <= total; i++) {
    const ownerName = pick(NAMES, i);
    const zone = pick(ZONES, i);
    const district = pick(DISTRICTS, i + 2);
    const upazila = pick(UPAZILAS, i + 3);

    out.push({
      sl: i,
      ownerName,
      memberId: `2102${String(1000 + (i % 900)).padStart(4, '0')}`,
      stations: makeStations(i),
      zone,
      district,
      upazila,
      photoUrl: makePhotoUrl(`${ownerName}-${i}`),
    });
  }
  return out;
}

export const MOCK_MEMBERS: Member[] = buildMockMembers(395);
