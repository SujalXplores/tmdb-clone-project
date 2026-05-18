export const TMDB_ASSETS = "https://www.themoviedb.org/assets/2/v4";
export const TMDB_MEDIA = "https://media.themoviedb.org/t/p";
export const TMDB_IMAGE = "https://image.tmdb.org/t/p";

export const ASSET_URLS = {
    addIcon:
        `${TMDB_ASSETS}/glyphicons/basic/glyphicons-basic-371-plus-white-0bac34f16124808a12ea863b4d9cc6e599dee7c0a80658cfe9ead26939e64517.svg`,
    searchIcon:
        `${TMDB_ASSETS}/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg`,
    menuIcon:
        `${TMDB_ASSETS}/glyphicons/basic/glyphicons-basic-600-menu-7ef6e3f4266b4b216a8ef5920da43fc8c96e1ee805a219c5628fed5bfac854d5.svg`,
    userIcon:
        `${TMDB_ASSETS}/glyphicons/basic/glyphicons-basic-4-user-7de7dfcae838579a18f4eebc5b8847230d154718e481c5cd01c477cfcbc85993.svg`,
    logoSquare:
        `${TMDB_ASSETS}/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg`,
} as const;

export const LOGOS = {
	tmdbBlueSquare: `${TMDB_ASSETS}/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg`,
} as const;

export const IMAGE_CDN = {
	original: (path: string) => `${TMDB_MEDIA}/original${path}`,
	w45: (path: string) => `${TMDB_IMAGE}/w45${path}`,
} as const;
