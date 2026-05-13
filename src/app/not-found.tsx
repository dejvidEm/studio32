
import { Metadata } from "next";
import NotFound from "./components/not-found";

export const metadata: Metadata = {
  title: "Stránka nenájdená",
  robots: {
    index: false,
    follow: false,
  },
};

const ErrorPage = () => {
    return (
        <>
            <NotFound />
        </>
    );
};

export default ErrorPage;
