import JsonLdScript from "@/app/components/seo/JsonLdScript";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo-jsonld";

/** JSON-LD Organization + WebSite on every page. */
export default function StructuredData() {
  return <JsonLdScript data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />;
}
