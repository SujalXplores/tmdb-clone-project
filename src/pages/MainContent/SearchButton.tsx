import type { FunctionComponent } from "react";
import type { SxProps, Theme } from "@mui/material";
import Button from "@/components/Button";

interface SearchButtonProps {
	onClick: () => void;
	disabled?: boolean;
	sx: SxProps<Theme>;
}

const SearchButton: FunctionComponent<SearchButtonProps> = ({
	onClick,
	disabled,
	sx,
}) => (
	<Button sx={sx} onClick={onClick} disabled={disabled}>
		Search
	</Button>
);

export default SearchButton;
