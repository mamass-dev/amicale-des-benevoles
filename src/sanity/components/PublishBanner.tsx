"use client";

import { useEditState, useDocumentOperation } from "sanity";
import { Card, Flex, Stack, Button, Text } from "@sanity/ui";
import { PublishIcon, CheckmarkIcon } from "@sanity/icons";

type Props = {
  documentId: string;
  schemaType: string;
};

export function PublishBanner({ documentId, schemaType }: Props) {
  const editState = useEditState(documentId, schemaType);
  const ops = useDocumentOperation(documentId, schemaType);

  const hasDraft = !!editState?.draft;
  const isPublished = !!editState?.published;
  const publishDisabled = !!ops.publish?.disabled;

  if (!hasDraft && isPublished) {
    return (
      <Card padding={3} radius={2} tone="positive" marginBottom={3}>
        <Flex align="center" gap={2}>
          <CheckmarkIcon style={{ fontSize: 20 }} />
          <Text size={1} weight="semibold">
            Publié — visible sur le site
          </Text>
        </Flex>
      </Card>
    );
  }

  if (!hasDraft) return null;

  return (
    <Card padding={4} radius={2} tone="caution" marginBottom={3} shadow={1}>
      <Flex align="center" justify="space-between" gap={4} wrap="wrap">
        <Stack space={2} flex={1} style={{ minWidth: 240 }}>
          <Text size={2} weight="semibold">
            ⚠️ Modifications non publiées
          </Text>
          <Text size={1} muted>
            Tes changements sont en brouillon. Clique pour les publier sur le site
            (mise à jour en moins d&apos;une minute).
          </Text>
        </Stack>
        <Button
          icon={PublishIcon}
          text="Publier les modifications"
          tone="positive"
          mode="default"
          padding={4}
          fontSize={2}
          onClick={() => ops.publish?.execute()}
          disabled={publishDisabled}
        />
      </Flex>
    </Card>
  );
}
