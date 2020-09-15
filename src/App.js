import React, { useState, useEffect } from 'react';

import service from './services/Users';
import User from './components/user';

const App = () => {
	const [users, setUsers] = useState({
		data: [],
		total: null,
		per_page: null,
		current_page: 1,
	});

	const { current_page, data } = users;

	useEffect(() => {
		service.getUsers(current_page).then(onLoad).catch(onError);
	}, [current_page]);

	const onLoad = (response) => {
		setUsers({
			data: response.data,
			total: response.total,
			per_page: response.per_page,
			current_page: response.page,
		});
	};

	const onError = (error) => {
		alert('Failed to fetch user data');
		setUsers({
			data: [],
			total: null,
			per_page: null,
			current_page: 1,
		});
	};

	const renderUsers = () => {
		return data.map((item) => <User key={item.id} user={item} />);
	};

	return (
		<div>
			<h1>Users</h1>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>First Name</th>
						<th>Last Name</th>
					</tr>
				</thead>
				<tbody>{renderUsers()}</tbody>
			</table>
		</div>
	);
};

export default App;
