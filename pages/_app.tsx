import MainLayout from "@/Layout/mainLayout";
import "@/styles/globals.css";
import "@/styles/leaflet.css";
import "leaflet/dist/leaflet.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { AnimatePresence } from "framer-motion";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AnimatePresence>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</AnimatePresence>
		</QueryClientProvider>
	);
}
