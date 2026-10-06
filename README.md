# Session-01— Connect Node HTTP to Nest

1. Who instantiates `HealthService`, and when does that instantiation happen?

NestJS usses an **Inversion of Control (IoC) container.** This means Nest itself creates the `HealthService`  behing the scenes (usually just one single instance for the whole app) and hands it or injects it into your controller’s contructor.
So when we write `constructor(private readonly healthService: HealthService),` we are simply telling Nest what dependency we need, rather than calling `new healthService()` ourselves.

1. What role does the underlying HTTP adapter (Express) play when Nest returns a plain JavaScript object from `live()`?

The HTTP adapter acts as a NestJS translator. Nest doesn’t handle raw HTTP request directly; it relies on an underlying framework like Express ( the default) or Fastify. When the controllers returns a plain JavaScript object like `{status: ‘ok},` the HTTP adapter catches that object, automatically serializes it into JSON, set the proper `Content-Type` header, and sends it to the client. It completely saves you from writing `res.status(200).json(…)` like you would in vanilla Node or Express.

1. Why does placing `@Injectable()` on a class not automatically make it injectable everywhere in the app?

`@Injectable`  merely attaches metadata indicating the class is capable of participating in dependency injection, but it doesn’t actively register it. The `providers` array in the `@Module` decorator is the actual registration list