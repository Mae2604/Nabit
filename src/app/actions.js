'use server'
import {pool} from './db';
import { redirect } from "next/navigation";
export async function setRole(role,userId){
  await pool.query(`UPDATE "user" SET "activeRole" = $1, "onboardingComplete" = $2 WHERE "id" = $3`,[role, true, userId]);
  redirect("/dashboard");
}