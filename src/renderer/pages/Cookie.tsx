import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { seniorsAtom, juniorsAtom } from '../state';
import { Student } from '../../lib/types';
import { useNavigate } from 'react-router-dom';

export function CookiePage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setSeniors = useSetAtom(seniorsAtom);
  const setJuniors = useSetAtom(juniorsAtom);

  return (
    <form
      className="flex flex-row gap-2"
      onSubmit={(e) => {
        e.preventDefault();

        const cookieEl = e.currentTarget.querySelector(
          '#cookie',
        ) as HTMLInputElement;
        const cookie = cookieEl.value;

        console.log(cookie);

        // use ipcRenderer to send the cookie to the main process
        window.electron.ipcRenderer.sendMessage('cookie', cookie);
        setLoading(true);
        setError('');

        // wait for the main process to send a message back
        window.electron.ipcRenderer.once('cookie', (rawData) => {
          const data = rawData as
            | { students: { seniors: Student[]; juniors: Student[] } }
            | { error: string };

          if ('error' in data) {
            setLoading(false);
            setError(data.error);
            return;
          }

          setSeniors(data.students.seniors);
          setJuniors(data.students.juniors);
          setLoading(false);
          navigate('/edit-users');
        });
      }}
    >
      {error && <p className="text-red-500">Error: {error}</p>}
      <input type="text" placeholder="Put ur cookie here" id="cookie" />
      <button disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
    </form>
  );
}
