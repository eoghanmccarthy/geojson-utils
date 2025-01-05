import { expect, describe, it } from "bun:test";
import { convertFeatureToMultiPolygon, convertFeatureFromMultiPolygon } from "../index";
import { originalFeatures, multiPolygonFeatures } from "./fixtures";

describe("convertFeatureToMultiPolygon", () => {
    it("should throw error for non-Feature input", () => {
        expect(() => convertFeatureToMultiPolygon(null)).toThrow("Input must be a GeoJSON Feature");
        expect(() => convertFeatureToMultiPolygon({})).toThrow("Input must be a GeoJSON Feature");
        expect(() => convertFeatureToMultiPolygon({ type: "NotFeature" })).toThrow("Input must be a GeoJSON Feature");
    });

    it("should throw error for Feature without geometry", () => {
        const invalidFeature = {
            type: "Feature",
            properties: {}
        };
        expect(() => convertFeatureToMultiPolygon(invalidFeature))
            .toThrow("Feature must have a geometry property");
    });

    it("should throw error for unsupported geometry types", () => {
        const invalidFeature = {
            type: "Feature",
            properties: {
                originalGeometryType: "UnsupportedType"
            },
            geometry: {
                type: "UnsupportedType",
                coordinates: []
            }
        };
        expect(() => convertFeatureToMultiPolygon(invalidFeature))
            .toThrow("Unsupported geometry type: UnsupportedType");
    });

    it("should handle Point geometry", () => {
        const result = convertFeatureToMultiPolygon(originalFeatures.point);
        expect(result.type).toBe("Feature");
        expect(result.geometry.type).toBe("MultiPolygon");
        expect(result.geometry.coordinates).toEqual([[[[100, 0]]]]);
        expect(result.properties).toEqual({
            name: "test point",
            originalGeometryType: "Point"
        });
    });

    it("should handle LineString geometry", () => {
        const result = convertFeatureToMultiPolygon(originalFeatures.lineString);
        expect(result.type).toBe("Feature");
        expect(result.geometry.type).toBe("MultiPolygon");
        expect(result.geometry.coordinates).toEqual([[[[100, 0], [101, 1]]]]);
        expect(result.properties).toEqual({
            name: "test line",
            originalGeometryType: "LineString"
        });
    });

    it("should handle Polygon geometry", () => {
        const result = convertFeatureToMultiPolygon(originalFeatures.polygon);
        expect(result.type).toBe("Feature");
        expect(result.geometry.type).toBe("MultiPolygon");
        expect(result.geometry.coordinates).toEqual([
            [[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]]
        ]);
        expect(result.properties).toEqual({
            name: "test polygon",
            originalGeometryType: "Polygon"
        });
    });

    it("should handle MultiPoint geometry", () => {
        const result = convertFeatureToMultiPolygon(originalFeatures.multiPoint);
        expect(result.type).toBe("Feature");
        expect(result.geometry.type).toBe("MultiPolygon");
        expect(result.geometry.coordinates).toEqual([
            [[[100, 0]]],
            [[[101, 1]]]
        ]);
        expect(result.properties).toEqual({
            name: "test multipoint",
            originalGeometryType: "MultiPoint"
        });
    });

    it("should handle MultiLineString geometry", () => {
        const result = convertFeatureToMultiPolygon(originalFeatures.multiLineString);
        expect(result.type).toBe("Feature");
        expect(result.geometry.type).toBe("MultiPolygon");
        expect(result.geometry.coordinates).toEqual([
            [[[100, 0], [101, 1]]],
            [[[102, 2], [103, 3]]]
        ]);
        expect(result.properties).toEqual({
            name: "test multilinestring",
            originalGeometryType: "MultiLineString"
        });
    });

    it("should return MultiPolygon as is", () => {
        const result = convertFeatureToMultiPolygon(originalFeatures.multiPolygon);
        expect(result.type).toBe("Feature");
        expect(result.geometry.type).toBe("MultiPolygon");
        expect(result.geometry.coordinates).toEqual([
            [[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]]
        ]);
        expect(result.properties).toEqual({
            name: "test multipolygon",
            originalGeometryType: "MultiPolygon"
        });
    });
});

describe("convertFeatureFromMultiPolygon", () => {
    it("should throw error for non-Feature input", () => {
        expect(() => convertFeatureFromMultiPolygon(null)).toThrow("Input must be a GeoJSON Feature");
        expect(() => convertFeatureFromMultiPolygon({})).toThrow("Input must be a GeoJSON Feature");
        expect(() => convertFeatureFromMultiPolygon({ type: "NotFeature" })).toThrow("Input must be a GeoJSON Feature");
    });

    it("should throw error for non-MultiPolygon geometry", () => {
        const invalidFeature = {
            type: "Feature",
            properties: {
                originalGeometryType: "Point"
            },
            geometry: {
                type: "Point",
                coordinates: [100, 0]
            }
        };
        expect(() => convertFeatureFromMultiPolygon(invalidFeature))
            .toThrow("Feature geometry must be a MultiPolygon");
    });

    it("should throw error when originalGeometryType is missing", () => {
        const invalidFeature = {
            type: "Feature",
            properties: {},
            geometry: {
                type: "MultiPolygon",
                coordinates: []
            }
        };
        expect(() => convertFeatureFromMultiPolygon(invalidFeature))
            .toThrow("Feature must have originalGeometryType in properties");
    });

    it("should convert MultiPolygon to Point", () => {
        const result = convertFeatureFromMultiPolygon(multiPolygonFeatures.point);
        expect(result.geometry.type).toBe("Point");
        expect(result.geometry.coordinates).toEqual([100, 0]);
        expect(result.properties).toEqual(multiPolygonFeatures.point.properties);
    });

    it("should convert MultiPolygon to LineString", () => {
        const result = convertFeatureFromMultiPolygon(multiPolygonFeatures.lineString);
        expect(result.geometry.type).toBe("LineString");
        expect(result.geometry.coordinates).toEqual([[100, 0], [101, 1]]);
        expect(result.properties).toEqual(multiPolygonFeatures.lineString.properties);
    });

    it("should convert MultiPolygon to Polygon", () => {
        const result = convertFeatureFromMultiPolygon(multiPolygonFeatures.polygon);
        expect(result.geometry.type).toBe("Polygon");
        expect(result.geometry.coordinates).toEqual([[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]]);
        expect(result.properties).toEqual(multiPolygonFeatures.polygon.properties);
    });

    it("should convert MultiPolygon to MultiPoint", () => {
        const result = convertFeatureFromMultiPolygon(multiPolygonFeatures.multiPoint);
        expect(result.geometry.type).toBe("MultiPoint");
        expect(result.geometry.coordinates).toEqual([[100, 0], [101, 1]]);
        expect(result.properties).toEqual(multiPolygonFeatures.multiPoint.properties);
    });

    it("should convert MultiPolygon to MultiLineString", () => {
        const result = convertFeatureFromMultiPolygon(multiPolygonFeatures.multiLineString);
        expect(result.geometry.type).toBe("MultiLineString");
        expect(result.geometry.coordinates).toEqual([
            [[100, 0], [101, 1]],
            [[102, 2], [103, 3]]
        ]);
        expect(result.properties).toEqual(multiPolygonFeatures.multiLineString.properties);
    });

    it("should keep MultiPolygon as is", () => {
        const result = convertFeatureFromMultiPolygon(multiPolygonFeatures.multiPolygon);
        expect(result.geometry.type).toBe("MultiPolygon");
        expect(result.geometry.coordinates).toEqual(multiPolygonFeatures.multiPolygon.geometry.coordinates);
        expect(result.properties).toEqual(multiPolygonFeatures.multiPolygon.properties);
    });
});
