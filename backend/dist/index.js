"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/config/index.ts
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var port = process.env.PORT ?? "3001";

// src/app.ts
var trpcExpress = __toESM(require("@trpc/server/adapters/express"));
var import_cors = __toESM(require("cors"));
var import_express = __toESM(require("express"));

// src/router.ts
var import_server2 = require("@trpc/server");
var import_zod = require("zod");

// src/db/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
prisma.$connect().then(() => console.info("\u{1F48E} Connected to database via Prisma")).catch(() => console.warn("\u26A0\uFE0F Warning, cannot connect to the database, this may cause issues"));
var db_default = prisma;

// src/trpc.ts
var import_server = require("@trpc/server");
var createContext = ({
  req,
  res
}) => ({});
var t = import_server.initTRPC.context().create();
var router = t.router;
var publicProcedure = t.procedure;

// src/router.ts
var appRouter = router({
  getAllUserTasks: publicProcedure.query(async () => {
    const tasks = await db_default.task.findMany();
    return tasks;
  }),
  createTask: publicProcedure.input(import_zod.z.object({
    date: import_zod.z.string().datetime(),
    name: import_zod.z.string(),
    order: import_zod.z.number()
  })).mutation(async ({ input }) => {
    const task = await db_default.task.create({
      data: input
    });
    return task;
  }),
  deleteTask: publicProcedure.input(import_zod.z.object({
    id: import_zod.z.number()
  })).mutation(async ({ input: { id } }) => {
    const task = db_default.task.delete({ where: { id } });
    if (!task) {
      throw new import_server2.TRPCError({
        code: "NOT_FOUND",
        message: `No task with id '${id}'`
      });
    }
  })
});

// src/app.ts
var startApp = async ({ port: port2 }) => {
  const app = (0, import_express.default)();
  app.use(import_express.default.json());
  app.use((0, import_cors.default)());
  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  return app.listen(port2);
};
var app_default = startApp;

// index.ts
app_default({ port: Number(port) }).then(() => {
  console.log(`\u{1F680} Server listening on port ${port}...`);
}).catch((err) => {
  console.error(`\u{1F622} Server failed to start on port ${port}`, err);
});
