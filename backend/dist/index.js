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
var import_env_core = require("@t3-oss/env-core");
var import_dotenv = require("dotenv");
var import_zod = require("zod");
(0, import_dotenv.config)();
var env = (0, import_env_core.createEnv)({
  clientPrefix: "",
  server: {
    NODE_ENV: import_zod.z.enum(["development", "production"]).default("development"),
    PORT: import_zod.z.coerce.number().default(3001),
    DATABASE_URL: import_zod.z.string().url().min(1),
    SUPABASE_URL: import_zod.z.string().min(1).url(),
    SUPABASE_PUBLIC_KEY: import_zod.z.string().min(1)
  },
  client: {},
  runtimeEnv: process.env
});

// src/app.ts
var trpcExpress = __toESM(require("@trpc/server/adapters/express"));
var import_cors = __toESM(require("cors"));
var import_express = __toESM(require("express"));

// src/libs/trpc.ts
var import_server = require("@trpc/server");

// src/libs/supabase.ts
var import_supabase_js = require("@supabase/supabase-js");
var supabase = (0, import_supabase_js.createClient)(env.SUPABASE_URL, env.SUPABASE_PUBLIC_KEY);
var supabase_default = supabase;

// src/libs/trpc.ts
var createContext = async ({ req, res }) => {
  const getUserFromHeader = async () => {
    if (req.headers.authorization) {
      const user2 = await supabase_default.auth.getUser(req.headers.authorization.split(" ")[1]);
      if (user2.data) {
        return user2.data.user;
      }
      return null;
    }
    return null;
  };
  const user = await getUserFromHeader();
  return { user };
};
var t = import_server.initTRPC.context().create();
var router = t.router;
var publicProcedure = t.procedure;
var middleware = t.middleware;
var isAuthenticated = middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.user) {
    throw new import_server.TRPCError({ code: "UNAUTHORIZED", message: "User is not authenticated" });
  }
  return opts.next({
    ctx: {
      user: ctx.user
    }
  });
});
var authenticatedProcedure = publicProcedure.use(isAuthenticated);

// src/router.ts
var import_crypto = require("crypto");
var import_dayjs = __toESM(require("dayjs"));
var import_zod2 = require("zod");

// src/utils/getDatesBetween.ts
var getDatesBetween = (startDate, endDate) => {
  const dateArray = [];
  while (startDate <= endDate) {
    dateArray.push(startDate.format("YYYY-MM-DD"));
    startDate = startDate.add(1, "days");
  }
  return dateArray;
};
var getDatesBetween_default = getDatesBetween;

// src/router.ts
var appRouter = router({
  getCalendar: authenticatedProcedure.input(import_zod2.z.object({}).nullish()).query(async ({ ctx }) => {
    const { data: tasks } = await supabase_default.from("task").select("*").eq("user_id", ctx.user.id).order("date");
    if (!tasks)
      return;
    if (tasks.length === 0)
      return { [(0, import_dayjs.default)().format("YYYY-MM-DD")]: [{ id: (0, import_crypto.randomUUID)(), name: "", date: (0, import_dayjs.default)().format("YYYY-MM-DD"), is_complete: false, order: 0, user_id: ctx.user.id }] };
    const calendar = tasks.reduce((cal, task) => {
      return { ...cal, [task.date]: [...cal[task.date] ?? [], task] };
    }, {});
    const dates = getDatesBetween_default((0, import_dayjs.default)(tasks[0].date), (0, import_dayjs.default)());
    let previousFilledDayTasks = [];
    dates.forEach((date) => {
      if (calendar[date]) {
        previousFilledDayTasks = calendar[date];
      } else {
        calendar[date] = previousFilledDayTasks.map((task) => ({ ...task, is_complete: false, date, id: (0, import_crypto.randomUUID)() }));
      }
    });
    return calendar;
  }),
  updateTasks: authenticatedProcedure.input(import_zod2.z.object({
    tasks: import_zod2.z.array(
      import_zod2.z.object({
        id: import_zod2.z.string().min(0),
        name: import_zod2.z.string()
      })
    )
  })).mutation(async ({ ctx, input: { tasks } }) => {
    const { error: deleteError } = await supabase_default.from("task").delete().eq("user_id", ctx.user.id).eq("date", (0, import_dayjs.default)().startOf("day").toISOString()).not("id", "in", `(${tasks.map((task) => task.id).join(",")})`);
    const { error: createError } = await supabase_default.from("task").upsert(tasks.map((task, i) => ({ ...task, user_id: ctx.user.id, date: (0, import_dayjs.default)().startOf("day").toISOString(), order: i })));
    console.log({ deleteError, createError });
  }),
  updateTaskComplete: authenticatedProcedure.input(import_zod2.z.object({
    taskId: import_zod2.z.string().min(1),
    name: import_zod2.z.string().min(1),
    isComplete: import_zod2.z.boolean(),
    order: import_zod2.z.number(),
    date: import_zod2.z.string()
  })).mutation(async ({ ctx, input: { taskId, name, order, date, isComplete } }) => {
    console.log("test");
    const { error, data } = await supabase_default.from("task").upsert({ id: taskId, name, order, is_complete: isComplete, date, user_id: ctx.user.id }).select();
    console.log({ data });
    if (data)
      return data[0];
  }),
  ping: publicProcedure.input(import_zod2.z.object({}).nullish()).query(() => console.log("pong"))
});

// src/app.ts
var startApp = async () => {
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
  return app.listen(env.PORT);
};
var app_default = startApp;

// index.ts
app_default().then(() => {
  console.log(`\u{1F680} Server listening on port ${env.PORT}...`);
}).catch((err) => {
  console.error(`\u{1F622} Server failed to start on port ${env.PORT}`, err);
});
