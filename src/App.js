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

	const { current_page, data, total, per_page } = users;

	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(total / per_page); i++) {
		pageNumbers.push(i);
	}

	useEffect(() => {
		loadPage(current_page);
		//eslint-disable-next-line
	}, [current_page]);

	const loadPage = (page) => {
		service.getUsers(page).then(onLoad).catch(onError);
	};

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
		<div className='container'>
			<div className='row'>
				<div className='col-md  align-self-center mt-2 mb-2'>
					<h1>User data</h1>
				</div>
			</div>

			<div className='row'>
				<div className='col-6 align-self-center'>
					<table className='table'>
						<thead className='thead-light'>
							<tr>
								<th>ID</th>
								<th>First Name</th>
								<th>Last Name</th>
							</tr>
						</thead>
						<tbody>{renderUsers()}</tbody>
					</table>
				</div>
			</div>

			<div className='row mt-2'>
				<div className='col-6 align-self-center'>
					<nav aria-label='Page navigation'>
						<ul className='pagination'>
							<li className='page-item'>
								<button className='page-link' href='#' aria-label='Previous'>
									<span aria-hidden='true'>&laquo;</span>
								</button>
							</li>
							<li className='page-item'>
								<button className='page-link' onClick={() => loadPage(1)}>
									1
								</button>
							</li>
							<li className='page-item'>
								<button className='page-link' onClick={() => loadPage(2)}>
									2
								</button>
							</li>
							<li className='page-item'>
								<button className='page-link' onClick={() => loadPage(3)}>
									3
								</button>
							</li>
							<li className='page-item'>
								<button className='page-link' href='#' aria-label='Next'>
									<span aria-hidden='true'>&raquo;</span>
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default App;
