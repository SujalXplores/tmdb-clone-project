import {
	createContext,
	use,
	useCallback,
	useMemo,
	useReducer,
	useState,
	type Dispatch,
	type ReactNode,
} from "react";
import { FILTERS_INITIAL_STATE } from "../constants/filterConstants";
import type { FilterAction, FilterState } from "../types/common";


const FilterContext = createContext<{
	state: FilterState;
	dispatch: Dispatch<FilterAction>;
} | null>(null);

const filterReducer = (
	state: FilterState,
	action: FilterAction,
): FilterState => {
	switch (action.type) {
		case "SET_FILTERS":
			return { ...state, filters: action.payload, isDirty: true };
		case "APPLY_FILTERS":
			return {
				...state,
				appliedFilters: state.filters,
				isDirty: false,
				isFiltered: true,
			};
		case "INIT_PAGE_FILTERS":
			return {
				...state,
				filters: action.payload,
				appliedFilters: action.payload,
				isDirty: false,
				isFiltered: false,
			};
		default:
			return state;
	}
};

interface UIContextValue {
	isDrawerOpen: boolean;
	toggleDrawer: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
	const [filterState, filterDispatch] = useReducer(filterReducer, {
		filters: FILTERS_INITIAL_STATE,
		appliedFilters: FILTERS_INITIAL_STATE,
		isDirty: false,
		isFiltered: false,
	});

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);

	const filterValue = useMemo(
		() => ({ state: filterState, dispatch: filterDispatch }),
		[filterState],
	);

	const uiValue = useMemo(
		() => ({ isDrawerOpen, toggleDrawer }),
		[isDrawerOpen, toggleDrawer],
	);

	return (
		<FilterContext value={filterValue}>
			<UIContext value={uiValue}>{children}</UIContext>
		</FilterContext>
	);
};

export const useGlobalState = () => {
	const context = use(FilterContext);
	if (!context) {
		throw new Error("useGlobalState must be used within FilterProvider");
	}
	return context;
};

export const useUIState = () => {
	const context = use(UIContext);
	if (!context) {
		throw new Error("useUIState must be used within FilterProvider");
	}
	return context;
};
