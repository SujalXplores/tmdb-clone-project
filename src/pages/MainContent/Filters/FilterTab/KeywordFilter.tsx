import {
	useState,
	type Dispatch,
	type FunctionComponent,
} from "react";
import { useData } from "@/lib/useData";
import type { Action } from "@/types/common";
import type { DiscoverFiltersType } from "@/types/filters";
import FilterSectionTitle from "@/components/FilterSectionTitle";
import Autocomplete from "@/components/AutoComplete";
import TextField from "@/components/TextField";
import FilterAccordionDetails from "@/components/FilterAccordionDetails";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";

const KeywordFilter: FunctionComponent<{
	dispatch: Dispatch<Action>;
	filters: DiscoverFiltersType;
}> = ({ dispatch, filters }) => {
	const [keyWordsSearchValue, setKeyWordsSearchValue] = useState<string>("");
	const { debouncedValue: keyWordsDebouncedSearchValue, reset } =
		useDebouncedSearch(keyWordsSearchValue, { threshold: 3 });
	const [selectedKeyWords, setSelectedKeyWords] = useState<Array<{ id: number; name: string }>
	>([]);

	const { data: keywordsData } = useData<{
		page: number;
		results: Array<{
			id: number;
			name: string;
		}>;
	}>({
		queryKey: ["keywords", keyWordsDebouncedSearchValue],
		url: `/search/keyword`,
		params: { language: "en-US", query: keyWordsDebouncedSearchValue },
	});

	return (
		<FilterAccordionDetails>
			<FilterSectionTitle title='Keywords' />
			<Autocomplete
				multiple
				filterSelectedOptions
				inputValue={keyWordsSearchValue}
				options={keywordsData?.results || []}
				getOptionLabel={(option) => option.name || option.name}
				isOptionEqualToValue={(option, value) => option.id === value.id}
				value={selectedKeyWords}
				popupIcon={" "}
				isSelectOnly={false}
				onChange={(_event, newValue) => {
					setSelectedKeyWords(newValue);
					const newIdsString =
						newValue.length > 0
							? newValue.map((network) => network.id).join("|")
							: null;
					dispatch({
						type: "SET_FILTERS",
						payload: {
							...filters,
							with_keywords: newIdsString,
						},
					});
				}}
				renderInput={(params) => (
					<TextField {...params} placeholder="Filter by keywords..." />
				)}
				onInputChange={(_event, value, reason) => {
					if (reason === "input" || reason === "clear") {
						setKeyWordsSearchValue(value);
						if (reason === "clear") reset();
					} else if (reason === "reset") {
						setKeyWordsSearchValue("");
						reset();
					}
				}}
				fullWidth
				placeholder={
					filters?.with_keywords && filters?.with_keywords?.length > 0
						? ""
						: "Filter by keywords..."
				}
				sx={{
					"&:hover": {
						backgroundColor: "#fff",
					},
				}}
			/>
		</FilterAccordionDetails>
	);
};

export default KeywordFilter;
