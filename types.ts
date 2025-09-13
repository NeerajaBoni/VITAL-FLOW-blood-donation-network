import React from 'react';

// Enum for user roles
export enum UserRole {
  DONOR = 'donor',
  REQUESTER = 'requester',
}

// Enums for blood types
export enum BloodGroup {
  A = 'A',
  B = 'B',
  AB = 'AB',
  O = 'O',
}

export enum RhFactor {
  POSITIVE = '+',
  NEGATIVE = '-',
}

export interface BloodType {
  group: BloodGroup;
  rhFactor: RhFactor;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location: string;
  bloodType?: BloodType; // Optional for requesters
  isVerified?: boolean;
  isAvailable?: boolean; // For donors
  deferralReason?: string | null; // For donors
  points?: number; // For donors
  badges?: string[]; // For donors, array of badge IDs
}

// Donation request interface
export interface DonationRequest {
  id: string;
  requester: Pick<User, 'id' | 'name'>;
  bloodType: BloodType;
  unitsRequired: number;
  location: string;
  urgency: 'Critical' | 'High' | 'Medium' | 'Low';
  note: string;
  createdAt: Date;
}

// Blood drive event interface
export interface BloodDriveEvent {
    id: string;
    title: string;
    description: string;
    location: string;
    date: Date;
    organizer: string;
}

// Donation history entry
export enum DonationStatus {
    COMPLETED = 'Completed',
    SCHEDULED = 'Scheduled',
    CANCELLED = 'Cancelled',
}

export interface Donation {
    id: string;
    donorId: string; // To link back to the user
    date: Date;
    location: string;
    bloodType: BloodType;
    units: number;
    status: DonationStatus;
}

// Badge interface
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// Chat interfaces
export interface ChatMessage {
    id: string;
    senderId: string;
    text: string;
    timestamp: Date;
}

export interface ChatSession {
    id: string;
    donationId: string;
    participantIds: [string, string];
    messages: ChatMessage[];
}
