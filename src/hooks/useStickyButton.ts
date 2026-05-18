import { useEffect, useState, type RefObject } from "react";

interface UseStickyButtonOptions {
	containerRef: RefObject<HTMLElement | null>;
	bottomOffset?: number;
}

export const useStickyButton = ({
	containerRef,
	bottomOffset = 0,
}: UseStickyButtonOptions): boolean => {
	const [isVisible, setIsVisible] = useState<boolean>(true);

	useEffect(() => {
		let frameId: number | null = null;

		const handleScroll = () => {
			if (frameId !== null) return;
			frameId = requestAnimationFrame(() => {
				const containerHeight = containerRef.current?.offsetHeight ?? 0;
				setIsVisible(
					containerHeight > window.scrollY + window.innerHeight - bottomOffset,
				);
				frameId = null;
			});
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (frameId !== null) cancelAnimationFrame(frameId);
		};
	}, [containerRef, bottomOffset]);

	return isVisible;
};
