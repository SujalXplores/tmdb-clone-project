import {
	useEffect,
	useRef,
	useState,
	type FunctionComponent,
	type MouseEvent,
} from "react";
import logo from "@/assets/tmdb-logo.svg";
import styles from "./Header.module.scss";
import NavPopover from "./NavPopover";
import type { MenuKey } from "@/types/header";
import { NAV_MENUS, POPOVER_CLOSE_DELAY_MS } from "@/constants/Header";
import { ASSET_URLS } from "@/constants/urls";

const DesktopNav: FunctionComponent = () => {
	const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handlePopoverOpen = (event: MouseEvent<HTMLElement>, menu: MenuKey) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setAnchorEl(event.currentTarget);
		setActiveMenu(menu);
	};

	const handlePopoverClose = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setAnchorEl(null);
			setActiveMenu(null);
		}, POPOVER_CLOSE_DELAY_MS);
	};

	const cancelClose = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	const isAnyMenuOpen = Boolean(anchorEl);

	return (
		<div className={styles["nav-container-xl"]}>
			<div className={styles["left-section"]}>
				<a href='/' className={styles["nav-logo"]}>
					<img src={logo} alt='logo' width='154' height='20' />
				</a>
				<ul className={styles["nav-list"]}>
					{NAV_MENUS.map((menu) => (
						<li
							key={menu.key}
							className={styles["nav-list-item"]}
							onMouseEnter={(e) => handlePopoverOpen(e, menu.key)}
							onMouseLeave={handlePopoverClose}
						>
							<button
								type='button'
								className={styles["list-content"]}
								aria-owns={isAnyMenuOpen ? "mouse-over-popover" : undefined}
								aria-haspopup='true'
								aria-expanded={activeMenu === menu.key}
							>
								{menu.label}
							</button>
							<NavPopover
								anchorEl={anchorEl}
								open={activeMenu === menu.key}
								onMouseEnter={cancelClose}
								onMouseLeave={handlePopoverClose}
								listContent={menu.items}
							/>
						</li>
					))}
				</ul>
			</div>
			<div className={styles["right-section"]}>
				<ul className={styles["nav-list"]}>
					<li className={styles["list-items"]}>
						<button
							type='button'
							className={styles["add-icon"]}
							aria-label='Add new'
						>
							<img
								src={ASSET_URLS.addIcon}
								alt=''
								className={styles["add-icon-img"]}
							/>
						</button>
					</li>
					<li className={styles["list-items"]}>
						<button
							type='button'
							className={styles["list-content"]}
							aria-label='Change language'
						>
							<span className={styles["box-visible"]}>EN</span>
						</button>
					</li>
					<li className={styles["list-items"]}>
						<a href='/login' className={styles["list-content"]}>
							Login
						</a>
					</li>
					<li className={styles["list-items"]}>
						<a href='/signup' className={styles["list-content"]}>
							Join TMDB
						</a>
					</li>
					<li className={styles["list-items"]}>
						<button
							type='button'
							className={styles["search-icon"]}
							aria-label='Search'
						>
							<img
								src={ASSET_URLS.searchIcon}
								alt=''
								className={styles["search-icon-img"]}
							/>
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default DesktopNav;
