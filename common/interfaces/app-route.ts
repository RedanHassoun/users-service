import { Router } from "express";

export interface AppRoute {
    setRoutes(): void;
    getRouter(): Router;
}