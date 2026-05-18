import type { FunctionComponent } from "react";
import Typography from "./Typography";
import type { SxProps, Theme } from "@mui/material";

const FilterSectionTitle: FunctionComponent<{ title: string; sx?: SxProps<Theme> }> = ({ title, sx }) => {
	return (
		<Typography
			fontWeight={300}
			sx={{
				lineHeight: "16px",
				color: "#000",
				display: "inline-flex",
				alignItems: "center",
				marginBottom: "10px",
				width: "100%",
				...(sx as object),
			}}
		>
            {title}
		</Typography>
	);
};

export default FilterSectionTitle;
