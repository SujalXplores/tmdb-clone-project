import {
	AccordionDetails as MuiAccordionDetails,
	type AccordionDetailsProps,
} from "@mui/material";

const FilterAccordionDetails = (props: AccordionDetailsProps) => {
	return (
		<MuiAccordionDetails
			{...props}
			sx={{
				padding: "14px 16px 16px",
				position: "relative",
				borderBottom: "1px solid `#e5e7eb`",
				borderRadius: "8px 8px 0 0",
				...(props?.sx as object),
			}}
		/>
	);
};

export default FilterAccordionDetails;
