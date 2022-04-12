import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function BreedDropdown({ breedSelected }) {
	return (
		<Dropdown>
			<Dropdown.Toggle variant="primary" id="dropdown-basic">
				Please select breed
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item onSelect={() => breedSelected("men")}>Retriever</Dropdown.Item>
				<Dropdown.Item onSelect={() => breedSelected("women")}>Westie</Dropdown.Item>
				<Dropdown.Item onSelect={() => breedSelected("women")}>Dalmation</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}
