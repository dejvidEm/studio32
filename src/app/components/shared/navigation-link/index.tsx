import { PillCtaLink } from "./pill-cta";

type NavigationLinkProps = {
    navigationTitle: string;
    navigationLink: string;
    transform: boolean;
    fullWidth?: boolean;
};

const NavigationLink = ({
    navigationTitle,
    navigationLink,
    transform,
    fullWidth,
}: NavigationLinkProps) => {
    return (
        <PillCtaLink
            href={navigationLink}
            label={navigationTitle}
            transform={transform}
            fullWidth={fullWidth}
        />
    );
};

export default NavigationLink;
export { PillCtaButton } from "./pill-cta";
