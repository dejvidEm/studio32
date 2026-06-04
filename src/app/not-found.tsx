import { Metadata } from "next";
import { notFoundPageMeta } from "@/lib/page-metadata";
import NotFound from "./components/not-found";

export const metadata: Metadata = notFoundPageMeta();

const ErrorPage = () => {
    return (
        <>
            <NotFound />
        </>
    );
};

export default ErrorPage;
