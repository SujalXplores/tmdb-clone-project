import { type Dispatch, type FunctionComponent } from "react";
import type { Action } from "@/types/common";
import type { DiscoverFiltersType } from "@/types/filters";
import { Box } from "@mui/material";
import {
	SELECT_STYLES,
	withMenuProps,
} from "@/constants/filterConstants";
import Typography from "@/components/Typography";
import FilterSectionTitle from "@/components/FilterSectionTitle";
import CustomTooltip from "@/components/Tooltip";
import QuestionMarkTooltip from "@/components/QuestionMarkTooltip";
import FilterAccordionDetails from "@/components/FilterAccordionDetails";
import SearchableSelect from "@/components/SearchableSelect";
import { LANGUAGES_OPTIONS } from "@/data/languages";

const renderLanguageOption = (
	option: (typeof LANGUAGES_OPTIONS)[0],
	isSelectedDisplay: boolean,
) => (
	<Typography
		variant='body2'
		sx={{
			color: "theme.palette.text.primary",
			fontSize: "0.875rem",
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
		{option.native_name}
		{option.count !== null && option.count > 0 && (
			<Box component='span' sx={{ ml: 0.5, opacity: 0.8 }}>
				({option.count.toLocaleString()})
			</Box>
		)}
	</Typography>
);

const LanguageFilter: FunctionComponent<{
	dispatch: Dispatch<Action>;
	filters: DiscoverFiltersType;
}> = ({ dispatch, filters }) => {
	return (
		<FilterAccordionDetails>
			<Box>
				<FilterSectionTitle title='Language' sx={{ width: "fit-content" }} />
				<CustomTooltip
					title={"Filter items based on their original language."}
					sx={{ display: "flex" }}
				>
					<span>
						<QuestionMarkTooltip />
					</span>
				</CustomTooltip>
			</Box>

			<SearchableSelect
				options={LANGUAGES_OPTIONS}
				value={filters.with_original_language}
				getOptionKey={(o) => o.iso_639_1 ?? null}
				getSearchFields={(o) => [o.native_name, o.english_name]}
				renderOption={renderLanguageOption}
				onSelect={(option) => {
					dispatch({
						type: "SET_FILTERS",
						payload: {
							...filters,
							with_original_language: option.iso_639_1,
						},
					});
				}}
				paperProps={withMenuProps({ width: "226.4px", height: "217.6px" })}
				selectSx={SELECT_STYLES}
			/>
		</FilterAccordionDetails>
	);
};

export default LanguageFilter;
