"use client";

import type { DocumentLayoutProps } from "sanity";
import { Stack, Box } from "@sanity/ui";
import { PublishBanner } from "./PublishBanner";

export function DocumentLayout(props: DocumentLayoutProps) {
  return (
    <Stack space={0} style={{ height: "100%" }}>
      <Box paddingX={4} paddingTop={3}>
        <PublishBanner
          documentId={props.documentId}
          schemaType={props.documentType}
        />
      </Box>
      <Box flex={1} style={{ minHeight: 0 }}>
        {props.renderDefault(props)}
      </Box>
    </Stack>
  );
}
