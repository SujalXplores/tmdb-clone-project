import { Autocomplete as MuiAutocomplete } from "@mui/material";
import TextField from "./TextField";
import Typography from "./Typography";
import type { AppAutocompleteProps } from "@/types/common";
import { chipSx, clearIndicatorSx, getRootSx, listboxSx, paperSx, popperSx, popupIndicatorSx, textFieldSx } from "@/styles/autocomplete.styles";
import { ChevronIcon, CloseIcon } from "./icons/AutoCompleteIcons";

const Autocomplete = <
	T,
	Multiple extends boolean | undefined = false,
	DisableClearable extends boolean | undefined = false,
	FreeSolo extends boolean | undefined = false,
>({
	label,
	placeholder,
	error,
	helperText,
	textFieldProps,
	sx,
	className,
	isSelectOnly = true,
	...props
}: AppAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & {
	isSelectOnly?: boolean;
}) => {
	return (
		<MuiAutocomplete
			className={className}
			{...props}
			slotProps={{
				config: { readOnly: isSelectOnly },
				popper: { sx: popperSx },
				listbox: { sx: listboxSx },
				chip: { sx: chipSx },
				clearIndicator: { disableRipple: true, sx: clearIndicatorSx },
				paper: { sx: paperSx },
				popupIndicator: { disableRipple: true, sx: popupIndicatorSx },
			}}
			sx={{ ...sx, ...getRootSx(isSelectOnly) }}
			popupIcon={props.popupIcon || <ChevronIcon />}
			clearIcon={props.clearIcon || <CloseIcon />}
			noOptionsText={
				props.noOptionsText || (
					<Typography fontWeight={100} sx={{ color: "#565e64" }}>
						No Data Found.
					</Typography>
				)
			}
			renderInput={(params) => (
				<TextField
					{...params}
					{...textFieldProps}
					label={label}
					placeholder={placeholder}
					error={error}
					helperText={helperText}
					size='small'
					slotProps={{
						htmlInput: {
							...params.inputProps,
							readOnly: isSelectOnly,
						},
					}}
					sx={{ ...textFieldSx, ...textFieldProps?.sx }}
				/>
			)}
		/>
	);
};

export default Autocomplete;