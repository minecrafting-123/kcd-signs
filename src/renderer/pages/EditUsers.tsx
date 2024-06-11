import { useAtom } from 'jotai';
import { seniorsAtom, juniorsAtom } from '../state';

export function EditUsers() {
  return (
    <div>
      <h1>Edit Users</h1>
      {/* three columns */}
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <EditGrade grade="senior" />
        </div>
        <div style={{ flex: 1 }}>
          <EditGrade grade="junior" />
        </div>
        <div style={{ flex: 1 }}>
          <div>
            <h2>Map</h2>
            <p>Map goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditGrade({ grade }: { grade: 'senior' | 'junior' }) {
  const [users, setUsers] = useAtom(
    grade === 'senior' ? seniorsAtom : juniorsAtom,
  );

  // table with header `student name`, `lat`, `long`
  return (
    <div>
      <h2>{grade === 'senior' ? 'Seniors' : 'Juniors'}</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.lat}</td>
              <td>{user.long}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
