import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css'; // Import CSS file for styling

function App() {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');

    // Fetch student data from backend when component mounts
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/students');
                // Sort students alphabetically by name
                const sortedStudents = res.data.sort((a, b) => a.name.localeCompare(b.name));
                setStudents(sortedStudents);
            } catch (err) {
                console.error('Error fetching students:', err);
            }
        };
        fetchStudents();
    }, []);

    const handleAddStudent = async () => {
        const newStudent = {
            name: name,
            rollNo: rollNo,
            city: city,
            phone: phone
        };

        try {
            const res = await axios.post('http://localhost:5000/api/students', newStudent);
            setStudents([...students, res.data]);
            setName('');
            setRollNo('');
            setCity('');
            setPhone('');
        } catch (err) {
            console.error('Error adding student:', err);
        }
    };

    const toggleAttendance = async (index) => {
        const updatedStudents = [...students];
        updatedStudents[index].attendance =
            updatedStudents[index].attendance === 'Present' ? 'Absent' : 'Present';
        console.log(updatedStudents[index].attendance); // Add this line to check the attendance value
        setStudents(updatedStudents);

        try {
            // Update the attendance status in the backend database
            await axios.put(`http://localhost:5000/api/students/${updatedStudents[index]._id}`, {
                attendance: updatedStudents[index].attendance
            });
        } catch (err) {
            console.error('Error updating attendance:', err);
        }
    };

    return (
        <div className="App">
            <h1>Attendance Management System</h1>
            <div className="form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '300px', padding: '10px' }} // Increase width and padding
                />
                <input
                    type="text"
                    placeholder="Roll No"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    style={{ width: '150px', padding: '10px' }} // Increase width and padding
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: '200px', padding: '10px' }} // Increase width and padding
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '200px', padding: '10px' }} // Increase width and padding
                />
                <button onClick={handleAddStudent}>Add Student</button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>City</th>
                            <th>Phone</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.name}</td>
                                <td>{student.rollNo}</td>
                                <td>{student.city}</td>
                                <td>{student.phone}</td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button
                                            className={student.attendance === 'Present' ? 'present' : 'absent'}
                                            onClick={() => toggleAttendance(index)}
                                            style={{ width: '40px', marginRight: '5px' }}
                                        >
                                            P
                                        </button>
                                        <button
                                            className={student.attendance === 'Absent' ? 'present' : 'absent'}
                                            onClick={() => toggleAttendance(index)}
                                            style={{ width: '40px', marginLeft: '5px' }}
                                        >
                                            
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <center><button  style={{ width: '200px', padding: '10px' }}><Link to='/'>Logout</Link></button></center>
            
            
        </div>
    );
}

export default App;
