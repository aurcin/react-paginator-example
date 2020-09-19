import React, { useState, useEffect } from 'react';

import service from './services/Users';
import User from './components/user';
import Paginator from './components/paginator';

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

  const loadPage = page => {
    service.getUsers(page).then(onLoad).catch(onError);
  };

  const onLoad = response => {
    setUsers({
      data: response.data,
      total: response.total,
      per_page: response.per_page,
      current_page: response.page,
    });
  };

  const onError = error => {
    alert('Failed to fetch user data');
    setUsers({
      data: [],
      total: null,
      per_page: null,
      current_page: 1,
    });
  };

  const renderUsers = () => {
    return data.map(item => <User key={item.id} user={item} />);
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
          <Paginator
            pages={pageNumbers}
            loadPage={loadPage}
            current_page={current_page}
            total={total}
            per_page={per_page}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
