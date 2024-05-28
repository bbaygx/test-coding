import {
  ChecklistResponse,
  SignInResponse,
  SignUpResponse,
} from "../types/type";
import { baseUrl } from "../lib/lib";
import axios from "axios";
import * as z from "zod";
import { signInSchema, signUpSchema } from "@/schemas/schema";
import axiosInstance from "./api.config";

// register handle
export async function signUpUser(
  values: z.infer<typeof signUpSchema>
): Promise<SignUpResponse> {
  try {
    const response = await axios.post(`${baseUrl}/register`, values);

    return response.data as SignUpResponse;
  } catch (error) {
    return {
      message: "Sign up failed",
    };
  }
}

export async function signInUser(
  values: z.infer<typeof signInSchema>
): Promise<SignInResponse> {
  try {
    const response = await axios.post(`${baseUrl}/login`, values);

    return response.data as SignInResponse;
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 500,
      message: "Sign in failed",
      errorMessage: "Internal server error",
      data: {
        token: "",
      },
    };
  }
}

export async function checkListAll(): Promise<ChecklistResponse> {
  try {
    const response = await axiosInstance.get(`${baseUrl}/checklist`);

    return response.data as ChecklistResponse;
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 500,
      message: "Get List error",
      errorMessage: "Internal server error",
      data: [],
    };
  }
}

export async function checkListPost(name: string): Promise<ChecklistResponse> {
  try {
    const response = await axiosInstance.post(`${baseUrl}/checklist`, {
      name,
    });

    return response.data as ChecklistResponse;
  } catch (error) {
    console.log("Error", error);
    return {
      statusCode: 500,
      message: "Get List error",
      errorMessage: "Internal server error",
      data: [],
    };
  }
}
