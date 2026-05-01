export function hasAnyImages(groups) {
    return groups.some((group) =>
        group.categories?.some((category) => category.items?.length)
    );
}

export async function fetchPhotos() {
    const baseUrl = import.meta.env.VITE_API_BASE || "";
    const response = await fetch(`${baseUrl}/api/photos`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to load photos.");
    }

    return data.groups || [];
}

export function findGroup(groups, side) {
    if (!side) {
        return null;
    }
    const normalizedSide = side.toLowerCase();
    const directMatch = groups.find(
        (group) => group.name?.toLowerCase() === normalizedSide
    );
    if (directMatch) {
        return directMatch;
    }
    return groups.find((group) =>
        group.name?.toLowerCase().includes(normalizedSide)
    );
}

export function findCategory(group, section) {
    if (!group || !section) {
        return null;
    }
    const normalized = section.toLowerCase();
    const directMatch = group.categories?.find(
        (category) => category.name?.toLowerCase() === normalized
    );
    if (directMatch) {
        return directMatch;
    }
    return group.categories?.find((category) =>
        category.name?.toLowerCase().includes(normalized)
    );
}
