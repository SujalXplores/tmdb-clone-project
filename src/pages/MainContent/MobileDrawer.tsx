import { useEffect, useState, type FunctionComponent } from "react";
import styles from "./MoviesContent.module.scss";
import { NAV_MENUS } from "../../constants/Header";
import { DRAWER_SUB_LINKS } from "../../constants/constants";

interface MobileDrawerProps {
	isOpen: boolean;
	onClose: () => void;
}

const MobileDrawer: FunctionComponent<MobileDrawerProps> = ({
	isOpen,
	onClose,
}) => {
	const [openMenus, setOpenMenus] = useState<string[]>([]);

	const toggleMenu = (menuKey: string) => {
		setOpenMenus((prev) =>
			prev.includes(menuKey)
				? prev.filter((item) => item !== menuKey)
				: [...prev, menuKey],
		);
	};

	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);
	const drawerMenus = NAV_MENUS.filter((menu) => menu.items.length > 0);

	return (
		<div
			className={`${styles.drawer} ${isOpen ? styles.show : ""}`}
			role='dialog'
			aria-modal='true'
			aria-label='Mobile navigation menu'
			aria-hidden={!isOpen}
			tabIndex={-1}
		>
			<ul className={styles.drawerList}>
				{drawerMenus.map((menu) => {
					const isExpanded = openMenus.includes(menu.key);
					return (
						<li key={menu.key} className={styles.drawerListItem}>
							<button
								type='button'
								className={styles.drawerListItemTitle}
								onClick={() => toggleMenu(menu.key)}
								aria-expanded={isExpanded}
							>
								{menu.label}
							</button>
							{isExpanded && (
								<ul className={styles.listMenu}>
									{menu.items.map((item) => (
										<li key={item.name} className={styles.listMenuItem}>
											{item.url ? (
												<a href={item.url} className={styles.listMenuItemTitle}>
													{item.name}
												</a>
											) : (
												<span className={styles.listMenuItemTitle}>
													{item.name}
												</span>
											)}
										</li>
									))}
								</ul>
							)}
						</li>
					);
				})}
			</ul>
			<ul className={styles.drawerSubList}>
				{DRAWER_SUB_LINKS.map((item) => (
					<li
						key={item.label}
						className={`${styles.drawerListSubItem} ${
							item.isLogin ? styles.loginSubItem : ""
						}`}
					>
						<a href={item.href}>{item.label}</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MobileDrawer;
