export const boucheries = {
    "mercurey": {
        nom: "Boucherie Mercurey",
    },
    "saint-remy": {
        nom: "Boucherie Saint-Rémy",
    },
} as const;

export type VillageKey = keyof typeof boucheries;
