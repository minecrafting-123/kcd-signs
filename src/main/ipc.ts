import { ipcMain } from 'electron';
import { manager } from '../lib';

ipcMain.on('cookie', (event, cookie: string) => {
  manager.setCookie(cookie);
  manager
    .fetchStudents()
    .then((students) =>
      event.reply('cookie', {
        students,
      }),
    )
    .catch((err) =>
      event.reply('cookie', {
        error: err.message,
      }),
    );
});
