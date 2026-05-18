import type { Dispatch, FunctionComponent } from "react";
import FilterSectionTitle from "../../../../components/FilterSectionTitle";
import ToggleChipGroup from "../../../../components/ToggleChipGroup";
import type { DiscoverFiltersType, GenreType } from "../../../../types/filters";
import type { Action } from "../../../../types/common";
import { useData } from "../../../../lib/useData";
import FilterAccordionDetails from "../../../../components/FilterAccordionDetails";

const GenreFilter: FunctionComponent<{
	dispatch: Dispatch<Action>;
	filters: DiscoverFiltersType;
	pageURL: string;
}> = ({ dispatch, filters, pageURL }) => {
	const { data: genres } = useData<{ genres: Array<GenreType> }>({
		queryKey: ["genres", pageURL],
		url: `/genre/${pageURL.includes("movie") ? "movie" : "tv"}/list`,
		params: { language: "en-US" },
	});

	const options =
		genres?.genres?.map((genre: GenreType) => ({
			id: genre.id.toString(),
			label: genre.name,
		})) ?? [];

	return (
		<FilterAccordionDetails>
			<FilterSectionTitle title='Genres' />
			<ToggleChipGroup
				options={options}
				value={filters?.with_genres}
				delimiter=','
				onChange={(newValue) => {
					dispatch({
						type: "SET_FILTERS",
						payload: {
							...filters,
							with_genres: newValue,
						},
					});
				}}
			/>
		</FilterAccordionDetails>
	);
};

export default GenreFilter;
