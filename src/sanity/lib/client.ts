import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env";

export const sanityEnabled = !!projectId;

export const client = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;
