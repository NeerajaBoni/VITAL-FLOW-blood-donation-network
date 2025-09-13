import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { MOCK_DONATION_HISTORY, MOCK_CHAT_SESSIONS } from '../constants';
import { DonationStatus, ChatSession } from '../types';
import Button from '../components/common/Button';
import ChatModal from '../components/ChatModal';

const DonationHistoryPage: React.FC = () => {
    const { user } = useAuth();
    const [isChatOpen, setChatOpen] = useState(false);
    const [activeChat, setActiveChat] = useState<ChatSession | null>(null);
    const [chatError, setChatError] = useState<string | null>(null);

    const userHistory = MOCK_DONATION_HISTORY.filter(d => d.donorId === user?.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const handleChatClick = (donationId: string) => {
        const chatSession = MOCK_CHAT_SESSIONS.find(c => c.donationId === donationId);
        if (chatSession && user) {
            setActiveChat(chatSession);
            setChatOpen(true);
            setChatError(null);
        } else {
            alert("No chat available for this appointment.");
        }
    };

    const handleSendMessage = async (text: string) => {
        if (!activeChat || !user) return;
        setChatError(null);
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.5) resolve('Success');
                    else reject(new Error('Failed to send message.'));
                }, 500);
            });
            const newMessage = { id: `msg-${Date.now()}`, senderId: user.id, text, timestamp: new Date() };
            const updatedChat = { ...activeChat, messages: [...activeChat.messages, newMessage] };
            setActiveChat(updatedChat);
            const chatIndex = MOCK_CHAT_SESSIONS.findIndex(c => c.id === activeChat.id);
            if (chatIndex > -1) MOCK_CHAT_SESSIONS[chatIndex] = updatedChat;
        } catch (error) {
            setChatError("Could not send message. Please try again.");
        }
    };
    
    const StatusBadge: React.FC<{ status: DonationStatus }> = ({ status }) => {
        const statusClasses = {
            [DonationStatus.COMPLETED]: 'bg-green-100 text-green-800',
            [DonationStatus.SCHEDULED]: 'bg-blue-100 text-blue-800',
            [DonationStatus.CANCELLED]: 'bg-red-100 text-red-800',
        };
        return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusClasses[status]}`}>{status}</span>;
    };
    
    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-800">Donation History</h1>
                <p className="text-gray-600 mt-1">A record of your life-saving contributions.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location / Recipient</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {userHistory.map(donation => (
                            <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {new Date(donation.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{donation.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {donation.units} Unit ({donation.bloodType.group}{donation.bloodType.rhFactor})
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={donation.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {donation.status === DonationStatus.SCHEDULED && (
                                        <div className="flex items-center justify-end space-x-2">
                                            <Button variant="secondary" size="sm" onClick={() => handleChatClick(donation.id)}>Chat</Button>
                                            <Button variant="ghost" size="sm">Cancel</Button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                         {userHistory.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                    You have no donation history yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isChatOpen && activeChat && user && (
                <ChatModal 
                    isOpen={isChatOpen}
                    onClose={() => setChatOpen(false)}
                    chatSession={activeChat}
                    currentUser={user}
                    onSendMessage={handleSendMessage}
                    error={chatError}
                />
            )}
        </div>
    );
};

export default DonationHistoryPage;