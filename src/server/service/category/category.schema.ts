import { category, subcategory } from "@prisma/client";

export interface Categories extends category {
  subcategory: subcategory[];
}
