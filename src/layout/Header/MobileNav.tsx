import type { FunctionComponent } from "react";
import styles from "./Header.module.scss";
import { ASSET_URLS } from "../../constants/Header";

interface MobileNavProps {
	onDrawerToggle: () => void;
}

const MobileNav: FunctionComponent<MobileNavProps> = ({ onDrawerToggle }) => {
	return (
		<div className={styles["nav-container-sm"]}>
			<div className={styles["menu-items"]}>
				<button
					type='button'
					className={styles["menu-icon"]}
					onClick={onDrawerToggle}
					aria-label='Open menu'
				>
					<img
						src={ASSET_URLS.menuIcon}
						alt=''
						className={styles["menu-icon-img"]}
					/>
				</button>
			</div>
			<div className={styles["logo-container"]}>
				<img src={ASSET_URLS.logoSquare} alt='logo' width='55' height='40' />
			</div>
			<div className={styles["icon-container"]}>
				<button
					type='button'
					className={styles["user-icon"]}
					aria-label='User profile'
				>
					<img
						src={ASSET_URLS.userIcon}
						alt=''
						className={styles["user-icon-img"]}
					/>
				</button>
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
			</div>
		</div>
	);
};

export default MobileNav;
