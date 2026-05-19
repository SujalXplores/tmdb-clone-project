import type { FunctionComponent } from "react";
import { Box, Chip } from "@mui/material";

export interface ToggleChipOption {
	id: string;
	label: string;
}

interface ToggleChipGroupProps {
	options: ToggleChipOption[];
	value: string | null | undefined;
	delimiter?: string;
	onChange: (newValue: string | null) => void;
}

const ToggleChipGroup: FunctionComponent<ToggleChipGroupProps> = ({
	options,
	value,
	delimiter = "|",
	onChange,
}) => {
	const currentArray = value ? value.split(delimiter) : [];

	const handleToggle = (id: string) => {
		const isSelected = currentArray.includes(id);
		const newArray = isSelected
			? currentArray.filter((item) => item !== id)
			: [...currentArray, id];

		onChange(newArray.length > 0 ? newArray.join(delimiter) : null);
	};

	return (
		<Box mt={"-8px"}>
			{options.map((option) => {
				const isSelected = currentArray.includes(option.id);

				return (
					<Chip
						key={option.id}
						label={option.label}
						variant={isSelected ? "filled" : "outlined"}
						onClick={() => handleToggle(option.id)}
						sx={{
							cursor: "pointer",
							backgroundColor: isSelected ? "#01b4e4" : "",
							border: "1px solid",
							borderColor: isSelected ? "#01b4e4" : "#9e9e9e",
							color: isSelected ? "white" : "#000",
							marginRight: "8px",
							marginTop: "8px",
							fontSize: "0.9rem",
							fontWeight: 400,
							height: "100%",
							padding: "4px 12px",
							borderRadius: "14px",
							display: "inline-flex",
							"&:hover": {
								backgroundColor: "#01b4e4 !important",
								textDecoration: "underline",
								color: "#fff",
								borderColor: "#01b4e4",
								textUnderlineOffset: "3px",
							},
							"& .MuiChip-label": {
								padding: "0",
							},
						}}
					/>
				);
			})}
		</Box>
	);
};

export default ToggleChipGroup;
