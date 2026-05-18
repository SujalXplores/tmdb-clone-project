import { lazy, useEffect, type FunctionComponent } from "react";
import Typography from "@/components/Typography";
import { RadioGroup } from "@mui/material";
import { useGlobalState } from "@/store/store";
import { useLocation } from "react-router";
import { FILTERS_INITIAL_STATE } from "@/constants/filterConstants";
import type { CountriesType } from "@/types/filters";
import RadioButton from "@/components/RadioButton";
import FormControlLabel from "@/components/FormControlLabel";
import QuestionMarkTooltip from "@/components/QuestionMarkTooltip";
import FilterSectionTitle from "@/components/FilterSectionTitle";
import CustomTooltip from "@/components/Tooltip";
import FilterAccordionDetails from "@/components/FilterAccordionDetails";
import ToggleChipGroup from "@/components/ToggleChipGroup";

const LanguageFilter = lazy(() => import("./LanguageFilter"));
const AvailabilitiesFilter = lazy(() => import("./AvailabilitiesFilter"));
const ReleaseDateFilter = lazy(() => import("./ReleaseDateFilter"));
const NetworkFilter = lazy(() => import("./NetworkFilter"));
const GenreFilter = lazy(() => import("./GenreFilter"));
const SliderFilters = lazy(() => import("./SliderFilters"));
const KeywordFilter = lazy(() => import("./KeywordFilter"));

const FilterTab: FunctionComponent<{
	countriesData: Array<CountriesType>;
	selectedCountry?: CountriesType;
}> = ({ countriesData, selectedCountry }) => {
	const { state, dispatch } = useGlobalState();
	const { filters } = state;

	const pageURL = useLocation().pathname;

	const isReleaseTypeRoute =
		pageURL === "/movie/upcoming" || pageURL === "/movie/now-playing";

	useEffect(() => {
		const isTvDefault =
			pageURL === "/tv" ||
			pageURL === "/tv/airing-today" ||
			pageURL === "/tv/on-the-air";

		dispatch({
			type: "INIT_PAGE_FILTERS",
			payload: {
				...FILTERS_INITIAL_STATE,
				with_watch_monetization_types: isTvDefault
					? "flatrate|free|ads|rent|buy"
					: null,
				with_release_type: isReleaseTypeRoute ? "3" : null,
			},
		});
	}, [pageURL, dispatch]);

	return (
		<>
			<FilterAccordionDetails>
				<Typography
					fontWeight={300}
					sx={{
						lineHeight: "16px",
						color: "#000",
						display: "inline-flex",
						alignItems: "center",
						marginBottom: "10px",
					}}
				>
					Show Me
					<CustomTooltip title={""}>
						<QuestionMarkTooltip />
					</CustomTooltip>
				</Typography>
				<RadioGroup
					aria-labelledby='demo-radio-buttons-group-label'
					defaultValue='everything'
					name='radio-buttons-group'
				>
					<FormControlLabel
						value='everything'
						control={<RadioButton />}
						label='Everything'
						sx={{
							cursor: "pointer",
						}}
					/>
					<FormControlLabel
						value='moviesIHaveNotSeen'
						control={<RadioButton />}
						label="Movies I Haven't Seen"
						disabled
						sx={{ cursor: "pointer" }}
					/>
					<FormControlLabel
						value='moviesIHaveSeen'
						control={<RadioButton />}
						label='Movies I Have Seen'
						disabled
						sx={{ cursor: "pointer" }}
					/>
				</RadioGroup>
			</FilterAccordionDetails>

			{/* Availabilities Filter */}
			<AvailabilitiesFilter dispatch={dispatch} filters={filters} />

			{/* Release Date Filter */}
			<ReleaseDateFilter
				countriesData={countriesData}
				selectedCountry={selectedCountry}
				dispatch={dispatch}
				filters={filters}
				pageURL={pageURL}
			/>

			{/* Genre Filter */}
			<GenreFilter dispatch={dispatch} filters={filters} pageURL={pageURL} />

			{/* Certification Filter */}
			<FilterAccordionDetails>
				<FilterSectionTitle title='Certifications' />
				<ToggleChipGroup
					options={[
						{ id: "U", label: "U" },
						{ id: "UA", label: "UA" },
						{ id: "A", label: "A" },
					]}
					value={filters?.certification}
					delimiter='|'
					onChange={(newValue) => {
						dispatch({
							type: "SET_FILTERS",
							payload: {
								...filters,
								certification: newValue,
							},
						});
					}}
				/>
			</FilterAccordionDetails>

			{/* Network Filter */}
			{pageURL.includes("tv") && (
				<NetworkFilter dispatch={dispatch} filters={filters} />
			)}

			{/* Language Filter */}
			<LanguageFilter dispatch={dispatch} filters={filters} />

			{/* Slider Filters */}
			<SliderFilters dispatch={dispatch} filters={filters} />

			{/* Keyword Filter */}
			<KeywordFilter dispatch={dispatch} filters={filters} />
		</>
	);
};

export default FilterTab;
