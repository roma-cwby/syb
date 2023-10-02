import { JsonController, Get, Post, Body, Param } from "routing-controllers";

@JsonController("/user")
export default class User {
  @Get()
  async getAll() {
    return "Get all";
  }

  @Get("/:id")
  async getOne(@Param("id") id: number){

    return `Get by id ${id}`;
  }
}