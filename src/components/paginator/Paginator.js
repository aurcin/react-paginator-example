import React from 'react';

const Paginator = ({ pages, loadPage, current_page, total, per_page }) => {
	const renderPageNumbers = pages.map((item) => {
		let clas = item === current_page ? 'page-item active' : 'page-item';
		return (
			<li className={clas} key={item}>
				<button className='page-link' onClick={() => loadPage(item)}>
					{item}
				</button>
			</li>
		);
	});

	const renderPrevious =
		current_page > 1 ? (
			<li className='page-item'>
				<button
					className='page-link'
					aria-label='Previous'
					onClick={() => loadPage(current_page - 1)}
				>
					<span aria-hidden='true'>&laquo;</span>
				</button>
			</li>
		) : (
			''
		);

	const renderNext =
		current_page < total / per_page ? (
			<li className='page-item'>
				<button
					className='page-link'
					aria-label='Previous'
					onClick={() => loadPage(current_page + 1)}
				>
					<span aria-hidden='true'>&raquo;</span>
				</button>
			</li>
		) : (
			''
		);

	return (
		<nav aria-label='Page navigation'>
			<ul className='pagination'>
				{renderPrevious}
				{renderPageNumbers}
				{renderNext}
			</ul>
		</nav>
	);
};

export default Paginator;
