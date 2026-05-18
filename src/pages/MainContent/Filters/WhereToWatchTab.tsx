import {
	useEffect,
	useState,
	type Dispatch,
	type FunctionComponent,
	type SetStateAction,
} from "react";
import type {
	CountriesType,
	OTTProviderResponseType,
} from "@/types/filters";
import { useGlobalState } from "@/store/store";
import Typography from "@/components/Typography";
import { Box } from "@mui/material";
import styles from "./AllFiltersComponent.module.scss";
import CustomTooltip from "@/components/Tooltip";
import SearchableSelect from "@/components/SearchableSelect";
import CountryOption from "@/components/CountryOption";
import { COUNTRY_OPTIONS } from "@/data/countries";

const WhereToWatchFilter: FunctionComponent<{
	countriesData: Array<CountriesType>;
	setCountriesCount: Dispatch<SetStateAction<number>>;
	ottProviders: Array<OTTProviderResponseType>;
}> = ({ countriesData, setCountriesCount, ottProviders }) => {
	const [hoverOn, setHoverOn] = useState<number | null>(null);
	const { state, dispatch } = useGlobalState();
	const { filters } = state;

	useEffect(() => {
		setCountriesCount(countriesData.length);
	}, [countriesData, setCountriesCount]);

	return (
		<>
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
				Country
			</Typography>

			<SearchableSelect
				options={COUNTRY_OPTIONS}
				value={filters.watch_region}
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
						payload: { ...filters, watch_region: option.iso_3166_1 },
					});
				}}
			/>

			<Box
				display={"flex"}
				my={"14px"}
				flexWrap={"wrap"}
				columnGap={"6px"}
				rowGap={"10px"}
			>
				{ottProviders.map((provider) => {
					const currentSelected = filters?.with_watch_providers
						? filters.with_watch_providers.split("|")
						: [];
					const isSelected = currentSelected.includes(
						String(provider.provider_id),
					);
					const isHovered = hoverOn === provider.provider_id;
					const showOverlay = isSelected || isHovered;

					return (
						<CustomTooltip
							key={provider.provider_id}
							title={provider.provider_name}
						>
							<div
								className={styles.providerContainer}
								onMouseEnter={() => setHoverOn(provider.provider_id)}
								onMouseLeave={() => setHoverOn(null)}
								onClick={() => {
									const currentState =
										filters?.with_watch_providers?.split("|");
									if (currentState?.includes(String(provider.provider_id))) {
										currentSelected.splice(
											currentSelected.indexOf(String(provider.provider_id)),
											1,
										);
									} else {
										currentSelected.push(String(provider.provider_id));
									}
									dispatch({
										type: "SET_FILTERS",
										payload: {
											...filters,
											with_watch_providers: currentSelected.join("|"),
										},
									});
								}}
							>
								<img
									src={`https://media.themoviedb.org/t/p/original${provider.logo_path}`}
									alt={provider.provider_name}
									className={styles.providerLogo}
									loading='lazy'
								/>
								<div
									className={
										showOverlay
											? styles.providerHover
											: styles.hideProviderHover
									}
								>
									<span className={styles.providerHoverImage}></span>
								</div>
							</div>
						</CustomTooltip>
					);
				})}
			</Box>
		</>
	);
};

export default WhereToWatchFilter;
