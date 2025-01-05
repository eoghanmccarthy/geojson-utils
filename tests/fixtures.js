export const originalFeatures = {
    point: {
        type: "Feature",
        properties: {
            name: "test point",
            originalGeometryType: "Point"
        },
        geometry: {
            type: "Point",
            coordinates: [100, 0]
        }
    },

    lineString: {
        type: "Feature",
        properties: {
            name: "test line",
            originalGeometryType: "LineString"
        },
        geometry: {
            type: "LineString",
            coordinates: [[100, 0], [101, 1]]
        }
    },

    polygon: {
        type: "Feature",
        properties: {
            name: "test polygon",
            originalGeometryType: "Polygon"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]]
        }
    },

    multiPoint: {
        type: "Feature",
        properties: {
            name: "test multipoint",
            originalGeometryType: "MultiPoint"
        },
        geometry: {
            type: "MultiPoint",
            coordinates: [[100, 0], [101, 1]]
        }
    },

    multiLineString: {
        type: "Feature",
        properties: {
            name: "test multilinestring",
            originalGeometryType: "MultiLineString"
        },
        geometry: {
            type: "MultiLineString",
            coordinates: [
                [[100, 0], [101, 1]],
                [[102, 2], [103, 3]]
            ]
        }
    },

    multiPolygon: {
        type: "Feature",
        properties: {
            name: "test multipolygon",
            originalGeometryType: "MultiPolygon"
        },
        geometry: {
            type: "MultiPolygon",
            coordinates: [
                [[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]]
            ]
        }
    }
};

export const multiPolygonFeatures = {
    point: {
        type: "Feature",
        properties: {
            originalGeometryType: "Point",
            name: "test point"
        },
        geometry: {
            type: "MultiPolygon",
            coordinates: [[[[100, 0]]]]
        }
    },

    lineString: {
        type: "Feature",
        properties: {
            originalGeometryType: "LineString",
            name: "test line"
        },
        geometry: {
            type: "MultiPolygon",
            coordinates: [[[[100, 0], [101, 1]]]]
        }
    },

    polygon: {
        type: "Feature",
        properties: {
            originalGeometryType: "Polygon",
            name: "test polygon"
        },
        geometry: {
            type: "MultiPolygon",
            coordinates: [[[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]]]
        }
    },

    multiPoint: {
        type: "Feature",
        properties: {
            originalGeometryType: "MultiPoint",
            name: "test multipoint"
        },
        geometry: {
            type: "MultiPolygon",
            coordinates: [
                [[[100, 0]]],
                [[[101, 1]]]
            ]
        }
    },

    multiLineString: {
        type: "Feature",
        properties: {
            originalGeometryType: "MultiLineString",
            name: "test multilinestring"
        },
        geometry: {
            type: "MultiPolygon",
            coordinates: [
                [[[100, 0], [101, 1]]],
                [[[102, 2], [103, 3]]]
            ]
        }
    },

    multiPolygon: {
        type: "Feature",
        properties: {
            originalGeometryType: "MultiPolygon",
            name: "test multipolygon"
        },
        geometry: {
            type: "MultiPolygon",
            coordinates: [[[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]]]
        }
    }
};
