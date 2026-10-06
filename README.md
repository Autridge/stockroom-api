# Session-01— Connect Node HTTP to Nest

1. Who instantiates `HealthService`, and when does that instantiation happen?

NestJS usses an **Inversion of Control (IoC) container.** This means Nest itself creates the `HealthService` behing the scenes (usually just one single instance for the whole app) and hands it or injects it into your controller’s contructor.
So when we write `constructor(private readonly healthService: HealthService),` we are simply telling Nest what dependency we need, rather than calling `new healthService()` ourselves.

2. What role does the underlying HTTP adapter (Express) play when Nest returns a plain JavaScript object from `live()`?

The HTTP adapter acts as a NestJS translator. Nest doesn’t handle raw HTTP request directly; it relies on an underlying framework like Express ( the default) or Fastify. When the controllers returns a plain JavaScript object like `{status: ‘ok},` the HTTP adapter catches that object, automatically serializes it into JSON, set the proper `Content-Type` header, and sends it to the client. It completely saves you from writing `res.status(200).json(…)` like you would in vanilla Node or Express.

3. Why does placing `@Injectable()` on a class not automatically make it injectable everywhere in the app?

`@Injectable` merely attaches metadata indicating the class is capable of participating in dependency injection, but it doesn’t actively register it. The `providers` array in the `@Module` decorator is the actual registration list

# Session-02— Controllers, providers, and in-memory CRUD

1. Why do controllers delegate logic to services instead of putting the array and logic directly in the controller?

Controllers are strictly responsible for the HTTP transport layer, handling routing, extracting request payloads(headers, params, body), and formatting responses. Delegating business logic and state management to `@Injectable()` services enforces the Single Responsibility Principle. This ensures the core application logic is transport-agnostic, easily testable in isolation without mocking HTTP execution contexts, and reusable across different transport layers (like WebSockets or background microservices).

2. How does a default POST status differ from a default GET status in Nest?

By default, NestJS adheres to standard REST semantics for its routing decorators. A `@Get()` route returns a `200 OK` status code, whereas a `@Post()` route automatically returns a `201 Created` status code to indicate successful resource creation. This framework-level default can be manually overridden on any handler using the `@HttpCode()` decorator.

3. How would PUT and PATCH differ in an API contract?

In RESTful design, a `PUT` request represents a complete resource replacement. The client must supply the entire resource representation in the payload, and any omitted fields are typically overwritten as null or default values. A `PATCH` request represents a partial update; the client only transmits the specific fields that require modification. leaving the rest of the existing resource state untouched.
