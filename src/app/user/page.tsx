// 'use client';
//
// import { useState } from 'react';
//
// export default function ProfileClient() {
//     const { user, error, isLoading } = useUser();
//     const [editMode, setEditMode] = useState(false);
//     const [newName, setNewName] = useState(user?.nickname);
//     const [newEmail, setNewEmail] = useState(user?.email);
//
//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>{error.message}</div>;
//
//     const handleEdit = async () => {
//         setEditMode(false)
//         // Implement functionality to update user data
//         // This might be an API call to your server
//     };
//
//     return (
//         user && (
//             <div>
//                 {editMode ? (
//                     <>
//                         <input
//                             type="text"
//                             placeholder="New name"
//                             value={newName}
//                             onChange={(e) => setNewName(e.target.value)}
//                         />
//                         <input
//                             type="text"
//                             placeholder="New email"
//                             value={newEmail}
//                             onChange={(e) => setNewEmail(e.target.value)}
//                         />
//                         <button onClick={handleEdit}>Save Changes</button>
//                         <button onClick={() => setEditMode(false)}>Cancel</button>
//                     </>
//                 ) : (
//                     <>
//                         <img src={user.picture} alt={user.name} />
//                         <h2>{user.nickname}</h2>
//                         <p>{user.email}</p>
//                         <button onClick={() => setEditMode(true)}>Edit Profile</button>
//                         <a href="/api/auth/logout">Logout</a>
//                     </>
//                 )}
//             </div>
//         )
//     );
// }