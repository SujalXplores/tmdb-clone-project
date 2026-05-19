import Checkbox from "@/components/Checkbox";
import FormControlLabel from "@/components/FormControlLabel";
import {
	Box,
} from "@mui/material";
import Typography from "@/components/Typography";
import DatePicker from "@/components/Datepicker";
import {
	type Dispatch,
	type FunctionComponent,
} from "react";
import type {
	CountriesType,
	DiscoverFiltersType,
} from "@/types/filters";
import type { Action } from "@/types/common";
import dayjs, { Dayjs } from "dayjs";
import {
	SELECT_STYLES,
} from "@/constants/filterConstants";
import FilterSectionTitle from "@/components/FilterSectionTitle";
import FilterAccordionDetails from "@/components/FilterAccordionDetails";
import SearchableSelect from "@/components/SearchableSelect";
import CountryOption from "@/components/CountryOption";
import { COUNTRY_OPTIONS } from "@/data/countries";

const ReleaseDateFilter: FunctionComponent<{
	countriesData: Array<CountriesType>;
	selectedCountry?: CountriesType;
	dispatch: Dispatch<Action>;
	filters: DiscoverFiltersType;
	pageURL: string;
}> = ({ dispatch, filters, pageURL }) => {
	const fromDate = filters["release_date.gte"]
		? dayjs(filters["release_date.gte"])
		: null;
	const toDate = filters["release_date.lte"]
		? dayjs(filters["release_date.lte"])
		: null;

	const hasDateError =
		(fromDate && toDate && fromDate.isAfter(toDate)) || false;

	return (
		<FilterAccordionDetails>
			<FilterSectionTitle title='Release Dates' />
			<FormControlLabel
				sx={{
					height: "24px",
				}}
				control={
					<Checkbox
						name='with_release_type'
						checked={filters.with_release_type === null}
						onChange={(event) => {
							dispatch({
								type: "SET_FILTERS",
								payload: {
									...filters,
									with_release_type: event.target.checked
										? null
										: "2|3|1|4|5|6",
								},
							});
						}}
					/>
				}
				label='Search all releases?'
			/>

			{(filters.with_release_type ||
				pageURL === "/movie/upcoming" ||
				pageURL === "/movie/now-playing") && (
				<FormControlLabel
					control={
						<Checkbox
							name='region'
							checked={filters.region === null}
							onChange={(event) => {
								dispatch({
									type: "SET_FILTERS",
									payload: {
										...filters,
										region: event.target.checked ? null : "IN",
									},
								});
							}}
						/>
					}
					label='Search all countries?'
					sx={{
						marginTop: "6px !important",
						marginBottom: "20px !important",
					}}
				/>
			)}

			{filters.with_release_type && filters.region && (
				<SearchableSelect
					options={COUNTRY_OPTIONS}
					value={filters.region}
					getOptionKey={(o) => o.iso_3166_1 ?? ""}
					getSearchFields={(o) => [o.native_name, o.english_name]}
					renderOption={(option, isSelectedDisplay) => (
						<CountryOption
							flagUrl={option.flagUrl}
							nativeName={option.native_name}
							isSelectedDisplay={isSelectedDisplay}
						/>
					)}
					onSelect={(option) => {
						dispatch({
							type: "SET_FILTERS",
							payload: { ...filters, region: option.iso_3166_1 },
						});
					}}
					selectSx={{ ...SELECT_STYLES, marginBottom: "10px" }}
				/>
			)}

			{filters.with_release_type && (
				<Box display={"flex"} flexDirection={"column"}>
					{[
						{ id: 2, label: "Theatrical (limited)" },
						{ id: 3, label: "Theatrical" },
						{ id: 1, label: "Premiere" },
						{ id: 4, label: "Digital" },
						{ id: 5, label: "Physical" },
						{ id: 6, label: "TV" },
					].map((index) => (
						<FormControlLabel
							key={index.id}
							control={
								<Checkbox
									name='with_release_type'
									checked={(
										(filters.with_release_type as string) || ""
									).includes(`${index.id}`)}
									onChange={(event) => {
										const currentTypes = filters.with_release_type
											? ((filters.with_release_type as string) || "").split("|")
											: [];

										let newTypes: string[];

										if (event.target.checked) {
											newTypes = [...currentTypes, index.id.toString()];
										} else {
											newTypes = currentTypes.filter(
												(type) => type !== index.id.toString(),
											);
										}

										dispatch({
											type: "SET_FILTERS",
											payload: {
												...filters,
												with_release_type: newTypes.join("|"),
											},
										});
									}}
								/>
							}
							label={index.label}
						/>
					))}
				</Box>
			)}

			<Box
				display={"flex"}
				alignItems={"center"}
				justifyContent={"space-between"}
				mt={"11px"}
				mb={"8px"}
			>
				<Typography
					sx={{ width: "100px", color: "#a4a4a4", fontSize: "0.9rem" }}
				>
					from
				</Typography>
				<DatePicker
					value={fromDate}
					maxDate={toDate || undefined}
					onChange={(newValue: Dayjs | null) => {
						const formattedDate = newValue
							? newValue.format("YYYY-MM-DD")
							: null;
						dispatch({
							type: "SET_FILTERS",
							payload: {
								...filters,
								"release_date.gte": formattedDate,
							},
						});
					}}
					format='MM/DD/YYYY'
					placeholder='Select start date'
					error={hasDateError}
					helperText={hasDateError ? "Start date must be before end date" : ""}
					textFieldProps={{
						variant: "outlined",
					}}
				/>
			</Box>
			<Box
				display={"flex"}
				alignItems={"center"}
				justifyContent={"space-between"}
			>
				<Typography
					sx={{ width: "100px", color: "#a4a4a4", fontSize: "0.9rem" }}
				>
					to
				</Typography>
				<DatePicker
					value={toDate}
					minDate={fromDate || undefined}
					onChange={(newValue: Dayjs | null) => {
						const formattedDate = newValue
							? newValue.format("YYYY-MM-DD")
							: null;
						dispatch({
							type: "SET_FILTERS",
							payload: {
								...filters,
								"release_date.lte": formattedDate,
							},
						});
					}}
					format='MM/DD/YYYY'
					placeholder='Select end date'
					error={hasDateError}
					helperText={hasDateError ? "End date must be after start date" : ""}
					textFieldProps={{
						variant: "outlined",
					}}
				/>
			</Box>
		</FilterAccordionDetails>
	);
};

export default ReleaseDateFilter;
