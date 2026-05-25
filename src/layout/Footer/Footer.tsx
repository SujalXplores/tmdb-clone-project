import Typography from "@/components/Typography";
import styles from "./Footer.module.scss";
import { TMDB_ASSETS } from "@/constants/urls";

const FOOTER_LINK_GROUPS: Array<{
	title: string;
	items: string[];
	extraClassName?: string;
}> = [
	{
		title: "THE BASICS",
		items: [
			"About TMDB",
			"Contact Us",
			"API Documentation",
			"API for Business",
			"System Status",
		],
	},
	{
		title: "GET INVOLVED",
		items: ["Contribution Bible", "Add New Movie", "Add New TV Show"],
	},
	{
		title: "COMMUNITY",
		items: ["Guidelines", "Discussions", "Leaderboard", "Support Forums"],
	},
	{
		title: "LEGAL",
		items: [
			"Terms of Use",
			"API Terms of Use",
			"Privacy Policy",
			"DMCA Policy",
		],
		extraClassName: "legal-container",
	},
];

const Footer = () => {
	return (
		<>
			<footer className={styles.footer}>
				<div className={styles.footerContent}>
					<section className={styles.footerLogoSection}>
						<img
							alt='The Movie Database (TMDB)'
							className={styles.tmdbLogo}
							src={`${TMDB_ASSETS}/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg`}
						/>
						<Typography className={styles.joinTheCommunityText}>
							JOIN THE COMMUNITY
						</Typography>
					</section>
					{FOOTER_LINK_GROUPS.map((group) => (
						<nav
							key={group.title}
							className={`${styles.footerLinksContainer} ${
								group.extraClassName ? styles[group.extraClassName] : ""
							}`}
							aria-label={group.title}
						>
							<p className={styles.footerLinksTitle}>{group.title}</p>
							<ul className={styles.footerLinksList}>
								{group.items.map((item) => (
									<li key={item}>
										<button type='button'>{item}</button>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>
				<Typography
					className={`${styles.buildText} ${styles["small-build-text"]}`}
				>
					Build 4e4caf3 (10106)
				</Typography>
			</footer>
			<Typography
				className={`${styles.buildText} ${styles["large-build-text"]}`}
			>
				Build 4e4caf3 (10106)
			</Typography>
		</>
	);
};

export default Footer;
