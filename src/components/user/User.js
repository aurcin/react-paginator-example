import React from 'react';

const User = ({ user: { id, first_name, last_name } }) => {
	return (
		<tr>
			<td>{id}</td>
			<td>{first_name}</td>
			<td>{last_name}</td>
		</tr>
	);
};

export default User;
