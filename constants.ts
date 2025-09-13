
import { User, UserRole, BloodGroup, RhFactor, DonationRequest, Donation, DonationStatus, Badge, ChatSession, BloodDriveEvent } from './types';
import { HeartIcon } from './components/icons/HeartIcon';
import { MedalIcon } from './components/icons/MedalIcon';
import { StarIcon } from './components/icons/StarIcon';

// Mock Users
export const MOCK_DONOR_USER: User = {
  id: 'donor-123',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  role: UserRole.DONOR,
  location: 'Metropolis, USA',
  bloodType: { group: BloodGroup.O, rhFactor: RhFactor.POSITIVE },
  isVerified: true,
  isAvailable: true,
  deferralReason: null,
  points: 1500,
  badges: ['lifesaver-10', 'first-donation', 'verified'],
};

export const MOCK_REQUESTER_USER: User = {
  id: 'requester-456',
  name: 'John Smith',
  email: 'john.smith@example.com',
  role: UserRole.REQUESTER,
  location: 'Gotham City, USA',
};

// Mock Donors for Search
export const MOCK_DONORS: User[] = [
    { ...MOCK_DONOR_USER },
    {
      id: 'donor-002',
      name: 'Clark Kent',
      email: 'clark.kent@example.com',
      role: UserRole.DONOR,
      location: 'Metropolis, USA',
      bloodType: { group: BloodGroup.A, rhFactor: RhFactor.NEGATIVE },
      isVerified: true,
      isAvailable: true,
      points: 800,
      badges: ['first-donation'],
    },
    {
      id: 'donor-003',
      name: 'Bruce Wayne',
      email: 'bruce.wayne@example.com',
      role: UserRole.DONOR,
      location: 'Gotham City, USA',
      bloodType: { group: BloodGroup.AB, rhFactor: RhFactor.POSITIVE },
      isVerified: false,
      isAvailable: false,
      deferralReason: 'Recent travel to a restricted area.',
      points: 250,
      badges: [],
    },
    {
      id: 'donor-004',
      name: 'Diana Prince',
      email: 'diana.prince@example.com',
      role: UserRole.DONOR,
      location: 'Themyscira, USA',
      bloodType: { group: BloodGroup.B, rhFactor: RhFactor.NEGATIVE },
      isVerified: true,
      isAvailable: true,
      points: 2500,
      badges: ['lifesaver-10', 'verified'],
    },
    {
      id: 'donor-005',
      name: 'Barry Allen',
      email: 'barry.allen@example.com',
      role: UserRole.DONOR,
      location: 'Central City, USA',
      bloodType: { group: BloodGroup.O, rhFactor: RhFactor.NEGATIVE },
      isVerified: false,
      isAvailable: true,
      points: 500,
      badges: ['first-donation'],
    },
];

// Mock Donation Requests
export const MOCK_REQUESTS: DonationRequest[] = [
    {
        id: 'req-1',
        requester: { id: 'requester-456', name: 'John Smith' },
        bloodType: { group: BloodGroup.A, rhFactor: RhFactor.POSITIVE },
        unitsRequired: 2,
        location: 'Metropolis General Hospital',
        urgency: 'Critical',
        note: 'Emergency surgery for a car accident victim. Immediate need.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
        id: 'req-2',
        requester: { id: 'requester-789', name: 'Central City Clinic' },
        bloodType: { group: BloodGroup.O, rhFactor: RhFactor.NEGATIVE },
        unitsRequired: 4,
        location: 'Central City Clinic',
        urgency: 'High',
        note: 'Universal donor blood needed for multiple patients.',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
        id: 'req-3',
        requester: { id: 'requester-101', name: 'Gotham General' },
        bloodType: { group: BloodGroup.B, rhFactor: RhFactor.POSITIVE },
        unitsRequired: 1,
        location: 'Gotham City General Hospital',
        urgency: 'Medium',
        note: 'Scheduled transfusion for a patient with a chronic condition.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
];

// Mock Blood Drive Events
export const MOCK_EVENTS: BloodDriveEvent[] = [
    {
        id: 'event-1',
        title: 'Metropolis Community Blood Drive',
        description: 'Join us at the heart of the city to save lives. Every donation counts. Snacks and refreshments will be provided!',
        location: 'Metropolis City Hall',
        date: new Date('2025-11-10T09:00:00'),
        organizer: 'Metropolis Health Department',
    },
    {
        id: 'event-2',
        title: 'Superhero Day Donation Drive',
        description: 'Be a real-life superhero! Come dressed as your favorite hero and donate blood. Special prizes for best costumes.',
        location: 'Gotham Community Center',
        date: new Date('2025-11-15T10:00:00'),
        organizer: 'Wayne Foundation',
    },
    {
        id: 'event-3',
        title: 'Central City Annual Blood Drive',
        description: 'Our biggest event of the year! Help us reach our goal of 500 units. Live music, food trucks, and a chance to make a difference.',
        location: 'Central City Park',
        date: new Date('2025-12-01T11:00:00'),
        organizer: 'Red Cross',
    },
];

// Mock Donation History (use let to allow modification for appointment scheduling)
export let MOCK_DONATION_HISTORY: Donation[] = [
    {
      id: 'hist-1',
      donorId: 'donor-123',
      date: new Date('2025-09-15'),
      location: 'Appointment with John Smith',
      bloodType: { group: BloodGroup.O, rhFactor: RhFactor.POSITIVE },
      units: 1,
      status: DonationStatus.SCHEDULED,
    },
    {
      id: 'hist-2',
      donorId: 'donor-123',
      date: new Date('2025-05-15'),
      location: 'Metropolis Blood Center',
      bloodType: { group: BloodGroup.O, rhFactor: RhFactor.POSITIVE },
      units: 1,
      status: DonationStatus.COMPLETED,
    },
    {
      id: 'hist-3',
      donorId: 'donor-123',
      date: new Date('2025-01-10'),
      location: 'Metropolis Blood Center',
      bloodType: { group: BloodGroup.O, rhFactor: RhFactor.POSITIVE },
      units: 1,
      status: DonationStatus.COMPLETED,
    },
    {
      id: 'hist-4',
      donorId: 'donor-123',
      date: new Date('2024-09-20'),
      location: 'Red Cross Drive',
      bloodType: { group: BloodGroup.O, rhFactor: RhFactor.POSITIVE },
      units: 1,
      status: DonationStatus.COMPLETED,
    },
];


// Mock Badges
export const MOCK_BADGES: Badge[] = [
    {
        id: 'first-donation',
        name: 'First Step',
        description: 'Congratulations on making your first donation!',
        icon: HeartIcon,
    },
    {
        id: 'lifesaver-10',
        name: 'Life Saver (x10)',
        description: 'You have donated 10 times. A true hero!',
        icon: MedalIcon,
    },
    {
        id: 'verified',
        name: 'Verified Donor',
        description: 'Your identity and blood type have been verified.',
        icon: StarIcon,
    }
];

// Mock Chat Sessions (use let to allow modification)
export let MOCK_CHAT_SESSIONS: ChatSession[] = [
    {
        id: 'chat-1',
        donationId: 'hist-1',
        participantIds: ['donor-123', 'requester-456'],
        messages: [
            { id: 'msg-1', senderId: 'requester-456', text: "Hi Jane, thanks for scheduling a donation! Just wanted to confirm the time and location.", timestamp: new Date(Date.now() - 10 * 60 * 1000) },
            { id: 'msg-2', senderId: 'donor-123', text: "Hi John! Yes, looks good. See you then!", timestamp: new Date(Date.now() - 5 * 60 * 1000) },
        ]
    }
];