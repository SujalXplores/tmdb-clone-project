import { useState, type Dispatch, type FunctionComponent } from "react";
import Autocomplete from "../../../../components/AutoComplete";
import FilterSectionTitle from "../../../../components/FilterSectionTitle";
import TextField from "../../../../components/TextField";
import type { Action } from "../../../../types/common";
import type {
	DiscoverFiltersType,
	TvNetworksType,
} from "../../../../types/filters";
import { useData } from "../../../../lib/useData";
import Typography from "../../../../components/Typography";
import { Box } from "@mui/material";
import FilterAccordionDetails from "../../../../components/FilterAccordionDetails";
import { useDebouncedSearch } from "../../../../hooks/useDebouncedSearch";

const NetworkFilter: FunctionComponent<{
	dispatch: Dispatch<Action>;
	filters: DiscoverFiltersType;
}> = ({ dispatch, filters }) => {
	const [tvNetworksSearchValue, setTvNetworkSearchValue] = useState<string>("");
	const { debouncedValue: tvNetworksDebouncedSearchValue, reset } =
		useDebouncedSearch(tvNetworksSearchValue);
	const [selectedNetworks, setSelectedNetworks] = useState<
		Array<TvNetworksType>
	>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { data: tvNetworks, isFetching } = useData<{
		page: number;
		results: Array<TvNetworksType>;
	}>({
		queryKey: ["tvNetworks", tvNetworksDebouncedSearchValue],
		url: `/search/tv`,
		params: {
			query: tvNetworksDebouncedSearchValue,
			skip: 0,
			page: 1,
			pageSize: 50,
			language: "en-US",
		},
		options: {
			enabled: tvNetworksDebouncedSearchValue.length > 0,
			placeholderData: (prev) => prev,
		},
	});

	const shouldShowMenu =
		tvNetworksSearchValue.length > 0 &&
		tvNetworksDebouncedSearchValue.length > 0 &&
		!isFetching;

	const handleBlur = () => {
		setIsOpen(false);
		setTvNetworkSearchValue("");
		reset();
	};

	return (
		<FilterAccordionDetails>
			<FilterSectionTitle title='Network' />
			<Autocomplete
				multiple
				filterSelectedOptions
				open={isOpen && shouldShowMenu}
				onOpen={() => setIsOpen(true)}
				onClose={() => setIsOpen(false)}
				onBlur={handleBlur}
				inputValue={tvNetworksSearchValue}
				options={tvNetworks?.results || []}
				getOptionLabel={(option) =>
					`${option.name || option.original_name}${
						option.origin_country?.[0] ? ` (${option.origin_country[0]})` : ""
					}`
				}
				isOptionEqualToValue={(option, value) => option.id === value.id}
				value={selectedNetworks}
				placeholder={
					filters?.with_networks && filters?.with_networks?.length > 0
						? ""
						: "Filter by TV networks..."
				}
				onChange={(_event, newValue) => {
					setSelectedNetworks(newValue);
					const newIdsString =
						newValue.length > 0
							? newValue.map((network) => network.id).join("|")
							: null;
					dispatch({
						type: "SET_FILTERS",
						payload: {
							...filters,
							with_networks: newIdsString,
						},
					});
				}}
				isSelectOnly={false}
				renderOption={(props, option) => {
					const { key, ...optionProps } = props;
					return (
						<Box
							component='li'
							key={key}
							{...optionProps}
							sx={{
								display: "flex",
								alignItems: "center",
								gap: "0.5rem",
								padding: "0.5rem 0.75rem !important",
							}}
						>
							<Box
								sx={{
									width: "32px",
									height: "24px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0,
								}}
							>
								{option.poster_path ? (
									<img
										loading='lazy'
										src={`https://image.tmdb.org/t/p/w45${option.poster_path}`}
										alt={option.name}
										style={{
											maxWidth: "100%",
											maxHeight: "100%",
											objectFit: "contain",
										}}
										onError={(e) => {
											(e.target as HTMLImageElement).style.display = "none";
										}}
									/>
								) : null}
							</Box>
							<Typography
								sx={{
									fontSize: "0.875rem",
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{option.name || option.original_name}
								{option.origin_country?.[0] && ` (${option.origin_country[0]})`}
							</Typography>
						</Box>
					);
				}}
				renderInput={(params) => (
					<TextField {...params} placeholder='Filter by TV networks...' />
				)}
				onInputChange={(_event, value, reason) => {
					if (reason === "input") {
						setTvNetworkSearchValue(value);
					} else if (reason === "clear") {
						setTvNetworkSearchValue("");
						reset();
					}
				}}
				fullWidth
			/>
		</FilterAccordionDetails>
	);
};

export default NetworkFilter;
