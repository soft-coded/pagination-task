import React, { useEffect, useState } from "react";
import "./App.css";
import { API_URL } from "./api";
import TableItem from "./components/TableItem";

let TOTAL_ITEMS: number;

function getPageNumberList() {
	const pageNumberList = [];

	for (let i = 1; i <= Math.ceil(TOTAL_ITEMS / 10); i++) {
		pageNumberList.push(i);
	}

	return pageNumberList;
}

function App() {
	const [items, setItems] = useState<null | any[]>(null);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		async function fetchItems() {
			const res = await fetch(API_URL + `?limit=10&offset=${currentPage * 10}`); // appending offset
			const data = await res.json();
			TOTAL_ITEMS = data.count;
			setItems(data.results);
		}

		fetchItems();
	}, [currentPage]);

	return (
		<main>
			<h1 className="text-center">Pagination task</h1>
			<section className="table-container">
				{items == null ? (
					<h3>LOADING...</h3>
				) : (
					items.map(item => <TableItem {...item} key={item.id} />)
				)}
			</section>
			<div className="page-number">Page No: {currentPage + 1}</div>
			<section className="buttons">
				<button
					disabled={currentPage === 0}
					onClick={() => {
						setItems(null);
						setCurrentPage(currentPage - 1);
					}}
				>
					Prev
				</button>
				<button
					disabled={currentPage === Math.ceil(TOTAL_ITEMS / 10) - 1}
					onClick={() => {
						setItems(null);
						setCurrentPage(currentPage + 1);
					}}
				>
					Next
				</button>
			</section>
			<section className="go-to">
				{getPageNumberList().map(pageNo => (
					<button
						onClick={() => {
							setItems(null);
							setCurrentPage(pageNo - 1);
						}}
					>
						{pageNo}
					</button>
				))}
			</section>
		</main>
	);
}

export default App;
