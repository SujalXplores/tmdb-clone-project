import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import type { CustomDatePickerProps } from "@/types/common";
import { CalendarIcon } from "./icons/CalendarIcon";
import { popperSx, textFieldSx } from "@/styles/datepicker.styles";

const DatePicker = ({
	error,
	helperText,
	textFieldProps,
	sx,
	className,
	...props
}: CustomDatePickerProps) => {
	return (
		<MuiDatePicker
			{...props}
			sx={{ width: "100%", ...sx }}
			className={className}
			slots={{ openPickerIcon: CalendarIcon }}
			slotProps={{
				textField: {
					size: "small",
					fullWidth: true,
					error,
					helperText,
					...textFieldProps,
					sx: { ...textFieldSx, ...textFieldProps?.sx },
				},
				actionBar: { actions: ["today"] },
				popper: { sx: popperSx },
			}}
		/>
	);
};

export default DatePicker;