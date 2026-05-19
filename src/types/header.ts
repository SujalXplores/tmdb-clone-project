export type MenuKey = "movies" | "tv" | "people" | "awards" | "more";

export interface MenuItem {
	name: string;
	url: string | null;
}

export interface NavPopoverProps {
	anchorEl: HTMLElement | null;
	open: boolean;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	listContent?: MenuItem[];
}
