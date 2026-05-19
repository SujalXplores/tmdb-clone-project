import { useState, type FunctionComponent } from "react";
import { Box } from "@mui/material";
import Typography from "./Typography";
import type { CountryOptionProps } from "@/types/filters";

const CountryFlag: FunctionComponent<{
	flagUrl: string;
	countryName: string;
	size: number;
}> = ({ flagUrl, countryName, size }) => {
	const [hasError, setHasError] = useState(false);

	if (hasError) {
		return <Box sx={{ color: "#888", width: size, height: size }} />;
	}

	return (
		<img
			loading='lazy'
			width={size}
			srcSet={`https://www.themoviedb.org${flagUrl}`}
			src={`https://www.themoviedb.org${flagUrl}`}
			alt={`${countryName} flag`}
			onError={() => setHasError(true)}
		/>
	);
};

const CountryOption: FunctionComponent<CountryOptionProps> = ({
	flagUrl,
	nativeName,
	isSelectedDisplay,
}) => (
	<Box
		sx={{
			fontSize: "0.875rem",
			display: "flex",
			alignItems: "center",
			gap: 1,
			...(isSelectedDisplay && {
				overflow: "hidden",
				whiteSpace: "nowrap",
				textOverflow: "ellipsis",
			}),
			...(!isSelectedDisplay && {
				wordBreak: "break-word",
				whiteSpace: "normal",
				lineHeight: "1.4",
			}),
		}}
	>
		<CountryFlag
			flagUrl={flagUrl || ""}
			countryName={nativeName || ""}
			size={isSelectedDisplay ? 24 : 20}
		/>
		<Typography sx={{ fontSize: "0.9rem", color: "theme.palette.text.primary" }}>
			{nativeName}
		</Typography>
	</Box>
);

export default CountryOption;
