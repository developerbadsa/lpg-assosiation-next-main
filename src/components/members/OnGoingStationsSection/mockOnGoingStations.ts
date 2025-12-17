export type OnGoingStationRow = {
  sl: number;
  ownerName: string;
  membershipId?: string | null;
  zone: string;
  district: string;
  upazila: string;
  ownerBadge?: string; // "Member"
};

function pad(n: number, len: number) {
  return String(n).padStart(len, '0');
}

function makeMembershipId(i: number) {
  const a = 10000 + ((i * 73) % 90000);
  const b = 1000 + ((i * 91) % 9000);
  return `${pad(a, 5)}-${pad(b, 4)}`;
}

const ZONES = [
  'Barisal',
  'Lionelchester',
  '112 Will Prairie',
  'Charleston',
  '3140 N Broad Street',
  'West Elwyn',
  'Bellevue',
];

const DISTRICTS = [
  'Barisal',
  '46781 Hettinger Gateway',
  'N/A',
  'Barisal',
  'N/A',
  'Barisal',
  'N/A',
];

const UPAZILAS = ['Barisal Sadar', 'Barisal Sadar', 'N/A', 'Barisal Sadar', 'N/A', 'Barisal Sadar', 'N/A'];

const OWNERS = [
  'Modina LPG Gas Station & Conversion Center',
  'Faridpur LPG Autogas Filling Station',
  'Baraka LPG & Filling Station',
  'Sheikh Saad LPG Auto gas Filling Station',
  'Ashohtalhi Filling Station',
  'A Rahman & sons',
  'Lorem ipsum dolor sit amet consectetur.',
];

const MEMBERSHIP_PRESENT = new Set([5, 7, 11, 14, 17, 20, 23, 27, 31]); // rest => Apply badge

export const MOCK_ON_GOING_STATIONS: OnGoingStationRow[] = Array.from({length: 31}, (_, idx) => {
  const sl = idx + 1;

  const zone = ZONES[idx % ZONES.length];
  const district = DISTRICTS[idx % DISTRICTS.length];
  const upazila = UPAZILAS[idx % UPAZILAS.length];

  const ownerName = OWNERS[idx % OWNERS.length];

  const hasMembership = MEMBERSHIP_PRESENT.has(sl);
  const membershipId = hasMembership ? makeMembershipId(sl) : null;

  return {
    sl,
    ownerName,
    membershipId,
    zone,
    district,
    upazila,
    ownerBadge: 'Member',
  };
});
