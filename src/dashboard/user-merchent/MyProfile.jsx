import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MySwal = withReactContent(Swal);

const MyProfile = () => {
    const { user, updateUserProfile, updateUserPassword } = useAuth();
    const [profile, setProfile] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/users/${user.email}`).then(res => {
            setProfile(res.data);
        });
    }, [user.email, refresh]);

    const handleRefresh = () => setRefresh(prev => !prev);

    //   const handleUpdate = async (field) => {
    //     const { value: input } = await MySwal.fire({
    //       title: `Update ${field}`,
    //       input: field === 'password' ? 'password' : 'text',
    //       inputValue: profile[field],
    //       confirmButtonColor: '#CAEB66',
    //       cancelButtonColor: '#03373D',
    //       showCancelButton: true,
    //       inputPlaceholder: `Enter new ${field}`,
    //       confirmButtonText: 'Update'
    //     });

    //     if (!input) return;

    //     try {
    //       if (field === 'password') {
    //         await updateUserPassword(input);
    //       } else {
    //         const updatedData = { ...profile, [field]: input };
    //         await updateUserProfile({ displayName: updatedData.name, photoURL: updatedData.photoURL });
    //         await axiosSecure.post('/users', updatedData);
    //       }
    //       MySwal.fire('Updated!', `${field} updated successfully`, 'success');
    //       handleRefresh();
    //     } catch (err) {
    //       console.error(err);
    //       MySwal.fire('Error', 'Update failed', 'error');
    //     }
    //   };

    const handleUpdate = async (field) => {
        const { value: input } = await MySwal.fire({
            title: `Update ${field}`,
            input: field === 'password' ? 'password' : 'text',
            inputValue: profile[field],
            confirmButtonColor: '#CAEB66',
            cancelButtonColor: '#03373D',
            showCancelButton: true,
            inputPlaceholder: `Enter new ${field}`,
            confirmButtonText: 'Update'
        });

        if (!input) return;
        setIsUpdating(true);
        try {
            if (field === 'password') {
                await updateUserPassword(input);
            } else {
                const updatedData = { ...profile, [field]: input };

                // ✅ Only update Firebase profile if name or photoURL is changed
                if (field === 'name') {
                    await updateUserProfile({ displayName: input });
                }

                await axiosSecure.post('/users', updatedData);
            }

            MySwal.fire('Updated!', `${field} updated successfully`, 'success');
            handleRefresh();
        }
        catch (err) {
            // console.error("Update error:", err);
            console.error("Update error:", err.response?.data || err.message || err);
            MySwal.fire('Error', 'Update failed', 'error');
        }
        finally {
            setIsUpdating(false); // hide loader
        }
    };

    const handlePhotoUpload = async () => {
        const { value: file } = await MySwal.fire({
            title: 'Upload New Profile Photo',
            input: 'file',
            inputAttributes: {
                accept: 'image/*',
                'aria-label': 'Upload your profile photo'
            },
            confirmButtonColor: '#CAEB66',
            cancelButtonColor: '#03373D',
            showCancelButton: true,
            confirmButtonText: 'Upload'
        });

        if (!file) return;

        const formData = new FormData();
        formData.append('photo', file);
        setIsUpdating(true);
        try {
            const res = await axiosSecure.post('/upload-photo', formData);
            const updatedData = { ...profile, photoURL: res.data.url };
            await updateUserProfile({ displayName: updatedData.name, photoURL: updatedData.photoURL });
            await axiosSecure.post('/users', updatedData);
            MySwal.fire('Uploaded!', 'Profile photo updated', 'success');
            handleRefresh();
        }
        catch (err) {
            console.error(err);
            MySwal.fire('Error', 'Photo upload failed', 'error');
        }
        finally {
            setIsUpdating(false);
        }

    };

    return (
        <>
            {isUpdating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
                    <p className="text-xl font-semibold text-[#03373D] animate-pulse">Updating...</p>
                </div>
            )}

            <div className="max-w-xl mx-auto p-4 space-y-6">
                <h2 className="text-2xl font-bold text-[#03373D]">My Profile</h2>
                {profile && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <img src={profile.photoURL} alt="Profile" className="w-24 h-24 rounded-full object-cover border" />
                            <button
                                onClick={handlePhotoUpload}
                                className="text-sm text-[#03373D] font-bold hover:underline"
                            >
                                Change Photo
                            </button>
                        </div>

                        <ProfileRow label="Name" value={profile.name} onEdit={() => handleUpdate('name')} />
                        <ProfileRow label="Email" value={profile.email} onEdit={() => handleUpdate('email')} />
                        <ProfileRow label="Contact No" value={profile.contactNo} onEdit={() => handleUpdate('contactNo')} />
                        <ProfileRow label="Password" value="••••••••" onEdit={() => handleUpdate('password')} />
                        <ProfileRow label="Role" value={profile.role} disabled />
                    </div>
                )}
            </div>
        </>
    );
};

const ProfileRow = ({ label, value, onEdit, disabled }) => (
    <div className="flex justify-between items-center border-b pb-2">
        <div>
            <p className="text-sm text-[#606060]">{label}</p>
            <p className="text-md font-medium text-[#03373D]">{value}</p>
        </div>
        {!disabled && (
            <button
                onClick={onEdit}
                className="text-sm text-[#03373D] font-bold hover:underline"
            >
                Edit
            </button>
        )}
    </div>
);

export default MyProfile;
