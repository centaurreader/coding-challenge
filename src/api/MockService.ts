import mockdata from './spa_mock_data.json';

interface User {
  id: number,
  username: string,
  password: string
}

export interface AuthResponse {
  token: string,
  user: User,
}

export interface Log {
  issue_id: number,
  division: string,
  time: string,
  event: string,
  user: string
}

class MockService {
  static login(username: string, password: string): Promise<AuthResponse> {
    const { users } = mockdata;
    const userMatch = users.find((user) => user.username === username);
    return userMatch && userMatch.password === password
      ? Promise.resolve({ token: Math.random().toString(), user: userMatch })
      : Promise.reject(new Error('Username or password is incorrect'));
  }

  static getAuditData(): Promise<Log[]> {
    return Promise.resolve(mockdata.log);
  }
}

export default MockService;
