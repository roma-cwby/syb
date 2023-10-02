import User from "./user/User";

type Controller = typeof User;

const controllers: Controller[] = [User];

export { controllers };