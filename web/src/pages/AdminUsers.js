import { useState, useEffect } from "react";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users from the backend when the component is mounted
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3001/users"); // Ensure the URL starts with http:// or https://
            if (!response.ok) throw new Error("Failed to fetch users");
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleRoleChange = (id, newRole) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === id ? { ...user, role: newRole } : user))
        );
    };

    const handleSave = async (id) => {
        const user = users.find((u) => u.id === id);
        try {
            const response = await fetch(`http://localhost:3001/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role: user.role }), // Only sending the role change
            });
            if (!response.ok) throw new Error("Failed to save changes");
            setEditingUserId(null);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const response = await fetch(`http://localhost:3001/users/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete user");
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (err) {
            alert(err.message);
        }
    };


    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="pt-5 mt-5 d-flex flex-column min-vh-100">
            <section className="page-section flex-grow-1 py-5">
                <div className="container">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">Vartotojai</h3>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-striped table-hover mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Save</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <select
                                                    value={user.role}
                                                    onChange={(e) =>
                                                        handleRoleChange(user.id, e.target.value)
                                                    }
                                                    className="form-select form-select-sm"
                                                    style={{ width: "150px" }}
                                                    disabled={editingUserId !== user.id}
                                                >
                                                    <option value="Administratorius">Administratorius</option>
                                                    <option value="Vartotojas">Vartotojas</option>
                                                    <option value="Narys">Narys</option>
                                                </select>
                                            </td>
                                            <td>
                                                {editingUserId === user.id ? (
                                                    <button
                                                        type="button"
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => handleSave(user.id)}
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={() => setEditingUserId(user.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AdminUsers;
