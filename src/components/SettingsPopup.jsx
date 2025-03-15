import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { updatePassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const SettingsPopup = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [userDocId, setUserDocId] = useState(null);
    const [isGoogleUser, setIsGoogleUser] = useState(false);

    useEffect(() => {
        const fetchUserData = async (user) => {
            if (!user) return;

            setIsGoogleUser(user.providerData.some(provider => provider.providerId === 'google.com'));

            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const data = userDoc.data();
                setUserDocId(userDoc.id);
                setName(data.name || '');
                setEmail(user.email || '');
            } else {
                console.error('No user document found for UID:', user.uid);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            fetchUserData(user);
        });

        return () => unsubscribe();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!auth.currentUser || !userDocId) return;
    
        setLoading(true);
        try {
            const userDocRef = doc(db, 'users', userDocId);
            await updateDoc(userDocRef, { name });
    
            if (newPassword) {
                if (isGoogleUser) {
                    await handleResetPassword();
                } else {
                    const currentPassword = prompt("Please enter your current password to confirm changes:");
                    if (!currentPassword) {
                        throw new Error("Password update canceled. Re-authentication required.");
                    }
    
                    const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
                    await reauthenticateWithCredential(auth.currentUser, credential);
                    await updatePassword(auth.currentUser, newPassword);
                    alert('Password updated successfully!');
                }
            }
    
            alert('Profile updated successfully!');
            onClose();
        } catch (err) {
            if (err.code === 'auth/wrong-password') {
                alert("Incorrect password. Please try again.");
            } else {
                alert('Error updating profile: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleResetPassword = async () => {
        const email = auth.currentUser?.email;
        if (!email) {
            alert("No email found for the current user.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent! Check your inbox.");
        } catch (error) {
            alert("Error sending reset email: " + error.message);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center text-start backdrop-blur-sm bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[600px]">
                <div className='flex justify-between items-center mb-5'>
                    <h2 className="text-xl font-semibold text-black">Account Settings</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            className="border p-2 rounded w-full bg-gray-200 cursor-not-allowed"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border p-2 rounded w-full"
                            placeholder={isGoogleUser ? "Google users must reset via email" : "Enter new password"}
                            disabled={isGoogleUser}
                        />
                        <p className="text-xs text-gray-500">{isGoogleUser ? "You must reset your password via email." : "Leave blank to keep current password"}</p>
                    </div>
                    {isGoogleUser && (
                        <button onClick={handleResetPassword} type="button" className="bg-red-500 text-white p-2 rounded">
                            Reset Password via Email
                        </button>
                    )}
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SettingsPopup;