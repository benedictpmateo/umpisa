import { it, expect, describe } from "@jest/globals";
import { parse } from "graphql";
import executor from "./mock/executor";

describe("createAccount(body: CreateAccountRequest!): CreateAccountResponse!", () => {
  it("should create a user account", async () => {
    const result: any = await executor()({
      document: parse(`
        mutation CreateUserAccount($body: CreateAccountRequest!) {
          createAccount(body: $body) {
            token
          }
        }
    `),
      variables: {
        body: {
          email: "benedict@mock.email",
          password: "mockPassword",
          firstName: "Benedict",
          lastName: "Mateo",
        },
      },
    });

    expect(result?.errors).toBeUndefined();
    expect(result).toHaveProperty("data");
    expect(result?.data).toHaveProperty('createAccount')
    expect(result?.data?.createAccount?.token).toBeTruthy()
  });


  it("should be an error because this user account is already created", async () => {
    const result: any = await executor()({
      document: parse(`
        mutation CreateUserAccount($body: CreateAccountRequest!) {
          createAccount(body: $body) {
            token
          }
        }
    `),
      variables: {
        body: global.__UmpisaMockAccount,
      }
    });
    expect(result.errors).not.toBeUndefined();
    expect(result.errors[0].message).toBe('User already exists')
  });
});

describe("loginUser(body: LoginAccountRequest!): LoginAccountResponse!", () => {
  it("should login user", async () => {
    const result: any = await executor()({
      document: parse(`
        mutation LoginAccount($body: LoginAccountRequest!) {
          loginAccount(body: $body) {
            token
          }
        }
      `),
      variables: {
        body: {
          email: global.__UmpisaMockAccount.email,
          password: global.__UmpisaMockAccount.password,
        }
      }
    });

    expect(result?.errors).toBeUndefined();
    expect(result).toHaveProperty("data");
    expect(result?.data).toHaveProperty('loginAccount')
    expect(result?.data?.loginAccount?.token).toBeTruthy()
  });
});
