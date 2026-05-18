import { StrictMode, type ReactNode } from "react";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FilterProvider } from "@/store/store";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

const theme = createTheme({
	typography: {
		fontFamily: '"Source Sans Pro", Arial, sans-serif',
	},
});

const Providers = ({ children }: { children: ReactNode }) => (
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<FilterProvider>{children}</FilterProvider>
					</LocalizationProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
);

export default Providers;
