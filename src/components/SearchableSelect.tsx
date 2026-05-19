import { useMemo, useRef, useState, type ReactNode } from "react";
import {
	Box,
	InputAdornment,
	ListSubheader,
	MenuItem,
	Select,
	type SelectProps,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import TextField from "./TextField";
import {
	MENU_PAPER_PROPS,
	SEARCH_FIELD_STYLES,
	SELECT_STYLES,
} from "../constants/filterConstants";

export interface SearchableSelectProps<T> {
	options: T[];
	value: string | null | undefined;
	getOptionKey: (option: T) => string;
	getSearchFields: (option: T) => Array<string | undefined>;
	renderOption: (option: T, isSelectedDisplay: boolean) => ReactNode;
	onSelect: (option: T) => void;
	paperProps?: SelectProps["MenuProps"] extends infer M
		? M extends { PaperProps?: infer P }
			? P
			: never
		: never;
	selectSx?: SelectProps["sx"];
}

const SearchableSelect = <T,>({
	options,
	value,
	getOptionKey,
	getSearchFields,
	renderOption,
	onSelect,
	paperProps,
	selectSx,
}: SearchableSelectProps<T>) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const searchFieldRef = useRef<HTMLInputElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const activeSelection = useMemo(  
		() => options.find((o) => getOptionKey(o) === value),  
		[options, value, getOptionKey],  
	);
	
	const filteredOptions = useMemo(() => {
		const cleanSearch = searchTerm.toLowerCase().trim();
		if (!cleanSearch) return options;
		return options.filter((opt) =>
			getSearchFields(opt).some((field) =>
				field?.toLowerCase().includes(cleanSearch),
			),
		);
	}, [searchTerm, options, getSearchFields]);

	const handleMenuOpened = () => {
		searchFieldRef.current?.focus();
		if (scrollContainerRef.current) {
			const selectedItem =
				scrollContainerRef.current.querySelector(".Mui-selected");
			if (selectedItem) {
				selectedItem.scrollIntoView({ block: "nearest" });
			}
		}
	};

	return (
		<Select
			fullWidth
			displayEmpty
			open={isOpen}
			value={activeSelection ? getOptionKey(activeSelection) : ""}
			onOpen={() => {
				setSearchTerm("");
				setIsOpen(true);
			}}
			onClose={() => setIsOpen(false)}
			renderValue={() =>
				activeSelection ? renderOption(activeSelection, true) : null
			}
			MenuProps={{
				autoFocus: false,
				PaperProps: paperProps ?? MENU_PAPER_PROPS,
				TransitionProps: { onEntered: handleMenuOpened },
				anchorOrigin: { vertical: "bottom", horizontal: "left" },
				transformOrigin: { vertical: "top", horizontal: "left" },
			}}
			IconComponent={() => (
				<Box
					onClick={(e) => {
						e.stopPropagation();
						setIsOpen((prev) => !prev);
					}}
					sx={{
						padding: "0.375rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						cursor: "pointer",
					}}
				>
					<svg
						viewBox='0 0 512 512'
						focusable='false'
						xmlns='http://www.w3.org/2000/svg'
						fill='#212529'
						width={"1rem"}
						height={"1rem"}
					>
						<path d='M256 352 128 160h256z'></path>
					</svg>
				</Box>
			)}
			sx={selectSx ?? SELECT_STYLES}
		>
			<ListSubheader
				sx={{
					p: "0.75rem",
					backgroundColor: "white",
					zIndex: 10,
					position: "sticky",
					top: 0,
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<TextField
					size='small'
					fullWidth
					inputRef={searchFieldRef}
					placeholder='Filter'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position='start'>
									<Search fontSize='small' />
								</InputAdornment>
							),
						},
					}}
					sx={SEARCH_FIELD_STYLES}
				/>
			</ListSubheader>

			<Box
				ref={scrollContainerRef}
				sx={{ overflowY: "auto", overflowX: "hidden", flex: 1 }}
			>
				{filteredOptions.length > 0 ? (
					filteredOptions.map((option) => {
						const key = getOptionKey(option);
						const isSelected =
							!!activeSelection && key === getOptionKey(activeSelection);
						return (
							<MenuItem
								key={key || "none"}
								value={key || ""}
								selected={isSelected}
								onClick={() => onSelect(option)}
								sx={{
									py: 1,
									"&.Mui-selected": {
										backgroundColor: "#01b3e4 !important",
										color: "#fff",
										"&:hover": { backgroundColor: "#032541 !important" },
									},
								}}
							>
								{renderOption(option, false)}
							</MenuItem>
						);
					})
				) : (
					<MenuItem disabled sx={{ justifyContent: "center", py: 4 }}>
						No Data Found.
					</MenuItem>
				)}
			</Box>
		</Select>
	);
};

export default SearchableSelect;
