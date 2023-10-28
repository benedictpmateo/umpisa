import { GraphQLError } from "graphql";
import pokedex from "../constant/pokedex";

export const generatePaginatedMetadata = (args: {
  collection: string;
  size?: number;
  page?: number;
}) => {
  const metadata = {};
  const { collection, size = 10, page = 1 } = args;
  if (!collection) throw new GraphQLError('Collection is required')
  let total = 0;
  switch (collection) {
    case "pokemon":
      total = pokedex.length;
      break;
    default:
      throw new GraphQLError('Collection is not set in metadata')
  }
  const totalPages = Math.ceil(total / size);
  metadata["total"] = total;
  metadata["totalPages"] = totalPages;
  metadata["hasPrev"] = totalPages > 0 && page > 1;
  metadata["hasNext"] = totalPages > 0 && page < totalPages;
  return metadata;
};
