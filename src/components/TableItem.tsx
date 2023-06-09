type TableItemProps = {
	id: number;
	store_name: string;
	item_description: string;
};

export default function TableItem(props: TableItemProps) {
	return (
		<div className="table-item">
			<h4>{props.id}</h4>
			<h4>{props.store_name}</h4>
			<h4>{props.item_description}</h4>
		</div>
	);
}
