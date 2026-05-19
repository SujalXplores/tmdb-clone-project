import type { FunctionComponent } from "react";
import Popover from "@mui/material/Popover";
import { useNavigate } from "react-router";
import styles from "./Header.module.scss";
import type { NavPopoverProps } from "@/types/header";

const NavPopover: FunctionComponent<NavPopoverProps> = ({
	anchorEl,
	open,
	onMouseEnter,
	onMouseLeave,
	listContent,
}) => {
	const navigate = useNavigate();

	return (
		<Popover
			className={styles.popover}
			open={open}
			anchorEl={anchorEl}
			sx={{ pointerEvents: "none" }}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			slotProps={{
				paper: {
					onMouseEnter,
					onMouseLeave,
					sx: {
						pointerEvents: "auto",
						paddingY: "6px",
						marginTop: "-0.35rem",
					},
				},
			}}
			anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			transformOrigin={{ vertical: "top", horizontal: "left" }}
			disableRestoreFocus
			disableEnforceFocus
			disableScrollLock
		>
			<ul className={styles["popover-list"]}>
				{listContent?.map((item) => (
					<li key={item.name} className={styles["popover-list-item"]}>
						<button
							type='button'
							className={styles["popover-list-link"]}
							onClick={() => {
								if (item.url) void navigate(item.url);
							}}
						>
							{item.name}
						</button>
					</li>
				))}
			</ul>
		</Popover>
	);
};

export default NavPopover;
