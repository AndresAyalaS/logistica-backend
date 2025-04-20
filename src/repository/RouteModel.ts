import { RouteData } from "types/iroute";
import pool from "../config/database";

export const createRoute = async (routeData: RouteData) => {
  const { name, start_point, end_point, estimated_duration } = routeData;
  
  const result = await pool.query(
    `INSERT INTO routes (name, start_point, end_point, estimated_duration)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, start_point, end_point, estimated_duration]
  );
  return result.rows[0];
};

export const getAllRoutes = async () => {
  const result = await pool.query("SELECT * FROM routes");
  return result.rows;
};

export const getRouteById = async (id: number) => {
  const result = await pool.query("SELECT * FROM routes WHERE id = $1", [id]);
  return result.rows[0];
};