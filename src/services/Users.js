class UserService {
	_apiBase = 'https://reqres.in/api/users';

	async getUsers(page = 1) {
		const response = await fetch(`${this._apiBase}?page=${page}`);
		if (!response.ok) {
			throw new Error(
				`Cloud not fetch ${this._apiBase}, recieved ${response.status}`,
			);
		}
		return await response.json();
	}
}

export default new UserService();
