import { getDistanceFromLatLonInMi } from './utils';
import { Student, UserEntry } from './types';

const TWELFTH_FACET = '9536_Twelfth Grade';
const ELEVENTH_FACET = '9536_Eleventh Grade';
const KCD_LONG = -85.6689;
const KCD_LAT = 38.2423;

class Manager {
  private students:
    | {
        juniors: Student[];
        seniors: Student[];
      }
    | undefined = undefined;

  private cookie: string | undefined = undefined;

  /**
   * Sets the cookie for the manager
   * @param cookie the cookie to set
   */
  public setCookie(cookie: string) {
    this.cookie = cookie;
  }

  public editStudent(grade: 11 | 12, index: number, newData: Student) {
    if (this.students === undefined) {
      throw new Error('Students have not been fetched');
    }

    if (grade === 11) {
      this.students.juniors[index] = newData;
    } else {
      this.students.seniors[index] = newData;
    }
  }

  /**
   * Fetches the 11th and 2th grade students from the KCD directory
   */
  public async fetchStudents() {
    // aggregate data into junior and senior matricies
    // data for juniors
    const juniors = (await this.fetchGrade(ELEVENTH_FACET)).map((it) => ({
      name: `${it.FirstName} ${it.LastName}`,
      lat: it.PreferredAddressLat,
      long: it.PreferredAddressLng,
    }));

    // data for seniors
    const seniors = (await this.fetchGrade(TWELFTH_FACET)).map((it) => ({
      name: `${it.FirstName} ${it.LastName}`,
      lat: it.PreferredAddressLat,
      long: it.PreferredAddressLng,
    }));

    return (this.students = { juniors, seniors });
  }

  public async findOutliers() {
    if (this.students === undefined) {
      throw new Error('Students have not been fetched');
    }

    const { juniors, seniors } = this.students;

    let outliers = [];
    for (let i = 0; i < Object.keys(juniors).length; i++) {
      let student = this.students.juniors[i];
      //if long or lat is more than 20 deg from KCD, smth is very wrong
      if (
        getDistanceFromLatLonInMi(
          student['lat'],
          student['long'],
          KCD_LAT,
          KCD_LONG,
        ) > 20
      ) {
        outliers.push(student.name);
      }
      //the above code should also catch any null islanders
    }
    for (let i = 0; i < Object.keys(seniors).length; i++) {
      let student = seniors[i];
      if (
        getDistanceFromLatLonInMi(
          student['lat'],
          student['long'],
          KCD_LAT,
          KCD_LONG,
        ) > 20
      ) {
        outliers.push(student.name);
      }
    }
    return outliers;
  }

  public async calculate() {
    if (this.students === undefined) {
      throw new Error('Students have not been fetched');
    }

    const { juniors, seniors } = this.students;
    const { munkres } = await import('munkres');

    const distMatrix = juniors.map((j) => {
      return seniors.map((s) => {
        return getDistanceFromLatLonInMi(j.lat, j.long, s.lat, s.long);
      });
    });

    return munkres(distMatrix).map(([idx1, idx2]) => ({
      person1: juniors[idx1].name,
      person2: seniors[idx2].name,
      dist: getDistanceFromLatLonInMi(
        juniors[idx1].lat,
        juniors[idx1].long,
        seniors[idx2].lat,
        seniors[idx2].long,
      ),
    }));
  }

  /**
   * Requests the grade data from the KCD directory for a specific grade (facet)
   * @param facet the grade to fetch
   */
  private async fetchGrade(facet: string) {
    if (!this.cookie) {
      throw new Error('Cookie not found');
    }

    // encode and fetch
    const parsedFacet = encodeURIComponent(facet);
    return fetch(
      `https://kcd.myschoolapp.com/api/directory/directoryresultsget?directoryId=1879&searchVal=&facets=${parsedFacet}&searchAll=false`,
      {
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'accept-language': 'en-US,en;q=0.9',
          'sec-ch-ua':
            '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'wh-version': '2024.04.22.3',
          'x-requested-with': 'XMLHttpRequest',
          cookie: this.cookie,
          Referer: 'https://kcd.myschoolapp.com/app/student',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: null,
        method: 'GET',
      },
    )
      .then((res) => res.json() as Promise<UserEntry[]>)
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }
}

export const manager = new Manager();
