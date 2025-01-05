// Function to convert any GeoJSON Feature to a Feature with MultiPolygon geometry
export function convertFeatureToMultiPolygon(feature) {
    if (!feature || !feature.type || feature.type !== 'Feature') {
        throw new Error('Input must be a GeoJSON Feature');
    }

    if (!feature.geometry) {
        throw new Error('Feature must have a geometry property');
    }

    return {
        ...feature,
        type: 'Feature',
        properties: feature.properties || {},
        geometry: convertGeometryToMultiPolygon(feature.geometry)
    };
}

// Function to convert any GeoJSON geometry to MultiPolygon
function convertGeometryToMultiPolygon(geometry) {
    if (!geometry || !geometry.type) {
        throw new Error('Invalid geometry input');
    }

    switch (geometry.type) {
        case 'MultiPolygon':
            // Already a MultiPolygon, return as is
            return geometry;

        case 'Polygon':
            // Convert Polygon to MultiPolygon
            return {
                type: 'MultiPolygon',
                coordinates: [geometry.coordinates]
            };

        case 'Point':
            // Store point coordinates directly as a single-point polygon ring
            return {
                type: 'MultiPolygon',
                coordinates: [[[[...geometry.coordinates]]]]
            };

        case 'LineString':
            // Store line coordinates directly as a single polygon ring
            return {
                type: 'MultiPolygon',
                coordinates: [[geometry.coordinates]]
            };

        case 'MultiPoint':
            // Convert each point to a single-point polygon
            return {
                type: 'MultiPolygon',
                coordinates: geometry.coordinates.map(point =>
                    [[[...point]]]
                )
            };

        case 'MultiLineString':
            // Store each line's coordinates as a separate polygon
            return {
                type: 'MultiPolygon',
                coordinates: geometry.coordinates.map(line =>
                    [line]
                )
            };

        default:
            throw new Error(`Unsupported geometry type: ${geometry.type}`);
    }
}

export function convertFeatureFromMultiPolygon(feature) {
    if (!feature || !feature.type || feature.type !== 'Feature') {
        throw new Error('Input must be a GeoJSON Feature');
    }

    if (!feature.geometry || feature.geometry.type !== 'MultiPolygon') {
        throw new Error('Feature geometry must be a MultiPolygon');
    }

    if (!feature.properties?.originalGeometryType) {
        throw new Error('Feature must have originalGeometryType in properties');
    }

    return {
        ...feature,
        type: 'Feature',
        properties: feature.properties || {},
        geometry: convertGeometryFromMultiPolygon(feature.geometry, feature.properties.originalGeometryType)
    };
}

// Function to convert a MultiPolygon geometry to its original type
function convertGeometryFromMultiPolygon(geometry, originalType) {
    switch (originalType) {
        case 'MultiPolygon':
            return geometry;

        case 'Polygon':
            return {
                type: 'Polygon',
                coordinates: geometry.coordinates[0]
            };

        case 'Point':
            return {
                type: 'Point',
                coordinates: geometry.coordinates[0][0][0]
            };

        case 'LineString':
            return {
                type: 'LineString',
                coordinates: geometry.coordinates[0][0]
            };

        case 'MultiPoint':
            return {
                type: 'MultiPoint',
                coordinates: geometry.coordinates.map(polygon =>
                    polygon[0][0]
                )
            };

        case 'MultiLineString':
            return {
                type: 'MultiLineString',
                coordinates: geometry.coordinates.map(polygon =>
                    polygon[0]
                )
            };

        default:
            throw new Error(`Unsupported original geometry type: ${originalType}`);
    }
}
