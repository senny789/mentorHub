import MainLayout from "@/Layout/mainLayout";
import "@/styles/globals.css";
import "@/styles/leaflet.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { store } from "@/store/home";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<AnimatePresence>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</AnimatePresence>
			</QueryClientProvider>
		</Provider>
	);
}
