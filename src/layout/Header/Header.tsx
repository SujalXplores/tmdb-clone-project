import { useEffect, useRef, useState, type FunctionComponent } from "react";
import styles from "./Header.module.scss";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useUIState } from "../../store/store";
import { SCROLL_HIDE_THRESHOLD } from "../../constants/Header";

const Header: FunctionComponent = () => {
	const { isDrawerOpen, toggleDrawer } = useUIState();
	const [hide, setHide] = useState<boolean>(false);
	const scrollPositionRef = useRef<number>(0);

	useEffect(() => {
		if (isDrawerOpen) return;

		let frameId: number | null = null;

		const handleScroll = () => {
			if (frameId !== null) return;
			frameId = requestAnimationFrame(() => {
				const currentPosition = window.scrollY;
				if (currentPosition > SCROLL_HIDE_THRESHOLD) {
					setHide(currentPosition > scrollPositionRef.current);
				} else {
					setHide(false);
				}
				scrollPositionRef.current = currentPosition;
				frameId = null;
			});
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (frameId !== null) cancelAnimationFrame(frameId);
		};
	}, [isDrawerOpen]);

	return (
		<header className={`${styles.header} ${hide ? styles["hide-header"] : ""}`}>
			<nav className={styles.nav}>
				<DesktopNav />
				<MobileNav onDrawerToggle={toggleDrawer} />
			</nav>
		</header>
	);
};

export default Header;
