import prisma from "../config/db.js";
import {
  successResponse,
  errorResponse,
  paginatedResponse,
} from "../utils/responseHandler.js";

export const createBuilding = async (req, res) => {
  try {
    const { buildingType, buildingName, noOfBuilding } = req.body;

    const building = await prisma.building.create({
      data: {
        buildingType,
        buildingName,
        noOfBuilding,
      },
    });

    return successResponse(res, building, "Building created successfully", 201);
  } catch (error) {
    console.error("Create building error:", error);
    return errorResponse(res, "Failed to create building", 500);
  }
};

export const getAllBuildings = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, buildingType } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (search) {
      where.OR = [
        { buildingName: { contains: search, mode: "insensitive" } },
        { buildingType: { contains: search, mode: "insensitive" } },
      ];
    }
    if (buildingType) {
      where.buildingType = buildingType;
    }

    const [buildings, total] = await Promise.all([
      prisma.building.findMany({
        where,
        include: {
          classRooms: true,
          facultyCabins: true,
          _count: {
            select: {
              classRooms: true,
              facultyCabins: true,
            },
          },
        },
        skip,
        take: parseInt(limit),
        orderBy: { buildingName: "asc" },
      }),
      prisma.building.count({ where }),
    ]);

    return paginatedResponse(
      res,
      buildings,
      parseInt(page),
      parseInt(limit),
      total,
      "Buildings retrieved successfully"
    );
  } catch (error) {
    console.error("Get buildings error:", error);
    return errorResponse(res, "Failed to get buildings", 500);
  }
};

export const getBuildingById = async (req, res) => {
  try {
    const { id } = req.params;

    const building = await prisma.building.findUnique({
      where: { id: parseInt(id) },
      include: {
        classRooms: true,
        facultyCabins: true,
        _count: {
          select: {
            classRooms: true,
            facultyCabins: true,
          },
        },
      },
    });

    if (!building) {
      return errorResponse(res, "Building not found", 404);
    }

    return successResponse(res, building, "Building retrieved successfully");
  } catch (error) {
    console.error("Get building error:", error);
    return errorResponse(res, "Failed to get building", 500);
  }
};
