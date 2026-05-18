import { useRef, useState, type FunctionComponent, type MouseEvent } from "react";
import logo from "../../assets/tmdb-logo.svg";
import styles from "./Header.module.scss";
import NavPopover from "./NavPopover";
import type { MenuKey } from "../../types/header";
import { ASSET_URLS, NAV_MENUS, POPOVER_CLOSE_DELAY_MS } from "../../constants/Header";

const DesktopNav: FunctionComponent = () => {
	const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handlePopoverOpen = (
		event: MouseEvent<HTMLElement>,
		menu: MenuKey,
	) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setAnchorEl(event.currentTarget);
		setActiveMenu(menu);
	};

	const handlePopoverClose = () => {
		timeoutRef.current = setTimeout(() => {
			setAnchorEl(null);
			setActiveMenu(null);
		}, POPOVER_CLOSE_DELAY_MS);
	};

	const cancelClose = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	};

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
						<p className={styles["add-icon"]}>
							<img
								src={ASSET_URLS.addIcon}
								alt='Add icon'
								className={styles["add-icon-img"]}
							/>
						</p>
					</li>
					<li className={styles["list-items"]}>
						<div className={styles["list-content"]}>
							<p className={styles["box-visible"]}>EN</p>
						</div>
					</li>
					<li className={styles["list-items"]}>
						<p className={styles["list-content"]}>Login</p>
					</li>
					<li className={styles["list-items"]}>
						<p className={styles["list-content"]}>Join TMDB</p>
					</li>
					<li className={styles["list-items"]}>
						<p className={styles["search-icon"]}>
							<img
								src={ASSET_URLS.searchIcon}
								alt='Search'
								className={styles["search-icon-img"]}
							/>
						</p>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default DesktopNav;
